'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { arcadeMachines, type ArcadeMachine } from '@/data/arcade'

type Era = 'all' | 'golden-age' | 'classics' | 'fighters' | 'pinball-rhythm'

const ERA_TABS: { id: Era; label: string; short: string }[] = [
  { id: 'all',            label: 'ALL',              short: 'ALL' },
  { id: 'golden-age',    label: '1970s GOLDEN AGE', short: '70s' },
  { id: 'classics',      label: '1980s CLASSICS',   short: '80s' },
  { id: 'fighters',      label: '90s FIGHTERS',     short: '90s' },
  { id: 'pinball-rhythm',label: 'PINBALL & RHYTHM',  short: 'P&R' },
]

const ERA_LABELS: Record<string, string> = {
  'golden-age':     '70s',
  'classics':       '80s',
  'fighters':       '90s',
  'pinball-rhythm': 'P&R',
}

const INITIAL_COUNT = 12

function MachineCard({ machine }: { machine: ArcadeMachine }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative flex flex-col rounded-sm overflow-hidden cursor-pointer transition-transform duration-200"
      style={{
        background: '#15132B',
        border: hovered ? '1px solid #00F0FF' : '1px solid rgba(0,240,255,0.12)',
        boxShadow: hovered
          ? '0 0 28px rgba(0,240,255,0.18), 0 8px 32px rgba(0,0,0,0.5)'
          : '0 2px 16px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <Image
          src={machine.coverImage}
          alt={machine.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />

        {/* Gradient overlay bottom-to-top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #15132B 0%, rgba(21,19,43,0.55) 50%, transparent 100%)',
          }}
        />

        {/* Era chip — top left */}
        <span
          className="absolute top-2.5 left-2.5 font-mono text-neon-cyan text-xs tracking-widest px-2 py-0.5 rounded-sm"
          style={{
            background: 'rgba(0,240,255,0.1)',
            border: '1px solid rgba(0,240,255,0.35)',
            fontSize: '0.6rem',
            textShadow: '0 0 8px rgba(0,240,255,0.6)',
          }}
        >
          {ERA_LABELS[machine.era]}
        </span>

        {/* Player count — top right */}
        <span
          className="absolute top-2.5 right-2.5 font-mono text-neon-yellow text-xs tracking-widest px-2 py-0.5 rounded-sm"
          style={{
            background: 'rgba(255,230,0,0.08)',
            border: '1px solid rgba(255,230,0,0.3)',
            fontSize: '0.6rem',
          }}
        >
          {machine.players}P
        </span>
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1 px-4 py-3">
        <h3
          className="text-arcade-white font-extrabold uppercase tracking-wide leading-tight"
          style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}
        >
          {machine.name}
        </h3>
        <p
          className="font-mono text-neon-cyan tracking-wider phosphor-cyan"
          style={{ fontSize: '0.65rem' }}
        >
          {machine.year} · {machine.manufacturer}
        </p>
        <p className="text-arcade-muted" style={{ fontSize: '0.65rem' }}>
          {machine.genre}
        </p>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-300"
        style={{
          width: hovered ? '100%' : '0%',
          background: 'linear-gradient(to right, #00F0FF, #FF007F)',
        }}
      />
    </div>
  )
}

export default function GameCatalog() {
  const [activeEra, setActiveEra] = useState<Era>('all')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(false)
  }, [activeEra])

  const filtered =
    activeEra === 'all'
      ? arcadeMachines
      : arcadeMachines.filter((m) => m.era === activeEra)

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT)
  const hiddenCount = filtered.length - INITIAL_COUNT

  return (
    <section id="games" className="py-28 px-6" style={{ background: '#0B0A16' }}>
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-16">
          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.4))' }} />
            <span className="font-mono text-neon-cyan tracking-[0.35em] text-xs uppercase phosphor-cyan">
              Cabinet Roster
            </span>
            <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(0,240,255,0.4))' }} />
          </div>

          <h2
            className="font-extrabold tracking-widest uppercase text-arcade-white mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', letterSpacing: '0.12em' }}
          >
            Game Catalog
          </h2>

          {/* Cyan accent bar */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-neon-cyan/40" />
            <div className="w-16 h-0.5 bg-neon-cyan" style={{ boxShadow: '0 0 8px #00F0FF' }} />
            <div className="w-8 h-px bg-neon-cyan/40" />
          </div>
        </div>

        {/* Filter tabs */}
        <div
          className="flex overflow-x-auto mb-3"
          style={{ borderBottom: '1px solid rgba(0,240,255,0.1)' }}
        >
          {ERA_TABS.map((tab) => {
            const active = activeEra === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveEra(tab.id)}
                className="relative font-mono text-xs tracking-widest uppercase py-3 px-5 whitespace-nowrap transition-all duration-150 shrink-0"
                style={{
                  color: active ? '#FF007F' : '#A39FD1',
                  background: active ? 'rgba(255,0,127,0.07)' : 'transparent',
                }}
              >
                {tab.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: '#FF007F', boxShadow: '0 0 8px rgba(255,0,127,0.6)' }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between mb-8">
          <p className="font-mono text-arcade-muted tracking-widest uppercase" style={{ fontSize: '0.65rem' }}>
            <span className="text-neon-cyan phosphor-cyan">{filtered.length}</span>
            {' '}CABINETS{activeEra !== 'all' ? ` · ${ERA_TABS.find(t => t.id === activeEra)?.label}` : ' ON FLOOR'}
          </p>
          <p className="font-mono text-arcade-muted tracking-widest uppercase hidden sm:block" style={{ fontSize: '0.6rem' }}>
            HOVER TO EXPLORE ↗
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visible.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>

        {/* Show More / Less */}
        {filtered.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setExpanded(!expanded)}
              className="font-mono tracking-widest uppercase text-xs px-8 py-3 transition-all duration-150"
              style={{
                color: '#FF007F',
                border: '1px solid rgba(255,0,127,0.4)',
                background: 'transparent',
                letterSpacing: '0.2em',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = 'rgba(255,0,127,0.12)'
                el.style.borderColor = '#FF007F'
                el.style.boxShadow = '0 0 20px rgba(255,0,127,0.2)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = 'transparent'
                el.style.borderColor = 'rgba(255,0,127,0.4)'
                el.style.boxShadow = 'none'
              }}
            >
              {expanded
                ? '↑  SHOW LESS'
                : `↓  SHOW ${hiddenCount} MORE CABINET${hiddenCount !== 1 ? 'S' : ''}`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
