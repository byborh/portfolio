<script setup>
import { RouterLink } from 'vue-router'
import Ruler from '../ui/Ruler.vue'
import { profile } from '../../data/profile.js'
import { hero, journey } from '../../data/story.js'

const sheet = [
  { key: 'Role', value: `${profile.role}, ${profile.company}` },
  { key: 'School', value: profile.school },
  { key: 'Based in', value: profile.location },
  { key: 'Roots', value: profile.roots },
  { key: 'Speaks', value: profile.languages.join(' · ') },
]
</script>

<template>
  <section class="hero container">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="hero-eyebrow mono" v-reveal>{{ hero.eyebrow }}</p>

        <h1 class="hero-title" v-reveal>
          <span class="hero-before">{{ hero.headline.before }}</span>
          <span class="hero-after">{{ hero.headline.after }}</span>
        </h1>

        <p class="hero-lead" v-reveal>{{ hero.lead }}</p>

        <div class="hero-actions" v-reveal>
          <a href="#now" class="btn btn-primary">See the work <i class="bi bi-arrow-down"></i></a>
          <RouterLink to="/contact" class="btn btn-ghost">
            <i class="bi bi-send"></i> Get in touch
          </RouterLink>
          <span class="hero-badge mono"><span class="pulse"></span>{{ hero.badge }}</span>
        </div>
      </div>

      <!-- Identity card styled as an inspection sheet -->
      <aside class="sheet panel" v-reveal aria-label="Profile">
        <header class="sheet-head mono">
          <span>Inspection report</span>
          <span>REF · BR-001</span>
        </header>

        <div class="sheet-id">
          <img
            :src="profile.photo"
            :alt="`Portrait of ${profile.name}`"
            width="88"
            height="88"
            class="sheet-photo"
          />
          <div>
            <p class="sheet-name">{{ profile.name }}</p>
            <p class="sheet-status mono"><i class="bi bi-check2-circle"></i> In tolerance</p>
          </div>
        </div>

        <dl class="sheet-rows">
          <div v-for="row in sheet" :key="row.key" class="sheet-row">
            <dt class="mono">{{ row.key }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>
      </aside>
    </div>

    <div class="hero-ruler" v-reveal>
      <Ruler :start="journey.start" :end="journey.end" :marks="journey.marks" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 74px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 56px;
  padding-block: 120px 48px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 56px;
  align-items: center;
}

.hero-eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
}

.hero-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2.1rem, 5vw, 3.9rem);
  line-height: 1.06;
  letter-spacing: -0.025em;
  margin-bottom: 26px;
}
.hero-title span {
  display: block;
}
/* The past is muted, the present is bright: the headline reads as a before/after. */
.hero-before {
  color: var(--text-faint);
}
.hero-after {
  color: var(--text);
}

.hero-lead {
  max-width: 58ch;
  color: var(--text-muted);
  font-size: 1.06rem;
  line-height: 1.7;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-left: 6px;
}
.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
}

/* ---- Inspection sheet ---- */
.sheet {
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.sheet-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding: 12px 18px;
  border-bottom: 1px solid var(--stroke);
}
.sheet-id {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  border-bottom: 1px solid var(--stroke);
}
.sheet-photo {
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid var(--stroke-strong);
  filter: grayscale(0.2);
}
.sheet-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  line-height: 1.2;
  margin-bottom: 6px;
}
.sheet-status {
  font-size: 0.74rem;
  color: #4ade80;
  display: inline-flex;
  gap: 6px;
}
.sheet-rows {
  display: grid;
}
.sheet-row {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 12px;
  padding: 11px 18px;
  border-bottom: 1px dashed var(--stroke);
  font-size: 0.9rem;
}
.sheet-row:last-child {
  border-bottom: 0;
}
.sheet-row dt {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding-top: 3px;
}
.sheet-row dd {
  color: var(--text);
}

@media (max-width: 900px) {
  .hero {
    padding-top: 110px;
  }
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .sheet {
    max-width: 460px;
  }
}
@media (max-width: 480px) {
  .hero-badge {
    margin-left: 0;
  }
}
</style>
