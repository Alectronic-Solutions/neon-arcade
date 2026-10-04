'use client'

import { useEffect, useRef, useState } from 'react'
import { partyPackages, type PartyPackage } from '@/data/arcade'
import { withBasePath } from '@/lib/paths'
import SectionHeading from './SectionHeading'

function PackageCtaStyles() {
  return (
    <style>{`
      .pkg-cta-outline:active,
      .pkg-cta-outline:focus-visible {
        background: rgba(0,240,255,0.08);
      }
      .pkg-cta-featured {
        box-shadow: 0 0 20px rgba(255,0,127,0.3);
        transition: box-shadow 0.2s ease;
      }
      @media (hover: hover) {
        .pkg-cta-outline:hover { background: rgba(0,240,255,0.08); }
        .pkg-cta-featured:hover { box-shadow: 0 0 36px rgba(255,0,127,0.55); }
      }
    `}</style>
  )
}

const PACKAGE_IMAGES: Record<string, string> = {
  player1:        withBasePath('/packages/player1.webp'),
  'high-roller':  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=440&fit=crop&q=75&auto=format',
  royalty:        withBasePath('/packages/royalty.webp'),
}

const CTA_LABELS: Record<PartyPackage['tier'], string> = {
  player1: '[ BOOK PLAYER 1 ]',
  'high-roller': '[ BOOK HIGH ROLLER ]',
  royalty: '[ INQUIRE BUYOUT ]',
}

const COLLAPSED_COUNT = 4

