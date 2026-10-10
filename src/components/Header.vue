<script setup>
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { profile } from '../data/profile.js'

// Home sections in page order, then the two separate pages. Router links work from any page.
const links = [
  { to: { path: '/', hash: '#about' }, label: 'About' },
  { to: { path: '/', hash: '#work' }, label: 'Work' },
  { to: { path: '/', hash: '#path' }, label: 'Path' },
  { to: { path: '/', hash: '#films' }, label: 'Films' },
  { to: { path: '/', hash: '#travel' }, label: 'Travel' },
  { to: '/photos', label: 'Photos' },
  { to: '/chess', label: 'Chess' },
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
      <RouterLink v-for="l in links" :key="l.label" :to="l.to" class="ulink">{{ l.label }}</RouterLink>
      <a :href="`mailto:${profile.email}`" class="ulink">Email</a>
    </nav>
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
  display: flex;
  gap: 22px;
}

@media (max-width: 640px) {
  .nav-name {
    max-width: 9ch;
    line-height: 1.15;
  }
  .nav-links {
    gap: 12px;
    font-size: 14px;
  }
  /* Keep About, Work, Photos and Email on phones. */
  .nav-links a:nth-child(3),
  .nav-links a:nth-child(4),
  .nav-links a:nth-child(5),
  .nav-links a:nth-child(7) {
    display: none;
  }
}
</style>
