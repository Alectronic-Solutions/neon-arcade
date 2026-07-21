'use client'

import { useEffect, useRef } from 'react'
import HeroVideoBackground from './HeroVideoBackground'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = videoLayerRef.current
    if (!el) return

    let ticking = false
    const applyTransform = () => {
      ticking = false
      if (window.innerWidth < 768) return
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
        .hero-book-btn:hover {
          box-shadow: 0 0 48px rgba(255, 0, 127, 0.8);
          transform: scale(1.03);
        }
        .hero-pkg-btn {
          transition: background-color 0.2s ease;
        }
        .hero-pkg-btn:hover {
          background-color: rgba(0, 240, 255, 0.08);
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
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-arcade-bg pt-16"
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
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(11,10,22,0.55) 0%, rgba(11,10,22,0.88) 70%), linear-gradient(rgba(11,10,22,0.45), rgba(11,10,22,0.45))',
          }}
        />


        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="font-mono text-neon-cyan text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.35em] uppercase mb-8 px-2 text-center text-balance">
            Private Arcade Parties · Sacramento, CA
          </p>

          <h1
            className="font-extrabold tracking-widest uppercase text-arcade-white leading-none"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              textShadow:
                '0 0 40px rgba(0,240,255,0.35), 0 0 100px rgba(0,240,255,0.15)',
            }}
          >
            NEON
            <br />
            ARCADE
          </h1>

          <p className="font-sans text-arcade-muted text-base sm:text-xl mt-6 max-w-xl mx-auto leading-relaxed">
            Classic cabinets. Private access. Dedicated hosts.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center items-center w-full sm:w-auto">
            <a
              href="#book"
              className="hero-book-btn font-mono font-bold tracking-widest uppercase text-base py-4 px-10 rounded bg-neon-magenta text-arcade-bg w-full sm:w-auto text-center"
            >
              [ SECURE YOUR DATE ]
            </a>
            <a
              href="#packages"
              className="hero-pkg-btn font-mono font-bold tracking-widest uppercase text-base py-4 px-10 rounded border border-neon-cyan text-neon-cyan w-full sm:w-auto text-center"
            >
              VIEW PACKAGES ↓
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-16 px-4">
            {[
              { label: 'Arcade Cabinets', value: '24' },
              { label: 'Max Capacity', value: '150' },
              { label: 'Party Packages', value: '03' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-mono font-bold text-neon-yellow"
                  style={{ fontSize: '2.5rem' }}
                >
                  {stat.value}
                </p>
                <p className="font-mono text-arcade-muted text-xs tracking-widest uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
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
