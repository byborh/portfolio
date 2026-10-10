<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { stills } from '../../data/site.js'

const props = defineProps({
  // How many photos to hang: the home page shows a few, /photos shows all.
  count: { type: Number, default: stills.length },
  // Big page title, shown on /photos only.
  heading: { type: String, default: '' },
})
const shown = computed(() => stills.slice(0, props.count))
const hasMore = computed(() => props.count < stills.length)

// Hung by hand like prints on a wall: columns on a 12-column grid, vertical offset in px
// (negative overlaps the row above), tilt in degrees, stacking order. A 9th photo restarts the pattern.
const LAYOUT = [
  { col: '1 / 5', y: 40, rot: -2.5, z: 2 },
  { col: '6 / 9', y: 0, rot: 3, z: 1 },
  { col: '9 / 13', y: 150, rot: -1.5, z: 3 },
  { col: '2 / 6', y: -40, rot: 2, z: 4 },
  { col: '7 / 12', y: 40, rot: -3, z: 2 },
  { col: '1 / 4', y: -20, rot: -4, z: 5 },
  { col: '5 / 9', y: 80, rot: 1.5, z: 3 },
  { col: '9 / 13', y: -90, rot: -2, z: 4 },
]
const hang = (i) => {
  const l = LAYOUT[i % LAYOUT.length]
  return { gridColumn: l.col, marginTop: `${l.y}px`, '--rot': `${l.rot}deg`, '--z': l.z }
}

const open = ref(-1)
const current = computed(() => shown.value[open.value])
let lastFocus = null
// Moves focus into the viewer when it opens, so the keyboard lands on Close.
const vFocus = { mounted: (el) => el.focus() }

function show(i) {
  lastFocus = document.activeElement
  open.value = i
}
function close() {
  open.value = -1
  lastFocus?.focus()
}
function step(d) {
  open.value = (open.value + d + shown.value.length) % shown.value.length
}
function onKey(e) {
  if (open.value < 0) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}

