<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

/* ---- Rotating role in hero ------------------------------------------- */
const roles = [
  'Platform & Service Developer',
  'Backend & API architect',
  'Cloud-native · AWS',
  'DevSecOps advocate',
]
const roleText = ref('')
const roleIndex = ref(0)
let charIndex = 0
let deleting = false
let typeTimer

function tick() {
  const full = roles[roleIndex.value]
  if (!deleting) {
    roleText.value = full.slice(0, ++charIndex)
    if (charIndex === full.length) {
      deleting = true
      typeTimer = setTimeout(tick, 1600)
      return
    }
  } else {
    roleText.value = full.slice(0, --charIndex)
    if (charIndex === 0) {
      deleting = false
      roleIndex.value = (roleIndex.value + 1) % roles.length
    }
  }
  typeTimer = setTimeout(tick, deleting ? 45 : 85)
}

/* ---- Live clock (Paris) ---------------------------------------------- */
const clock = ref('')
let clockTimer
function updateClock() {
  clock.value = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Paris',
  }).format(new Date())
}

/* ---- Tilt effect ----------------------------------------------------- */
function onTilt(e) {
  const card = e.currentTarget
  const r = card.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  card.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-6px)`
}
function resetTilt(e) {
  e.currentTarget.style.transform = ''
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    roleText.value = roles[0]
  } else {
    tick()
  }
  updateClock()
  clockTimer = setInterval(updateClock, 1000)
})
onBeforeUnmount(() => {
  clearTimeout(typeTimer)
  clearInterval(clockTimer)
})

/* ---- Data ------------------------------------------------------------ */
const stats = [
  { value: '46+', label: 'public repos' },
  { value: '3+', label: 'years shipping' },
  { value: '10+', label: 'projects built' },
  { value: '∞', label: 'curiosity' },
]

const pillars = [
  {
    icon: 'bi bi-hdd-stack',
    title: 'Backend & platforms',
    desc: 'Modular, SOLID APIs with clean architecture — TypeScript, Node/NestJS, Spring Boot, TypeORM & Drizzle.',
  },
  {
    icon: 'bi bi-cloud-check',
    title: 'Cloud & DevSecOps',
    desc: 'Cloud-native services on AWS (Lambda, EC2, IAM), containerized with Docker and shipped through CI/CD.',
  },
  {
    icon: 'bi bi-window-stack',
    title: 'Frontend & DX',
    desc: 'Fast, accessible interfaces with Vue, Angular and Next.js — obsessed with developer experience.',
  },
]

const skillGroups = [
  { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'PHP', 'C', 'SQL'] },
  { name: 'Backend', items: ['Node.js', 'NestJS', 'Spring Boot', 'TypeORM', 'Drizzle', 'REST'] },
  { name: 'Frontend', items: ['Vue.js', 'Angular', 'Next.js', 'Astro'] },
  { name: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'DynamoDB'] },
  { name: 'Cloud & Ops', items: ['AWS Lambda', 'AWS EC2', 'AWS IAM', 'Docker', 'CI/CD', 'Git'] },
]

const projects = [
  {
    title: 'Datte',
    tag: 'Backend platform',
    desc: 'A modular, extensible backend meant to adapt to any project. Built on SOLID principles and proven design patterns, secured end-to-end with ES256 JWTs.',
    stack: ['TypeScript', 'TypeORM', 'MySQL', 'JWT'],
    link: 'https://github.com/byborh/datte',
    stars: 4,
    featured: true,
  },
  {
    title: 'Grenade',
    tag: 'Serverless',
    desc: 'A serverless "express vote" application — cast and tally votes in real time, fully event-driven on AWS Lambda & DynamoDB.',
    stack: ['TypeScript', 'AWS Lambda', 'DynamoDB'],
    link: 'https://github.com/byborh/grenade-backend',
    stars: 0,
  },
  {
    title: 'Micro-Sud',
    tag: 'Full-stack · client',
    desc: 'Showcase site + back-office for a precision-machining company, unified in a single Next.js 15 app with a type-safe data layer.',
    stack: ['Next.js', 'Neon', 'Drizzle', 'Vercel'],
    link: 'https://github.com/byborh/micro-sud',
    stars: 0,
  },
  {
    title: 'Career Launcher',
    tag: 'Open source',
    desc: 'A curated, community-verified collection of public tech-company emails and ready-to-use templates for ethical outreach.',
    stack: ['Open data', 'Templates', 'Community'],
    link: 'https://github.com/byborh/careerLauncher',
    stars: 7,
  },
]

const timeline = [
  {
    when: '2025 — now',
    role: 'Platform & Service Developer',
    org: 'Mango3D',
    desc: 'Building platform services within the software team — reliable backends, tooling and cloud infrastructure.',
    live: true,
  },
  {
    when: 'Ongoing',
    role: 'Open-source builder',
    org: 'github.com/byborh',
    desc: 'Datte, Grenade, Career Launcher, Physics and more — experimenting with architecture, cloud and DX.',
  },
  {
    when: 'Foundations',
    role: 'Software engineering',
    org: 'Studies & self-driven',
    desc: 'From Java, PHP and C fundamentals to modern TypeScript stacks, algorithms and problem solving.',
  },
]
</script>

<template>
  <main>
    <!-- ============================ HERO ============================ -->
    <section class="hero container">
      <div class="hero-left">
        <div class="status" v-reveal>
          <span class="pulse"></span> Available for new projects
        </div>

        <h1 class="hero-title" v-reveal>
          Beibarys<br /><span class="grad">Rakhymberdi</span>
        </h1>

        <p class="hero-role mono" v-reveal>
          <i class="bi bi-terminal text-accent"></i>
          {{ roleText }}<span class="caret">▋</span>
        </p>

        <p class="hero-lead" v-reveal>
          I design and build reliable platforms and services — with clean
          architecture, cloud-native tooling and a DevSecOps mindset. Currently
          crafting software at <a href="https://github.com/Mango3D" target="_blank" rel="noopener" class="inline-link">Mango3D</a>.
        </p>

        <div class="hero-actions" v-reveal>
          <a href="#work" class="btn btn-primary">View my work <i class="bi bi-arrow-down"></i></a>
          <RouterLink to="/contact" class="btn btn-ghost">
            <i class="bi bi-send"></i> Get in touch
          </RouterLink>
        </div>

        <div class="hero-stats" v-reveal>
          <div v-for="s in stats" :key="s.label" class="stat">
            <span class="stat-value">{{ s.value }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>

      <!-- Terminal card -->
      <aside class="hero-terminal" v-reveal>
        <div class="term-bar">
          <span class="tdot r"></span><span class="tdot y"></span><span class="tdot g"></span>
          <span class="term-title mono">~/beibarys — zsh</span>
          <span class="term-clock mono">{{ clock }} CET</span>
        </div>
        <pre class="term-body mono"><span class="c-muted"># whoami</span>
<span class="c-accent">$</span> beibarys --profile

<span class="c-key">name</span>:     Beibarys Rakhymberdi
<span class="c-key">role</span>:     Platform &amp; Service Developer
<span class="c-key">company</span>:  @Mango3D
<span class="c-key">location</span>: Bordeaux, France 🇫🇷
<span class="c-key">focus</span>:    clean-architecture, cloud, security

<span class="c-muted"># status</span>
<span class="c-accent">$</span> git push origin main
<span class="c-green">✓ everything up to date — shipping.</span></pre>
      </aside>
    </section>

    <!-- ============================ ABOUT ============================ -->
    <section class="section container" id="about">
      <p class="section-label" v-reveal>01 — About</p>
      <h2 class="section-title" v-reveal>
        I turn ideas into systems that hold up<br />under real-world load.
      </h2>
      <p class="section-lead" v-reveal>
        I care about the parts users never see: the architecture, the security
        boundaries, the deployment pipeline. My goal is software that's simple to
        reason about, safe by default, and a pleasure to extend.
      </p>

      <div class="pillars">
        <article
          v-for="(p, i) in pillars"
          :key="p.title"
          class="pillar panel"
          v-reveal="{ delay: i * 90 }"
        >
          <i :class="p.icon" class="pillar-icon"></i>
          <h3 class="pillar-title">{{ p.title }}</h3>
          <p class="pillar-desc">{{ p.desc }}</p>
        </article>
      </div>
    </section>

    <!-- ============================ SKILLS ============================ -->
    <section class="section container">
      <p class="section-label" v-reveal>02 — Toolbox</p>
      <h2 class="section-title" v-reveal>Technologies I build with</h2>

      <div class="skills">
        <div
          v-for="(g, i) in skillGroups"
          :key="g.name"
          class="skill-group"
          v-reveal="{ delay: i * 70 }"
        >
          <p class="skill-group-name mono">{{ g.name }}</p>
          <div class="skill-chips">
            <span v-for="s in g.items" :key="s" class="chip">{{ s }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================ WORK ============================ -->
    <section class="section container" id="work">
      <div class="work-head">
        <div>
          <p class="section-label" v-reveal>03 — Selected work</p>
          <h2 class="section-title" v-reveal>Things I've built</h2>
        </div>
        <RouterLink to="/projects" class="btn btn-ghost work-all" v-reveal>
          All projects <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>

      <div class="work-grid">
        <a
          v-for="(p, i) in projects"
          :key="p.title"
          :href="p.link"
          target="_blank"
          rel="noopener"
          class="work-card panel"
          :class="{ featured: p.featured }"
          v-reveal="{ delay: i * 80 }"
          @mousemove="onTilt"
          @mouseleave="resetTilt"
        >
          <div class="work-top">
            <span class="work-tag mono">{{ p.tag }}</span>
            <span v-if="p.stars" class="work-stars mono">
              <i class="bi bi-star-fill"></i> {{ p.stars }}
            </span>
          </div>
          <h3 class="work-title">{{ p.title }}</h3>
          <p class="work-desc">{{ p.desc }}</p>
          <div class="work-stack">
            <span v-for="t in p.stack" :key="t" class="chip">{{ t }}</span>
          </div>
          <span class="work-cta mono">
            View on GitHub <i class="bi bi-arrow-up-right"></i>
          </span>
        </a>
      </div>
    </section>

    <!-- ============================ TIMELINE ============================ -->
    <section class="section container">
      <p class="section-label" v-reveal>04 — Journey</p>
      <h2 class="section-title" v-reveal>Where I've been heading</h2>

      <div class="timeline">
        <div
          v-for="(t, i) in timeline"
          :key="i"
          class="tl-item"
          v-reveal="{ delay: i * 90 }"
        >
          <div class="tl-marker">
            <span class="tl-dot" :class="{ live: t.live }"></span>
          </div>
          <div class="tl-content">
            <span class="tl-when mono">{{ t.when }}</span>
            <h3 class="tl-role">
              {{ t.role }} <span class="tl-org">· {{ t.org }}</span>
            </h3>
            <p class="tl-desc">{{ t.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding-top: 74px;
}

/* ============================ HERO ============================ */
.hero {
  min-height: calc(100vh - 74px);
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 48px;
  align-items: center;
  padding-block: 40px 60px;
}
.hero-left {
  max-width: 620px;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-muted);
  padding: 7px 15px;
  border: 1px solid var(--stroke);
  border-radius: 999px;
  background: var(--surface);
  margin-bottom: 26px;
}
.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
  70% { box-shadow: 0 0 0 9px rgba(74, 222, 128, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
}

.hero-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.8rem, 7vw, 5rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}
.grad {
  background: linear-gradient(120deg, var(--accent), var(--accent-strong) 60%, var(--cool));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-role {
  font-size: 1.05rem;
  color: var(--text);
  margin-bottom: 22px;
  min-height: 1.6em;
  display: flex;
  align-items: center;
  gap: 10px;
}
.caret {
  color: var(--accent);
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}

.hero-lead {
  color: var(--text-muted);
  font-size: 1.08rem;
  line-height: 1.7;
  margin-bottom: 32px;
}
.inline-link {
  color: var(--accent);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}
.inline-link:hover {
  border-color: var(--accent);
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 44px;
}

.hero-stats {
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
  padding-top: 30px;
  border-top: 1px solid var(--stroke);
}
.stat {
  display: flex;
  flex-direction: column;
}
.stat-value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--text);
  line-height: 1;
}
.stat-label {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-faint);
  margin-top: 6px;
}

/* Terminal */
.hero-terminal {
  border: 1px solid var(--stroke);
  border-radius: var(--radius);
  background: rgba(6, 6, 9, 0.72);
  backdrop-filter: blur(14px);
  overflow: hidden;
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.9);
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid var(--stroke);
}
.tdot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.tdot.r { background: #ff5f57; }
.tdot.y { background: #febc2e; }
.tdot.g { background: #28c840; }
.term-title {
  margin-left: 10px;
  font-size: 0.76rem;
  color: var(--text-faint);
}
.term-clock {
  margin-left: auto;
  font-size: 0.74rem;
  color: var(--accent);
}
.term-body {
  padding: 22px 22px 26px;
  font-size: 0.86rem;
  line-height: 1.85;
  color: var(--text-muted);
  white-space: pre-wrap;
  word-break: break-word;
}
.c-muted { color: var(--text-faint); }
.c-accent { color: var(--accent); }
.c-key { color: var(--cool); }
.c-green { color: #4ade80; }

/* ============================ ABOUT ============================ */
.pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 52px;
}
.pillar {
  padding: 30px 28px;
}
.pillar-icon {
  font-size: 1.7rem;
  color: var(--accent);
  margin-bottom: 18px;
  display: inline-block;
}
.pillar-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.pillar-desc {
  color: var(--text-muted);
  font-size: 0.96rem;
}

/* ============================ SKILLS ============================ */
.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 30px 40px;
  margin-top: 46px;
}
.skill-group-name {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--stroke);
}
.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

/* ============================ WORK ============================ */
.work-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 44px;
}
.work-all {
  margin-bottom: 4px;
}
.work-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}
.work-card {
  display: flex;
  flex-direction: column;
  padding: 30px 30px 26px;
  transition: transform 0.25s var(--ease), border-color 0.4s, background 0.4s;
  transform-style: preserve-3d;
}
.work-card.featured {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, rgba(232, 120, 63, 0.07), rgba(255, 255, 255, 0.02));
  border-color: rgba(240, 151, 92, 0.25);
}
.work-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.work-tag {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 5px 12px;
  border: 1px solid var(--accent-soft);
  border-radius: 999px;
  background: var(--accent-soft);
}
.work-stars {
  font-size: 0.82rem;
  color: #febc2e;
}
.work-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 10px;
}
.work-desc {
  color: var(--text-muted);
  font-size: 0.98rem;
  margin-bottom: 20px;
  max-width: 60ch;
}
.work-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
}
.work-cta {
  margin-top: auto;
  font-size: 0.85rem;
  color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  transition: gap 0.3s var(--ease), color 0.3s;
}
.work-card:hover .work-cta {
  color: var(--accent);
  gap: 12px;
}

/* ============================ TIMELINE ============================ */
.timeline {
  margin-top: 46px;
  position: relative;
}
.tl-item {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 20px;
  padding-bottom: 34px;
}
.tl-item:last-child {
  padding-bottom: 0;
}
.tl-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tl-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  background: var(--bg);
  margin-top: 4px;
  flex-shrink: 0;
}
.tl-dot.live {
  background: var(--accent);
  box-shadow: 0 0 0 0 var(--accent-glow);
  animation: pulse-accent 2.2s infinite;
}
@keyframes pulse-accent {
  0% { box-shadow: 0 0 0 0 var(--accent-glow); }
  70% { box-shadow: 0 0 0 10px rgba(232, 120, 63, 0); }
  100% { box-shadow: 0 0 0 0 rgba(232, 120, 63, 0); }
}
.tl-item:not(:last-child) .tl-marker::after {
  content: '';
  flex: 1;
  width: 1px;
  background: linear-gradient(var(--stroke), transparent);
  margin-top: 8px;
}
.tl-when {
  font-size: 0.78rem;
  color: var(--accent);
  letter-spacing: 0.04em;
}
.tl-role {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.22rem;
  margin: 6px 0 8px;
}
.tl-org {
  color: var(--text-muted);
  font-weight: 400;
  font-size: 1rem;
}
.tl-desc {
  color: var(--text-muted);
  font-size: 0.97rem;
  max-width: 65ch;
}

/* ============================ RESPONSIVE ============================ */
@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 40px;
    min-height: auto;
    padding-top: 30px;
  }
  .pillars {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 720px) {
  .work-grid {
    grid-template-columns: 1fr;
  }
  .work-card.featured {
    grid-column: auto;
  }
  .hero-stats {
    gap: 24px;
  }
}
</style>
