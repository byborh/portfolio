<script setup>
import { caseStudies } from '../data/projects.js'
</script>

<template>
  <main class="projects-page">
    <div class="container">
      <header class="pp-head">
        <p class="section-label" v-reveal>Case studies</p>
        <h1 class="pp-title" v-reveal>What I built,<br />measured honestly.</h1>
        <p class="section-lead" v-reveal>
          Each project reads like an inspection report: the spec, what I built, what I can
          measure, and what is still out of tolerance.
        </p>
        <nav class="pp-index mono" aria-label="Case studies" v-reveal>
          <a v-for="c in caseStudies" :key="c.id" :href="`#${c.id}`">{{ c.ref }} · {{ c.title }}</a>
        </nav>
      </header>

      <article
        v-for="c in caseStudies"
        :id="c.id"
        :key="c.id"
        class="cs panel"
        v-reveal
      >
        <header class="cs-head mono">
          <span>{{ c.ref }}</span>
          <span>{{ c.period }}</span>
        </header>

        <div class="cs-intro">
          <h2 class="cs-title">{{ c.title }}</h2>
          <p class="cs-tagline">{{ c.tagline }}</p>
        </div>

        <dl class="cs-sheet">
          <div class="cs-row">
            <dt class="mono">Spec</dt>
            <dd>{{ c.spec }}</dd>
          </div>
          <div class="cs-row">
            <dt class="mono">Build</dt>
            <dd>{{ c.build }}</dd>
          </div>
          <div class="cs-row">
            <dt class="mono">Measured</dt>
            <dd>
              <ul class="cs-measured">
                <li v-for="m in c.measured" :key="m" class="mono">{{ m }}</li>
              </ul>
            </dd>
          </div>
          <div class="cs-row cs-next">
            <dt class="mono">Next</dt>
            <dd>{{ c.next }}</dd>
          </div>
        </dl>

        <footer class="cs-foot">
          <div class="cs-stack">
            <span v-for="t in c.stack" :key="t" class="chip">{{ t }}</span>
          </div>
          <div class="cs-links">
            <a
              v-for="l in c.links"
              :key="l.url"
              :href="l.url"
              target="_blank"
              rel="noopener"
              class="btn btn-ghost cs-link"
            >
              {{ l.label }} <i class="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </footer>
      </article>

      <p class="pp-more mono" v-reveal>
        Everything else lives on
        <a href="https://github.com/byborh" target="_blank" rel="noopener">github.com/byborh</a>.
      </p>
    </div>
  </main>
</template>

<style scoped>
.projects-page {
  padding-top: 140px;
  padding-bottom: 60px;
}

.pp-head {
  margin-bottom: 56px;
}
.pp-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2.3rem, 6vw, 4rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}
.pp-index {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin-top: 28px;
  font-size: 0.8rem;
}
.pp-index a {
  color: var(--text-muted);
  border-bottom: 1px solid var(--stroke-strong);
  padding-bottom: 2px;
}
.pp-index a:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.cs {
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 28px;
  scroll-margin-top: 100px;
}
.cs-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding: 12px 24px;
  border-bottom: 1px solid var(--stroke);
}
.cs-intro {
  padding: 26px 24px 8px;
}
.cs-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 8px;
}
.cs-tagline {
  color: var(--text-muted);
  font-size: 1.05rem;
}

.cs-sheet {
  padding: 12px 24px 4px;
}
.cs-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px dashed var(--stroke);
}
.cs-row:last-child {
  border-bottom: 0;
}
.cs-row dt {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding-top: 4px;
}
.cs-row dd {
  line-height: 1.7;
  max-width: 75ch;
}
.cs-measured {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
}
.cs-measured li {
  font-size: 0.88rem;
  color: #4ade80;
}
.cs-measured li::before {
  content: '✓ ';
}
.cs-next dt,
.cs-next dd {
  color: var(--accent);
}

.cs-foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  border-top: 1px solid var(--stroke);
}
.cs-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.cs-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.cs-link {
  padding: 9px 18px;
  font-size: 0.86rem;
}

.pp-more {
  margin-top: 40px;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.pp-more a {
  color: var(--accent);
}

@media (max-width: 640px) {
  .projects-page {
    padding-top: 110px;
  }
  .cs-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
