'use client'

import { useState } from 'react'
import Image from 'next/image'
import { arcadeMachines, type ArcadeMachine } from '@/data/arcade'
import { withBasePath } from '@/lib/paths'
import GameModal from './GameModal'
import SectionHeading from './SectionHeading'

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

function MachineCard({ machine, onSelect }: { machine: ArcadeMachine; onSelect: (machine: ArcadeMachine) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(machine)}
      aria-label={`${machine.name}, ${machine.year}, ${machine.players} player${machine.players > 1 ? 's' : ''}. View details`}
      className="group relative flex flex-col text-left rounded-sm overflow-hidden bg-arcade-surface border border-neon-cyan/12 shadow-[0_2px_16px_rgba(0,0,0,0.3)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-neon-cyan hover:shadow-[0_0_28px_rgba(0,240,255,0.18),0_8px_32px_rgba(0,0,0,0.5)] active:scale-[0.98] focus-visible:border-neon-cyan"
    >
      {/* Image area */}
      <span className="block relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <Image
          src={withBasePath(machine.coverImage)}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-108"
        />

        {/* Gradient overlay bottom-to-top */}
        <span
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #15132B 0%, rgba(21,19,43,0.55) 50%, transparent 100%)',
          }}
        />

        {/* Era chip — top left */}
        <span
          className="absolute top-2 left-2 font-mono text-neon-cyan tracking-widest px-1.5 py-0.5 rounded-sm"
          style={{
            background: 'rgba(11,10,22,0.75)',
            border: '1px solid rgba(0,240,255,0.35)',
            fontSize: '0.6rem',
            textShadow: '0 0 8px rgba(0,240,255,0.6)',
          }}
        >
          {ERA_LABELS[machine.era]}
        </span>
      </span>

      {/* Text content */}
      <span className="flex flex-col gap-1 px-3 sm:px-4 py-3">
        <span className="text-arcade-white font-extrabold uppercase tracking-wide leading-tight text-[0.8rem] sm:text-sm">
          {machine.name}
        </span>
        <span className="font-mono text-crt-green tracking-wider phosphor-green text-[0.65rem] sm:text-xs">
          {machine.year} · {machine.players}P
        </span>
        <span className="font-mono text-arcade-muted text-[0.6rem] sm:text-[0.65rem] leading-snug">
          {machine.manufacturer} · {machine.genre}
        </span>
      </span>

      {/* Bottom accent line on hover */}
      <span
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
        style={{ background: 'linear-gradient(to right, #00F0FF, #FF007F)' }}
      />
    </button>
  )
}

export default function GameCatalog() {
  const [activeEra, setActiveEra] = useState<Era>('all')
  const [expanded, setExpanded] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState<ArcadeMachine | null>(null)

  function selectEra(era: Era) {
    setActiveEra(era)
    setExpanded(false)
  }

  const filtered =
    activeEra === 'all'
      ? arcadeMachines
      : arcadeMachines.filter((m) => m.era === activeEra)

  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT)
  const hiddenCount = filtered.length - INITIAL_COUNT

  return (
    <>
    <section id="games" className="py-16 sm:py-28 px-4 sm:px-6" style={{ background: '#0B0A16' }}>
      <div className="max-w-6xl mx-auto">

        <SectionHeading eyebrow="Cabinet Roster" title="Game Catalog" />

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filter cabinets by era"
          className="no-scrollbar flex overflow-x-auto mb-3"
          style={{ borderBottom: '1px solid rgba(0,240,255,0.1)' }}
          onKeyDown={(e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
            e.preventDefault()
            const idx = ERA_TABS.findIndex((t) => t.id === activeEra)
            const nextIdx =
              e.key === 'ArrowRight'
                ? (idx + 1) % ERA_TABS.length
                : (idx - 1 + ERA_TABS.length) % ERA_TABS.length
            const nextTab = ERA_TABS[nextIdx]
            selectEra(nextTab.id)
            const el = document.getElementById(`era-tab-${nextTab.id}`)
            el?.focus()
          }}
        >
          {ERA_TABS.map((tab) => {
            const active = activeEra === tab.id
            return (
              <button
                key={tab.id}
                id={`era-tab-${tab.id}`}
                role="tab"
                aria-selected={active}
                aria-controls="game-catalog-grid"
                tabIndex={active ? 0 : -1}
                onClick={() => selectEra(tab.id)}
                className="relative flex-1 sm:flex-none font-mono text-xs tracking-widest uppercase py-3 px-2 sm:px-5 whitespace-nowrap transition-all duration-150 min-h-11"
                style={{
                  color: active ? '#FF007F' : '#A39FD1',
                  background: active ? 'rgba(255,0,127,0.07)' : 'transparent',
                }}
              >
                <span className="sm:hidden">{tab.short}</span>
                <span className="hidden sm:inline">{tab.label}</span>
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
            SELECT A CABINET FOR SPECS ↗
          </p>
        </div>

        {/* Grid */}
        <div id="game-catalog-grid" role="tabpanel" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {visible.map((machine) => (
            <MachineCard key={machine.id} machine={machine} onSelect={setSelectedMachine} />
          ))}
        </div>

        {/* Show More / Less */}
        {filtered.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-controls="game-catalog-grid"
              className="font-mono uppercase text-xs tracking-[0.2em] px-8 py-3.5 w-full sm:w-auto text-neon-magenta border border-neon-magenta/40 transition-all duration-150 hover:bg-neon-magenta/12 hover:border-neon-magenta hover:shadow-[0_0_20px_rgba(255,0,127,0.2)] active:bg-neon-magenta/12"
            >
              {expanded
                ? '↑  SHOW LESS'
                : `↓  SHOW ${hiddenCount} MORE CABINET${hiddenCount !== 1 ? 'S' : ''}`}
            </button>
          </div>
        )}
      </div>
    </section>
    <GameModal machine={selectedMachine} onClose={() => setSelectedMachine(null)} />
    </>
  )
}
