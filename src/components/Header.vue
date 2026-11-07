<script setup>
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { profile } from '../data/profile.js'
import { paletteState, setPaletteRunning } from '../lib/palette.js'

// Professional sections of the home page, then the personal page. Router links work from any page.
const links = [
  { to: { path: '/', hash: '#profile' }, label: 'Profile' },
  { to: { path: '/', hash: '#work' }, label: 'Work' },
  { to: { path: '/', hash: '#path' }, label: 'Path' },
  { to: { path: '/', hash: '#contact' }, label: 'Contact' },
  { to: '/about-me', label: 'About me', page: true },
]

// The bar takes the tone of the section under it, so it stays readable on every colour.
// It reads the section under the bar's middle line on each scroll frame: exact even after a long jump,
// where an IntersectionObserver can report two sections at once and pick the wrong one.
const BAR_MIDDLE = 30
const tone = ref('yellow')
const router = useRouter()
const route = useRoute()
let sections = []
let frame = 0

function update() {
  frame = 0
  const under = sections.find((s) => {
    const r = s.getBoundingClientRect()
    return r.top <= BAR_MIDDLE && r.bottom > BAR_MIDDLE
  })
  if (under) tone.value = under.dataset.tone
}
function onScroll() {
  if (!frame) frame = requestAnimationFrame(update)
}
function scan() {
  sections = [...document.querySelectorAll('[data-tone]')]
  update()
}

onMounted(async () => {
  // The page renders after the first navigation resolves: wait for it, or only the footer exists yet.
  await router.isReady()
  await nextTick()
  scan()
  window.addEventListener('scroll', onScroll, { passive: true })
})
// Each page has its own sections: read them again after a page change.
watch(
  () => route.path,
  async () => {
    await nextTick()
    scan()
  }
)
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <header class="nav wrap" :class="`tone-${tone}`">
    <RouterLink to="/" class="nav-name">{{ profile.name }}</RouterLink>
    <nav class="nav-links" aria-label="Main">
      <RouterLink v-for="l in links" :key="l.label" :to="l.to" class="ulink" :class="{ page: l.page }">{{ l.label }}</RouterLink>
      <a :href="`mailto:${profile.email}`" class="ulink">Email</a>
    </nav>
    <button
      type="button"
      class="palette-toggle"
      aria-label="Keep this color palette"
      :aria-pressed="!paletteState.running"
      :title="paletteState.running ? `Keep these colors (${paletteState.name})` : 'Change the colors again'"
      @click="setPaletteRunning(!paletteState.running)"
    >
      <span class="swatch" aria-hidden="true"><i></i><i></i><i></i></span>
      <svg v-if="paletteState.running" viewBox="0 0 10 10" aria-hidden="true"><rect x="1.5" y="1" width="2.5" height="8" /><rect x="6" y="1" width="2.5" height="8" /></svg>
      <svg v-else viewBox="0 0 10 10" aria-hidden="true"><path d="M2 1 L9 5 L2 9 Z" /></svg>
    </button>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  height: 60px;
  font-size: 15px;
  /* Tinted glass: the section colour shows through, blurred, so the links stay readable over photos. */
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter: blur(14px) saturate(1.3);
  -webkit-backdrop-filter: blur(14px) saturate(1.3);
  border-bottom: 1px solid var(--rule);
  transition: color 0.4s var(--ease), background-color 0.4s var(--ease);
}
.nav-name {
  font-weight: 500;
}
.nav-links {
  margin-left: auto;
}

/* Small pill: the 3 live colors say "palette", the glyph says pause or play. */
.palette-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  margin-left: 10px;
  padding: 0 8px;
  border: 1px solid var(--rule);
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: border-color 0.3s var(--ease);
}
.palette-toggle:hover {
  border-color: currentColor;
}
.palette-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.swatch {
  display: flex;
}
.swatch i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  /* The ring keeps the dot of the header's own color visible on the header. */
  box-shadow: 0 0 0 1px var(--rule);
}
.swatch i + i {
  margin-left: -2px;
}
.swatch i:nth-child(1) {
  background: var(--yellow);
}
.swatch i:nth-child(2) {
  background: var(--blue);
}
.swatch i:nth-child(3) {
  background: var(--red);
}
.palette-toggle svg {
  width: 9px;
  height: 9px;
  fill: currentColor;
}
.page {
  padding-left: 22px;
  border-left: 1px solid var(--rule);
}
.nav-links {
  display: flex;
  gap: 22px;
}

@media (max-width: 640px) {
  .nav-name {
    max-width: 9ch;
    line-height: 1.15;
  }
  .nav {
    gap: 8px;
  }
  .nav-links {
    gap: 10px;
    font-size: 14px;
  }
  .nav-links a {
    white-space: nowrap;
  }
  /* The palette button takes the room this spacing had. */
  .page {
    padding-left: 10px;
  }
  .palette-toggle {
    margin-left: 10px;
    padding: 0 6px;
  }
  /* Keep Work, About me and Email on phones. */
  .nav-links a:nth-child(1),
  .nav-links a:nth-child(3),
  .nav-links a:nth-child(4) {
    display: none;
  }
}
</style>
