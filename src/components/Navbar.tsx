'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// Root-relative so they work from /contact and the legal pages too;
// next/link prefixes the GitHub Pages basePath automatically.
const NAV_LINKS = [
  { label: 'Packages', href: '/#packages' },
  { label: 'Games', href: '/#games' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Book', href: '/#book' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  return (
    <>
      <style>{`
        .nav-book-btn {
          box-shadow: 0 0 14px rgba(255, 0, 127, 0.4);
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }
        @media (hover: hover) {
          .nav-book-btn:hover {
            box-shadow: 0 0 28px rgba(255, 0, 127, 0.75);
            transform: scale(1.02);
          }
        }
        .hamburger-bar {
          display: block;
          height: 1px;
          background: #00F0FF;
          transition: transform 0.2s ease, opacity 0.2s ease, width 0.2s ease;
        }
        @keyframes menu-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        .mobile-menu {
          animation: menu-in 0.2s ease both;
        }
        .menu-item {
          animation: menu-in 0.3s ease both;
        }
      `}</style>
      <header
        className="fixed top-0 w-full z-50 border-b border-neon-cyan/20"
        style={{ backgroundColor: 'rgba(11, 10, 22, 0.95)', backdropFilter: 'blur(12px)' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Neon Arcade home">
            <span
              className="font-mono font-bold tracking-widest text-neon-cyan text-base sm:text-lg"
              style={{ textShadow: '0 0 16px rgba(0,240,255,0.5)' }}
            >
              ◈ NEON ARCADE
            </span>
          </Link>

          {/* Center nav links — desktop only */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-sm tracking-widest uppercase text-arcade-muted transition-colors duration-150 hover:text-neon-cyan"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#book"
              className="nav-book-btn font-mono font-bold tracking-widest uppercase rounded bg-neon-magenta text-arcade-bg py-2 px-3 text-xs sm:px-5 sm:text-sm"
            >
              <span className="sm:hidden">[ BOOK ]</span>
              <span className="hidden sm:inline">[ SECURE YOUR DATE ]</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center gap-1.5 w-11 h-11 items-end pr-2.5 -mr-2"
            >
              <span
                className="hamburger-bar w-6"
                style={menuOpen ? { transform: 'translateY(6px) rotate(45deg)' } : {}}
              />
              <span
                className="hamburger-bar w-6"
                style={menuOpen ? { opacity: 0 } : {}}
              />
              <span
                className="hamburger-bar"
                style={menuOpen ? { width: '1.5rem', transform: 'translateY(-6px) rotate(-45deg)' } : { width: '1rem' }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile menu — full-height panel below the bar. (The header's
            backdrop-filter makes it the containing block, so this is sized
            with svh rather than position: fixed.) */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="mobile-menu md:hidden border-t border-neon-cyan/15 h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain flex flex-col"
            style={{
              background:
                'radial-gradient(ellipse 120% 60% at 50% 110%, rgba(255,0,127,0.16), transparent 60%), radial-gradient(ellipse 100% 50% at 0% 0%, rgba(0,240,255,0.08), transparent 60%), #0B0A16',
            }}
          >
            <ul className="px-5 pt-6 flex flex-col">
              {NAV_LINKS.filter((link) => link.label !== 'Book').map((link, i) => (
                <li key={link.href} className="menu-item" style={{ animationDelay: `${i * 45}ms` }}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-baseline gap-4 py-4 border-b border-neon-cyan/10 active:text-neon-cyan"
                  >
                    <span className="font-mono text-xs text-neon-cyan/60 tabular-nums">0{i + 1}</span>
                    <span className="font-extrabold uppercase tracking-[0.12em] text-2xl text-arcade-white group-active:text-neon-cyan transition-colors">
                      {link.label}
                    </span>
                    <span aria-hidden="true" className="ml-auto text-neon-cyan/50 text-lg">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto px-5 pb-8 pt-8" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
              <Link
                href="/#book"
                onClick={closeMenu}
                className="nav-book-btn block text-center font-mono font-bold tracking-widest uppercase text-sm py-4 px-6 rounded-lg bg-neon-magenta text-arcade-bg"
              >
                [ SECURE YOUR DATE ]
              </Link>
              <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-[0.68rem] tracking-wider text-arcade-muted leading-relaxed">
                <div>
                  <p className="text-neon-cyan tracking-[0.25em] mb-1">VISIT</p>
                  <p>412 Retro Row</p>
                  <p>Sacramento, CA</p>
                </div>
                <div>
                  <p className="text-neon-cyan tracking-[0.25em] mb-1">CONTACT</p>
                  <a href="mailto:hello@neonarcade.com" className="block text-arcade-white/90">hello@neonarcade.com</a>
                  <Link href="/contact" onClick={closeMenu} className="block underline underline-offset-2">Contact page</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
