<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { profile } from '../data/profile.js'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#path', label: 'Path' },
  { href: '#films', label: 'Films' },
  { href: '#travel', label: 'Travel' },
  { href: '#off', label: 'Off hours' },
  { href: '#about', label: 'About' },
]

// The bar takes the tone of the section under it, so it stays readable on every colour.
// It reads the section under the bar's middle line on each scroll frame: exact even after a long jump,
// where an IntersectionObserver can report two sections at once and pick the wrong one.
const BAR_MIDDLE = 28
const tone = ref('yellow')
const router = useRouter()
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

onMounted(async () => {
  // The page renders after the first navigation resolves: wait for it, or only the footer exists yet.
  await router.isReady()
  await nextTick()
  sections = [...document.querySelectorAll('[data-tone]')]
  window.addEventListener('scroll', onScroll, { passive: true })
  update()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <header class="nav wrap" :class="`tone-${tone}`">
    <a href="#top" class="nav-name">{{ profile.name }}</a>
    <nav class="nav-links" aria-label="Main">
      <a v-for="l in links" :key="l.href" :href="l.href" class="ulink">{{ l.label }}</a>
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
  height: 56px;
  font-size: 14px;
  /* Transparent bar: only the text colour follows the tone. */
  background: transparent;
  transition: color 0.4s var(--ease);
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
    font-size: 13px;
  }
  /* Keep Work, Films, About and Email on phones. */
  .nav-links a:nth-child(2),
  .nav-links a:nth-child(4),
  .nav-links a:nth-child(5) {
    display: none;
  }
}
</style>
