<script setup>
import { profile, socials } from '../../data/profile.js'
import { about } from '../../data/site.js'
</script>

<template>
  <section id="contact" class="contact wrap block tone-yellow" data-tone="yellow">
    <p class="kicker"><span>Contact</span><span>{{ about.open }}</span></p>

    <a :href="`mailto:${profile.email}`" class="hello serif">Say hello <span class="hello-arrow">↗</span></a>
    <div class="contact-links">
      <a :href="`mailto:${profile.email}`" class="ulink">{{ profile.email }}</a>
      <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" rel="noopener" class="ulink">
        {{ s.label }}
      </a>
    </div>
  </section>
</template>

<style scoped>
.hello {
  display: inline-block;
  font-size: clamp(64px, 13vw, 220px);
  line-height: 0.9;
  letter-spacing: -0.03em;
}
.hello-arrow {
  display: inline-block;
  color: var(--red);
  transition: transform 0.6s var(--ease);
}
.hello:hover .hello-arrow {
  transform: translate(8px, -8px);
}
.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 32px;
  margin-top: 32px;
  font-size: 17px;
}
</style>
