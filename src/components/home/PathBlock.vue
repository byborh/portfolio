<script setup>
import { ref, onMounted } from 'vue'
import Media from '../Media.vue'
import { path } from '../../data/site.js'

const tracks = [
  { key: 'pro', title: 'Work & study', steps: path.pro },
  { key: 'life', title: 'Life', steps: path.life },
]

// The preview follows the cursor, so it only makes sense on devices that hover.
const canHover = ref(false)
const preview = ref(null)
const pos = ref({ x: 0, y: 0 })

onMounted(() => {
  canHover.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
})

function show(step) {
  if (!canHover.value) return
  preview.value = step.media
}
function move(e) {
  pos.value = { x: e.clientX, y: e.clientY }
}
</script>

<template>
  <section id="path" class="path wrap block tone-gold" data-tone="gold">
    <p class="kicker"><span>Path</span><span>2021 — now</span></p>

    <div class="tracks" @mousemove="move" @mouseleave="preview = null">
      <div v-for="t in tracks" :key="t.key" class="track">
        <h3 class="track-title serif">{{ t.title }}</h3>
        <ol class="steps">
          <li
            v-for="(s, i) in t.steps"
            :key="i"
            class="step"
            :class="{ 'has-media': s.media }"
            @mouseenter="show(s)"
            v-reveal
          >
            <span class="step-year">{{ s.year }}</span>
            <div class="step-body">
              <p class="step-what serif" :class="{ quote: s.quote }">{{ s.what }}</p>
              <p class="step-where">{{ s.where }}</p>
              <p class="step-detail">{{ s.detail }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>

    <div
      v-if="canHover"
      class="preview"
      :class="{ on: preview }"
      :style="{ transform: `translate(${pos.x + 48}px, ${pos.y - 94}px)`, aspectRatio: preview ? preview.ratio : null }"
      aria-hidden="true"
    >
      <Media v-if="preview" :media="preview" />
    </div>
  </section>
</template>

<style scoped>
.tracks {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 64px;
  align-items: start;
}
.track-title {
  font-size: clamp(36px, 4.4vw, 64px);
  line-height: 1;
  letter-spacing: -0.02em;
  padding-bottom: 18px;
  border-bottom: 2px solid var(--fg);
}

.steps {
  list-style: none;
}
.step {
  display: grid;
  grid-template-columns: 104px 1fr;
  gap: 20px;
  padding: 22px 0;
  border-bottom: 1px solid var(--rule);
}
.step-year {
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  color: var(--dim);
  padding-top: 8px;
}
.step-what {
  font-size: clamp(26px, 2.6vw, 36px);
  line-height: 1.1;
  transition: transform 0.6s var(--ease), color 0.3s;
}
.step-what.quote {
  font-style: italic;
}
.step-where {
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--dim);
  margin-top: 6px;
}
.step-detail {
  font-size: 17px;
  line-height: 1.55;
  margin-top: 10px;
  max-width: 52ch;
}
.step.has-media:hover .step-what {
  transform: translateX(8px);
  /* Red on gold is 3.5:1: fine at this size (large text needs 3:1). */
  color: var(--red);
}

.preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  /* Width follows the shape: 300px wide for screenshots, narrower for portrait photos. */
  height: 190px;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: 0 24px 50px -20px rgba(0, 29, 61, 0.5);
}
.preview.on {
  opacity: 1;
}

@media (max-width: 960px) {
  .tracks {
    grid-template-columns: 1fr;
    gap: 72px;
  }
}
@media (max-width: 520px) {
  .step {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .step-year {
    padding-top: 0;
  }
}
</style>
