<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useVisible, prefersReducedMotion } from '../../composables/useVisible.js'

const props = defineProps({
  // [{ sport, km, pace: 'per100m' | 'kmh' | 'perkm', texture: 'wave' | 'line' | 'dash' }]
  // Every leg lasts the same hour and fills its own track.
  legs: { type: Array, required: true },
})

const RACE_MS = 6000 // one race hour on screen
const HOLD_MS = 2600 // pause on the finish before the next lap
const LEG_MINUTES = 60

const root = ref(null)
const visible = useVisible(root)
const progress = ref(0)

const clock = computed(() => {
  const seconds = Math.round(LEG_MINUTES * 60 * progress.value)
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return `${mm}:${ss}`
})

const totalKm = computed(() => props.legs.reduce((sum, l) => sum + l.km, 0))

function minSec(minutes) {
  const m = Math.floor(minutes)
  const s = Math.round((minutes - m) * 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function pace(leg) {
  if (leg.pace === 'per100m') return `${minSec(LEG_MINUTES / (leg.km * 10))} /100 m`
  if (leg.pace === 'kmh') return `${leg.km} km/h`
  if (leg.pace === 'perkm') return `${minSec(LEG_MINUTES / leg.km)} /km`
  throw new Error(`TriathlonRace: unknown pace unit "${leg.pace}" for ${leg.sport}`)
}

let raf = 0
let hold = 0
let startedAt = 0

function frame(now) {
  if (!startedAt) startedAt = now
  progress.value = Math.min(1, (now - startedAt) / RACE_MS)
  if (progress.value < 1) {
    raf = requestAnimationFrame(frame)
    return
  }
  hold = setTimeout(() => {
    startedAt = 0
    raf = requestAnimationFrame(frame)
  }, HOLD_MS)
}

function stop() {
  cancelAnimationFrame(raf)
  clearTimeout(hold)
  startedAt = 0
}

watch(visible, (isVisible) => {
  if (prefersReducedMotion()) {
    progress.value = 1
    return
  }
  if (!isVisible) return stop()
  raf = requestAnimationFrame(frame)
})
onBeforeUnmount(stop)
</script>

<template>
  <div ref="root" class="race" :class="{ done: progress === 1 }">
    <p class="race-clock" aria-hidden="true">
      <span class="muted">Each leg</span> <span class="race-time">{{ clock }}</span>
      <span class="muted">/ 60:00</span>
    </p>

    <ol class="race-legs">
      <li v-for="leg in legs" :key="leg.sport" class="leg">
        <span class="leg-sport serif">{{ leg.sport }}</span>
        <div class="leg-track" :class="leg.texture" aria-hidden="true">
          <div class="leg-done" :style="{ width: `${progress * 100}%` }"></div>
          <span class="leg-dot" :style="{ left: `${progress * 100}%` }"></span>
        </div>
        <span class="leg-km serif">
          <span aria-hidden="true">{{ (leg.km * progress).toFixed(1) }}</span>
          <span class="visually-hidden">{{ leg.km }}</span>
          <small> km</small>
        </span>
        <span class="leg-pace muted">{{ pace(leg) }}</span>
      </li>
    </ol>

    <p class="race-total serif">
      {{ totalKm }} km. <em>Three hours.</em>
    </p>
  </div>
</template>

<style scoped>
.race-clock {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 8px;
  font-size: 15px;
  margin-bottom: 10px;
}
.race-time {
  font-variant-numeric: tabular-nums;
  min-width: 5ch;
  text-align: right;
  color: var(--fg);
}

.race-legs {
  list-style: none;
}
.leg {
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  grid-template-areas:
    'sport track km'
    '. track pace';
  column-gap: 28px;
  align-items: center;
  padding: 26px 0;
  border-bottom: 1px solid var(--rule);
}
.leg-sport {
  grid-area: sport;
  font-size: clamp(28px, 3.4vw, 44px);
  line-height: 1;
}
.leg-km {
  grid-area: km;
  text-align: right;
  font-size: clamp(30px, 3.6vw, 48px);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.leg-km small {
  font-size: 0.45em;
}
.leg-pace {
  grid-area: pace;
  text-align: right;
  font-size: 15px;
  margin-top: 6px;
}

/* ---- Tracks: each sport draws its own line ---- */
.leg-track {
  grid-area: track;
  position: relative;
  height: 16px;
}
.leg-track::before,
.leg-done {
  position: absolute;
  inset: 0 auto 0 0;
  height: 100%;
}
.leg-track::before {
  content: '';
  width: 100%;
  background: var(--rule);
}
.leg-done {
  background: var(--fg);
}
/* Swim: a wave, drawn with a mask so it takes the tone colour. */
.leg-track.wave::before,
.leg-track.wave .leg-done {
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='16'%3E%3Cpath d='M0 8 Q8 2 16 8 T32 8' fill='none' stroke='black' stroke-width='2.5'/%3E%3C/svg%3E") repeat-x left center / 32px 16px;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='16'%3E%3Cpath d='M0 8 Q8 2 16 8 T32 8' fill='none' stroke='black' stroke-width='2.5'/%3E%3C/svg%3E") repeat-x left center / 32px 16px;
}
/* Bike: one straight road. */
.leg-track.line::before,
.leg-track.line .leg-done {
  -webkit-mask: linear-gradient(transparent 6px, #000 6px, #000 10px, transparent 10px);
  mask: linear-gradient(transparent 6px, #000 6px, #000 10px, transparent 10px);
}
/* Run: strides. */
.leg-track.dash::before,
.leg-track.dash .leg-done {
  -webkit-mask: linear-gradient(transparent 6px, #000 6px, #000 10px, transparent 10px),
    repeating-linear-gradient(90deg, #000 0 10px, transparent 10px 18px);
  -webkit-mask-composite: source-in;
  mask: linear-gradient(transparent 6px, #000 6px, #000 10px, transparent 10px),
    repeating-linear-gradient(90deg, #000 0 10px, transparent 10px 18px);
  mask-composite: intersect;
}

.leg-dot {
  position: absolute;
  top: 50%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--red);
  border: 3px solid var(--fg);
  transform: translate(-50%, -50%);
}
/* All three finish together: the dots flash red at the line. */
.race.done .leg-dot {
  animation: finish 0.6s var(--ease);
}
@keyframes finish {
  50% {
    transform: translate(-50%, -50%) scale(1.6);
  }
}

.race-total {
  margin-top: 36px;
  font-size: clamp(36px, 5vw, 72px);
  line-height: 1;
  text-align: right;
}
.race-total em {
  font-style: italic;
  /* Red text on blue is 2.2:1, too low even for large type: red goes in the underline. */
  text-decoration: underline var(--red) 4px;
  text-underline-offset: 8px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .leg {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'sport km'
      'track track'
      'pace pace';
    row-gap: 14px;
  }
  .leg-pace {
    text-align: left;
    margin-top: 0;
  }
}
</style>
