"use client"

import { useState, useRef } from 'react'

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

export default function Gallery() {
  const [current, setCurrent] = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  function go(index: number) {
    setCurrent(Math.max(0, Math.min(galleryItems.length - 1, index)))
  }

  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX
    setDragging(true)
    setDragDelta(0)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || dragStartX.current === null) return
    setDragDelta(e.clientX - dragStartX.current)
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!dragging || dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    if (delta < -50) go(current + 1)
    else if (delta > 50) go(current - 1)
    dragStartX.current = null
    setDragging(false)
    setDragDelta(0)
  }

  const item = galleryItems[current]

  return (
    <>
      <style>{`
        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(11,10,22,0.7);
          border: 1px solid rgba(0,240,255,0.35);
          color: #00F0FF;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-size: 1.1rem;
          user-select: none;
        }
        .gallery-arrow:hover {
          border-color: rgba(0,240,255,0.8);
          box-shadow: 0 0 14px rgba(0,240,255,0.35);
        }
        .gallery-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(0,240,255,0.25);
          border: 1px solid rgba(0,240,255,0.4);
          transition: background 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .gallery-dot.active {
          background: #00F0FF;
          transform: scale(1.4);
          box-shadow: 0 0 8px rgba(0,240,255,0.6);
        }
      `}</style>

      <section id="gallery" className="py-24 px-6 bg-arcade-bg">
        <div className="max-w-xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-12">
            <span className="font-mono text-neon-cyan text-sm tracking-[0.3em] uppercase">
              — Event Archive —
            </span>
            <h2
              className="font-extrabold tracking-widest uppercase text-arcade-white mt-3 mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              EVENT LOG
            </h2>
            <div className="w-16 h-px bg-neon-cyan mx-auto mb-4" />
            <p className="text-arcade-muted text-base max-w-md mx-auto">
              Every private event includes a dedicated host from guest check-in to last play.
            </p>
          </div>

          {/* Slider */}
          <div style={{ position: 'relative', userSelect: 'none' }}>
            {/* Viewport */}
            <div
              style={{ overflow: 'hidden', borderRadius: '4px', touchAction: 'none', cursor: dragging ? 'grabbing' : 'grab' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {/* Track */}
              <div
                ref={trackRef}
                style={{
                  display: 'flex',
                  transform: `translateX(calc(-${current * 100}% + ${dragDelta}px))`,
                  transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
              >
                {galleryItems.map((item) => (
                  <div key={item.id} style={{ minWidth: '100%', position: 'relative', backgroundColor: '#15132B', border: '1px solid rgba(0,240,255,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={`https://images.unsplash.com/photo-${item.unsplashId}?w=1200&q=80`}
                        alt={item.caption}
                        draggable={false}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: item.hue, pointerEvents: 'none' }} />
                    </div>
                    {/* Always-visible caption bar */}
                    <div style={{ padding: '0.75rem 1rem', background: 'rgba(11,10,22,0.85)' }}>
                      <span style={{ fontFamily: 'monospace', color: '#F8F8FF', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                        {item.caption}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev arrow */}
            {current > 0 && (
              <button
                className="gallery-arrow"
                style={{ left: '0.5rem' }}
                onClick={() => go(current - 1)}
                aria-label="Previous photo"
              >
                ‹
              </button>
            )}

            {/* Next arrow */}
            {current < galleryItems.length - 1 && (
              <button
                className="gallery-arrow"
                style={{ right: '0.5rem' }}
                onClick={() => go(current + 1)}
                aria-label="Next photo"
              >
                ›
              </button>
            )}
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
            {galleryItems.map((_, i) => (
              <button
                key={i}
                className={`gallery-dot${i === current ? ' active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <p style={{ textAlign: 'center', fontFamily: 'monospace', color: 'rgba(163,159,209,0.5)', fontSize: '0.7rem', letterSpacing: '0.15em', marginTop: '0.75rem' }}>
            {String(current + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
          </p>
        </div>
      </section>
    </>
  )
}
