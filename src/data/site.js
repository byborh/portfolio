// Facts come from RESEARCH.md and the LinkedIn profile. Keep each line short: the media tells the rest.
// A media entry is { type: 'image' | 'video', src, alt, poster? }. Videos autoplay muted in a loop.

// Each project says who I was on it, what I did, and with what. Two short sentences, not one word.
export const work = [
  {
    title: 'Lychee Studio',
    role: 'Full-stack developer · Mango3D',
    year: '2025 —',
    did: [
      'AI 3D creation on one shared canvas: images, 3D models and video from a prompt.',
      'I build features across the front end and the back end of one Next.js app, and ship them in Scrum sprints.',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js'],
    url: 'https://lychee-studio.ai/',
    media: { type: 'image', src: '/media/lychee-studio.webp', alt: 'Lychee Studio home page with a 3D samurai helmet' },
    size: 'full',
  },
  {
    title: 'Lychee Gen',
    role: 'Analytics & checkout · Mango3D',
    year: '2025 —',
    did: [
      'Turns a prompt into a printable 3D model, for people with no modeling skills.',
      'I instrumented the interface and the whole checkout funnel with GA4: the first reliable conversion rate.',
    ],
    stack: ['Google Analytics 4', 'Stripe', 'TypeScript'],
    url: 'https://3dgen.lychee.co/',
    media: { type: 'image', src: '/media/lychee-gen.webp', alt: 'Lychee Gen home page with generated dragon models' },
    size: 'half',
  },
  {
    title: 'Lychee Slicer',
    role: 'QA & payments · Mango3D',
    year: '2025 —',
    did: [
      // Figure from lychee.co (October 2026); LinkedIn still says 530,000+.
      'The 3D-printing slicer, used by more than a million people.',
      'I run the pre-release QA with Postman and validated the Stripe payment flows.',
    ],
    stack: ['Postman', 'Stripe'],
    url: 'https://lychee.co/resin-sla-msla-3d-printers',
    media: { type: 'image', src: '/media/lychee.webp', alt: 'Lychee home page: the world’s number one 3D slicer, one million users' },
    size: 'half',
  },
  {
    title: 'Micro-Sud',
    role: 'Freelance · website & back office',
    year: '2024 — 2026',
    did: [
      'Public site and admin panel for the precision-machining workshop where I worked as a metrology inspector.',
      'Built three times — NestJS, then Express + Vue, then one Next.js app. The third one shipped.',
    ],
    stack: ['Next.js 15', 'Drizzle', 'Neon', 'Vercel Blob'],
    url: 'https://micro-sud.vercel.app',
    media: { type: 'image', src: '/media/micro-sud.webp', alt: 'Micro-Sud website: precision machining for aerospace and industry' },
    size: 'half',
  },
  {
    title: 'AkJol',
    role: 'Personal project · education router',
    year: '2026',
    did: [
      '“White path” in Kazakh. Enter your diploma, languages and budget: see which study paths are open to you.',
      'A rules engine for language levels and diploma equivalences, official French data, AI suggestions checked by a human.',
    ],
    stack: ['Next.js 16', 'Drizzle', 'Turso', 'Claude API'],
    url: 'https://akjol-bay.vercel.app',
    media: { type: 'image', src: '/media/akjol.webp', alt: 'AkJol home page: from your diploma to your options, everywhere' },
    size: 'half',
  },
]

export const more = [
  { title: 'Datte', line: 'One backend core, any database', year: '2025', url: 'https://github.com/byborh/datte' },
  { title: 'careerLauncher', line: '129 sourced hiring emails, open data', year: '2025', url: 'https://github.com/byborh/careerLauncher' },
  { title: 'Grenade', line: 'Serverless GraphQL voting, built in four days', year: '2025', url: 'https://github.com/byborh/grenade-backend' },
]

// Two tracks, oldest first: what I studied and worked on, and what I lived on the side.
// detail: one or two sentences. media: optional preview shown on hover.
export const path = {
  pro: [
    { year: '2021 — 2024', what: 'Metrology inspector', where: 'Micro-Sud, Mérignac', detail: 'Inspected critical machined parts for aerospace clients with micrometers, calipers and coordinate measuring machines — during school holidays and internships.' },
    { year: '2023', what: 'Bac Pro, machining', where: 'Vocational high school', detail: 'Trained as a machining technician: reading technical drawings, tolerances, production.' },
    { year: '2023 — 2025', what: 'BTS SIO', where: 'Lycée Gustave Eiffel, Bordeaux', detail: 'Two-year degree in application development: algorithms, databases, web projects.' },
    { year: '2024', what: 'Web developer', where: 'Snapp’, Bordeaux', detail: 'Five-week internship, then a contract: a responsive Vue.js and TypeScript front end for the Butterfly Packaging platform.' },
    {
      year: '2024 — 2026',
      what: 'Micro-Sud website',
      where: 'Freelance',
      detail: 'The site and back office of my former workshop, rebuilt until it shipped.',
      media: { type: 'image', src: '/media/micro-sud.webp', alt: 'Micro-Sud website' },
    },
    { year: '2025', what: 'Co-founder & lead developer', where: 'Benomads', detail: 'Built a service that deploys a complete web app — front end, back end, database and domain — in under 7 seconds.' },
    {
      year: '2025 —',
      what: 'Platform & Services Developer',
      where: 'Mango3D, Bordeaux',
      detail: 'Apprenticeship. Full-stack features, analytics and payments for the Lychee products.',
      media: { type: 'image', src: '/media/lychee-studio.webp', alt: 'Lychee Studio' },
    },
    { year: '2025 — 2028', what: 'Engineering degree', where: 'Junia ISEN, Bordeaux', detail: 'Computer software engineering, with 60% of the time in the company and 12+ weeks abroad.' },
  ],
  life: [
    { year: '2023', what: '“I’m learning a git”', where: 'GitHub, 17 December', detail: 'My first repository. The start of the switch from machining to code.', quote: true },
    { year: '2024', what: 'Olympic volunteer', where: 'Paris 2024', detail: 'Two months with the organising committee of the Olympic and Paralympic Games.' },
    { year: '2025', what: 'Global Game Jam', where: 'Bordeaux', detail: 'A game in 48 hours with Godot, in a team of six. We worked in English: two teammates were Korean.' },
    {
      year: '2025',
      what: 'First film',
      where: 'YouTube',
      detail: 'A month in the life of an engineering student in France.',
      media: { type: 'image', src: '/media/films/vlog.jpg', alt: 'Thumbnail of the vlog' },
    },
    {
      year: '2026',
      what: 'AkJol',
      where: 'Side project',
      detail: 'The study-path map I wish I had when I looked for a school.',
      media: { type: 'image', src: '/media/akjol.webp', alt: 'AkJol' },
    },
    {
      year: '2026',
      what: 'Ten minutes in Morocco',
      where: 'Film',
      detail: 'Marrakech and Casablanca. Pure image, no music.',
      media: { type: 'image', src: '/media/photos/casablanca-mosque.webp', alt: 'The Hassan II Mosque in Casablanca at night' },
    },
  ],
}

export const about = {
  intro: 'I’m Beibarys — a full-stack developer and engineering student in Bordeaux.',
  lines: [
    'I spent almost three years measuring aerospace parts at Micro-Sud. Then I learned to code.',
    'Today I build the Lychee 3D products at Mango3D, and I study software engineering at Junia ISEN.',
  ],
  open: 'Open to a 12-week engineering internship abroad, and to freelance work.',
}

// What I build with, by area.
export const skills = [
  { area: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C', 'PHP', 'SQL'] },
  { area: 'Front end', items: ['Vue.js', 'Next.js', 'React'] },
  { area: 'Back end', items: ['Node.js', 'NestJS', 'Express', 'GraphQL', 'REST'] },
  { area: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'SQLite / Turso', 'DynamoDB', 'Drizzle', 'TypeORM'] },
  { area: 'Delivery', items: ['Docker', 'GitHub Actions', 'GitLab CI', 'Vercel', 'AWS Lambda'] },
  { area: 'Product', items: ['Google Analytics 4', 'Stripe', 'Postman', 'Scrum'] },
]

// Off hours: shown as small experiences, not described.
export const offHours = {
  // Real triathlon order: swim, bike, run. Each leg is one hour.
  // Each track is scaled to its own distance: every leg is a full effort, none looks small.
  // pace: 'per100m' (swim), 'kmh' (bike), 'perkm' (run) — the usual unit of each sport.
  triathlon: [
    { sport: 'Swim', km: 3, pace: 'per100m', texture: 'wave' },
    { sport: 'Bike', km: 25, pace: 'kmh', texture: 'line' },
    { sport: 'Run', km: 10, pace: 'perkm', texture: 'dash' },
  ],
  chess: {
    elo: 1100,
    opening: 'Kádas Opening',
    // Lines from published theory (Wikipedia "Desprez Opening", Wikibooks "1. h4").
    // Notes are short teaching comments. src/lib/chess.js replays every move and throws on a bad one.
    lines: [
      {
        name: 'Bronstein’s setup',
        tag: '1… e5',
        moves: [
          { san: 'h4', from: 'h2', to: 'h4', note: 'The Kádas. The h-pawn takes two squares. It opens a path for the h1 rook and gains space on the king side, but it does nothing for the centre.' },
          { san: 'e5', from: 'e7', to: 'e5', note: 'Black takes the centre at once and opens lines for the queen and the f8 bishop.' },
          { san: 'g3', from: 'g2', to: 'g3', note: 'White prepares Bg2: the bishop will aim down the long diagonal.' },
          { san: 'd5', from: 'd7', to: 'd5', note: 'A second centre pawn. Black has the ideal duo e5–d5.' },
          { san: 'd4', from: 'd2', to: 'd4', note: 'White strikes back in the centre before Black builds more.' },
          { san: 'exd4', from: 'e5', to: 'd4', note: 'Black trades the e-pawn. The centre opens.' },
          { san: 'Qxd4', from: 'd1', to: 'd4', note: 'The queen recaptures. Active, but exposed in the middle of the board.' },
          { san: 'Nc6', from: 'b8', to: 'c6', note: 'Development with tempo: the knight attacks the queen.' },
          { san: 'Qd1', from: 'd4', to: 'd1', note: 'The queen goes home. White loses time, but keeps a healthy structure.' },
          { san: 'Nf6', from: 'g8', to: 'f6', note: 'Natural development. The knight guards d5 and eyes e4.' },
          { san: 'Nh3', mark: '!', from: 'g1', to: 'h3', note: 'The point of h4: the knight uses h3 on its way to f4. The h-pawn no longer stands in its way.' },
          { san: 'Be7', from: 'f8', to: 'e7', note: 'Black prepares to castle.' },
          { san: 'Nf4', from: 'h3', to: 'f4', note: 'The knight hits d5 and watches e6 and g6.' },
          { san: 'O-O', from: 'e8', to: 'g8', rook: ['h8', 'f8'], note: 'Black castles. The king is safe and Black is well developed.' },
          { san: 'Bg2', from: 'f1', to: 'g2', note: 'The bishop joins the pressure on d5. Bronstein gave this as a good setup for White.' },
        ],
      },
      {
        name: 'The trap to avoid',
        tag: '2. Rh3??',
        moves: [
          { san: 'h4', from: 'h2', to: 'h4', note: 'The Kádas. The rook on h1 can now move up the h-file.' },
          { san: 'd5', from: 'd7', to: 'd5', note: 'Black takes the centre. Look at the c8 bishop: the whole diagonal c8–h3 is now open.' },
          { san: 'Rh3', mark: '??', from: 'h1', to: 'h3', note: 'The classic mistake. The rook looks active, but h3 sits on the bishop’s diagonal.' },
          { san: 'Bxh3', from: 'c8', to: 'h3', note: 'The bishop takes the rook.' },
          { san: 'Nxh3', from: 'g1', to: 'h3', note: 'White gets the bishop back but has lost the exchange: a rook for a bishop. Keep the rook home early on.' },
        ],
      },
      {
        name: 'Myers Variation',
        tag: '1… d5 2. d4 c5 3. e4',
        moves: [
          { san: 'h4', from: 'h2', to: 'h4', note: 'The Kádas. Space on the king side, nothing yet in the centre.' },
          { san: 'd5', from: 'd7', to: 'd5', note: 'Black takes the centre. Remember: from now on, Rh3 loses the rook to Bxh3.' },
          { san: 'd4', from: 'd2', to: 'd4', note: 'White puts a pawn in the centre too.' },
          { san: 'c5', from: 'c7', to: 'c5', note: 'Black attacks d4 at once.' },
          { san: 'e4', from: 'e2', to: 'e4', note: 'The Myers Variation. White offers the e-pawn to open the centre fast. Both captures are possible: 3… dxe4 or 3… cxd4.' },
        ],
      },
      {
        name: 'Kádas Gambit',
        tag: '1… c5 2. b4',
        moves: [
          { san: 'h4', from: 'h2', to: 'h4', note: 'The Kádas, one more time.' },
          { san: 'c5', from: 'c7', to: 'c5', note: 'Black answers on the other wing: the c-pawn controls d4.' },
          { san: 'b4', from: 'b2', to: 'b4', note: 'The Kádas Gambit. White gives the b-pawn to pull Black’s c-pawn away from the centre.' },
          { san: 'cxb4', from: 'c5', to: 'b4', note: 'Black accepts. In return, White gets open lines: b2 is free for the bishop on the long diagonal.' },
        ],
      },
      {
        name: 'Against the fianchetto',
        tag: '1… g6 2. h5',
        moves: [
          { san: 'h4', from: 'h2', to: 'h4', note: 'The Kádas. Watch the h-pawn: here it has a real target.' },
          { san: 'g6', from: 'g7', to: 'g6', note: 'Black prepares Bg7. This is rare against h4, and the next move shows why.' },
          { san: 'h5', from: 'h4', to: 'h5', note: 'The h-pawn hits g6 at once, before Black castles.' },
          { san: 'Bg7', from: 'f8', to: 'g7', note: 'Black completes the fianchetto anyway.' },
          { san: 'hxg6', from: 'h5', to: 'g6', note: 'White trades on g6 to open the h-file.' },
          { san: 'hxg6', from: 'h7', to: 'g6', note: 'Black recaptures. The h-file is now fully open.' },
          { san: 'Rxh8', from: 'h1', to: 'h8', note: 'The h1 rook, freed by 1. h4, uses the open file and trades itself for Black’s rook.' },
          { san: 'Bxh8', from: 'g7', to: 'h8', note: 'The rooks are off. Black’s bishop sits in the corner and g6 has lost its partner on h7.' },
        ],
      },
    ],
  },
}

// YouTube channel @kazakh_rh. Thumbnails are stored locally; the player loads only on click.
export const camera = {
  channel: 'https://www.youtube.com/@kazakh_rh',
  films: [
    {
      id: 'fSgh4eQ6UhM',
      title: 'Ten minutes in Morocco',
      line: 'Marrakech & Casablanca. Pure image, no music.',
      year: '2026',
      poster: '/media/films/morocco.jpg',
      format: 'wide',
    },
    {
      id: 'p8W_zvvlYIw',
      title: 'A month as an engineering student',
      // Plain words: Windows draws flag emoji as two letters.
      line: 'France · Kazakhstan',
      year: '2025',
      poster: '/media/films/vlog.jpg',
      format: 'wide',
    },
    {
      id: 's2szBKy_1CA',
      title: 'Morocco, vertical',
      line: 'Short',
      year: '2026',
      poster: '/media/films/short.jpg',
      format: 'tall',
    },
  ],
}

// Photography: own photos only (resized to WebP, metadata removed; originals in photos-original/, not deployed).
// Photos with identifiable people are left out.
// Captions name only what the photo shows for sure — edit `place` where you know more.
// ratio: aspect ratio of the frame. The wall layout lives in StillsBlock.vue.
export const stills = [
  { src: '/media/photos/casablanca-mosque.webp', alt: 'The minaret and carved gate of the Hassan II Mosque at night', place: 'Casablanca', ratio: '3 / 4' },
  { src: '/media/photos/giraffe.webp', alt: 'A giraffe’s head and neck against a blue sky with small clouds', place: 'Giraffe', ratio: '3 / 4' },
  { src: '/media/photos/pool.webp', alt: 'An indoor swimming pool with lane ropes under a white roof frame', place: 'Lane four', ratio: '3 / 4' },
  { src: '/media/photos/pool-sunset.webp', alt: 'An outdoor pool at sunset beside a glass building', place: 'Last light', ratio: '3 / 4' },
  { src: '/media/photos/geneva.webp', alt: 'Lake Geneva with the Jet d’Eau, a paddle steamer and a Swiss flag', place: 'Geneva', ratio: '3 / 4' },
  { src: '/media/photos/shore-sunset.webp', alt: 'Sunset over a rocky shore at low tide under heavy clouds', place: 'Low tide', ratio: '3 / 4' },
  { src: '/media/photos/facades.webp', alt: 'Stone façades and columns of a grand street under a pale sky', place: 'Façades', ratio: '3 / 4' },
  { src: '/media/photos/ramen.webp', alt: 'Two bowls of ramen, gyoza and fried chicken on a wooden table, seen from above', place: 'Ramen', ratio: '3 / 4' },
]

// Countries visited, by Natural Earth ADM0_A3 code (see src/data/map.js).
export const travel = {
  visited: [
    { id: 'FRA', name: 'France' },
    { id: 'ESP', name: 'Spain' },
    { id: 'AND', name: 'Andorra' },
    { id: 'MCO', name: 'Monaco' },
    { id: 'ITA', name: 'Italy' },
    { id: 'CHE', name: 'Switzerland' },
    { id: 'DEU', name: 'Germany' },
    { id: 'LUX', name: 'Luxembourg' },
    { id: 'BEL', name: 'Belgium' },
    { id: 'NLD', name: 'Netherlands' },
    { id: 'GRC', name: 'Greece' },
    { id: 'TUR', name: 'Türkiye' },
    { id: 'RUS', name: 'Russia' },
    { id: 'MAR', name: 'Morocco' },
    { id: 'KAZ', name: 'Kazakhstan' },
  ],
  // Too small to see as a shape at this scale: drawn as a dot as well.
  markers: ['AND', 'MCO', 'LUX'],
}
