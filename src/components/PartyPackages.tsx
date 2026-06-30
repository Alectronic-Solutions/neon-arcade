'use client'

import { useState } from 'react'
import { partyPackages, type PartyPackage } from '@/data/arcade'

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center mb-12">
      <span className="font-mono text-neon-cyan text-sm tracking-[0.3em] uppercase">
        — {label} —
      </span>
      <h2
        className="font-extrabold tracking-widest uppercase text-arcade-white mt-3 mb-4"
        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
      >
        {title}
      </h2>
      <div className="w-16 h-px bg-neon-cyan mx-auto" />
    </div>
  )
}

const PACKAGE_IMAGES: Record<string, string> = {
  player1:        'https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&h=440&fit=crop&q=80',
  'high-roller':  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=440&fit=crop&q=80',
  royalty:        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=440&fit=crop&q=80',
}

const COLLAPSED_COUNT = 5

function PackageCard({ pkg }: { pkg: PartyPackage }) {
  const isFeatured = pkg.featured
  const [expanded, setExpanded] = useState(isFeatured)

  const priceLabel =
    pkg.priceFlat > 0
      ? `$${pkg.priceFlat.toLocaleString()} + $${pkg.pricePerGuest} / guest`
      : `$${pkg.pricePerGuest} / guest`

  const allItems = [
    ...pkg.foodInclusions.map((item) => ({ text: item, type: 'food' as const })),
    ...pkg.perks.map((perk) => ({ text: perk, type: 'perk' as const })),
  ]
  const visibleItems = expanded ? allItems : allItems.slice(0, COLLAPSED_COUNT)
  const hiddenCount = allItems.length - COLLAPSED_COUNT

  const cardStyle = isFeatured
    ? { border: '2px solid #FF007F', boxShadow: '0 0 0 1px rgba(255,0,127,0.15), 0 0 60px rgba(255,0,127,0.12)' }
    : { border: '1px solid rgba(0,240,255,0.15)', boxShadow: '0 0 20px rgba(0,240,255,0.06)' }

  return (
    <div
      className={`relative flex flex-col bg-arcade-surface rounded-xl ${isFeatured ? 'lg:-mt-6 lg:pb-6' : ''}`}
      style={cardStyle}
    >
      {/* Hero image */}
      <div className="relative overflow-hidden rounded-t-xl h-40 sm:h-44" style={{ flexShrink: 0 }}>
        <img
          src={PACKAGE_IMAGES[pkg.tier]}
          alt={pkg.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #15132B 0%, rgba(21,19,43,0.3) 60%, transparent 100%)' }} />
      </div>

      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-neon-magenta text-arcade-bg font-mono font-bold text-xs tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Name + tagline */}
        <div>
          <h3 className="font-bold tracking-wide text-arcade-white" style={{ fontSize: '1.5rem' }}>
            {pkg.name}
          </h3>
          <p className="text-arcade-muted text-sm mt-1 leading-snug">{pkg.tagline}</p>
        </div>

        {/* Price */}
        <p className="font-mono font-bold text-neon-yellow" style={{ fontSize: '1.4rem' }}>
          {priceLabel}
        </p>

        {/* Stat pills */}
        <div className="flex flex-wrap gap-2">
          <span className="font-mono text-xs text-arcade-muted border border-neon-cyan/20 rounded-full px-3 py-1">
            ⏱ {pkg.durationHours} hrs
          </span>
          <span className="font-mono text-xs text-arcade-muted border border-neon-cyan/20 rounded-full px-3 py-1">
            👥 {pkg.minGuests}–{pkg.maxGuests} guests
          </span>
          <span className="font-mono text-xs text-neon-yellow border border-neon-yellow/20 rounded-full px-3 py-1">
            ◈ {pkg.tokensPerGuest.toLocaleString()} tokens
          </span>
        </div>

        <div className="border-t border-neon-cyan/10" />

        {/* Unified inclusions list */}
        <ul className="space-y-2 flex-1">
          {visibleItems.map(({ text, type }) => (
            <li key={text} className="flex gap-2.5 text-sm text-arcade-muted leading-snug">
              <span className={`shrink-0 mt-0.5 ${type === 'food' ? 'text-neon-cyan' : 'text-neon-magenta'}`}>
                {type === 'food' ? '◈' : '★'}
              </span>
              {text}
            </li>
          ))}
        </ul>

        {/* Expand toggle */}
        {!expanded && hiddenCount > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="font-mono text-xs text-neon-cyan/70 hover:text-neon-cyan transition-colors text-left"
          >
            + {hiddenCount} more included
          </button>
        )}

        {/* Deposit note */}
        <p className="font-mono text-xs text-arcade-muted/60">
          {pkg.depositPercent}% deposit to secure date
        </p>

        {/* CTA */}
        <a
          href="#book"
          className="block text-center font-mono font-bold tracking-widest uppercase text-sm py-3 px-6 rounded-lg transition-all"
          style={
            isFeatured
              ? { backgroundColor: '#FF007F', color: '#0B0A16' }
              : { border: '1px solid rgba(0,240,255,0.25)', color: '#00F0FF', background: 'transparent' }
          }
          onMouseEnter={(e) => {
            if (!isFeatured) (e.currentTarget as HTMLElement).style.background = 'rgba(0,240,255,0.08)'
          }}
          onMouseLeave={(e) => {
            if (!isFeatured) (e.currentTarget as HTMLElement).style.background = 'transparent'
          }}
        >
          {pkg.tier === 'royalty' ? '[ INQUIRE BUYOUT ]' : '[ SECURE DATE — $150 DEPOSIT ]'}
        </a>
      </div>
    </div>
  )
}

export default function PartyPackages() {
  return (
    <section id="packages" className="py-24 px-6 bg-arcade-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Private Events" title="Party Packages" />
        <p className="text-arcade-muted text-center text-base mb-14 max-w-md mx-auto">
          Private arcade access, three ways.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-start">
          {partyPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  )
}