function PackageCard({ pkg }: { pkg: PartyPackage }) {
  const isFeatured = pkg.featured
  // The featured tier shows its full list on desktop, where the cards sit
  // side by side. On phones every tier starts collapsed so the swipe rail
  // isn't stretched to the height of the longest card.
  const [expanded, setExpanded] = useState(false)

  const priceMain = pkg.priceFlat > 0 ? `$${pkg.priceFlat.toLocaleString()}` : `$${pkg.pricePerGuest}`
  const priceSuffix = pkg.priceFlat > 0 ? `+ $${pkg.pricePerGuest} / guest` : '/ guest'

  const allItems = [
    ...pkg.foodInclusions.map((item) => ({ text: item, type: 'food' as const })),
    ...pkg.perks.map((perk) => ({ text: perk, type: 'perk' as const })),
  ]
  const hiddenCount = allItems.length - COLLAPSED_COUNT

  function itemVisibility(index: number) {
    if (expanded || index < COLLAPSED_COUNT) return 'flex'
    return isFeatured ? 'hidden lg:flex' : 'hidden'
  }

  const cardStyle = isFeatured
    ? { border: '1px solid #FF007F', boxShadow: '0 0 0 1px rgba(255,0,127,0.35), 0 0 48px rgba(255,0,127,0.18)' }
    : { border: '1px solid rgba(0,240,255,0.22)', boxShadow: '0 0 20px rgba(0,240,255,0.06)' }

  const specs = [
    { label: 'Hours', value: String(pkg.durationHours) },
    { label: 'Guests', value: `${pkg.minGuests}–${pkg.maxGuests}` },
    { label: 'Tokens', value: pkg.tokensPerGuest.toLocaleString() },
  ]

  return (
    <article
      className={`relative flex flex-col bg-arcade-surface rounded-xl ${isFeatured ? 'lg:-mt-6 lg:pb-6' : ''}`}
      style={cardStyle}
      aria-label={`${pkg.name} package`}
    >
      {/* Hero image */}
      <div className="relative overflow-hidden rounded-t-xl h-32 sm:h-44 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PACKAGE_IMAGES[pkg.tier]}
          alt={`${pkg.name} party package at Neon Arcade`}
          width={600}
          height={440}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover block"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #15132B 0%, rgba(21,19,43,0.35) 55%, transparent 100%)' }} />
        <span
          className="absolute top-3 left-3 font-mono text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1 rounded-sm"
          style={
            isFeatured
              ? { background: '#FF007F', color: '#0B0A16', fontWeight: 700 }
              : { background: 'rgba(11,10,22,0.75)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.35)' }
          }
        >
          {isFeatured ? '★ Most popular' : pkg.tier === 'royalty' ? 'Full buyout' : 'Starter'}
        </span>
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6 -mt-6 relative flex flex-col flex-1 gap-4">
        {/* Name + tagline */}
        <div>
          <h3 className="font-extrabold uppercase tracking-wider text-arcade-white text-xl sm:text-2xl">
            {pkg.name}
          </h3>
          <p className="text-arcade-muted text-sm mt-1 leading-snug">{pkg.tagline}</p>
        </div>

        {/* Price */}
        <p className="font-mono font-bold text-neon-yellow leading-none" style={{ textShadow: '0 0 16px rgba(255,230,0,0.25)' }}>
          <span className="text-3xl sm:text-[2rem]">{priceMain}</span>
          <span className="text-sm sm:text-base text-neon-yellow/80 ml-1.5">{priceSuffix}</span>
        </p>

        {/* Spec strip — high-score-screen style */}
        <dl className="grid grid-cols-3 rounded-md overflow-hidden border border-neon-cyan/15 divide-x divide-neon-cyan/15 bg-arcade-bg/60">
          {specs.map((spec) => (
            <div key={spec.label} className="flex flex-col-reverse items-center py-2.5">
              <dt className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-arcade-muted mt-1">{spec.label}</dt>
              <dd className={`font-mono font-bold text-sm sm:text-base ${spec.label === 'Tokens' ? 'text-neon-yellow' : 'text-crt-green phosphor-green'}`}>
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Unified inclusions list */}
        <ul className="space-y-2.5 flex-1">
          {allItems.map(({ text, type }, i) => (
            <li key={text} className={`${itemVisibility(i)} gap-2.5 text-sm text-arcade-white/80 leading-snug`}>
              <span className={`shrink-0 mt-0.5 text-xs ${type === 'food' ? 'text-neon-cyan' : 'text-neon-magenta'}`} aria-hidden="true">
                {type === 'food' ? '◈' : '★'}
              </span>
              {text}
            </li>
          ))}
        </ul>

        {/* Expand toggle */}
        {hiddenCount > 0 && (
          <button
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className={`font-mono text-xs tracking-wider uppercase text-neon-cyan/80 hover:text-neon-cyan transition-colors text-left py-2 -my-2 ${isFeatured && !expanded ? 'lg:hidden' : ''}`}
          >
            {expanded ? '− Show fewer' : `+ ${hiddenCount} more included`}
          </button>
        )}

        {/* CTA */}
        <div className="pt-1">
          <a
            href="#book"
            className={`block text-center font-mono font-bold tracking-widest uppercase text-sm py-3.5 px-6 rounded-lg transition-all ${isFeatured ? 'pkg-cta-featured' : 'pkg-cta-outline'}`}
            style={
              isFeatured
                ? { backgroundColor: '#FF007F', color: '#0B0A16' }
                : { border: '1px solid rgba(0,240,255,0.4)', color: '#00F0FF', background: 'transparent' }
            }
          >
            {CTA_LABELS[pkg.tier]}
          </a>
          <p className="font-mono text-[0.65rem] tracking-wider text-arcade-muted/80 text-center mt-2.5">
            {pkg.depositPercent}% deposit secures your date
          </p>
        </div>
      </div>
    </article>
  )
}

export default function PartyPackages() {
  const railRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const featuredIndex = partyPackages.findIndex((p) => p.featured)

  // Below lg the tiers sit in a horizontal snap rail. Track which card is
  // centered so the pager dots stay in sync with swipes.
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const cards = Array.from(rail.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveIndex(cards.indexOf(entry.target as HTMLElement))
        })
      },
      { root: rail, threshold: 0.6 },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  function scrollToCard(index: number) {
    const rail = railRef.current
    const card = rail?.children[index] as HTMLElement | undefined
    if (!rail || !card) return
    rail.scrollTo({ left: card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2, behavior: 'smooth' })
  }

  return (
    <section id="packages" className="py-16 sm:py-24 bg-arcade-bg">
      <PackageCtaStyles />
      <div className="max-w-6xl mx-auto">
        <div className="px-5 sm:px-6">
          <SectionHeading eyebrow="Private Events" title="Party Packages" subtitle="Private arcade access, three ways." />
        </div>

        {/* Pager — mobile/tablet rail only */}
        <div className="flex justify-center gap-1.5 -mt-4 mb-3 lg:hidden" role="group" aria-label="Jump to package">
          {partyPackages.map((pkg, i) => (
            <button
              key={pkg.id}
              type="button"
              aria-current={activeIndex === i ? 'true' : undefined}
              onClick={() => scrollToCard(i)}
              className="font-mono text-[0.65rem] tracking-widest uppercase px-3 py-2 rounded-full transition-colors"
              style={
                activeIndex === i
                  ? { color: i === featuredIndex ? '#FF007F' : '#00F0FF', background: i === featuredIndex ? 'rgba(255,0,127,0.12)' : 'rgba(0,240,255,0.1)' }
                  : { color: '#A39FD1' }
              }
            >
              {pkg.name}
            </button>
          ))}
        </div>

        <div
          ref={railRef}
          className="no-scrollbar flex items-start lg:grid lg:grid-cols-3 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-px-5 px-5 sm:px-6 pt-3 pb-4 lg:pt-8"
        >
          {partyPackages.map((pkg) => (
            <div key={pkg.id} className="snap-center shrink-0 w-[86%] max-w-sm sm:w-[46%] sm:max-w-none lg:w-auto">
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
