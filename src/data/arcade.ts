export interface PartyPackage {
  id: string
  name: string
  tagline: string
  tier: 'player1' | 'high-roller' | 'royalty'
  priceFlat: number
  pricePerGuest: number
  minGuests: number
  maxGuests: number
  durationHours: number
  tokensPerGuest: number
  foodInclusions: string[]
  perks: string[]
  featured: boolean
  depositPercent: number
}

export interface ArcadeMachine {
  id: string
  name: string
  manufacturer: string
  year: number
  era: 'golden-age' | 'classics' | 'fighters' | 'pinball-rhythm'
  players: number
  genre: string
  coverImage: string
}

export interface DaySchedule {
  day: string
  regularOpen: string
  regularClose: string
  privateAvailable: boolean
  privateWindow?: { start: string; end: string }
}

export const partyPackages: PartyPackage[] = [
  {
    id: 'player1',
    name: 'Player 1',
    tagline: 'Casual sessions with cabinet access and a dedicated block of time.',
    tier: 'player1',
    priceFlat: 0,
    pricePerGuest: 18,
    minGuests: 10,
    maxGuests: 40,
    durationHours: 2,
    tokensPerGuest: 200,
    foodInclusions: [
      'One pizza slice per guest',
      'Soft drink per guest',
      'Birthday cake plating (BYO cake)',
    ],
    perks: [
      'Reserved cabinet section',
      'Party host check-in at arrival',
      'Token bundle distributed at door',
      'Printed guest wristbands',
    ],
    featured: false,
    depositPercent: 25,
  },
  {
    id: 'high-roller',
    name: 'High Roller',
    tagline: 'Full private section, double the tokens, a dedicated host all night.',
    tier: 'high-roller',
    priceFlat: 0,
    pricePerGuest: 32,
    minGuests: 20,
    maxGuests: 80,
    durationHours: 3,
    tokensPerGuest: 400,
    foodInclusions: [
      'Full pizza pie per 8 guests',
      'Pitcher of soft drinks or lemonade per table',
      'Dessert platter: brownies, cookies, rice crispy treats',
      'Birthday cake plating (BYO cake)',
    ],
    perks: [
      'Dedicated party host assigned to your group',
      'Reserved section with signage',
      'Token bundle + bonus 50 tokens per guest',
      'Priority access to all cabinets',
      'Complimentary birthday photo printout',
      'Custom score board tracking throughout the night',
    ],
    featured: true,
    depositPercent: 30,
  },
  {
    id: 'royalty',
    name: 'Arcade Royalty',
    tagline: 'Full venue buyout. Every cabinet. Your rules. Your night.',
    tier: 'royalty',
    priceFlat: 1800,
    pricePerGuest: 24,
    minGuests: 50,
    maxGuests: 150,
    durationHours: 5,
    tokensPerGuest: 600,
    foodInclusions: [
      'Catered pizza: unlimited pies, rotating specialty options',
      'Slider & wing station for the full event',
      'Open soft bar: sodas, juices, lemonade, sparkling water',
      'Dessert tower with branded cake or custom confection',
      'Dedicated catering staff on-site',
    ],
    perks: [
      'Exclusive full-venue access. Closed to the public.',
      'VIP host team (1 host per 25 guests)',
      'Custom event signage & branded wristbands',
      'Token bundle loaded onto reusable arcade cards',
      'DJ booth access with AUX input',
      'Dedicated parking block reserved in adjacent garage',
      'Event recap photo package delivered within 72 hours',
    ],
    featured: false,
    depositPercent: 20,
  },
]

