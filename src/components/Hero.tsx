'use client'

import { useEffect, useRef } from 'react'
import HeroVideoBackground from './HeroVideoBackground'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = videoLayerRef.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ticking = false
    const applyTransform = () => {
      ticking = false
      if (window.innerWidth < 768 || reducedMotion) return
      el.style.transform = `translateY(${window.scrollY * 0.18}px)`
    }
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(applyTransform)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        .hero-book-btn {
          box-shadow: 0 0 24px rgba(255, 0, 127, 0.55);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .hero-book-btn:active {
          transform: scale(0.98);
        }
        .hero-pkg-btn {
          transition: background-color 0.2s ease;
        }
        .hero-pkg-btn:active {
          background-color: rgba(0, 240, 255, 0.12);
        }
        @media (hover: hover) {
          .hero-book-btn:hover {
            box-shadow: 0 0 48px rgba(255, 0, 127, 0.8);
            transform: scale(1.03);
          }
          .hero-pkg-btn:hover {
            background-color: rgba(0, 240, 255, 0.08);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-indicator { animation: none; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .scroll-indicator {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-svh flex flex-col justify-center items-center overflow-hidden bg-arcade-bg pt-24 pb-20 sm:pt-28 sm:pb-28"
      >
        {/* Video background */}
        <div
          ref={videoLayerRef}
          className="absolute inset-x-0 top-[-5%] h-[110%] z-0"
        >
          <HeroVideoBackground />
        </div>

        {/* Dark vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(11,10,22,0.35) 0%, rgba(11,10,22,0.8) 75%), linear-gradient(to bottom, rgba(11,10,22,0.55) 0%, rgba(11,10,22,0.25) 35%, rgba(11,10,22,0.35) 70%, #0B0A16 100%)',
          }}
        />


        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 text-center w-full">
          <p
            className="font-mono text-neon-cyan text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-center gap-1 sm:gap-0"
            style={{ textShadow: '0 0 12px rgba(0,240,255,0.45)' }}
          >
            <span>Private Arcade Parties</span>
            <span className="hidden sm:inline" aria-hidden="true">&nbsp;·&nbsp;</span>
            <span>Sacramento, CA</span>
          </p>

          <h1
            className="font-extrabold tracking-widest uppercase text-arcade-white leading-none"
            style={{
              fontSize: 'clamp(3.25rem, 15vw, 9rem)',
              textShadow:
                '0 0 40px rgba(0,240,255,0.35), 0 0 100px rgba(0,240,255,0.15)',
            }}
          >
            NEON
            <br />
            ARCADE
          </h1>

          <p className="font-sans text-arcade-white/85 text-base sm:text-xl mt-5 sm:mt-6 max-w-xl mx-auto leading-relaxed text-balance">
            Classic cabinets. Private access. Dedicated hosts.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9 sm:mt-12 justify-center items-center w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
            <a
              href="#book"
              className="hero-book-btn font-mono font-bold tracking-widest uppercase text-sm sm:text-base py-4 px-8 sm:px-10 rounded bg-neon-magenta text-arcade-bg w-full sm:w-auto text-center"
            >
              [ SECURE YOUR DATE ]
            </a>
            <a
              href="#packages"
              className="hero-pkg-btn font-mono font-bold tracking-widest uppercase text-sm sm:text-base py-4 px-8 sm:px-10 rounded border border-neon-cyan text-neon-cyan bg-arcade-bg/40 backdrop-blur-sm w-full sm:w-auto text-center"
            >
              VIEW PACKAGES ↓
            </a>
          </div>

          {/* Stats row */}
          <dl className="grid grid-cols-3 gap-2 sm:flex sm:justify-center sm:gap-12 mt-10 sm:mt-16 max-w-sm sm:max-w-none mx-auto">
            {[
              { label: 'Arcade Cabinets', value: '24' },
              { label: 'Max Capacity', value: '150' },
              { label: 'Party Packages', value: '03' },
            ].map((stat) => (
              <div key={stat.label} className="text-center flex flex-col-reverse">
                <dt className="font-mono text-arcade-muted text-[0.6rem] sm:text-xs tracking-[0.15em] sm:tracking-widest uppercase mt-1 leading-tight">
                  {stat.label}
                </dt>
                <dd
                  className="font-mono font-bold text-neon-yellow text-3xl sm:text-[2.5rem] leading-none"
                  style={{ textShadow: '0 0 18px rgba(255,230,0,0.35)' }}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1" aria-hidden="true">
          <span className="font-mono text-neon-cyan/65 text-xs tracking-widest">SCROLL</span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="text-neon-cyan/65"
          >
            <path
              d="M8 0v18M1 11l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>
    </>
  )
}
