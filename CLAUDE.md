@AGENTS.md
# NEON ARCADE — SYSTEM CONSTITUTION

## 1. AESTHETIC ARCHITECTURE (Upscale Midnight Synthwave)
- **Vibe:** High-end retro arcade & private party venue. Nostalgic, electrifying, boutique, tactile. Zero cheesy vector clip-art.
- **Palette (Tailwind v4 Dark Canvas Natively):**
  - Background: `#0B0A16` (Deep CRT Twilight / Obsidian Purple)
  - Surface/Cards: `#15132B` (Midnight Indigo)
  - Primary Typography: `#F8F8FF` (CRT Phosphor White)
  - Secondary Text: `#A39FD1` (Muted Lavender)
  - Neon Cyan Glow (UI Accents & Borders): `#00F0FF`
  - Neon Magenta Glow (High-Intent Conversion Triggers): `#FF007F`
  - Electric Yellow (Token ledgers / Warnings): `#FFE600`
- **Typography:**
  - Headers: Wide, aggressive, geometric uppercase sans-serif (`font-extrabold tracking-widest uppercase`).
  - Booking Ledgers & Game Specs: Strict monospace (mimicking an old arcade high-score screen).
- **CSS Atmosphere:** 
  - Interactive buttons and active card states must utilize subtle CSS neon glows (e.g., `box-shadow: 0 0 20px rgba(255, 0, 127, 0.3)`).
  - Apply an ultra-subtle CRT scanline CSS overlay across the canvas (1.5% opacity) to give the screen physical arcade monitor depth.

## 2. REVENUE & BOOKING MODULES (Core Features)
- **Tiered Party Package Matrix (`PartyPackages.tsx`):**
  - 3 distinct side-by-side columns: *Player 1* (Kids/Casual), *High Roller* (Teens/Birthdays), and *Arcade Royalty* (Full Venue Buyout).
  - Use glowing 1px cyan borders (`#00F0FF`) for standard tiers, and a glowing magenta border (`#FF007F`) for the featured tier.
- **Private Event Booking Triage (`EventBooking.tsx`):**
  - Step 1: Event Type toggle (Kids Birthday, Adult Milestone, Corporate Buyout).
  - Step 2: Interactive date & time slot selector.
  - Step 3: Guest count slider (10 to 150 guests) that dynamically calculates token bundles and pizza add-ons in real-time monospace type.
- **Game Catalog Matrix (`GameCatalog.tsx`):**
  - Filterable tabs: *All, 1970s Golden Age, 1980s Classics, 90s Fighters, Pinball & Rhythm*.
  - Cards display cabinet names, release year, and player capacity in bright green CRT monospace text.
- **Analog Flash Gallery (`Gallery.tsx`):** Masonry grid showcasing high-contrast, flash-style candid event photos against the dark indigo canvas.

## 3. ANTI-SLOP COPY & LOCAL SEO LAWS
- **Banned Copy:** "Level up your party", "Step into a time machine", "Get your game on", "Nostalgia overload", "Ultimate gaming experience".
- **Approved Tone:** Hospitality-focused, energetic, frictionless, authoritative. (e.g., "Private cabinet access.", "Unlimited free-play card bundles.", "Dedicated party host assigned to every booking.")
- **Local SEO:** Inject JSON-LD schema for `EntertainmentBusiness` and `EventVenue`, defining maximum guest capacity, neighborhood cross-streets, parking details, and deposit structures.