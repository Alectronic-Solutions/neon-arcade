import { faqItems } from '@/data/arcade'

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 bg-arcade-surface">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-neon-cyan text-sm tracking-[0.3em] uppercase">
            — Good To Know —
          </span>
          <h2
            className="font-extrabold tracking-widest uppercase text-arcade-white mt-3 mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-px bg-neon-cyan mx-auto" />
        </div>

        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg px-5 py-4"
              style={{ border: '1px solid rgba(0,240,255,0.15)', backgroundColor: '#15132B' }}
            >
              <summary className="font-mono font-bold text-sm sm:text-base text-arcade-white tracking-wide cursor-pointer list-none flex items-center justify-between gap-4">
                {item.question}
                <span
                  className="shrink-0 text-neon-cyan transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="text-arcade-muted text-sm sm:text-base leading-relaxed mt-3">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
