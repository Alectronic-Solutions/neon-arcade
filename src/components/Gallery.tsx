"use client"

import { useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'

interface GalleryItem {
  id: string
  caption: string
  ratio: string
  hue: string
  unsplashId: string
}

const galleryItems: GalleryItem[] = [
  { id: 'g1', caption: 'BIRTHDAY PARTY — APRIL 2026',     ratio: '4/3',  hue: 'rgba(0,240,255,0.20)',  unsplashId: '1757444838044-d9dcb1bb3017' },
  { id: 'g2', caption: 'CORPORATE BUYOUT — MARCH 2026',   ratio: '3/4',  hue: 'rgba(255,0,127,0.18)',  unsplashId: '1759171053096-e7dbe7c36eb6' },
  { id: 'g3', caption: 'SWEET 16 — FEBRUARY 2026',        ratio: '1/1',  hue: 'rgba(0,240,255,0.18)',  unsplashId: '1636070759654-5c93bbca2862' },
  { id: 'g4', caption: 'TECH COMPANY OFFSITE — JAN 2026', ratio: '16/9', hue: 'rgba(255,230,0,0.18)',  unsplashId: '1590336225155-d7e19a3a954f' },
  { id: 'g5', caption: 'HIGH ROLLER PACKAGE — DEC 2025',  ratio: '3/4',  hue: 'rgba(255,0,127,0.20)',  unsplashId: '1572289758057-3e0f4327833b' },
  { id: 'g6', caption: 'GRADUATION PARTY — JUNE 2025',    ratio: '4/3',  hue: 'rgba(0,240,255,0.20)',  unsplashId: '1644077698042-53a59a24ce1e' },
  { id: 'g7', caption: 'KIDS BIRTHDAY — MAY 2025',        ratio: '1/1',  hue: 'rgba(255,230,0,0.18)',  unsplashId: '1601414380752-b0d4cb86a47e' },
  { id: 'g8', caption: 'ROYALTY BUYOUT — MARCH 2025',     ratio: '4/3',  hue: 'rgba(255,0,127,0.18)',  unsplashId: '1529676850472-e4fd58b313af' },
  { id: 'g9', caption: 'ANNIVERSARY — JANUARY 2025',      ratio: '3/4',  hue: 'rgba(0,240,255,0.18)',  unsplashId: '1525018483552-9cb0b8a8dbc0' },
]

function unsplashUrl(id: string, width: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${width}`
}

function unsplashSrcSet(id: string) {
  return [480, 800, 1200].map((w) => `${unsplashUrl(id, w)} ${w}w`).join(', ')
}

function splitCaption(caption: string) {
  const [title, date] = caption.split(' — ')
  return { title, date }
}

export default function Gallery() {
  const railRef = useRef<HTMLUListElement>(null)
  const [current, setCurrent] = useState(0)

  // Phones get a native scroll-snap filmstrip; track the centered slide so
  // the counter and progress bar follow the swipe.
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const slides = Array.from(rail.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(slides.indexOf(entry.target as HTMLElement))
        })
      },
      { root: rail, threshold: 0.6 },
    )
    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  function go(index: number) {
    const rail = railRef.current
    const slide = rail?.children[Math.max(0, Math.min(galleryItems.length - 1, index))] as HTMLElement | undefined
    if (!rail || !slide) return
    rail.scrollTo({ left: slide.offsetLeft - (rail.clientWidth - slide.clientWidth) / 2, behavior: 'smooth' })
  }

  const progress = ((current + 1) / galleryItems.length) * 100

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-arcade-bg">
      <div className="max-w-6xl mx-auto">
        <div className="px-5 sm:px-6">
          <SectionHeading
            eyebrow="Event Archive"
            title="Event Log"
            subtitle="Every private event includes a dedicated host from guest check-in to last play."
          />
        </div>

        {/* Masonry — tablet & desktop */}
        <ul className="hidden md:block columns-2 lg:columns-3 gap-4 px-6">
          {galleryItems.map((g) => (
            <li
              key={g.id}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-sm border border-neon-cyan/15 bg-arcade-surface transition-[border-color,box-shadow] duration-300 hover:border-neon-cyan/60 hover:shadow-[0_0_24px_rgba(0,240,255,0.15)]"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: g.ratio }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={unsplashUrl(g.unsplashId, 800)}
                  srcSet={unsplashSrcSet(g.unsplashId)}
                  sizes="(min-width: 1024px) 370px, 50vw"
                  alt={g.caption}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'contrast(1.12) saturate(1.1)' }}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: g.hue, mixBlendMode: 'screen' }} />
                <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none bg-linear-to-t from-arcade-bg/90 to-transparent" />
                <p className="absolute left-3 right-3 bottom-3 font-mono text-[0.7rem] tracking-[0.12em] text-arcade-white">
                  {g.caption}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Filmstrip — phones */}
        <div className="md:hidden">
          <p className="sr-only" aria-live="polite">
            Photo {current + 1} of {galleryItems.length}: {galleryItems[current].caption}
          </p>
          <ul
            ref={railRef}
            className="no-scrollbar flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 scroll-px-5 pb-1"
            aria-label="Event photos"
          >
            {galleryItems.map((g, i) => {
              const { title, date } = splitCaption(g.caption)
              return (
                <li
                  key={g.id}
                  className="relative shrink-0 w-[84%] snap-center overflow-hidden rounded-lg border bg-arcade-surface transition-[border-color,box-shadow] duration-300"
                  style={{
                    aspectRatio: '4/5',
                    borderColor: i === current ? 'rgba(0,240,255,0.55)' : 'rgba(0,240,255,0.15)',
                    boxShadow: i === current ? '0 0 26px rgba(0,240,255,0.16)' : 'none',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={unsplashUrl(g.unsplashId, 800)}
                    srcSet={unsplashSrcSet(g.unsplashId)}
                    sizes="84vw"
                    alt={g.caption}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'contrast(1.12) saturate(1.1)' }}
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: g.hue, mixBlendMode: 'screen' }} />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none bg-linear-to-t from-arcade-bg via-arcade-bg/70 to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4">
                    <p className="font-mono text-[0.6rem] tracking-[0.25em] text-neon-cyan phosphor-cyan">{date}</p>
                    <p className="font-extrabold uppercase tracking-wider text-arcade-white text-lg leading-tight mt-1">
                      {title}
                    </p>
                  </div>
                  <span className="absolute top-3 right-3 font-mono text-[0.6rem] tracking-widest text-arcade-white/80 bg-arcade-bg/60 backdrop-blur-sm rounded-full px-2 py-1">
                    {String(i + 1).padStart(2, '0')}/{String(galleryItems.length).padStart(2, '0')}
                  </span>
                </li>
              )
            })}
          </ul>

          {/* Progress + controls */}
          <div className="flex items-center gap-4 px-5 mt-5">
            <button
              type="button"
              onClick={() => go(current - 1)}
              disabled={current === 0}
              aria-label="Previous photo"
              className="shrink-0 w-11 h-11 rounded-full border border-neon-cyan/35 text-neon-cyan flex items-center justify-center transition-colors active:bg-neon-cyan/15 disabled:opacity-30"
            >
              ‹
            </button>
            <div className="flex-1 h-0.5 bg-neon-cyan/15 rounded-full overflow-hidden" aria-hidden="true">
              <div
                className="h-full bg-neon-cyan transition-[width] duration-300"
                style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(0,240,255,0.7)' }}
              />
            </div>
            <button
              type="button"
              onClick={() => go(current + 1)}
              disabled={current === galleryItems.length - 1}
              aria-label="Next photo"
              className="shrink-0 w-11 h-11 rounded-full border border-neon-cyan/35 text-neon-cyan flex items-center justify-center transition-colors active:bg-neon-cyan/15 disabled:opacity-30"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
