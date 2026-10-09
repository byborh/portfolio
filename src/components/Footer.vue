<script setup>
import { profile } from '../data/profile.js'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot wrap tone-navy" data-tone="navy">
    <span>© {{ year }} {{ profile.name }}</span>
    <a href="#top" class="ulink">Back to top ↑</a>
  </footer>
</template>

<style scoped>
.foot {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding-block: 28px;
  color: var(--dim);
}
</style>
