import type { ReactNode } from 'react'

// Shared heading for every homepage section. Letter-spacing is tighter on
// phones so two-word titles don't break into stacked single words.
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = 'h2',
}: {
  eyebrow: string
  title: string
  subtitle?: ReactNode
  as?: 'h1' | 'h2'
}) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 sm:w-12 bg-linear-to-r from-transparent to-neon-cyan/60" aria-hidden="true" />
        <span className="font-mono text-neon-cyan text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase phosphor-cyan">
          {eyebrow}
        </span>
        <span className="h-px w-8 sm:w-12 bg-linear-to-l from-transparent to-neon-cyan/60" aria-hidden="true" />
      </div>
      <Tag
        className="font-extrabold uppercase text-arcade-white leading-[1.05] tracking-[0.06em] sm:tracking-widest text-balance"
        style={{ fontSize: 'clamp(1.85rem, 8vw, 3.2rem)', textShadow: '0 0 28px rgba(0,240,255,0.18)' }}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="text-arcade-muted text-[0.95rem] sm:text-base leading-relaxed mt-4 max-w-md mx-auto text-balance">
          {subtitle}
        </p>
      )}
    </div>
  )
}
