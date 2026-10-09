<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Colours read from the palette tokens so the pad stays in sync with main.css.
const BRUSHES = [
  { name: 'Navy', token: '--navy' },
  { name: 'Red', token: '--red' },
  { name: 'Blue', token: '--blue' },
]

const canvas = ref(null)
const brush = ref(BRUSHES[0])
const touched = ref(false)

// Points are stored in 0..1 space so the drawing survives a resize.
const strokes = []
let current = null
let ctx
let resizeObserver

function color(token) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  if (!value) throw new Error(`PaintPad: CSS token ${token} is not defined`)
  return value
}

function drawStroke(stroke) {
  const { width, height } = canvas.value
  const pts = stroke.points
  ctx.strokeStyle = color(stroke.token)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    // Width per segment: fast moves make thin strokes, like a dry brush.
    ctx.lineWidth = b.w * width
    ctx.beginPath()
    ctx.moveTo(a.x * width, a.y * height)
    ctx.lineTo(b.x * width, b.y * height)
    ctx.stroke()
  }
}

function redraw() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  strokes.forEach(drawStroke)
}

function resize() {
  const el = canvas.value
  const ratio = window.devicePixelRatio
  el.width = Math.round(el.clientWidth * ratio)
  el.height = Math.round(el.clientHeight * ratio)
  redraw()
}

function point(e) {
  const r = canvas.value.getBoundingClientRect()
  return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, t: e.timeStamp }
}

function down(e) {
  canvas.value.setPointerCapture(e.pointerId)
  touched.value = true
  const p = point(e)
  current = { token: brush.value.token, points: [{ ...p, w: 0.012 }] }
  strokes.push(current)
}

function move(e) {
  if (!current) return
  const p = point(e)
  const prev = current.points[current.points.length - 1]
  const speed = Math.hypot(p.x - prev.x, p.y - prev.y) / Math.max(1, p.t - prev.t)
  const pressure = e.pointerType === 'pen' ? e.pressure : 0.5
  const target = Math.max(0.003, 0.02 * pressure * 2 - speed * 4)
  // Ease the width towards the target so the stroke edge stays smooth.
  const w = prev.w + (target - prev.w) * 0.35
  current.points.push({ ...p, w })
  drawStroke({ token: current.token, points: [prev, current.points[current.points.length - 1]] })
}

function up() {
  current = null
}

function clear() {
  strokes.length = 0
  touched.value = false
  redraw()
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas.value)
})
onBeforeUnmount(() => resizeObserver.disconnect())
</script>

<template>
  <div class="pad">
    <div class="pad-sheet">
      <canvas
        ref="canvas"
        class="pad-canvas"
        aria-label="Drawing canvas: draw with your mouse, pen or finger"
        @pointerdown="down"
        @pointermove="move"
        @pointerup="up"
        @pointercancel="up"
      ></canvas>
      <p class="pad-hint serif" :class="{ gone: touched }" aria-hidden="true">Your turn.</p>
    </div>

    <div class="pad-tools">
      <div class="pad-brushes" role="radiogroup" aria-label="Brush colour">
        <button
          v-for="b in BRUSHES"
          :key="b.name"
          class="pad-brush"
          :class="{ on: brush.name === b.name }"
          :style="{ background: `var(${b.token})` }"
          role="radio"
          :aria-checked="brush.name === b.name"
          :aria-label="b.name"
          @click="brush = b"
        ></button>
      </div>
      <button class="pad-clear ulink" @click="clear">Clear</button>
    </div>
  </div>
</template>

<style scoped>
.pad-sheet {
  position: relative;
  aspect-ratio: 16 / 7;
  background: var(--yellow);
}
.pad-canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  /* Without this, a finger on the canvas scrolls the page instead of painting. */
  touch-action: none;
}
.pad-hint {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: clamp(36px, 6vw, 88px);
  color: rgba(0, 29, 61, 0.28);
  pointer-events: none;
  transition: opacity 0.6s var(--ease);
}
.pad-hint.gone {
  opacity: 0;
}

.pad-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
}
.pad-brushes {
  display: flex;
  gap: 10px;
}
.pad-brush {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid var(--fg);
  cursor: pointer;
  transition: transform 0.3s var(--ease);
}
.pad-brush.on {
  transform: scale(1.25);
}
.pad-clear {
  background-color: transparent;
  border: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

@media (max-width: 640px) {
  .pad-sheet {
    aspect-ratio: 4 / 3;
  }
}
</style>
