'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { ArcadeMachine } from '@/data/arcade'

const ERA_LABELS: Record<string, string> = {
  'golden-age':     '70s',
  'classics':       '80s',
  'fighters':       '90s',
  'pinball-rhythm': 'P&R',
}

export default function GameModal({
  machine,
  onClose,
}: {
  machine: ArcadeMachine | null
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (machine) {
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }
    setVisible(false)
  }, [machine])

  useEffect(() => {
    if (!machine) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [machine, onClose])

  if (!machine) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label={machine.name}
      style={{
        background: 'rgba(11,10,22,0.78)',
        backdropFilter: 'blur(6px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 200ms ease',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full flex flex-col rounded-sm overflow-hidden"
        style={{
          maxWidth: '520px',
          background: '#15132B',
          border: '1px solid #00F0FF',
          boxShadow: '0 0 28px rgba(0,240,255,0.18), 0 20px 60px rgba(0,0,0,0.6)',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 220ms ease, opacity 220ms ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex items-center justify-center font-mono text-sm transition-colors duration-150"
          style={{
            width: '32px',
            height: '32px',
            color: '#FF007F',
            background: 'rgba(255,0,127,0.1)',
            border: '1px solid rgba(255,0,127,0.45)',
            borderRadius: '2px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,0,127,0.2)'
            e.currentTarget.style.boxShadow = '0 0 14px rgba(255,0,127,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,0,127,0.1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          ✕
        </button>

        {/* Image area */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image
            src={machine.coverImage}
            alt={machine.name}
            fill
            sizes="520px"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, #15132B 0%, rgba(21,19,43,0.45) 45%, transparent 100%)',
            }}
          />

          <span
            className="absolute top-3 left-3 font-mono text-neon-cyan tracking-widest px-2 py-0.5 rounded-sm"
            style={{
              background: 'rgba(0,240,255,0.1)',
              border: '1px solid rgba(0,240,255,0.35)',
              fontSize: '0.65rem',
              textShadow: '0 0 8px rgba(0,240,255,0.6)',
            }}
          >
            {ERA_LABELS[machine.era]}
          </span>

          <span
            className="absolute top-3 right-14 font-mono text-neon-yellow tracking-widest px-2 py-0.5 rounded-sm"
            style={{
              background: 'rgba(255,230,0,0.08)',
              border: '1px solid rgba(255,230,0,0.3)',
              fontSize: '0.65rem',
            }}
          >
            {machine.players}P
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2 px-6 py-5">
          <h3
            className="text-arcade-white font-extrabold uppercase tracking-wide leading-tight"
            style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}
          >
            {machine.name}
          </h3>
          <p
            className="font-mono text-neon-cyan tracking-wider phosphor-cyan"
            style={{ fontSize: '0.75rem' }}
          >
            {machine.year} · {machine.manufacturer}
          </p>
          <p className="text-arcade-muted font-mono tracking-wide" style={{ fontSize: '0.7rem' }}>
            {machine.genre}
          </p>

          <div
            className="h-px my-2"
            style={{ background: 'linear-gradient(to right, rgba(0,240,255,0.3), transparent)' }}
          />

          <p
            className="leading-relaxed"
            style={{ color: '#A39FD1', fontSize: '0.9rem' }}
          >
            {machine.description}
          </p>
        </div>
      </div>
    </div>
  )
}
