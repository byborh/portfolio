<script setup>
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'

/* ---- Curated project catalogue --------------------------------------- */
const allProjects = [
  {
    title: 'Datte',
    category: 'Backend',
    desc: 'A modular, extensible backend platform built on SOLID principles and design patterns, secured with ES256 JWTs.',
    stack: ['TypeScript', 'TypeORM', 'MySQL'],
    link: 'https://github.com/byborh/datte',
    stars: 4,
  },
  {
    title: 'Grenade',
    category: 'Cloud',
    desc: 'Serverless "express vote" app — real-time voting, event-driven on AWS Lambda & DynamoDB.',
    stack: ['TypeScript', 'AWS Lambda', 'DynamoDB'],
    link: 'https://github.com/byborh/grenade-backend',
    stars: 0,
  },
  {
    title: 'Micro-Sud',
    category: 'Full-stack',
    desc: 'Showcase site + protected back-office for a precision-machining company, unified in one Next.js 15 app.',
    stack: ['Next.js', 'Neon', 'Drizzle'],
    link: 'https://github.com/byborh/micro-sud',
    stars: 0,
  },
  {
    title: 'Career Launcher',
    category: 'Open source',
    desc: 'Community-verified public tech-company emails and outreach templates for ethical job applications.',
    stack: ['Open data', 'Templates'],
    link: 'https://github.com/byborh/careerLauncher',
    stars: 7,
  },
  {
    title: 'Task Queue',
    category: 'Backend',
    desc: 'A queue-based task management system backed by Redis for reliable background processing.',
    stack: ['Redis', 'Docker'],
    link: 'https://github.com/byborh/task-queue',
    stars: 0,
  },
  {
    title: 'Physics Explained',
    category: 'Open source',
    desc: 'Open-source resource to learn physics through formulas, intuition, diagrams and interactive notebooks.',
    stack: ['Python', 'Docs'],
    link: 'https://github.com/byborh/physics',
    stars: 1,
  },
  {
    title: 'Fasl.Studio',
    category: 'Full-stack',
    desc: 'E-commerce site for a clothing brand — sell online, in-store and everywhere in between.',
    stack: ['Vue.js'],
    link: 'https://github.com/byborh/fasl.studio',
    stars: 1,
  },
  {
    title: 'Tor Learning',
    category: 'Cloud',
    desc: 'Hands-on exploration of running services and networking behind Tor, containerized with Docker.',
    stack: ['Docker', 'Networking'],
    link: 'https://github.com/byborh/tor-learning',
    stars: 1,
  },
]

const categories = ['All', 'Backend', 'Cloud', 'Full-stack', 'Open source']
const activeCat = ref('All')

const filtered = computed(() =>
  activeCat.value === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCat.value)
)

/* ---- Markdown deep dives --------------------------------------------- */
const markdownFiles = import.meta.glob('/src/components/projects/*.md', {
  query: '?raw',
  import: 'default',
})
const deepDives = ref([])
const openDive = ref(null)

onMounted(async () => {
  const loaded = []
  for (const path in markdownFiles) {
    const content = await markdownFiles[path]()
    const lines = content.split('\n')
    let github = null
    if (lines[0].startsWith('github:')) {
      github = lines[0].replace('github:', '').trim()
      lines.shift()
    }
    const name = path.split('/').pop().replace('.md', '')
    loaded.push({
      name,
      title: name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).trim(),
      html: marked(lines.join('\n')),
      github,
    })
  }
  deepDives.value = loaded
})

function toggleDive(name) {
  openDive.value = openDive.value === name ? null : name
}
</script>

