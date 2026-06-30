import { operatingHours } from '@/data/arcade'

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
        <img
          src="https://images.unsplash.com/photo-1636070759654-5c93bbca2862?w=1600&q=80"
          alt="Neon Arcade venue interior"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
        />
        {/* Dark fade — top and bottom blend into surface color */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #15132B 0%, rgba(21,19,43,0.3) 30%, rgba(21,19,43,0.3) 70%, #15132B 100%)' }} />
        {/* Centered tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <p
            className="font-mono font-bold tracking-[0.35em] uppercase text-arcade-white"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', textShadow: '0 0 30px rgba(0,240,255,0.6)' }}
          >
            OPEN 7 DAYS A WEEK
          </p>
          <p className="font-mono text-neon-cyan text-sm tracking-widest">
            PRIVATE EVENTS · WALK-IN FREE PLAY · GROUP BOOKINGS
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16">
        {/* Upper columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1 — Brand */}
          <div>
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
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="font-mono text-arcade-muted text-xs tracking-widest hover:text-neon-cyan transition-colors"
                >
                  {s.glyph}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <h4 className="font-mono text-neon-cyan text-xs tracking-[0.3em] uppercase mb-5">
              NAVIGATE
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-arcade-muted text-sm hover:text-arcade-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Hours */}
          <div>
            <h4 className="font-mono text-neon-cyan text-xs tracking-[0.3em] uppercase mb-5">
              HOURS
            </h4>
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
            <h4 className="font-mono text-neon-cyan text-xs tracking-[0.3em] uppercase mb-5">
              FIND US
            </h4>
            <address className="not-italic">
              <p className="text-arcade-white text-sm mb-1">412 Retro Row</p>
              <p className="text-arcade-white text-sm mb-4">Sacramento, CA 95814</p>
            </address>
            <p className="text-arcade-muted text-sm mb-2">
              ◈ Garage parking on 4th St
            </p>
            <p className="text-arcade-muted text-xs leading-relaxed mt-4">
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
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-arcade-muted text-xs tracking-widest hover:text-neon-cyan transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Lower bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-mono text-arcade-muted text-xs tracking-widest text-center sm:text-left">
            © 2025 NEON ARCADE. ALL RIGHTS RESERVED.
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
            DESIGNED BY ALECTRONIC SOLUTION
          </a>
          <a
            href="#"
            className="font-mono text-arcade-muted text-xs tracking-widest hover:text-neon-cyan transition-colors"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
