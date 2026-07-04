'use client'

import { useEffect, useRef, useState } from 'react'
import { withBasePath } from '@/lib/paths'

const HERO_VIDEOS = [
  { src: withBasePath('/videos/hero-1.mp4') },
  { src: withBasePath('/videos/hero-2.mp4') },
  { src: withBasePath('/videos/hero-3.mp4') },
]

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

export default function HeroVideoBackground() {
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)]
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0)
  const activeLayerRef = useRef<0 | 1>(0)
  const currentIndexRef = useRef(0)
  const swappingRef = useRef(false)
  const erroredRef = useRef<Set<number>>(new Set())
  const readyRef = useRef<[boolean, boolean]>([false, false])
  const pendingAdvanceRef = useRef(false)
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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const active = videoRefs[0].current
    const standby = videoRefs[1].current
    if (!active || !standby) return

    active.src = HERO_VIDEOS[0].src
    active.load()
    active.play().catch(() => {})
    standby.pause()

    const retryPlay = () => {
      videoRefs.forEach((ref) => ref.current?.play().catch(() => {}))
    }
    window.addEventListener('pointerdown', retryPlay, { once: true })
    window.addEventListener('touchstart', retryPlay, { once: true })

    return () => {
      window.removeEventListener('pointerdown', retryPlay)
      window.removeEventListener('touchstart', retryPlay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const advance = () => {
    if (HERO_VIDEOS.length < 2 || swappingRef.current) return

    const activeIdx = activeLayerRef.current
    const standbyIdx = activeIdx === 0 ? 1 : 0
    const standbyVideo = videoRefs[standbyIdx].current
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

    const nextClipIndex = (currentIndexRef.current + 2) % HERO_VIDEOS.length
    currentIndexRef.current = (currentIndexRef.current + 1) % HERO_VIDEOS.length
    pendingClipIndexRef.current[activeIdx] = nextClipIndex
    preloadedRef.current[activeIdx] = false

    window.setTimeout(() => {
      swappingRef.current = false
      // Let the just-swapped-out video go fully idle (no src, no decode)
      // instead of immediately loading the next clip — it'll be preloaded
      // later via the timeupdate lead-time check, right before it's needed.
      const nowHidden = videoRefs[activeIdx].current
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
    const video = videoRefs[layerIndex].current
    if (!video) return
    preloadedRef.current[layerIndex] = true
    video.src = HERO_VIDEOS[pendingClipIndexRef.current[layerIndex]].src
    video.load()
  }

  const handleTimeUpdate = (layerIndex: 0 | 1) => () => {
    if (activeLayerRef.current !== layerIndex) return
    const video = videoRefs[layerIndex].current
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

  const handleError = (layerIndex: 0 | 1) => () => {
    erroredRef.current.add(layerIndex)
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[0, 1].map((layerIndex) => (
        <video
          key={layerIndex}
          ref={videoRefs[layerIndex]}
          className="absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out"
          style={{
            transitionDuration: `${CROSSFADE_MS}ms`,
            opacity: activeLayer === layerIndex ? 1 : 0,
            willChange: 'opacity',
            transform: 'translateZ(0)',
          }}
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1511882150382-421056c89033?w=1800&q=80"
          onTimeUpdate={handleTimeUpdate(layerIndex as 0 | 1)}
          onEnded={handleEnded(layerIndex as 0 | 1)}
          onCanPlayThrough={handleCanPlayThrough(layerIndex as 0 | 1)}
          onError={handleError(layerIndex as 0 | 1)}
        />
      ))}
    </div>
  )
}
