<script setup>
import { RouterLink } from 'vue-router'
import { aboutMe, stills } from '../../data/site.js'

// Three own photos, tilted like the wall on /about-me.
const TILTS = [-4, 2.5, -1.5]
const peek = stills.slice(0, TILTS.length).map((s, i) => ({ ...s, tilt: TILTS[i] }))
</script>

<template>
  <!-- Red block: yellow on red is 4.0:1, so every text here is large (24px or more). -->
  <section id="beyond" class="beyond wrap block tone-red" data-tone="red">
    <div class="beyond-grid">
      <div>
        <h2 class="beyond-title serif">Beyond <em>work</em></h2>
        <p class="beyond-words serif">{{ aboutMe.teaser.join(' · ') }}</p>
        <RouterLink to="/about-me" class="beyond-link serif">
          About me <span aria-hidden="true">→</span>
        </RouterLink>
      </div>

      <RouterLink to="/about-me" class="beyond-peek" aria-label="Open the About me page">
        <img
          v-for="p in peek"
          :key="p.src"
          :src="p.src"
          :alt="p.alt"
          :style="{ aspectRatio: p.ratio, '--tilt': `${p.tilt}deg` }"
          loading="lazy"
          decoding="async"
        />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.beyond-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
.beyond-title {
  font-size: clamp(64px, 10vw, 160px);
  line-height: 0.86;
  letter-spacing: -0.035em;
}
.beyond-title em {
  font-style: italic;
}
.beyond-words {
  font-size: clamp(24px, 2.4vw, 34px);
  line-height: 1.3;
  margin-top: 24px;
}
.beyond-link {
  display: inline-flex;
  gap: 14px;
  margin-top: 36px;
  font-size: clamp(32px, 4vw, 56px);
  border-bottom: 3px solid var(--yellow);
}
.beyond-link span {
  transition: transform 0.5s var(--ease);
}
.beyond-link:hover span {
  transform: translateX(10px);
}

/* Three prints fanned out; hover spreads them a little more. */
.beyond-peek {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}
.beyond-peek img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transform: rotate(var(--tilt));
  box-shadow: 0 24px 50px -24px rgba(0, 29, 61, 0.7);
  border: 6px solid var(--yellow);
  transition: transform 0.7s var(--ease);
}
.beyond-peek img:nth-child(2) {
  margin-inline: -18%;
  position: relative;
  z-index: 1;
}
.beyond-peek:hover img {
  transform: rotate(calc(var(--tilt) * 1.8)) translateY(-6px);
}

@media (max-width: 860px) {
  .beyond-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
