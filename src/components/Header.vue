<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { profile } from '../data/profile.js'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#path', label: 'Path' },
  { href: '#films', label: 'Films' },
  { href: '#off', label: 'Off hours' },
  { href: '#about', label: 'About' },
]

// The bar takes the tone of the section under it, so it stays readable on yellow and on navy.
const tone = ref('yellow')
const router = useRouter()
let observer

onMounted(async () => {
  // The page renders after the first navigation resolves: wait for it, or only the footer exists yet.
  await router.isReady()
  await nextTick()
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) tone.value = e.target.dataset.tone
      }
    },
    // Observe only the top 4% of the viewport: the band where the bar sits.
    { rootMargin: '0px 0px -96% 0px' }
  )
  document.querySelectorAll('[data-tone]').forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
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
  .nav-links a:nth-child(4) {
    display: none;
  }
}
</style>
