<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Media from '../Media.vue'
import { profile } from '../../data/profile.js'
import { work } from '../../data/site.js'

const clock = ref('')
let timer

function tick() {
  clock.value = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: profile.timeZone,
  }).format(new Date())
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 10_000)
})
onBeforeUnmount(() => clearInterval(timer))

// The strip is duplicated so the marquee loops without a visible seam.
const strip = [...work, ...work]
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-meta wrap">
      <span>{{ profile.role }}, {{ profile.company }}</span>
      <span class="muted">{{ profile.location }} · {{ clock }}</span>
    </div>

    <h1 class="hero-name serif wrap">
      Beibarys<br /><em>Rakhymberdi</em>
    </h1>

    <p class="hero-line wrap muted">Before code, I measured aerospace parts.</p>

    <div class="strip" aria-hidden="true">
      <div class="strip-track">
        <div v-for="(w, i) in strip" :key="i" class="strip-item">
          <Media :media="w.media" eager />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding-top: 88px;
  overflow: hidden;
}

.hero-meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 14px;
}
.hero-meta span:last-child {
  white-space: nowrap;
}

.hero-name {
  font-size: clamp(64px, 16vw, 280px);
  line-height: 0.86;
  letter-spacing: -0.035em;
  margin-top: auto;
  padding-top: 6vh;
}
.hero-name em {
  font-style: italic;
}

.hero-line {
  font-size: 15px;
  margin: 22px 0 32px;
}

/* ---- Media strip ---- */
.strip {
  height: clamp(140px, 24vh, 260px);
  overflow: hidden;
}
.strip-track {
  display: flex;
  gap: 12px;
  height: 100%;
  width: max-content;
  animation: slide 60s linear infinite;
}
.strip-item {
  height: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--wash);
}
@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}
.strip:hover .strip-track {
  animation-play-state: paused;
}
</style>
