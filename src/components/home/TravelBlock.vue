<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { travel } from '../../data/site.js'

// The map data (≈ 70 KB gzipped) loads in its own chunk, after the first screen.
const TravelMap = defineAsyncComponent(() => import('../travel/TravelMap.vue'))

const active = ref('')
</script>

<template>
  <section id="travel" class="travel wrap block tone-navy" data-tone="navy">
    <p class="kicker"><span>Travel</span><span>From Morocco to Kazakhstan</span></p>

    <div class="travel-map">
      <TravelMap :visited="travel.visited" :markers="travel.markers" :active="active" @hover="active = $event" />
    </div>

    <div class="travel-grid">
      <p class="count serif">
        {{ travel.visited.length }}<span class="count-unit">countries</span>
      </p>
      <ul class="countries" @mouseleave="active = ''">
        <li
          v-for="c in travel.visited"
          :key="c.id"
          class="country serif"
          :class="{ on: active === c.id }"
          @mouseenter="active = c.id"
        >{{ c.name }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.travel-grid {
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 3fr;
  gap: 56px;
  align-items: start;
  margin-top: 48px;
}

.count {
  font-size: clamp(96px, 14vw, 220px);
  line-height: 0.8;
  letter-spacing: -0.05em;
}
.count-unit {
  display: block;
  font-size: 0.16em;
  letter-spacing: 0;
  margin-top: 14px;
  color: var(--dim);
  font-style: italic;
}

.countries {
  list-style: none;
  columns: 3;
  column-gap: 32px;
}
.country {
  font-size: 24px;
  line-height: 1.5;
  cursor: default;
  transition: color 0.25s, transform 0.4s var(--ease);
}
.country.on {
  /* Red text on navy is under 3:1: the red goes in the underline. */
  text-decoration: underline var(--red) 3px;
  text-underline-offset: 5px;
  transform: translateX(6px);
}

@media (max-width: 860px) {
  .travel-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .countries {
    columns: 2;
  }
}
</style>
