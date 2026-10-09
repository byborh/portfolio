<script setup>
import { profile } from '../data/profile.js'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#path', label: 'Path' },
  { href: '#about', label: 'About' },
]
</script>

<template>
  <header class="nav wrap">
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
  /* Difference blend keeps the bar readable over light paper and dark screenshots. */
  color: #fff;
  mix-blend-mode: difference;
}
.nav-name {
  font-weight: 500;
}
.nav-links {
  display: flex;
  gap: 22px;
}

@media (max-width: 520px) {
  .nav-name {
    max-width: 9ch;
    line-height: 1.15;
  }
  .nav-links {
    gap: 14px;
  }
}
</style>
