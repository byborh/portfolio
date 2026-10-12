<script setup>
import { RouterLink } from 'vue-router'
import PathBlock from '../components/home/PathBlock.vue'
import CameraBlock from '../components/home/CameraBlock.vue'
import TravelBlock from '../components/home/TravelBlock.vue'
import StillsWall from '../components/photos/StillsWall.vue'
import OffHoursBlock from '../components/home/OffHoursBlock.vue'
import { profile } from '../data/profile.js'
import { aboutMe, path } from '../data/site.js'

const sections = [
  { href: '#life', label: 'Life' },
  { href: '#films', label: 'Films' },
  { href: '#travel', label: 'Travel' },
  { href: '#photos', label: 'Photos' },
  { href: '#off', label: 'Off hours' },
]
</script>

<!-- The personal side. Tones alternate:
     navy · gold · red · navy · yellow · blue · (footer) navy -->
<template>
  <main>
    <section id="top" class="me wrap tone-navy" data-tone="navy">
      <div class="me-grid">
        <h1 class="me-title serif">{{ aboutMe.title }}</h1>
        <div>
          <p v-for="l in aboutMe.lines" :key="l" class="me-line">{{ l }}</p>
          <nav class="me-index" aria-label="On this page">
            <a v-for="s in sections" :key="s.href" :href="s.href" class="ulink">{{ s.label }}</a>
          </nav>
        </div>
      </div>
      <RouterLink to="/" class="me-back">← Work</RouterLink>
    </section>

    <PathBlock id="life" kicker="Life" title="Off the clock" tone="gold" :steps="path.life" />
    <CameraBlock />
    <TravelBlock />
    <StillsWall />
    <OffHoursBlock />
  </main>
</template>

<style scoped>
.me {
  padding-top: 140px;
  padding-bottom: 96px;
}
.me-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: end;
}
.me-title {
  font-size: clamp(72px, 14vw, 240px);
  line-height: 0.84;
  letter-spacing: -0.04em;
}
.me-line {
  font-size: clamp(19px, 1.8vw, 24px);
  line-height: 1.5;
  margin-bottom: 14px;
  max-width: 40ch;
}
.me-index {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 28px;
  font-size: 17px;
}
.me-back {
  display: inline-block;
  margin-top: 56px;
  font-size: 15px;
  color: var(--dim);
}
.me-back:hover {
  color: var(--fg);
}

@media (max-width: 860px) {
  .me {
    padding-top: 110px;
  }
  .me-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
