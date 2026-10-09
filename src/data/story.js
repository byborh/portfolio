// Claims not confirmed yet by the owner (see TODO.md, "Points à confirmer"):
// "to the micron", "530,000+ users", "under 7 seconds".

export const hero = {
  eyebrow: 'Platform & Services Developer · Mango3D · Bordeaux',
  headline: {
    before: 'I measured aerospace parts to the micron.',
    after: 'Now I ship software for 530,000+ users.',
  },
  lead:
    'For almost three years, I inspected critical machined parts at Micro-Sud. Then I learned to code. Today I build full-stack features for Lychee at Mango3D, and I study engineering at Junia ISEN. I bring one habit from the workshop: measure first, then claim.',
  badge: 'Available for new projects',
}

// Years as decimals (month / 12) so the ruler can place each mark to scale.
export const journey = {
  start: 2021.9,
  end: 2028.6,
  marks: [
    { at: 2021.9, year: '2021', caption: 'Micro-Sud · metrology' },
    { at: 2023.95, year: '2023', caption: 'First commit' },
    { at: 2025.7, year: '2025', caption: 'Mango3D · Lychee' },
    { at: 2028.6, year: '2028', caption: 'Engineer · Junia' },
  ],
}

export const precision = {
  label: '01 — Where I started',
  title: 'Tolerance is not an opinion.',
  paragraphs: [
    'I trained as a machinist (Bac Pro, 2023). From 2021 to 2024, I worked at Micro-Sud, a precision-machining company in Mérignac. I inspected critical parts for aerospace and defence clients. I used micrometers, calipers and coordinate measuring machines. I documented every measurement and reported every non-conformity.',
    'A part is in tolerance, or it is not. Nobody argues with the measurement. That rule still shapes how I write software.',
  ],
  tools: ['CMM', 'Micrometers', 'Calipers', 'Non-conformity reports'],
}

export const theSwitch = {
  label: '02 — The switch',
  title: 'First repository: “I’m learning a git”.',
  paragraphs: [
    'On 17 December 2023, I pushed my first repository. I studied application development in a BTS SIO at Lycée Gustave Eiffel, Bordeaux.',
    'In 2024, I joined Snapp’ as a web developer intern. Snapp’ then hired me on contract to build a responsive Vue.js and TypeScript front end for the Butterfly Packaging platform. I still worked at Micro-Sud during school holidays.',
  ],
  // Values from the GitHub API for byborh/git-learning-17-12-2023.
  firstRepo: {
    name: 'byborh/git-learning-17-12-2023',
    created: '2023-12-17',
    about: 'I’m learning a git and a github',
  },
  steps: [
    { when: '2023', what: 'BTS SIO', where: 'Lycée Gustave Eiffel, Bordeaux' },
    { when: 'May 2024', what: 'Web developer intern', where: 'Snapp’, Bordeaux' },
    { when: 'May–Aug 2024', what: 'Front-end developer, contract', where: 'Snapp’ · Butterfly Packaging' },
  ],
}

export const bridge = {
  label: '03 — The bridge',
  title: 'I built the website of the workshop where I measured parts.',
  lead:
    'Micro-Sud needed a site with a back office to edit its content. I knew the company from the inside, so I built it. I built it three times.',
  versions: [
    {
      ref: 'v1 · 2024',
      stack: ['NestJS', 'TypeORM'],
      repos: 1,
      status: 'Prototype',
      shipped: false,
      note: 'In-memory data, hard-coded admin.',
    },
    {
      ref: 'v2 · 2025',
      stack: ['Express + Datte', 'Vue ×2', 'Redis', 'S3'],
      repos: 3,
      status: 'Not shipped',
      shipped: false,
      note: 'Secure, but ~140 files of abstraction for one content table.',
    },
    {
      ref: 'v3 · 2026',
      stack: ['Next.js 15', 'Drizzle', 'Neon', 'Vercel Blob'],
      repos: 1,
      status: 'Live',
      shipped: true,
      note: 'One app, types inferred from the schema, direct uploads.',
    },
  ],
  lesson: {
    title: 'The lesson',
    text: 'In machining, a tolerance tighter than the need costs money and adds nothing. Version 2 had that problem. For version 3, I removed what the need did not justify. It shipped.',
  },
  live: 'https://micro-sud.vercel.app',
  caseStudy: '/projects#micro-sud',
}

export const now = {
  label: '04 — Now',
  title: 'Building Lychee at Mango3D.',
  lead:
    'Since September 2025, I have been a Platform & Services Developer apprentice at Mango3D in Bordeaux. Mango3D builds Lychee, a family of 3D products. I ship to production in Scrum and Kanban, and I take part in cross-team code reviews.',
  products: [
    {
      ref: 'LYC-01',
      name: 'Lychee Studio',
      url: 'https://lychee-studio.ai/',
      meta: 'lychee-studio.ai',
      about:
        'An AI platform for 3D creation. One canvas generates images, 3D models and videos from a prompt, with real-time collaboration.',
      work: 'Full-stack features in Next.js and TypeScript, in a single front-end and back-end repository.',
    },
    {
      ref: 'LYC-02',
      name: 'Lychee Gen',
      url: 'https://3dgen.lychee.co/',
      meta: '3dgen.lychee.co',
      about:
        'Create your own printable 3D models. Describe an idea and get a print-ready model in minutes, with no modeling skills.',
      work: 'End-to-end analytics with Google Analytics 4. I instrumented the UI and the full checkout funnel. The company got its first reliable conversion rate.',
    },
    {
      ref: 'LYC-03',
      name: 'Lychee Slicer',
      url: 'https://lychee.co/lychee-slicer',
      meta: '530,000+ users',
      about: 'The 3D-printing slicer of the Lychee family.',
      work: 'Pre-release QA with Postman. Validation of the Stripe payment flows, so that every transaction is tracked.',
    },
  ],
  extra: 'I also designed and shipped an internal room-booking tool on my own.',
}

