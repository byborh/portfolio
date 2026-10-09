<script setup>
import { ref, computed, watch } from 'vue'
import { MAP } from '../../data/map.js'
import { useVisible } from '../../composables/useVisible.js'

const props = defineProps({
  // [{ id, name }] with Natural Earth ADM0_A3 codes
  visited: { type: Array, required: true },
  markers: { type: Array, required: true },
  active: { type: String, default: '' },
})
const emit = defineEmits(['hover'])

const root = ref(null)
const visible = useVisible(root, 0.25)
// Light up once and stay lit: on a phone the map leaves the screen while you read the list.
const lit = ref(false)
watch(visible, (v) => {
  if (v) lit.value = true
})

// A visited code missing from the map is a data error: fail loudly.
const order = new Map(props.visited.map((v, i) => [v.id, i]))
for (const v of props.visited) {
  if (!MAP.countries.some((c) => c.id === v.id)) throw new Error(`TravelMap: no country "${v.id}" in map.js`)
}

const dots = computed(() => MAP.countries.filter((c) => props.markers.includes(c.id)))
const activeCountry = computed(() => MAP.countries.find((c) => c.id === props.active))

// Keep the name inside the frame: Russia's label point sits on the right edge.
const labelX = computed(() => Math.min(Math.max(activeCountry.value.label[0], 40), MAP.width - 40))
</script>

<template>
  <svg
    ref="root"
    class="map"
    :class="{ lit }"
    :viewBox="`0 0 ${MAP.width} ${MAP.height}`"
    role="img"
    :aria-label="`Map of the countries visited: ${visited.map((v) => v.name).join(', ')}`"
    @mouseleave="emit('hover', '')"
  >
    <path
      v-for="c in MAP.countries"
      :key="c.id"
      :d="c.d"
      class="land"
      :class="{ visited: order.has(c.id), active: c.id === active }"
      :style="order.has(c.id) ? { transitionDelay: `${order.get(c.id) * 110}ms` } : null"
      @mouseenter="emit('hover', c.id)"
    />
    <circle
      v-for="c in dots"
      :key="`dot-${c.id}`"
      :cx="c.label[0]"
      :cy="c.label[1]"
      r="3.2"
      class="dot"
      :class="{ active: c.id === active }"
      :style="{ transitionDelay: `${order.get(c.id) * 110}ms` }"
      @mouseenter="emit('hover', c.id)"
    />
    <text
      v-if="activeCountry"
      :x="labelX"
      :y="activeCountry.label[1] - 9"
      class="label"
      text-anchor="middle"
    >{{ activeCountry.name }}</text>
  </svg>
</template>

<style scoped>
.map {
  display: block;
  width: 100%;
  height: auto;
}
.land {
  fill: var(--blue);
  stroke: var(--navy);
  stroke-width: 0.6;
  stroke-linejoin: round;
  transition: fill 0.5s var(--ease);
}
/* Visited countries light up one by one when the map scrolls into view. */
.lit .land.visited {
  fill: var(--yellow);
}
.land:hover,
.land.active {
  fill: var(--gold);
  transition-delay: 0ms !important;
}
.lit .land.visited.active,
.lit .land.visited:hover {
  fill: var(--red);
}

.dot {
  fill: var(--blue);
  stroke: var(--navy);
  stroke-width: 1;
  transition: fill 0.5s var(--ease), r 0.3s var(--ease);
}
.lit .dot {
  fill: var(--yellow);
}
.lit .dot.active,
.lit .dot:hover {
  fill: var(--red);
  r: 4.4;
  transition-delay: 0ms !important;
}

.label {
  font-family: var(--serif);
  font-size: 15px;
  fill: var(--yellow);
  stroke: var(--navy);
  stroke-width: 4px;
  paint-order: stroke;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .land,
  .dot {
    transition-delay: 0ms !important;
  }
}
</style>
