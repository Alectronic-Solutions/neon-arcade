'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { ArcadeMachine } from '@/data/arcade'
import { withBasePath } from '@/lib/paths'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

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
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!machine) return
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => {
      cancelAnimationFrame(raf)
      setVisible(false)
    }
  }, [machine])

  useEffect(() => {
    if (!machine) return
    lastFocusedRef.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const focusRaf = requestAnimationFrame(() => closeButtonRef.current?.focus())

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      cancelAnimationFrame(focusRaf)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
      lastFocusedRef.current?.focus()
    }
  }, [machine, onClose])

  if (!machine) return null

  return (
    <div
      className="fixed inset-0 z-60 flex items-end sm:items-center justify-center sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
      aria-describedby="game-modal-description"
      style={{
        background: 'rgba(11,10,22,0.78)',
        backdropFilter: 'blur(6px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 200ms ease',
      }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full flex flex-col rounded-t-xl sm:rounded-sm overflow-y-auto overscroll-contain"
        style={{
          maxWidth: '520px',
          maxHeight: '90svh',
          paddingBottom: 'env(safe-area-inset-bottom)',
          background: '#15132B',
          border: '1px solid #00F0FF',
          boxShadow: '0 0 28px rgba(0,240,255,0.18), 0 20px 60px rgba(0,0,0,0.6)',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.98) translateY(24px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 220ms ease, opacity 220ms ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex items-center justify-center font-mono text-sm transition-colors duration-150"
          style={{
            width: '44px',
            height: '44px',
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
            src={withBasePath(machine.coverImage)}
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
            id="game-modal-title"
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
            id="game-modal-description"
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
