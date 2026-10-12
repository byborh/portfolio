<script setup>
import { ref, onMounted } from 'vue'
import Media from '../Media.vue'

// One track of the path: the home page shows work & study, /about-me shows life.
defineProps({
  id: { type: String, required: true },
  kicker: { type: String, required: true },
  title: { type: String, required: true },
  tone: { type: String, required: true },
  // [{ year, what, where, detail, quote?, media? }]
  steps: { type: Array, required: true },
})

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
  <section :id="id" class="path wrap block" :class="`tone-${tone}`" :data-tone="tone">
    <p class="kicker"><span>{{ kicker }}</span><span>{{ steps[0].year.slice(0, 4) }} — now</span></p>
    <h2 class="path-title serif">{{ title }}</h2>

    <ol class="steps" @mousemove="move" @mouseleave="preview = null">
      <li
        v-for="(s, i) in steps"
        :key="i"
        class="step"
        :class="{ 'has-media': s.media }"
        @mouseenter="show(s)"
        v-reveal
      >
        <span class="step-year">{{ s.year }}</span>
        <div class="step-head">
          <p class="step-what serif" :class="{ quote: s.quote }">{{ s.what }}</p>
          <p class="step-where">{{ s.where }}</p>
        </div>
        <p class="step-detail">{{ s.detail }}</p>
      </li>
    </ol>

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
.path-title {
  font-size: clamp(44px, 6vw, 88px);
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 32px;
}

.steps {
  list-style: none;
  border-top: 2px solid var(--fg);
}
/* Year | title and place | what happened: one line per step, read across. */
.step {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 28px;
  align-items: baseline;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule);
}
.step-year {
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  color: var(--dim);
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
}
/* Red reaches 3:1 or more on the yellow and gold tones: fine at this size. */
.step.has-media:hover .step-what {
  transform: translateX(8px);
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

@media (max-width: 900px) {
  .step {
    grid-template-columns: 90px 1fr;
    gap: 8px 20px;
  }
  .step-detail {
    grid-column: 2;
  }
}
@media (max-width: 520px) {
  .step {
    grid-template-columns: 1fr;
  }
  .step-detail {
    grid-column: 1;
  }
}
</style>
