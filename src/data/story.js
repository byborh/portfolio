// Source of truth for this copy: COPY.md. Claims marked ⚠️ there are not confirmed yet.

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
