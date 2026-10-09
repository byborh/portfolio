<script setup>
import { profile, socials } from '../../data/profile.js'
import { about } from '../../data/site.js'
</script>

<template>
  <section id="about" class="about wrap block tone-yellow" data-tone="yellow">
    <p class="kicker"><span>About</span><span>{{ profile.languages.join(' · ') }}</span></p>

    <div class="about-grid">
      <img
        :src="profile.photo"
        :alt="`Portrait of ${profile.name}`"
        class="about-photo"
        width="200"
        height="200"
        loading="lazy"
      />
      <div>
        <p v-for="l in about.lines" :key="l" class="about-line serif" v-reveal>{{ l }}</p>
        <p class="about-open muted" v-reveal>{{ about.open }}</p>
      </div>
    </div>

    <div class="contact">
      <a :href="`mailto:${profile.email}`" class="hello serif">Say hello <span class="hello-arrow">↗</span></a>
      <div class="contact-links">
        <a :href="`mailto:${profile.email}`" class="ulink">{{ profile.email }}</a>
        <a v-for="s in socials" :key="s.label" :href="s.url" target="_blank" rel="noopener" class="ulink">
          {{ s.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>

.about-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  align-items: start;
}
.about-photo {
  width: 100%;
  /* The height attribute would win over aspect-ratio and stretch the photo on narrow screens. */
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  /* Grayscale multiplied on yellow gives a duotone portrait in the palette. */
  filter: grayscale(1) contrast(1.1);
  mix-blend-mode: multiply;
}
.about-line {
  font-size: clamp(26px, 3.4vw, 48px);
  line-height: 1.12;
  max-width: 24ch;
  margin-bottom: 18px;
}
.about-open {
  font-size: 14px;
  margin-top: 28px;
}

.contact {
  margin-top: 140px;
}
.hello {
  display: inline-block;
  font-size: clamp(56px, 12vw, 200px);
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
  gap: 10px 28px;
  margin-top: 28px;
  font-size: 14px;
}

@media (max-width: 760px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .about-photo {
    width: 120px;
  }
}
</style>
