'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { withBasePath } from '@/lib/paths'

// Portrait phones get 9:16 center crops (406x720, ~45% of the bytes) so the
// clip fills the screen without decoding pixels that object-cover would
// throw away. Landscape/desktop gets the original 16:9 720p encodes.
const DESKTOP_VIDEOS = [
  withBasePath('/videos/hero-1.mp4'),
  withBasePath('/videos/hero-2.mp4'),
  withBasePath('/videos/hero-3.mp4'),
]
const MOBILE_VIDEOS = [
  withBasePath('/videos/hero-1-mobile.mp4'),
  withBasePath('/videos/hero-2-mobile.mp4'),
  withBasePath('/videos/hero-3-mobile.mp4'),
]
const POSTER_DESKTOP = withBasePath('/videos/hero-poster.webp')
const POSTER_MOBILE = withBasePath('/videos/hero-poster-mobile.webp')
const PORTRAIT_QUERY = '(max-aspect-ratio: 1/1)'

const CROSSFADE_MS = 1100
const SWAP_LEAD_SECONDS = 1.2
const PRELOAD_LEAD_SECONDS = 4
const MIN_BUFFER_AHEAD_SECONDS = 2

function hasEnoughBufferAhead(video: HTMLVideoElement) {
  const { buffered, currentTime } = video
  for (let i = 0; i < buffered.length; i++) {
    if (buffered.start(i) <= currentTime && buffered.end(i) - currentTime >= MIN_BUFFER_AHEAD_SECONDS) {
      return true
    }
  }
  return false
}

