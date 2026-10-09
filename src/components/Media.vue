<script setup>
defineProps({
  // { type: 'image' | 'video', src, alt, poster? }
  media: { type: Object, required: true },
  eager: { type: Boolean, default: false },
})
</script>

<template>
  <video
    v-if="media.type === 'video'"
    class="media"
    :src="media.src"
    :poster="media.poster"
    :aria-label="media.alt"
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
  ></video>
  <img
    v-else
    class="media"
    :src="media.src"
    :alt="media.alt"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    width="1600"
    height="1000"
  />
</template>

<style scoped>
.media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}
</style>