export const arcadeMachines: ArcadeMachine[] = [
  // 1970s Golden Age
  { id: 'pong-72',            name: 'Pong',                       manufacturer: 'Atari',                   year: 1972, era: 'golden-age',     players: 2, genre: 'Sports / Table Tennis',      coverImage: '/games/pong.jpg' },
  { id: 'space-invaders-78',  name: 'Space Invaders',             manufacturer: 'Taito',                   year: 1978, era: 'golden-age',     players: 1, genre: 'Fixed Shooter',              coverImage: '/games/space-invaders.jpg' },
  { id: 'asteroids-79',       name: 'Asteroids',                  manufacturer: 'Atari',                   year: 1979, era: 'golden-age',     players: 1, genre: 'Multi-Directional Shooter',  coverImage: '/games/asteroids.jpg' },
  { id: 'galaxian-79',        name: 'Galaxian',                   manufacturer: 'Namco',                   year: 1979, era: 'golden-age',     players: 1, genre: 'Fixed Shooter',              coverImage: '/games/galaxian.jpg' },

  // 1980s Classics
  { id: 'centipede-80',       name: 'Centipede',                  manufacturer: 'Atari',                   year: 1980, era: 'classics',       players: 2, genre: 'Fixed Shooter',              coverImage: '/games/centipede.jpg' },
  { id: 'pac-man-80',         name: 'Pac-Man',                    manufacturer: 'Namco',                   year: 1980, era: 'classics',       players: 1, genre: 'Maze Chase',                 coverImage: '/games/pac-man.png' },
  { id: 'donkey-kong-81',     name: 'Donkey Kong',                manufacturer: 'Nintendo',                year: 1981, era: 'classics',       players: 2, genre: 'Platform',                   coverImage: '/games/donkey-kong.jpg' },
  { id: 'galaga-81',          name: 'Galaga',                     manufacturer: 'Namco',                   year: 1981, era: 'classics',       players: 2, genre: 'Fixed Shooter',              coverImage: '/games/galaga.jpg' },
  { id: 'ms-pac-man-81',      name: 'Ms. Pac-Man',                manufacturer: 'Midway / Namco',          year: 1981, era: 'classics',       players: 2, genre: 'Maze Chase',                 coverImage: '/games/ms-pac-man.png' },
  { id: 'tron-82',            name: 'Tron',                       manufacturer: 'Midway',                  year: 1982, era: 'classics',       players: 1, genre: 'Multi-Game Action',          coverImage: '/games/tron.png' },
  { id: 'qbert-82',           name: "Q*Bert",                     manufacturer: 'Gottlieb',                year: 1982, era: 'classics',       players: 2, genre: 'Isometric Platform',         coverImage: '/games/qbert.jpg' },
  { id: 'outrun-86',          name: 'OutRun',                     manufacturer: 'Sega',                    year: 1986, era: 'classics',       players: 1, genre: 'Racing',                     coverImage: '/games/outrun.png' },

  // 1990s Fighters
  { id: 'tmnt-89',            name: 'Teenage Mutant Ninja Turtles', manufacturer: 'Konami',               year: 1989, era: 'fighters',       players: 4, genre: "Beat 'em Up",                coverImage: '/games/tmnt.jpg' },
  { id: 'street-fighter-ii-91', name: 'Street Fighter II',        manufacturer: 'Capcom',                  year: 1991, era: 'fighters',       players: 2, genre: 'Fighting',                   coverImage: '/games/street-fighter-ii.jpg' },
  { id: 'simpsons-91',        name: 'The Simpsons',               manufacturer: 'Konami',                  year: 1991, era: 'fighters',       players: 4, genre: "Beat 'em Up",                coverImage: '/games/simpsons.jpg' },
  { id: 'xmen-92',            name: 'X-Men',                      manufacturer: 'Konami',                  year: 1992, era: 'fighters',       players: 6, genre: "Beat 'em Up",                coverImage: '/games/xmen.png' },
  { id: 'mortal-kombat-92',   name: 'Mortal Kombat',              manufacturer: 'Midway',                  year: 1992, era: 'fighters',       players: 2, genre: 'Fighting',                   coverImage: '/games/mortal-kombat.jpg' },
  { id: 'nba-jam-93',         name: 'NBA Jam',                    manufacturer: 'Midway',                  year: 1993, era: 'fighters',       players: 4, genre: 'Sports / Basketball',        coverImage: '/games/nba-jam.jpg' },
  { id: 'tekken-94',          name: 'Tekken',                     manufacturer: 'Namco',                   year: 1994, era: 'fighters',       players: 2, genre: 'Fighting',                   coverImage: '/games/tekken.jpg' },

  // Pinball & Rhythm
  { id: 'addams-family-92',   name: 'The Addams Family',          manufacturer: 'Williams / Bally',        year: 1992, era: 'pinball-rhythm', players: 4, genre: 'Pinball',                    coverImage: '/games/addams-family.jpg' },
  { id: 'medieval-madness-97', name: 'Medieval Madness',          manufacturer: 'Williams',                year: 1997, era: 'pinball-rhythm', players: 4, genre: 'Pinball',                    coverImage: '/games/medieval-madness.jpg' },
  { id: 'ddr-98',             name: 'Dance Dance Revolution',     manufacturer: 'Konami',                  year: 1998, era: 'pinball-rhythm', players: 2, genre: 'Rhythm / Dance',             coverImage: '/games/ddr.png' },
  { id: 'guitar-hero-07',     name: 'Guitar Hero Arcade',         manufacturer: 'Raw Thrills / Activision', year: 2007, era: 'pinball-rhythm', players: 2, genre: 'Rhythm / Music',            coverImage: '/games/guitar-hero.jpg' },
  { id: 'godzilla-21',        name: 'Godzilla Premium',           manufacturer: 'Stern Pinball',           year: 2021, era: 'pinball-rhythm', players: 4, genre: 'Pinball',                    coverImage: '/games/godzilla.jpg' },
]

export const operatingHours: DaySchedule[] = [
  {
    day: 'Monday',
    regularOpen: '3:00 PM',
    regularClose: '10:00 PM',
    privateAvailable: true,
    privateWindow: { start: '10:00 AM', end: '3:00 PM' },
  },
  {
    day: 'Tuesday',
    regularOpen: '3:00 PM',
    regularClose: '10:00 PM',
    privateAvailable: true,
    privateWindow: { start: '10:00 AM', end: '3:00 PM' },
  },
  {
    day: 'Wednesday',
    regularOpen: '3:00 PM',
    regularClose: '10:00 PM',
    privateAvailable: true,
    privateWindow: { start: '10:00 AM', end: '3:00 PM' },
  },
  {
    day: 'Thursday',
    regularOpen: '3:00 PM',
    regularClose: '10:00 PM',
    privateAvailable: true,
    privateWindow: { start: '10:00 AM', end: '3:00 PM' },
  },
  {
    day: 'Friday',
    regularOpen: '3:00 PM',
    regularClose: '12:00 AM',
    privateAvailable: false,
  },
  {
    day: 'Saturday',
    regularOpen: '12:00 PM',
    regularClose: '12:00 AM',
    privateAvailable: true,
    privateWindow: { start: '10:00 AM', end: '12:00 PM' },
  },
  {
    day: 'Sunday',
    regularOpen: '12:00 PM',
    regularClose: '9:00 PM',
    privateAvailable: true,
    privateWindow: { start: '12:00 PM', end: '4:00 PM' },
  },
]