// iOS Safari only autoplays when the element is muted *and* inline at the
// moment playback is requested. React sets `muted` as a property but never
// as an attribute, so set both explicitly before assigning a src.
function primeForAutoplay(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

// Video is skipped only for reduced-motion users and Save-Data connections;
// everyone else — phones included — gets the clips.
function getVideoDisabled() {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return window.matchMedia(REDUCED_MOTION_QUERY).matches || Boolean(conn?.saveData)
}

export default function HeroVideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const getVideo = (layer: 0 | 1) => (layer === 0 ? videoARef : videoBRef).current
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0)
  const videoEnabled = !useSyncExternalStore(subscribeReducedMotion, getVideoDisabled, () => false)
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const sourcesRef = useRef<string[]>(DESKTOP_VIDEOS)
  const activeLayerRef = useRef<0 | 1>(0)
  const currentIndexRef = useRef(0)
  const swappingRef = useRef(false)
  const readyRef = useRef<[boolean, boolean]>([false, false])
  const pendingAdvanceRef = useRef(false)
  const userPausedRef = useRef(false)
  const inViewRef = useRef(true)
  // Which clip each layer should load next, and whether that load has
  // been kicked off yet. Preloading is deferred until shortly before it's
  // needed (see PRELOAD_LEAD_SECONDS) rather than for the whole time the
  // other layer plays — most devices only have 1-2 hardware video decode
  // sessions, so a standby video quietly decoding in the background for
  // the full clip duration steals cycles from the one actually on screen.
  const pendingClipIndexRef = useRef<[number, number]>([0, 1])
  const preloadedRef = useRef<[boolean, boolean]>([true, false])

  useEffect(() => {
    activeLayerRef.current = activeLayer
  }, [activeLayer])

  useEffect(() => {
    if (!videoEnabled) return

    sourcesRef.current = window.matchMedia(PORTRAIT_QUERY).matches ? MOBILE_VIDEOS : DESKTOP_VIDEOS

    const active = videoARef.current
    const standby = videoBRef.current
    if (!active || !standby) return

    primeForAutoplay(active)
    primeForAutoplay(standby)
    active.src = sourcesRef.current[0]
    active.load()
    active.play().catch(() => {})

    const activeVideo = () => (activeLayerRef.current === 0 ? videoARef : videoBRef).current
    const shouldPlay = () => inViewRef.current && !document.hidden && !userPausedRef.current

    const syncPlayback = () => {
      const video = activeVideo()
      if (!video) return
      if (shouldPlay()) video.play().catch(() => {})
      else video.pause()
    }

    // Low Power Mode on iOS (and some Android data-saver modes) rejects
    // autoplay until the first user gesture. Any tap or scroll retries.
    const retryPlay = () => {
      if (shouldPlay()) activeVideo()?.play().catch(() => {})
    }
    const gestureEvents = ['touchstart', 'pointerdown', 'scroll'] as const
    gestureEvents.forEach((evt) => window.addEventListener(evt, retryPlay, { once: true, passive: true }))

    // Stop decoding when the hero is off screen or the tab is hidden —
    // this is the single biggest battery saver on phones.
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        syncPlayback()
      },
      { threshold: 0.05 },
    )
    if (containerRef.current) observer.observe(containerRef.current)
    document.addEventListener('visibilitychange', syncPlayback)

    return () => {
      gestureEvents.forEach((evt) => window.removeEventListener(evt, retryPlay))
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
    }
  }, [videoEnabled])

  const advance = () => {
    const sources = sourcesRef.current
    if (sources.length < 2 || swappingRef.current) return
    if (userPausedRef.current || !inViewRef.current) return

    const activeIdx = activeLayerRef.current
    const standbyIdx = activeIdx === 0 ? 1 : 0
    const standbyVideo = getVideo(standbyIdx)
    if (!standbyVideo) return

    // Don't crossfade into a clip that hasn't buffered enough yet — that's
    // what causes a stutter/loading look right after the swap. Keep the
    // current clip playing (it naturally holds its last frame at the end)
    // and retry shortly; timeupdate/ended will keep calling advance().
    const standbyReady = readyRef.current[standbyIdx] || hasEnoughBufferAhead(standbyVideo)
    if (!standbyReady) {
      pendingAdvanceRef.current = true
      return
    }
    pendingAdvanceRef.current = false
    swappingRef.current = true

    if (standbyVideo.currentTime > 0.05) standbyVideo.currentTime = 0
    standbyVideo.play().catch(() => {})
    setActiveLayer(standbyIdx)

    const nextClipIndex = (currentIndexRef.current + 2) % sources.length
    currentIndexRef.current = (currentIndexRef.current + 1) % sources.length
    pendingClipIndexRef.current[activeIdx] = nextClipIndex
    preloadedRef.current[activeIdx] = false

    window.setTimeout(() => {
      swappingRef.current = false
      // Let the just-swapped-out video go fully idle (no src, no decode)
      // instead of immediately loading the next clip — it'll be preloaded
      // later via the timeupdate lead-time check, right before it's needed.
      const nowHidden = getVideo(activeIdx)
      if (nowHidden) {
        nowHidden.pause()
        nowHidden.removeAttribute('src')
        nowHidden.load()
        readyRef.current[activeIdx] = false
      }
    }, CROSSFADE_MS)
  }

  const preloadStandby = (layerIndex: 0 | 1) => {
    if (preloadedRef.current[layerIndex]) return
    const video = getVideo(layerIndex)
    if (!video) return
    preloadedRef.current[layerIndex] = true
    video.src = sourcesRef.current[pendingClipIndexRef.current[layerIndex]]
    video.load()
  }

  const handleTimeUpdate = (layerIndex: 0 | 1) => () => {
    if (activeLayerRef.current !== layerIndex) return
    const video = getVideo(layerIndex)
    if (!video || !video.duration || Number.isNaN(video.duration)) return
    const remaining = video.duration - video.currentTime
    if (remaining <= PRELOAD_LEAD_SECONDS) {
      preloadStandby(layerIndex === 0 ? 1 : 0)
    }
    if (remaining <= SWAP_LEAD_SECONDS) {
      advance()
    }
  }

  const handleEnded = (layerIndex: 0 | 1) => () => {
    if (activeLayerRef.current !== layerIndex) return
    advance()
  }

  const handleCanPlayThrough = (layerIndex: 0 | 1) => () => {
    readyRef.current[layerIndex] = true
    if (pendingAdvanceRef.current && activeLayerRef.current !== layerIndex) {
      advance()
    }
  }

  const handlePlaying = () => setStarted(true)

  const togglePause = () => {
    const activeVideo = getVideo(activeLayerRef.current)
    if (!activeVideo) return
    if (paused) {
      userPausedRef.current = false
      activeVideo.play().catch(() => {})
      setPaused(false)
    } else {
      userPausedRef.current = true
      activeVideo.pause()
      setPaused(true)
    }
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-arcade-bg">
      {/* Poster sits underneath the video layers: it's what paints first
          (fast LCP), what reduced-motion users see, and what shows if a
          browser refuses autoplay. It's the clip's own first frame, so the
          handoff to video is seamless. */}
      <picture>
        <source media={PORTRAIT_QUERY} srcSet={POSTER_MOBILE} />
        <img
          src={POSTER_DESKTOP}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>

      {videoEnabled &&
        [0, 1].map((layerIndex) => (
          <video
            key={layerIndex}
            ref={layerIndex === 0 ? videoARef : videoBRef}
            className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out"
            style={{
              transitionDuration: `${CROSSFADE_MS}ms`,
              opacity: started && activeLayer === layerIndex ? 1 : 0,
              willChange: 'opacity',
              transform: 'translateZ(0)',
            }}
            aria-hidden="true"
            tabIndex={-1}
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            onPlaying={handlePlaying}
            onTimeUpdate={handleTimeUpdate(layerIndex as 0 | 1)}
            onEnded={handleEnded(layerIndex as 0 | 1)}
            onCanPlayThrough={handleCanPlayThrough(layerIndex as 0 | 1)}
          />
        ))}

      {videoEnabled && started && (
        <button
          type="button"
          onClick={togglePause}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
          aria-pressed={paused}
          className="absolute bottom-5 right-4 sm:bottom-6 sm:right-6 z-10 flex items-center justify-center rounded-full w-11 h-11 text-neon-cyan border border-neon-cyan/40 bg-arcade-bg/70 backdrop-blur-sm transition-colors hover:border-neon-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan"
        >
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <rect x="2.5" y="1.5" width="3" height="11" rx="0.5" fill="currentColor" />
              <rect x="8.5" y="1.5" width="3" height="11" rx="0.5" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
