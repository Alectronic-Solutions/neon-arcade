import Link from 'next/link'
import { operatingHours } from '@/data/arcade'

const FOOTER_IMG = 'https://images.unsplash.com/photo-1636070759654-5c93bbca2862?auto=format&fit=crop&q=75'

const NAV_LINKS = [
  { label: 'Packages', href: '/#packages' },
  { label: 'Game Catalog', href: '/#games' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Book a Party', href: '/#book' },
  { label: 'Contact', href: '/contact' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
]

const SOCIAL = [
  { label: 'Instagram', glyph: '◈ IG' },
  { label: 'TikTok', glyph: '◈ TK' },
  { label: 'Facebook', glyph: '◈ FB' },
]

export default function Footer() {
  return (
    <footer
      className="bg-arcade-surface border-t pb-8"
      style={{ borderColor: 'rgba(0,240,255,0.15)' }}
    >
      {/* Venue photo strip */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(160px, 35vw, 280px)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${FOOTER_IMG}&w=1600`}
          srcSet={[640, 1000, 1600, 2200].map((w) => `${FOOTER_IMG}&w=${w} ${w}w`).join(', ')}
          sizes="100vw"
          alt="Interior of the Neon Arcade venue showing rows of arcade cabinets"
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
        />
        {/* Dark fade — top and bottom blend into surface color */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #15132B 0%, rgba(21,19,43,0.55) 30%, rgba(21,19,43,0.55) 70%, #15132B 100%)' }} />
        {/* Centered tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <p
            className="font-mono font-bold tracking-[0.2em] sm:tracking-[0.35em] uppercase text-arcade-white"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', textShadow: '0 0 30px rgba(0,240,255,0.6)' }}
          >
            OPEN 7 DAYS A WEEK
          </p>
          <p className="font-mono text-neon-cyan text-[0.7rem] sm:text-sm tracking-widest leading-relaxed flex flex-col sm:flex-row items-center sm:gap-3" style={{ textShadow: '0 0 12px rgba(11,10,22,0.9)' }}>
            {['PRIVATE EVENTS', 'WALK-IN FREE PLAY', 'GROUP BOOKINGS'].map((item, i) => (
              <span key={item} className="whitespace-nowrap">
                {i > 0 && <span aria-hidden="true" className="hidden sm:inline mr-3">·</span>}
                {item}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16">
        {/* Upper columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-12 mb-10 sm:mb-12">
          {/* Col 1 — Brand */}
          <div className="col-span-2 lg:col-span-1">
            <p
              className="font-mono font-bold text-neon-cyan text-xl tracking-widest mb-3"
              style={{ textShadow: '0 0 12px rgba(0,240,255,0.4)' }}
            >
              ◈ NEON ARCADE
            </p>
            <p className="text-arcade-muted text-sm leading-relaxed mb-6">
              {"Sacramento's premier private arcade venue. Classic cabinets, boutique hospitality, zero pretense."}
            </p>
            <div className="flex gap-4">
              {SOCIAL.map((s) => (
                <span
                  key={s.label}
                  title={s.label}
                  className="font-mono text-arcade-muted text-xs tracking-widest"
                >
                  {s.glyph}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <h3 className="font-mono text-neon-cyan text-xs tracking-[0.3em] uppercase mb-5">
              NAVIGATE
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-arcade-muted text-sm hover:text-arcade-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Hours (last on phones, full width) */}
          <div className="col-span-2 sm:col-span-1 order-1 sm:order-none rounded-lg sm:rounded-none border sm:border-0 border-neon-cyan/12 bg-arcade-bg/40 sm:bg-transparent p-4 sm:p-0">
            <h3 className="font-mono text-neon-cyan text-xs tracking-[0.3em] uppercase mb-5">
              HOURS
            </h3>
            <ul className="space-y-2">
              {operatingHours.map((schedule) => (
                <li key={schedule.day} className="flex justify-between gap-4">
                  <span className="font-mono text-arcade-muted text-xs">
                    {schedule.day.slice(0, 3).toUpperCase()}
                  </span>
                  <span className="font-mono text-arcade-white text-xs">
                    {schedule.regularOpen} – {schedule.regularClose}
                  </span>
                </li>
              ))}
            </ul>
            <p className="font-mono text-neon-cyan text-xs tracking-wider mt-4">
              PRIVATE BOOKINGS: By appointment
            </p>
          </div>

          {/* Col 4 — Find Us */}
          <div>
            <h3 className="font-mono text-neon-cyan text-xs tracking-[0.3em] uppercase mb-5">
              FIND US
            </h3>
            <address className="not-italic">
              <p className="text-arcade-white text-sm mb-1">412 Retro Row</p>
              <p className="text-arcade-white text-sm mb-4">Sacramento, CA 95814</p>
            </address>
            <p className="text-arcade-muted text-sm mb-2">
              ◈ Garage parking on <span className="whitespace-nowrap">4th St</span>
            </p>
            <p className="text-arcade-muted/80 text-[0.7rem] sm:text-xs leading-relaxed mt-4">
              A deposit is required to confirm all private events. Deposits are non-refundable within 14 days of event date.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t mb-6"
          style={{ borderColor: 'rgba(0,240,255,0.08)' }}
        />

        {/* Legal links row */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 mb-6">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-1 font-mono text-arcade-muted text-xs tracking-widest hover:text-neon-cyan transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Lower bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2.5 sm:gap-3 text-center">
          <p className="font-mono text-arcade-muted text-xs tracking-widest text-center sm:text-left">
            © {new Date().getFullYear()} NEON ARCADE. ALL RIGHTS RESERVED.
          </p>
          <p
            className="font-mono font-bold text-neon-yellow text-xs tracking-widest"
            style={{ textShadow: '0 0 10px rgba(255,230,0,0.3)' }}
          >
            PRIVATE EVENTS AVAILABLE 7 DAYS A WEEK.
          </p>
          <a
            href="https://alectronicsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-arcade-muted text-xs tracking-widest hover:text-neon-cyan transition-colors"
          >
            DESIGNED BY ALECTRONIC SOLUTIONS
          </a>
          <a
            href="#main-content"
            className="font-mono text-arcade-muted text-xs tracking-widest hover:text-neon-cyan transition-colors"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
