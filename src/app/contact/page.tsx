import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { operatingHours } from '@/data/arcade'

export const metadata: Metadata = {
  title: 'Contact | Neon Arcade',
  description: 'Get in touch with Neon Arcade for booking questions, group rates, or general inquiries about our private arcade venue in Sacramento, CA.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-arcade-bg pt-32 pb-24 px-6 min-h-screen">
          <div className="max-w-5xl mx-auto">
            <h1
              className="font-extrabold tracking-widest uppercase text-arcade-white leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.25rem)', textShadow: '0 0 16px rgba(0,240,255,0.5)' }}
            >
              Contact Us
            </h1>
            <p className="text-arcade-muted text-sm sm:text-base leading-relaxed max-w-2xl mb-14">
              Questions about booking a private event, group rates, or anything else? Reach out and our team will get back to you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <div>
                <h2 className="font-mono text-neon-cyan text-xs tracking-[0.3em] uppercase mb-5">
                  Email
                </h2>
                <a
                  href="mailto:hello@neonarcade.com"
                  className="text-arcade-white text-lg font-bold hover:text-neon-cyan transition-colors"
                >
                  hello@neonarcade.com
                </a>
                <p className="text-arcade-muted text-sm leading-relaxed mt-3">
                  For booking inquiries, group rates, and general questions.
                </p>
              </div>

              <div>
                <h2 className="font-mono text-neon-cyan text-xs tracking-[0.3em] uppercase mb-5">
                  Find Us
                </h2>
                <address className="not-italic">
                  <p className="text-arcade-white text-sm mb-1">412 Retro Row</p>
                  <p className="text-arcade-white text-sm mb-4">Sacramento, CA 95814</p>
                </address>
                <p className="text-arcade-muted text-sm">
                  Garage parking on 4th St
                </p>
              </div>

              <div>
                <h2 className="font-mono text-neon-cyan text-xs tracking-[0.3em] uppercase mb-5">
                  Hours
                </h2>
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
            </div>

            <div
              className="mt-16 pt-10 border-t"
              style={{ borderColor: 'rgba(0,240,255,0.15)' }}
            >
              <p className="text-arcade-muted text-sm leading-relaxed">
                Ready to lock in a date? Head to our{' '}
                <a href="/#book" className="text-neon-cyan hover:underline">
                  booking section
                </a>{' '}
                to start a private event request directly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
