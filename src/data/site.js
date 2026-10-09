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
    year: '2026',
    what: 'AkJol',
    where: 'Study paths, open to all',
    media: { type: 'image', src: '/media/akjol.webp', alt: 'AkJol' },
  },
]

export const about = {
  lines: [
    'I spent almost three years measuring aerospace parts at Micro-Sud. Then I learned to code.',
    'Today I build Lychee at Mango3D and study engineering at Junia ISEN.',
  ],
  open: 'Open to a 12-week engineering internship abroad, and to freelance work.',
}
