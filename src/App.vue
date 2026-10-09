<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="blueprint" aria-hidden="true"></div>
  <div class="grain"></div>

  <Header />

  <RouterView v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>

  <Footer />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
