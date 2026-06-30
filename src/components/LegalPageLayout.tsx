import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export function LegalSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-10">
      <h2
        className="text-arcade-white font-bold tracking-wide uppercase text-sm pb-3 mb-4 border-b"
        style={{ borderColor: 'rgba(0,240,255,0.15)' }}
      >
        {title}
      </h2>
      <div className="text-arcade-muted text-sm sm:text-base leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  )
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  children,
}: {
  title: string
  lastUpdated: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-arcade-bg pt-32 pb-24 px-6 min-h-screen">
          <div className="max-w-3xl mx-auto">
            <h1
              className="font-extrabold tracking-widest uppercase text-arcade-white leading-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.25rem)', textShadow: '0 0 16px rgba(0,240,255,0.5)' }}
            >
              {title}
            </h1>
            <p className="font-mono text-neon-cyan text-xs tracking-widest uppercase mb-12">
              Last updated: {lastUpdated}
            </p>
            {intro && (
              <p className="text-arcade-muted text-sm sm:text-base leading-relaxed mb-10">
                {intro}
              </p>
            )}
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
