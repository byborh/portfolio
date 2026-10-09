<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { stills } from '../../data/site.js'

const open = ref(-1)
const current = computed(() => stills[open.value])
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
  open.value = (open.value + d + stills.length) % stills.length
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
  <section id="stills" class="stills wrap block tone-yellow" data-tone="yellow">
    <p class="kicker"><span>Stills</span><span>{{ String(stills.length).padStart(2, '0') }} frames</span></p>

    <div class="grid">
      <figure
        v-for="(s, i) in stills"
        :key="s.src"
        class="frame"
        :style="{ gridColumn: `span ${s.span}` }"
        v-reveal
      >
        <button class="frame-open" :aria-label="`Open: ${s.alt}`" @click="show(i)">
          <img :src="s.src" :alt="s.alt" :style="{ aspectRatio: s.ratio }" loading="lazy" decoding="async" />
        </button>
        <figcaption class="frame-cap">
          <span class="serif">{{ s.place }}</span>
          <span class="muted">{{ s.placeholder ? `Unsplash · ${s.credit}` : s.credit }}</span>
        </figcaption>
      </figure>
    </div>

    <Teleport to="body">
      <transition name="viewer">
        <div v-if="current" class="viewer" role="dialog" aria-modal="true" :aria-label="current.alt" @click.self="close">
          <img :src="current.src" :alt="current.alt" class="viewer-img" />
          <p class="viewer-cap">
            <span class="serif">{{ current.place }}</span>
            <span>{{ current.placeholder ? `Unsplash · ${current.credit}` : current.credit }}</span>
            <span>{{ open + 1 }} / {{ stills.length }}</span>
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
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 48px 24px;
  align-items: start;
}

.frame-open {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: var(--well);
  overflow: hidden;
  cursor: zoom-in;
}
.frame-open img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 1.4s var(--ease), filter 0.6s;
}
.frame-open:hover img {
  transform: scale(1.03);
}
.frame-open:focus-visible {
  outline: 3px solid var(--red);
  outline-offset: 4px;
}

.frame-cap {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-top: 12px;
  font-size: 13px;
}
.frame-cap .serif {
  font-size: 24px;
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
  max-width: 100%;
  max-height: 100%;
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
  font-size: 14px;
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
  .grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .frame {
    grid-column: auto !important;
  }
  .viewer {
    padding: 64px 12px 110px;
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
