<script setup>
import { ref } from 'vue'

defineProps({
  // { id, title, poster, format: 'wide' | 'tall' }
  film: { type: Object, required: true },
})

// The iframe loads only on click: no YouTube cookies or 1 MB player before the visitor asks.
const playing = ref(false)
</script>

<template>
  <div class="film" :class="film.format">
    <iframe
      v-if="playing"
      :src="`https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0&playsinline=1`"
      :title="film.title"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen
      class="film-frame"
    ></iframe>
    <button v-else class="film-poster" :aria-label="`Play ${film.title}`" @click="playing = true">
      <img :src="film.poster" :alt="''" loading="lazy" decoding="async" />
      <span class="film-play" aria-hidden="true"></span>
    </button>
  </div>
</template>

<style scoped>
.film {
  position: relative;
  overflow: hidden;
  background: var(--well);
}
.film.wide {
  aspect-ratio: 16 / 9;
}
.film.tall {
  aspect-ratio: 9 / 16;
}

.film-frame,
.film-poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.film-poster {
  padding: 0;
  cursor: pointer;
  background: none;
}
.film-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s var(--ease);
}
.film-poster:hover img {
  transform: scale(1.03);
}

/* Yellow disc, navy triangle: readable on any thumbnail and on the red block. */
.film-play {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: var(--yellow);
  transform: translate(-50%, -50%);
  transition: transform 0.5s var(--ease);
}
.film-play::after {
  content: '';
  position: absolute;
  left: 31px;
  top: 24px;
  border-style: solid;
  border-width: 14px 0 14px 22px;
  border-color: transparent transparent transparent var(--navy);
}
.film-poster:hover .film-play {
  transform: translate(-50%, -50%) scale(1.1);
}
.film-poster:focus-visible {
  outline: 3px solid var(--yellow);
  outline-offset: 4px;
}
</style>
