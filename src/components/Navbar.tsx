'use client'

import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Packages', href: '#packages' },
  { label: 'Games', href: '#games' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book', href: '#book' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`
        .nav-book-btn {
          box-shadow: 0 0 14px rgba(255, 0, 127, 0.4);
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }
        .nav-book-btn:hover {
          box-shadow: 0 0 28px rgba(255, 0, 127, 0.75);
          transform: scale(1.02);
        }
        .hamburger-bar {
          display: block;
          height: 1px;
          background: #00F0FF;
          transition: transform 0.2s ease, opacity 0.2s ease, width 0.2s ease;
        }
        .mobile-menu {
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
      `}</style>
      <header
        className="fixed top-0 w-full z-50 border-b border-neon-cyan/20"
        style={{ backgroundColor: 'rgba(11, 10, 22, 0.95)', backdropFilter: 'blur(12px)' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="./" className="flex items-center gap-2 shrink-0">
            <span
              className="font-mono font-bold tracking-widest text-neon-cyan text-base sm:text-lg"
              style={{ textShadow: '0 0 16px rgba(0,240,255,0.5)' }}
            >
              ◈ NEON ARCADE
            </span>
          </a>

          {/* Center nav links — desktop only */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-sm tracking-widest uppercase text-arcade-muted transition-colors duration-150 hover:text-neon-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#book"
              className="nav-book-btn font-mono font-bold tracking-widest uppercase rounded bg-neon-magenta text-arcade-bg py-2 px-3 text-xs sm:px-5 sm:text-sm"
            >
              <span className="sm:hidden">[ BOOK ]</span>
              <span className="hidden sm:inline">[ SECURE YOUR DATE ]</span>
            </a>

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col gap-1.5 p-2 -mr-1"
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

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div
            className="mobile-menu md:hidden border-t border-neon-cyan/15"
            style={{ backgroundColor: 'rgba(11, 10, 22, 0.98)' }}
          >
            <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block font-mono text-sm tracking-widest uppercase text-arcade-muted hover:text-neon-cyan transition-colors py-3 border-b border-neon-cyan/8"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="#book"
                  onClick={closeMenu}
                  className="nav-book-btn block text-center font-mono font-bold tracking-widest uppercase text-sm py-3 px-6 rounded bg-neon-magenta text-arcade-bg"
                >
                  [ SECURE YOUR DATE ]
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
