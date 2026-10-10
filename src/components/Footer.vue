<script setup>
import { profile } from '../data/profile.js'

const year = new Date().getFullYear()
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="foot wrap tone-navy" data-tone="navy">
    <span>© {{ year }} {{ profile.name }}</span>
    <!-- Works on every page: /photos and /chess have no #top anchor. -->
    <button type="button" class="ulink to-top" @click="toTop">Back to top ↑</button>
  </footer>
</template>

<style scoped>
.foot {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding-block: 28px;
  color: var(--dim);
}
.to-top {
  border: 0;
  background-color: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
</style>