<template>
  <main class="projects-page">
    <div class="container">
      <!-- Header -->
      <header class="pp-head">
        <p class="section-label" v-reveal>Portfolio</p>
        <h1 class="pp-title" v-reveal>Every project,<br />in one place.</h1>
        <p class="section-lead" v-reveal>
          A selection of what I've built — from modular backends and serverless
          apps to full-stack products and open-source tools. Filter by focus.
        </p>
      </header>

      <!-- Filters -->
      <div class="filters" v-reveal>
        <button
          v-for="c in categories"
          :key="c"
          class="filter"
          :class="{ active: activeCat === c }"
          @click="activeCat = c"
        >
          {{ c }}
          <span v-if="c === 'All'" class="filter-count">{{ allProjects.length }}</span>
        </button>
      </div>

      <!-- Grid -->
      <div class="pp-grid">
        <a
          v-for="p in filtered"
          :key="p.title"
          :href="p.link"
          target="_blank"
          rel="noopener"
          class="pp-card panel"
        >
          <div class="pp-card-top">
            <span class="pp-cat mono">{{ p.category }}</span>
            <span v-if="p.stars" class="pp-stars mono"><i class="bi bi-star-fill"></i> {{ p.stars }}</span>
          </div>
          <h3 class="pp-card-title">{{ p.title }}</h3>
          <p class="pp-card-desc">{{ p.desc }}</p>
          <div class="pp-stack">
            <span v-for="t in p.stack" :key="t" class="chip">{{ t }}</span>
          </div>
          <span class="pp-card-cta mono">GitHub <i class="bi bi-arrow-up-right"></i></span>
        </a>
      </div>

      <!-- Deep dives -->
      <section v-if="deepDives.length" class="deep">
        <p class="section-label" v-reveal>Deep dives</p>
        <h2 class="section-title" v-reveal>Read the full story</h2>

        <div class="dive-list">
          <div
            v-for="d in deepDives"
            :key="d.name"
            class="dive panel"
            :class="{ open: openDive === d.name }"
          >
            <button class="dive-head" @click="toggleDive(d.name)">
              <span class="dive-title">{{ d.title }}</span>
              <i class="bi" :class="openDive === d.name ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
            </button>
            <transition name="expand">
              <div v-if="openDive === d.name" class="dive-body">
                <div class="md" v-html="d.html"></div>
                <a v-if="d.github" :href="d.github" target="_blank" rel="noopener" class="btn btn-ghost dive-link">
                  <i class="bi bi-github"></i> View repository
                </a>
              </div>
            </transition>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.projects-page {
  padding-top: 130px;
  min-height: 100vh;
}

.pp-head {
  max-width: 640px;
  margin-bottom: 40px;
}
.pp-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.4rem, 6vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}

/* Filters */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}
.filter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-muted);
  padding: 9px 18px;
  border-radius: 999px;
  border: 1px solid var(--stroke);
  background: var(--surface);
  cursor: pointer;
  transition: all 0.3s var(--ease);
}
.filter:hover {
  color: var(--text);
  border-color: var(--stroke-strong);
}
.filter.active {
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: #0b0b0e;
  border-color: transparent;
}
.filter-count {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  opacity: 0.7;
}

/* Grid */
.pp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 90px;
}
.pp-card {
  display: flex;
  flex-direction: column;
  padding: 26px 26px 22px;
}
.pp-card:hover {
  transform: translateY(-5px);
}
.pp-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.pp-cat {
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
}
.pp-stars {
  font-size: 0.8rem;
  color: #febc2e;
}
.pp-card-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 10px;
}
.pp-card-desc {
  color: var(--text-muted);
  font-size: 0.94rem;
  margin-bottom: 18px;
  flex: 1;
}
.pp-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 18px;
}
.pp-card-cta {
  font-size: 0.82rem;
  color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  transition: gap 0.3s var(--ease), color 0.3s;
}
.pp-card:hover .pp-card-cta {
  color: var(--accent);
  gap: 11px;
}

/* Deep dives */
.deep {
  padding-top: 20px;
}
.dive-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 40px;
}
.dive {
  overflow: hidden;
}
.dive.open {
  border-color: rgba(240, 151, 92, 0.3);
}
.dive-head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 26px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text);
  text-align: left;
}
.dive-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.2rem;
}
.dive-head i {
  color: var(--accent);
  font-size: 1.1rem;
}
.dive-body {
  padding: 0 26px 26px;
}
.dive-link {
  margin-top: 20px;
}

/* Markdown */
.md {
  color: var(--text-muted);
  line-height: 1.75;
  font-size: 0.95rem;
  overflow-x: auto;
}
.md :deep(h1),
.md :deep(h2),
.md :deep(h3) {
  font-family: var(--font-display);
  color: var(--text);
  margin: 1.4em 0 0.5em;
  line-height: 1.2;
}
.md :deep(h1) { font-size: 1.5rem; }
.md :deep(h2) { font-size: 1.25rem; }
.md :deep(h3) { font-size: 1.08rem; }
.md :deep(p) { margin-bottom: 1em; }
.md :deep(ul),
.md :deep(ol) { margin: 0 0 1em 1.2em; }
.md :deep(li) { margin-bottom: 0.4em; }
.md :deep(a) {
  color: var(--accent);
  border-bottom: 1px solid transparent;
}
.md :deep(a:hover) { border-color: var(--accent); }
.md :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: rgba(255, 255, 255, 0.06);
  padding: 2px 6px;
  border-radius: 5px;
}
.md :deep(pre) {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--stroke);
  border-radius: var(--radius-sm);
  padding: 16px;
  overflow-x: auto;
  margin-bottom: 1em;
}
.md :deep(pre code) {
  background: none;
  padding: 0;
}
.md :deep(blockquote) {
  border-left: 3px solid var(--accent);
  padding-left: 16px;
  color: var(--text-faint);
  margin-bottom: 1em;
}
.md :deep(hr) {
  border: none;
  border-top: 1px solid var(--stroke);
  margin: 1.5em 0;
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.45s var(--ease), opacity 0.35s;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 2400px;
  opacity: 1;
}
</style>