export const sideQuests = {
  label: '05 — Side quests',
  title: 'I learn by shipping with other people.',
  items: [
    {
      ref: 'Jan–Mar 2025',
      name: 'Benomads',
      role: 'Co-founder & lead full-stack developer',
      text: 'I built a service that deploys a complete web app — front end, back end, database and custom domain — in under 7 seconds. Vue.js, Node.js, CI/CD, multi-tenant.',
    },
    {
      ref: '2025',
      name: 'Datte',
      role: 'Open-source backend core',
      text: 'One environment variable selects the database: MySQL, PostgreSQL, MariaDB, SQLite, MSSQL, Redis or MongoDB. ES256 JWT auth, one Docker Compose file per engine.',
      link: '/projects#datte',
    },
    {
      ref: 'Jan 2025',
      name: 'Global Game Jam',
      role: 'Game developer, team of six',
      text: '48 hours, the theme “Bubble”. We built a game in Godot, inspired by Crazy Arcade. Two teammates were Korean, so we worked in English.',
    },
    {
      ref: 'Jul–Aug 2024',
      name: 'Paris 2024',
      role: 'Olympic and Paralympic Games volunteer',
      text: 'Two months on the ground with the organizing committee.',
    },
  ],
}

export const path = {
  label: '06 — Opening the path',
  title: 'I build the tools I needed.',
  lead:
    'Nobody gave me a map. I had to find a school, an internship and an apprenticeship by myself. So I build maps for the next person.',
  items: [
    {
      ref: 'AkJol',
      name: 'AkJol',
      meta: 'akjol-bay.vercel.app',
      url: 'https://akjol-bay.vercel.app',
      featured: true,
      text: 'AkJol means “white path” in Kazakh. You describe your diploma, your languages and your budget. AkJol shows which study paths are open, open with an extra step, or closed. A rules engine checks language levels (CEFR) and diploma equivalences. An LLM suggests data enrichments, and a human reviews each one.',
      note: 'Coverage today: 10 countries, mostly IT programs in France.',
      link: '/projects#akjol',
    },
    {
      ref: 'careerLauncher',
      name: 'careerLauncher',
      meta: '★ 9',
      url: 'https://github.com/byborh/careerLauncher',
      text: 'An open dataset of 129 public hiring emails at tech companies. Each entry has a source and a verification date. The app cannot send bulk email, by design.',
      link: '/projects#careerlauncher',
    },
    {
      ref: 'Grenade',
      name: 'Grenade',
      meta: '4-day sprint',
      url: 'https://github.com/byborh/grenade-backend',
      text: 'A serverless GraphQL voting API. AWS Lambda, API Gateway, DynamoDB, deployed by GitHub Actions. Votes use an atomic DynamoDB counter.',
    },
  ],
}

export const method = {
  label: '07 — Method',
  title: 'What the workshop taught me about software.',
  rows: [
    {
      workshop: 'Measure before you claim.',
      software: 'Instrument before you decide.',
      proof: 'GA4 funnel for Lychee Gen: the first reliable conversion rate.',
    },
    {
      workshop: 'Inspect before it ships.',
      software: 'QA before release.',
      proof: 'Pre-release QA and Stripe flow checks on Lychee Slicer.',
    },
    {
      workshop: 'Right tolerance, not tightest tolerance.',
      software: 'Build what the need justifies.',
      proof: 'Micro-Sud v3: one app instead of three.',
    },
    {
      workshop: 'Trace every part.',
      software: 'Trace every data point.',
      proof: 'careerLauncher: a source and a date on each entry. AkJol: human review of each AI suggestion.',
    },
  ],
}

export const toolbox = {
  label: '08 — Toolbox',
  title: 'What I build with.',
  groups: [
    { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C', 'SQL', 'PHP'] },
    { name: 'Front end', items: ['Next.js', 'React', 'Vue.js'] },
    { name: 'Back end', items: ['Node.js', 'NestJS', 'Express', 'GraphQL'] },
    { name: 'Data', items: ['PostgreSQL', 'MySQL', 'SQLite / Turso', 'Redis', 'DynamoDB', 'Drizzle', 'TypeORM'] },
    { name: 'Delivery', items: ['Docker', 'GitHub Actions', 'GitLab CI', 'Vercel', 'AWS Lambda', 'API Gateway'] },
    { name: 'Product', items: ['Google Analytics 4', 'Stripe', 'Postman'] },
  ],
}
