// Facts come from RESEARCH.md and the LinkedIn profile. Keep each line short: the media tells the rest.
// A media entry is { type: 'image' | 'video', src, alt, poster? }. Videos autoplay muted in a loop.

export const work = [
  {
    title: 'Lychee Studio',
    year: '2025 —',
    line: 'AI 3D creation on one canvas. I build full-stack features in Next.js.',
    url: 'https://lychee-studio.ai/',
    media: { type: 'image', src: '/media/lychee-studio.webp', alt: 'Lychee Studio home page with a 3D samurai helmet' },
    size: 'full',
  },
  {
    title: 'Lychee Gen',
    year: '2025 —',
    line: 'From a prompt to a printable 3D model. I instrumented the checkout funnel.',
    url: 'https://3dgen.lychee.co/',
    media: { type: 'image', src: '/media/lychee-gen.webp', alt: 'Lychee Gen home page with generated dragon models' },
    size: 'half',
  },
  {
    title: 'Lychee Slicer',
    year: '2025 —',
    line: 'Resin 3D-printing slicer, 530,000+ users. Pre-release QA, Stripe flows.',
    url: 'https://lychee.co/resin-sla-msla-3d-printers',
    media: { type: 'image', src: '/media/lychee-slicer.webp', alt: 'Lychee Slicer product page with a T-rex model' },
    size: 'half',
  },
  {
    title: 'Micro-Sud',
    year: '2024 — 2026',
    line: 'Website and back office for the workshop where I used to measure parts.',
    url: 'https://micro-sud.vercel.app',
    media: { type: 'image', src: '/media/micro-sud.webp', alt: 'Micro-Sud website: precision machining for aerospace and industry' },
    size: 'half',
  },
  {
    title: 'AkJol',
    year: '2026',
    line: '“White path” in Kazakh. It shows which study paths are open to you.',
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

// Oldest first: the list reads as the path itself.
export const path = [
  { year: '2021', what: 'Metrology inspector', where: 'Micro-Sud, Mérignac' },
  { year: '2023', what: 'Bac Pro, machining', where: 'Vocational high school' },
  { year: '2023', what: '“I’m learning a git”', where: 'First repository, 17 December', quote: true },
  { year: '2023', what: 'BTS SIO', where: 'Lycée Gustave Eiffel, Bordeaux' },
  { year: '2024', what: 'Web developer', where: 'Snapp’, Bordeaux' },
  { year: '2024', what: 'Volunteer', where: 'Paris 2024 Olympic Games' },
  {
    year: '2024',
    what: 'Micro-Sud website',
    where: 'Built three times',
    media: { type: 'image', src: '/media/micro-sud.webp', alt: 'Micro-Sud website' },
  },
  { year: '2025', what: 'Global Game Jam', where: '48 hours, Godot, team of six' },
  { year: '2025', what: 'Co-founder', where: 'Benomads' },
  {
    year: '2025',
    what: 'Platform & Services Developer',
    where: 'Mango3D, Bordeaux',
    media: { type: 'image', src: '/media/lychee-studio.webp', alt: 'Lychee Studio' },
  },
  { year: '2025', what: 'Engineering student', where: 'Junia ISEN, Bordeaux' },
  {
    year: '2025',
    what: 'First film',
    where: 'A month as an engineering student',
    media: { type: 'image', src: '/media/films/vlog.jpg', alt: 'Thumbnail of the vlog' },
  },
  {
    year: '2026',
    what: 'AkJol',
    where: 'Study paths, open to all',
    media: { type: 'image', src: '/media/akjol.webp', alt: 'AkJol' },
  },
  {
    year: '2026',
    what: 'Ten minutes in Morocco',
    where: 'Film, no music',
    media: { type: 'image', src: '/media/stills/casablanca-pier.jpg', alt: 'Fishermen on the Casablanca seafront' },
  },
]

export const about = {
  lines: [
    'I spent almost three years measuring aerospace parts at Micro-Sud. Then I learned to code.',
    'Today I build Lychee at Mango3D and study engineering at Junia ISEN.',
  ],
  open: 'Open to a 12-week engineering internship abroad, and to freelance work.',
}

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
    // [from, to, SAN] in algebraic squares. 1. h4, then the rook lift Rh3 that h4 makes possible.
    // No captures, so the loop can replay from the start.
    moves: [
      ['h2', 'h4', '1. h4'],
      ['d7', 'd5', '1… d5'],
      ['d2', 'd4', '2. d4'],
      ['c7', 'c5', '2… c5'],
      ['e2', 'e3', '3. e3'],
      ['b8', 'c6', '3… Nc6'],
      ['h1', 'h3', '4. Rh3'],
      ['g8', 'f6', '4… Nf6'],
      ['c2', 'c3', '5. c3'],
      ['e7', 'e6', '5… e6'],
    ],
  },
  // Photos of your own paintings: { src, alt }. The gallery shows only when this list has items.
  paintings: [],
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
  // Frames from the films, until the photo series is ready. Frames with identifiable people are left out.
  // The Casablanca frame is not here: it is already the poster of the featured film.
  stills: [
    { src: '/media/stills/seafront.jpg', alt: 'Silhouettes walking between palm trees by the sea', caption: 'Morocco' },
    { src: '/media/stills/cat.jpg', alt: 'A black cat passing under bougainvillea leaves', caption: 'Morocco' },
  ],
}
