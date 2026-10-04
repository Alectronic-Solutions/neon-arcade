'use client'

import { useState, useMemo, useRef } from 'react'
import SectionHeading from './SectionHeading'

const EVENT_TYPES = [
  { id: 'kids', label: 'Kids Birthday', detail: 'Host-led party, cake plating, token bundles', glyph: '◈' },
  { id: 'adult', label: 'Adult Milestone', detail: '30ths, 40ths, bachelor parties, reunions', glyph: '★' },
  { id: 'corporate', label: 'Corporate Buyout', detail: 'Team nights, offsites, client events', glyph: '▲' },
]

const STEP_LABELS = ['Event', 'Date', 'Guests']

const TIME_SLOTS = ['10:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '8:00 PM']

const TOKENS_PER_GUEST = 400
const PRICE_PER_GUEST = 32
const DEPOSIT_PCT = 30
const PIZZA_COST = 14

function pad(n: number) {
  return String(n).padStart(3, '0')
}

function calcTokens(guests: number) {
  return guests * TOKENS_PER_GUEST
}

function calcPizzas(guests: number) {
  return Math.ceil(guests / 8)
}

function calcBase(guests: number) {
  return guests * PRICE_PER_GUEST
}

function calcDeposit(base: number) {
  return Math.round(base * DEPOSIT_PCT / 100)
}


const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
]

function MiniCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: string
  onSelect: (d: string) => void
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const dayButtonRefs = useRef<Record<number, HTMLButtonElement | null>>({})

  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }, [viewYear, viewMonth])

  const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`
  const selectedDay =
    selectedDate.startsWith(monthPrefix) ? parseInt(selectedDate.slice(-2), 10) : null
  const isCurrentMonthView = viewYear === today.getFullYear() && viewMonth === today.getMonth()
  const focusableDay = selectedDay ?? (isCurrentMonthView ? today.getDate() : 1)

  function focusDay(day: number) {
    dayButtonRefs.current[day]?.focus()
  }

  function handleDayKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, day: number) {
    const dow = (cells.firstDay + day - 1) % 7
    let next = day
    if (e.key === 'ArrowRight') next = day + 1
    else if (e.key === 'ArrowLeft') next = day - 1
    else if (e.key === 'ArrowDown') next = day + 7
    else if (e.key === 'ArrowUp') next = day - 7
    else if (e.key === 'Home') next = day - dow
    else if (e.key === 'End') next = day + (6 - dow)
    else return
    e.preventDefault()
    if (next >= 1 && next <= cells.daysInMonth) focusDay(next)
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  function toIso(day: number) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const blanks = Array(cells.firstDay).fill(null)
  const days = Array.from({ length: cells.daysInMonth }, (_, i) => i + 1)

  return (
    <div
      className="rounded p-4 select-none"
      style={{ backgroundColor: '#15132B', border: '1px solid rgba(0,240,255,0.25)' }}
    >
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="font-mono text-arcade-muted hover:text-neon-cyan transition-colors text-lg flex items-center justify-center"
          style={{ width: '44px', height: '44px' }}
        >
          ‹
        </button>
        <span className="font-mono text-neon-cyan text-xs tracking-widest uppercase" aria-live="polite">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="font-mono text-arcade-muted hover:text-neon-cyan transition-colors text-lg flex items-center justify-center"
          style={{ width: '44px', height: '44px' }}
        >
          ›
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map(d => (
          <div key={d} className="font-mono text-arcade-muted text-center" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {blanks.map((_, i) => <div key={`b${i}`} />)}
        {days.map(day => {
          const iso = toIso(day)
          const date = new Date(viewYear, viewMonth, day)
          const isPast = date < today
          const isSelected = iso === selectedDate
          const isToday = date.getTime() === today.getTime()

          const fullLabel = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })

          return (
            <button
              key={day}
              ref={(el) => {
                dayButtonRefs.current[day] = el
              }}
              type="button"
              disabled={isPast}
              tabIndex={day === focusableDay ? 0 : -1}
              onClick={() => onSelect(iso)}
              onKeyDown={(e) => handleDayKeyDown(e, day)}
              aria-label={`${fullLabel}${isSelected ? ', selected' : ''}${isToday ? ', today' : ''}`}
              aria-current={isToday ? 'date' : undefined}
              aria-pressed={isSelected}
              className="font-mono text-xs rounded transition-all w-10 h-10 sm:w-8 sm:h-8 mx-auto flex items-center justify-center"
              style={
                isSelected
                  ? { backgroundColor: '#FF007F', color: '#0B0A16', fontWeight: 700 }
                  : isPast
                  ? { color: 'rgba(163,159,209,0.2)', cursor: 'not-allowed' }
                  : isToday
                  ? { border: '1px solid rgba(0,240,255,0.7)', color: '#00F0FF' }
                  : { color: '#F8F8FF' }
              }
            >
              {day}
            </button>
          )
        })}
      </div>

      {selectedDate && (
        <p className="font-mono text-neon-cyan text-xs tracking-widest text-center mt-4">
          ✓ {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
        </p>
      )}
    </div>
  )
}

const MIN_GUESTS = 10
const MAX_GUESTS = 150

export default function EventBooking() {
  const formRef = useRef<HTMLFormElement>(null)
  const [step, setStepState] = useState(1)
  const [eventType, setEventType] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [guestCount, setGuestCount] = useState(30)
  const [submitted, setSubmitted] = useState(false)

  const base = calcBase(guestCount)
  const deposit = calcDeposit(base)
  const tokens = calcTokens(guestCount)
  const pizzas = calcPizzas(guestCount)
  const pizzaTotal = pizzas * PIZZA_COST
  const isFullVenue = guestCount > 50

  // On phones each step is taller than the viewport, so after advancing the
  // user would be left staring at the bottom of the new step. Bring the top
  // of the form back into view whenever it has scrolled above the fold.
  function setStep(next: number) {
    setStepState(next)
    requestAnimationFrame(() => {
      const form = formRef.current
      if (form && form.getBoundingClientRect().top < 64) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  function nudgeGuests(delta: number) {
    setGuestCount((g) => Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, g + delta)))
  }

  const canAdvance1 = eventType !== ''
  const canAdvance2 = selectedDate !== '' && selectedTime !== ''

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step !== 3) return
    setSubmitted(true)
  }

  return (
    <form ref={formRef} className="max-w-2xl mx-auto scroll-mt-20" onSubmit={handleSubmit}>
      <style>{`
        .eb-radio-input:focus-visible + .eb-radio-target {
          outline: 2px solid #00F0FF;
          outline-offset: 2px;
        }
      `}</style>
      <SectionHeading eyebrow="Reserve Your Date" title="Book Your Event" />

      {/* Step indicators */}
      <ol className="flex items-start justify-center mb-10" aria-label="Booking progress">
        {[1, 2, 3].map((s) => (
          <li key={s} className="flex items-start">
            <div className="flex flex-col items-center gap-2 w-16">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all"
                aria-current={step === s ? 'step' : undefined}
                aria-label={`Step ${s} of 3, ${STEP_LABELS[s - 1]}${step > s ? ', completed' : step === s ? ', current' : ''}`}
                style={
                  step === s
                    ? { backgroundColor: '#FF007F', color: '#0B0A16', boxShadow: '0 0 18px rgba(255,0,127,0.5)' }
                    : step > s
                    ? { backgroundColor: '#00F0FF', color: '#0B0A16' }
                    : { border: '1px solid rgba(0,240,255,0.3)', color: '#A39FD1' }
                }
              >
                {step > s ? '✓' : s}
              </div>
              <span
                className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
                style={{ color: step === s ? '#F8F8FF' : '#A39FD1' }}
                aria-hidden="true"
              >
                {STEP_LABELS[s - 1]}
              </span>
            </div>
            {s < 3 && (
              <div
                className="w-10 sm:w-16 h-px mt-[18px]"
                style={{ backgroundColor: step > s ? '#00F0FF' : 'rgba(0,240,255,0.2)' }}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>

      {/* Step 1 — Event Type */}
      {step === 1 && (
        <div>
          <p className="font-mono text-neon-cyan text-xs tracking-widest uppercase text-center mb-5">
            What are we celebrating?
          </p>
          <div role="radiogroup" aria-label="Event type" className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {EVENT_TYPES.map((et) => {
              const checked = eventType === et.id
              return (
                <label key={et.id} className="eb-radio-option block h-full">
                  <input
                    type="radio"
                    name="event-type"
                    value={et.id}
                    checked={checked}
                    onChange={() => setEventType(et.id)}
                    className="eb-radio-input sr-only"
                  />
                  <span
                    className="eb-radio-target flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2 py-4 px-4 rounded-lg transition-all h-full"
                    style={
                      checked
                        ? { border: '1px solid #00F0FF', background: 'rgba(0,240,255,0.1)', boxShadow: '0 0 22px rgba(0,240,255,0.2), inset 0 0 0 1px rgba(0,240,255,0.4)' }
                        : { border: '1px solid rgba(0,240,255,0.22)', background: '#15132B' }
                    }
                  >
                    <span
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-base transition-colors"
                      style={checked ? { background: '#00F0FF', color: '#0B0A16' } : { border: '1px solid rgba(0,240,255,0.3)', color: '#00F0FF' }}
                      aria-hidden="true"
                    >
                      {checked ? '✓' : et.glyph}
                    </span>
                    <span className="flex flex-col gap-1 min-w-0">
                      <span className="font-mono text-sm font-bold tracking-wider uppercase" style={{ color: checked ? '#F8F8FF' : '#E4E2F7' }}>
                        {et.label}
                      </span>
                      <span className="text-xs text-arcade-muted leading-snug">{et.detail}</span>
                    </span>
                  </span>
                </label>
              )
            })}
          </div>
          <button
            type="button"
            onClick={() => canAdvance1 && setStep(2)}
            aria-disabled={!canAdvance1}
            className="w-full py-4 font-mono font-bold tracking-widest uppercase text-sm rounded-lg transition-all min-h-11"
            style={
              canAdvance1
                ? { backgroundColor: '#FF007F', color: '#0B0A16', boxShadow: '0 0 24px rgba(255,0,127,0.4)' }
                : {
                    backgroundColor: 'rgba(255,0,127,0.2)',
                    color: 'rgba(255,255,255,0.3)',
                    cursor: 'not-allowed',
                  }
            }
          >
            NEXT: SELECT DATE →
          </button>
        </div>
      )}

      {/* Step 2 — Date + Time */}
      {step === 2 && (
        <div>
          <p className="font-mono text-neon-cyan text-xs tracking-widest uppercase text-center mb-6">
            SELECT DATE &amp; TIME
          </p>

          <div className="mb-6">
            <label className="block font-mono text-arcade-muted text-xs tracking-widest uppercase mb-2">
              Event Date
            </label>
            <MiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
          </div>

          <div className="mb-8">
            <label className="block font-mono text-arcade-muted text-xs tracking-widest uppercase mb-2">
              Start Time
            </label>
            <div role="radiogroup" aria-label="Start time" className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
              {TIME_SLOTS.map((slot) => {
                const checked = selectedTime === slot
                return (
                  <label key={slot} className="eb-radio-option block">
                    <input
                      type="radio"
                      name="time-slot"
                      value={slot}
                      checked={checked}
                      onChange={() => setSelectedTime(slot)}
                      className="eb-radio-input sr-only"
                    />
                    <span
                      className="eb-radio-target py-3 rounded font-mono text-xs tracking-wide transition-all min-h-11 text-center flex items-center justify-center"
                      style={
                        checked
                          ? { backgroundColor: '#FF007F', color: '#0B0A16', fontWeight: 700 }
                          : { border: '1px solid rgba(0,240,255,0.3)', color: '#A39FD1' }
                      }
                    >
                      {slot}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 py-3 font-mono text-sm tracking-widest uppercase rounded min-h-11"
              style={{ border: '1px solid rgba(0,240,255,0.3)', color: '#A39FD1' }}
            >
              ← BACK
            </button>
            <button
              type="button"
              onClick={() => canAdvance2 && setStep(3)}
              aria-disabled={!canAdvance2}
              className="flex-2 py-3 font-mono font-bold tracking-widest uppercase text-sm rounded transition-opacity min-h-11"
              style={
                canAdvance2
                  ? { backgroundColor: '#FF007F', color: '#0B0A16' }
                  : {
                      backgroundColor: 'rgba(255,0,127,0.2)',
                      color: 'rgba(255,255,255,0.3)',
                      cursor: 'not-allowed',
                    }
              }
            >
              NEXT: GUEST COUNT →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Guest count + ledger */}
      {step === 3 && !submitted && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: label, readout, slider, nav */}
          <div className="col-span-1 lg:col-span-7">
            <label
              htmlFor="guest-count-slider"
              className="block font-mono text-neon-cyan text-xs tracking-widest uppercase text-center mb-6"
            >
              HOW MANY GUESTS?
            </label>

            <div className="mb-4 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => nudgeGuests(-1)}
                disabled={guestCount <= MIN_GUESTS}
                aria-label="Remove one guest"
                className="w-11 h-11 rounded-full font-mono text-xl text-neon-cyan border border-neon-cyan/35 flex items-center justify-center transition-colors active:bg-neon-cyan/15 hover:border-neon-cyan disabled:opacity-30 disabled:cursor-not-allowed"
              >
                −
              </button>
              <div className="text-center min-w-[7.5rem]" aria-hidden="true">
                <span
                  className="font-mono font-bold text-neon-yellow tabular-nums"
                  style={{ fontSize: '3rem', textShadow: '0 0 18px rgba(255,230,0,0.3)' }}
                >
                  {guestCount}
                </span>
                <span className="block font-mono text-arcade-muted text-xs tracking-widest">GUESTS</span>
              </div>
              <button
                type="button"
                onClick={() => nudgeGuests(1)}
                disabled={guestCount >= MAX_GUESTS}
                aria-label="Add one guest"
                className="w-11 h-11 rounded-full font-mono text-xl text-neon-cyan border border-neon-cyan/35 flex items-center justify-center transition-colors active:bg-neon-cyan/15 hover:border-neon-cyan disabled:opacity-30 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>

            <input
              id="guest-count-slider"
              type="range"
              min={MIN_GUESTS}
              max={MAX_GUESTS}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              aria-valuetext={`${guestCount} guests`}
              className="w-full mb-2"
            />
            <div className="flex justify-between font-mono text-[0.65rem] text-arcade-muted/70 lg:mb-8" aria-hidden="true">
              <span>{MIN_GUESTS}</span>
              <span>{MAX_GUESTS}</span>
            </div>
          </div>

          {/* Right: sticky ledger — sits between slider and buttons on phones
              so the price is visible before the submit button */}
          <div className="col-span-1 lg:col-span-5 lg:row-span-2">
            <div
              className="font-mono text-sm rounded p-5 lg:sticky lg:top-20"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              style={{
                border: '1px solid rgba(0,240,255,0.15)',
                backgroundColor: '#15132B',
              }}
            >
              <p className="text-arcade-muted text-xs tracking-widest uppercase mb-3">
                ◈ LIVE BOOKING ESTIMATE — HIGH ROLLER PACKAGE
              </p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-arcade-muted">GUESTS</span>
                  <span className="text-neon-yellow">{pad(guestCount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-arcade-muted">TOKENS</span>
                  <span className="text-neon-yellow">
                    {pad(guestCount)} × {TOKENS_PER_GUEST} = {tokens.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-arcade-muted">PIZZA</span>
                  <span className="text-neon-yellow">
                    {pad(pizzas)} pies @ ${PIZZA_COST} = ${pizzaTotal}
                  </span>
                </div>
                <div className="border-t border-neon-cyan/15 my-2" />
                <div className="flex justify-between">
                  <span className="text-arcade-muted">BASE COST</span>
                  <span className="text-neon-yellow">${base.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-neon-cyan phosphor-cyan">DEPOSIT DUE TODAY</span>
                  <span style={{ color: isFullVenue ? '#FFE600' : '#FF007F' }}>
                    ${deposit.toLocaleString()} ({DEPOSIT_PCT}%)
                  </span>
                </div>
              </div>
              {isFullVenue && (
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#FFE600',
                  border: '1px solid rgba(255,230,0,0.4)',
                  padding: '6px 10px',
                  marginTop: '10px',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  lineHeight: 1.4,
                }}>
                  [ FULL VENUE BUYOUT UNLOCKED — INCLUDES PRIVATE BARTENDER ]
                </div>
              )}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 lg:row-start-2">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3 font-mono text-sm tracking-widest uppercase rounded min-h-11"
                style={{ border: '1px solid rgba(0,240,255,0.3)', color: '#A39FD1' }}
              >
                ← BACK
              </button>
              <button
                type="submit"
                className="flex-2 py-4 font-mono font-bold tracking-widest uppercase text-sm rounded"
                style={{
                  backgroundColor: '#FF007F',
                  color: '#0B0A16',
                  boxShadow: '0 0 24px rgba(255,0,127,0.45)',
                }}
              >
                REQUEST BOOKING
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation */}
      {submitted && (
        <div
          className="text-center py-12 px-8 rounded"
          role="status"
          style={{ border: '1px solid rgba(0,240,255,0.15)', backgroundColor: '#15132B' }}
        >
          <p
            className="font-mono font-bold text-neon-cyan text-2xl mb-4"
            style={{ textShadow: '0 0 20px rgba(0,240,255,0.4)' }}
          >
            ✓ REQUEST RECEIVED
          </p>
          <p className="font-mono text-arcade-muted text-sm tracking-wider leading-relaxed">
            We&apos;ll confirm your booking within 24 hours.
            <br />
            Check your inbox for next steps.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setStep(1)
                setEventType('')
                setSelectedDate('')
                setSelectedTime('')
                setGuestCount(30)
              }}
              className="font-mono text-xs tracking-widest uppercase text-arcade-muted hover:text-neon-cyan transition-colors"
            >
              SUBMIT ANOTHER REQUEST
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
