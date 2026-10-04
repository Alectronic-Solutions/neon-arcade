import { faqItems } from '@/data/arcade'
import SectionHeading from './SectionHeading'

export default function FAQ() {
  return (
    <section id="faq" className="py-16 sm:py-24 px-5 sm:px-6 bg-arcade-surface">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Good To Know" title="Frequently Asked Questions" />

        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg px-4 sm:px-5 py-4 bg-arcade-bg/50 border border-neon-cyan/15 transition-colors open:border-neon-cyan/45 open:bg-arcade-bg/80"
            >
              <summary className="font-sans font-semibold text-[0.95rem] sm:text-base text-arcade-white leading-snug cursor-pointer list-none flex items-center justify-between gap-4 py-1 [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  className="shrink-0 w-8 h-8 rounded-full border border-neon-cyan/35 flex items-center justify-center text-neon-cyan font-mono text-lg leading-none transition-all duration-200 group-open:rotate-45 group-open:bg-neon-cyan group-open:text-arcade-bg group-open:border-neon-cyan"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="text-arcade-muted text-sm sm:text-base leading-relaxed mt-3 pr-2 sm:pr-12">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
