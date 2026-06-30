'use client'

import { useState, useMemo } from 'react'

const EVENT_TYPES = [
  { id: 'kids', label: "Kids Birthday" },
  { id: 'adult', label: "Adult Milestone" },
  { id: 'corporate', label: "Corporate Buyout" },
]

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

  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }, [viewYear, viewMonth])

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
          onClick={prevMonth}
          className="font-mono text-arcade-muted hover:text-neon-cyan transition-colors text-lg px-1"
        >
          ‹
        </button>
        <span className="font-mono text-neon-cyan text-xs tracking-widest uppercase">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="font-mono text-arcade-muted hover:text-neon-cyan transition-colors text-lg px-1"
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

          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => onSelect(iso)}
              className="font-mono text-xs rounded transition-all w-8 h-8 sm:w-7 sm:h-7 mx-auto flex items-center justify-center"
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

export default function EventBooking() {
  const [step, setStep] = useState(1)
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

  const canAdvance1 = eventType !== ''
  const canAdvance2 = selectedDate !== '' && selectedTime !== ''

  return (
    <div className="max-w-2xl mx-auto">
      {/* Section heading */}
      <div className="text-center mb-12">
        <span className="font-mono text-neon-cyan text-sm tracking-[0.3em] uppercase">
          — Reserve Your Date —
        </span>
        <h2
          className="font-extrabold tracking-widest uppercase text-arcade-white mt-3 mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Book Your Event
        </h2>
        <div className="w-16 h-px bg-neon-cyan mx-auto" />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all"
              style={
                step === s
                  ? { backgroundColor: '#FF007F', color: '#0B0A16' }
                  : step > s
                  ? { backgroundColor: '#00F0FF', color: '#0B0A16' }
                  : { border: '1px solid rgba(0,240,255,0.3)', color: '#A39FD1' }
              }
            >
              {step > s ? '✓' : s}
            </div>
            {s < 3 && (
              <div
                className="w-12 h-px"
                style={{
                  backgroundColor:
                    step > s ? '#00F0FF' : 'rgba(0,240,255,0.2)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 — Event Type */}
      {step === 1 && (
        <div>
          <p className="font-mono text-neon-cyan text-xs tracking-widest uppercase text-center mb-6">
            SELECT EVENT TYPE
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {EVENT_TYPES.map((et) => (
              <button
                key={et.id}
                onClick={() => setEventType(et.id)}
                className="py-4 px-4 rounded font-mono text-sm tracking-wider uppercase transition-all"
                style={
                  eventType === et.id
                    ? { backgroundColor: '#00F0FF', color: '#0B0A16', fontWeight: 700 }
                    : {
                        border: '1px solid rgba(0,240,255,0.35)',
                        color: '#A39FD1',
                      }
                }
              >
                {et.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => canAdvance1 && setStep(2)}
            className="w-full py-4 font-mono font-bold tracking-widest uppercase text-sm rounded transition-opacity min-h-11"
            style={
              canAdvance1
                ? { backgroundColor: '#FF007F', color: '#0B0A16' }
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
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className="py-3 rounded font-mono text-xs tracking-wide transition-all min-h-11"
                  style={
                    selectedTime === slot
                      ? { backgroundColor: '#FF007F', color: '#0B0A16', fontWeight: 700 }
                      : { border: '1px solid rgba(0,240,255,0.3)', color: '#A39FD1' }
                  }
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 font-mono text-sm tracking-widest uppercase rounded min-h-11"
              style={{ border: '1px solid rgba(0,240,255,0.3)', color: '#A39FD1' }}
            >
              ← BACK
            </button>
            <button
              onClick={() => canAdvance2 && setStep(3)}
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
            <p className="font-mono text-neon-cyan text-xs tracking-widest uppercase text-center mb-6">
              HOW MANY GUESTS?
            </p>

            <div className="mb-4 text-center">
              <span
                className="font-mono font-bold text-neon-yellow"
                style={{ fontSize: '3rem' }}
              >
                {guestCount}
              </span>
              <span className="font-mono text-arcade-muted text-sm ml-2">GUESTS</span>
            </div>

            <input
              type="range"
              min={10}
              max={150}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full mb-8"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 font-mono text-sm tracking-widest uppercase rounded min-h-11"
                style={{ border: '1px solid rgba(0,240,255,0.3)', color: '#A39FD1' }}
              >
                ← BACK
              </button>
              <button
                onClick={() => setSubmitted(true)}
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

          {/* Right: sticky ledger */}
          <div className="col-span-1 lg:col-span-5">
            <div
              className="font-mono text-sm rounded p-5 lg:sticky lg:top-20"
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

        </div>
      )}

      {/* Confirmation */}
      {submitted && (
        <div
          className="text-center py-12 px-8 rounded"
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
    </div>
  )
}
