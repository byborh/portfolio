<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref(null)
let ctx, raf, particles, mouse, w, h, dpr, running = true

const CONFIG = {
  density: 0.00009,   // particles per px²
  maxParticles: 130,
  linkDist: 140,
  mouseDist: 190,
  speed: 0.18,
}

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function build() {
  const el = canvas.value
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = el.clientWidth
  h = el.clientHeight
  el.width = w * dpr
  el.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const count = Math.min(CONFIG.maxParticles, Math.floor(w * h * CONFIG.density))
  particles = Array.from({ length: count }, () => ({
    x: rand(0, w),
    y: rand(0, h),
    vx: rand(-CONFIG.speed, CONFIG.speed),
    vy: rand(-CONFIG.speed, CONFIG.speed),
    r: rand(0.6, 1.8),
  }))
}

function draw() {
  if (!running) return
  ctx.clearRect(0, 0, w, h)

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0 || p.x > w) p.vx *= -1
    if (p.y < 0 || p.y > h) p.vy *= -1

    // gentle attraction toward cursor
    if (mouse.x !== null) {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const d = Math.hypot(dx, dy)
      if (d < CONFIG.mouseDist) {
        const f = (1 - d / CONFIG.mouseDist) * 0.4
        p.x += (dx / d) * f
        p.y += (dy / d) * f
      }
    }

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(240, 151, 92, 0.55)'
    ctx.fill()
  }

  // links
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]
      const b = particles[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const d = Math.hypot(dx, dy)
      if (d < CONFIG.linkDist) {
        const alpha = (1 - d / CONFIG.linkDist) * 0.18
        ctx.strokeStyle = `rgba(200, 180, 200, ${alpha})`
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }

  // cursor links (accent-tinted)
  if (mouse.x !== null) {
    for (const p of particles) {
      const d = Math.hypot(mouse.x - p.x, mouse.y - p.y)
      if (d < CONFIG.mouseDist) {
        const alpha = (1 - d / CONFIG.mouseDist) * 0.5
        ctx.strokeStyle = `rgba(240, 151, 92, ${alpha})`
        ctx.lineWidth = 0.7
        ctx.beginPath()
        ctx.moveTo(mouse.x, mouse.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
    }
  }

  raf = requestAnimationFrame(draw)
}

let resizeTimer
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(build, 200)
}
function onMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}
function onLeave() {
  mouse.x = null
  mouse.y = null
}
function onVisibility() {
  running = !document.hidden
  if (running) {
    raf = requestAnimationFrame(draw)
  } else {
    cancelAnimationFrame(raf)
  }
}

onMounted(() => {
  mouse = { x: null, y: null }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ctx = canvas.value.getContext('2d')
  build()
  if (!reduced) {
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerout', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(draw)
  } else {
    running = false
    // draw a single static frame
    running = true
    draw()
    running = false
    cancelAnimationFrame(raf)
  }
})

onBeforeUnmount(() => {
  running = false
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerout', onLeave)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div class="bg-layer" aria-hidden="true">
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="grid-overlay"></div>
    <canvas ref="canvas" class="particles"></canvas>
  </div>
</template>

<style scoped>
.bg-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: radial-gradient(120% 90% at 50% -10%, #0e0e15 0%, var(--bg) 55%);
}

.particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.aurora {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.5;
  will-change: transform;
}
.aurora-1 {
  width: 55vw;
  height: 55vw;
  top: -18vw;
  left: -12vw;
  background: radial-gradient(circle, rgba(232, 120, 63, 0.4), transparent 68%);
  animation: float1 20s ease-in-out infinite;
}
.aurora-2 {
  width: 48vw;
  height: 48vw;
  bottom: -20vw;
  right: -14vw;
  background: radial-gradient(circle, rgba(122, 162, 255, 0.28), transparent 68%);
  animation: float2 26s ease-in-out infinite;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 30%, #000 0%, transparent 75%);
  -webkit-mask-image: radial-gradient(circle at 50% 30%, #000 0%, transparent 75%);
}

@keyframes float1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(6vw, 5vh) scale(1.12); }
}
@keyframes float2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-5vw, -4vh) scale(1.08); }
}
</style>
