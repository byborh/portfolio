<script setup>
import { ref, onMounted } from 'vue'
import Media from '../Media.vue'
import { path } from '../../data/site.js'

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
  <section id="path" class="path wrap block tone-yellow" data-tone="yellow">
    <p class="kicker"><span>Path</span><span>2021 — now</span></p>

    <ol class="steps" @mousemove="move" @mouseleave="preview = null">
      <li
        v-for="(s, i) in path"
        :key="i"
        class="step"
        :class="{ 'has-media': s.media }"
        @mouseenter="show(s)"
        v-reveal
      >
        <span class="step-year muted">{{ s.year }}</span>
        <span class="step-what serif" :class="{ quote: s.quote }">{{ s.what }}</span>
        <span class="step-where muted">{{ s.where }}</span>
      </li>
    </ol>

    <div
      v-if="canHover"
      class="preview"
      :class="{ on: preview }"
      :style="{ transform: `translate(${pos.x + 48}px, ${pos.y - 94}px)` }"
      aria-hidden="true"
    >
      <Media v-if="preview" :media="preview" />
    </div>
  </section>
</template>

<style scoped>

.steps {
  list-style: none;
}
.step {
  display: grid;
  grid-template-columns: 90px 1fr 1fr;
  gap: 24px;
  align-items: baseline;
  padding: 14px 0;
  border-bottom: 1px solid var(--rule);
}
.step-year {
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}
.step-what {
  font-size: clamp(24px, 3vw, 40px);
  line-height: 1.1;
  transition: transform 0.6s var(--ease), color 0.3s;
}
.step-what.quote {
  font-style: italic;
}
.step-where {
  font-size: 14px;
  text-align: right;
}
.step.has-media:hover .step-what {
  transform: translateX(10px);
  /* Red on yellow is 4.0:1: fine at this size (large text needs 3:1). */
  color: var(--red);
}

.preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 300px;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
.preview.on {
  opacity: 1;
}

@media (max-width: 760px) {
  .step {
    grid-template-columns: 52px 1fr;
    gap: 2px 14px;
  }
  .step-where {
    grid-column: 2;
    text-align: left;
  }
}
</style>
