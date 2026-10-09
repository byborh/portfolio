// Every fact here comes from RESEARCH.md (code read on 2026-10-09).
// "next" states the known gaps on purpose: the portfolio claims nothing the repo does not hold.

export const caseStudies = [
  {
    id: 'micro-sud',
    ref: 'CS-01',
    title: 'Micro-Sud',
    tagline: 'The website of the workshop where I measured parts — built three times.',
    period: '2024 → 2026',
    spec: 'A precision-machining company needs a public site and a back office to edit pages, machines, blog posts and know-how.',
    build:
      'v1 (2024): a NestJS prototype with in-memory data. v2 (2025): an Express API on Datte, two Vue apps, Redis, S3, JWT with role-based access. v3 (2026): one Next.js 15 app with server actions, a Drizzle schema with inferred types, Neon Postgres, direct uploads to Vercel Blob and a config-driven admin.',
    measured: ['3 repositories → 1', '7 content types', 'v3 live in production'],
    next: 'Signed sessions with expiry, login rate limiting, tests.',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Drizzle', 'Neon', 'Vercel Blob'],
    links: [
      { label: 'Live site', url: 'https://micro-sud.vercel.app' },
      { label: 'Repository', url: 'https://github.com/byborh/micro-sud' },
    ],
  },
  {
    id: 'akjol',
    ref: 'CS-02',
    title: 'AkJol',
    tagline: '“White path” in Kazakh: which study paths are really open to you.',
    period: '2026',
    spec: 'A student with a foreign diploma cannot see which study paths are really open to them.',
    build:
      'Next.js 16 and React 19 in a Turborepo. A feasibility engine with CEFR language ranks and a diploma equivalence graph. An ingest pipeline for ONISEP and Parcoursup. LLM enrichment with structured outputs, and a console where a human reviews each suggestion. French and English.',
    measured: ['10 countries', '60 commits in three months', 'Live'],
    next: 'More countries, tests on the engine.',
    stack: ['Next.js 16', 'React 19', 'Drizzle', 'Turso', 'Turborepo', 'Claude API'],
    links: [
      { label: 'Live app', url: 'https://akjol-bay.vercel.app' },
      { label: 'Repository', url: 'https://github.com/byborh/akjol' },
    ],
  },
  {
    id: 'datte',
    ref: 'CS-03',
    title: 'Datte',
    tagline: 'One backend core, any database.',
    period: '2025',
    spec: 'Every new project starts with the same backend: users, roles, auth, database. I wanted to write it once.',
    build:
      'A factory selects the database family from one environment variable. Each module ships one repository per family: SQL, Redis, Mongo. ES256 JWT, PBKDF2-SHA512 password hashing. One Docker Compose file per engine, driven by a Makefile.',
    measured: ['7 database engines configured', '5 modules', 'Base of Micro-Sud v2'],
    next: 'Re-enable route guards on every module, add tests.',
    stack: ['TypeScript', 'Express', 'TypeORM', 'Redis', 'MongoDB', 'Docker'],
    links: [{ label: 'Repository', url: 'https://github.com/byborh/datte' }],
  },
  {
    id: 'careerlauncher',
    ref: 'CS-04',
    title: 'careerLauncher',
    tagline: 'An open, sourced alternative to paid contact lists.',
    period: '2025 → 2026',
    spec: 'Students pay for contact lists, or guess addresses. I wanted an open, sourced alternative.',
    build:
      'A Markdown dataset with 8 columns, including the source URL and the last-verified date. CI fails a pull request when the data and the app go out of sync. A local-first PWA with optional Firebase sync and tested security rules. It cannot send bulk email, by design.',
    measured: ['129 companies', '9 stars'],
    next: 'Remove accommodation-only inboxes, add a second verification pass.',
    stack: ['JavaScript', 'PWA', 'Firebase', 'GitHub Actions'],
    links: [{ label: 'Repository', url: 'https://github.com/byborh/careerLauncher' }],
  },
]