// The page must not scroll behind the viewer.
watch(open, (i) => {
  document.documentElement.style.overflow = i >= 0 ? 'hidden' : ''
  if (i >= 0) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <section id="photos" class="stills wrap block tone-yellow" data-tone="yellow">
    <p class="kicker"><span>Photos</span><span>{{ String(stills.length).padStart(2, '0') }} frames</span></p>
    <h1 v-if="heading" class="stills-heading serif">{{ heading }}</h1>

    <div class="wall">
      <!-- v-reveal moves the outer div; the tilt lives on the figure so the reveal does not erase it. -->
      <div v-for="(s, i) in shown" :key="s.src" class="frame" :style="hang(i)" v-reveal>
        <figure class="print">
          <button class="frame-open" :aria-label="`Open: ${s.alt}`" @click="show(i)">
            <img :src="s.src" :alt="s.alt" :style="{ aspectRatio: s.ratio }" loading="lazy" decoding="async" />
          </button>
          <figcaption class="frame-cap serif">{{ s.place }}</figcaption>
        </figure>
      </div>
    </div>

    <RouterLink v-if="hasMore" to="/photos" class="stills-more serif">
      See all {{ stills.length }} photos <span aria-hidden="true">→</span>
    </RouterLink>

    <Teleport to="body">
      <transition name="viewer">
        <div v-if="current" class="viewer" role="dialog" aria-modal="true" :aria-label="current.alt" @click.self="close">
          <img :src="current.src" :alt="current.alt" class="viewer-img" />
          <p class="viewer-cap">
            <span class="serif">{{ current.place }}</span>
            <span>{{ open + 1 }} / {{ shown.length }}</span>
          </p>
          <button class="viewer-btn prev" aria-label="Previous photo" @click="step(-1)">←</button>
          <button class="viewer-btn next" aria-label="Next photo" @click="step(1)">→</button>
          <button class="viewer-btn close" aria-label="Close" @click="close" v-focus>×</button>
        </div>
      </transition>
    </Teleport>
  </section>
</template>


<style scoped>
.stills-heading {
  font-size: clamp(64px, 12vw, 200px);
  line-height: 0.86;
  letter-spacing: -0.035em;
  margin-bottom: 48px;
}
.stills-more {
  display: inline-flex;
  gap: 14px;
  align-items: baseline;
  font-size: clamp(32px, 4vw, 56px);
  margin-top: 8px;
  border-bottom: 3px solid var(--red);
}
.stills-more span {
  color: var(--red);
  transition: transform 0.5s var(--ease);
}
.stills-more:hover span {
  transform: translateX(8px);
}
.wall {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  row-gap: 0;
  align-items: start;
  padding-bottom: 80px;
}
.frame {
  position: relative;
  z-index: var(--z);
}
.frame:hover,
.frame:focus-within {
  z-index: 20;
}
.print {
  transform: rotate(var(--rot));
  transition: transform 0.7s var(--ease);
}
/* Hover straightens the print and lifts it off the wall. */
.frame:hover .print,
.frame:focus-within .print {
  transform: rotate(0deg) scale(1.04);
}

.frame-open {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: var(--well);
  overflow: hidden;
  cursor: zoom-in;
  box-shadow: 0 26px 50px -26px rgba(0, 29, 61, 0.55);
  transition: box-shadow 0.7s var(--ease);
}
.frame:hover .frame-open {
  box-shadow: 0 40px 70px -30px rgba(0, 29, 61, 0.6);
}
.frame-open img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 1.4s var(--ease), filter 0.6s;
}
.frame-open:focus-visible {
  outline: 3px solid var(--red);
  outline-offset: 4px;
}

.frame-cap {
  margin-top: 10px;
  font-size: 24px;
  font-style: italic;
  line-height: 1.1;
}

/* ---- Viewer ---- */
.viewer {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 64px 72px 96px;
  background: rgba(0, 29, 61, 0.96);
  color: var(--yellow);
}
.viewer-img {
  /* Bound by the viewport, not by the grid cell: a % height of an auto row does not apply,
     and a 1600px photo would overflow and be cut at the top and bottom. */
  max-width: calc(100vw - 144px);
  max-height: calc(100dvh - 160px);
  width: auto;
  height: auto;
  object-fit: contain;
}
.viewer-cap {
  position: absolute;
  left: 72px;
  right: 72px;
  bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  font-size: 16px;
}
.viewer-cap .serif {
  font-size: 28px;
}
.viewer-btn {
  position: absolute;
  width: 48px;
  height: 48px;
  border: 1px solid var(--yellow);
  background: transparent;
  color: var(--yellow);
  font-size: 20px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.viewer-btn:hover,
.viewer-btn:focus-visible {
  background: var(--yellow);
  color: var(--navy);
  outline: none;
}
.viewer-btn.prev {
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}
.viewer-btn.next {
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}
.viewer-btn.close {
  right: 12px;
  top: 12px;
  background: var(--red);
  border-color: var(--red);
}
.viewer-enter-active,
.viewer-leave-active {
  transition: opacity 0.35s var(--ease);
}
.viewer-enter-from,
.viewer-leave-to {
  opacity: 0;
}

@media (max-width: 760px) {
  /* Phones: one column, prints alternate left and right. No overlap: it would hide the captions. */
  .wall {
    grid-template-columns: 1fr;
    padding-bottom: 24px;
  }
  .frame {
    grid-column: 1 !important;
    width: 80%;
    margin-top: 20px !important;
  }
  .frame:first-child {
    margin-top: 0 !important;
  }
  .frame:nth-child(even) {
    margin-left: auto;
  }
  .viewer {
    padding: 64px 12px 110px;
  }
  .viewer-img {
    max-width: calc(100vw - 24px);
    max-height: calc(100dvh - 190px);
  }
  .viewer-cap {
    left: 12px;
    right: 12px;
    flex-wrap: wrap;
  }
  .viewer-btn.prev,
  .viewer-btn.next {
    top: auto;
    bottom: 64px;
    transform: none;
  }
}
</style>
