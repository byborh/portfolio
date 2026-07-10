<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const dot = ref(null)
const ring = ref(null)
let rx = 0, ry = 0, dx = 0, dy = 0, raf
let enabled = false

function onMove(e) {
  dx = e.clientX
  dy = e.clientY
  if (dot.value) {
    dot.value.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
  }
  // hover state on interactive elements
  const t = e.target
  const interactive = t.closest('a, button, .btn, [data-cursor="hover"], input, textarea')
  ring.value?.classList.toggle('is-hover', !!interactive)
}

function loop() {
  rx += (dx - rx) * 0.16
  ry += (dy - ry) * 0.16
  if (ring.value) {
    ring.value.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
  }
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!fine) return
  enabled = true
  document.body.classList.add('has-custom-cursor')
  window.addEventListener('pointermove', onMove)
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  if (!enabled) return
  document.body.classList.remove('has-custom-cursor')
  window.removeEventListener('pointermove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="cursor-wrap" aria-hidden="true">
    <div ref="ring" class="cursor-ring"></div>
    <div ref="dot" class="cursor-dot"></div>
  </div>
</template>

<style scoped>
.cursor-wrap {
  display: none;
}
@media (hover: hover) and (pointer: fine) {
  .cursor-wrap {
    display: block;
  }
}

.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  margin-left: -3px;
  margin-top: -3px;
}
.cursor-dot {
  width: 6px;
  height: 6px;
  background: var(--accent);
}
.cursor-ring {
  width: 34px;
  height: 34px;
  margin-left: -17px;
  margin-top: -17px;
  border: 1px solid rgba(240, 151, 92, 0.55);
  transition: width 0.25s var(--ease), height 0.25s var(--ease),
    margin 0.25s var(--ease), background 0.25s, border-color 0.25s;
}
.cursor-ring.is-hover {
  width: 52px;
  height: 52px;
  margin-left: -26px;
  margin-top: -26px;
  background: rgba(240, 151, 92, 0.1);
  border-color: var(--accent);
}
</style>
