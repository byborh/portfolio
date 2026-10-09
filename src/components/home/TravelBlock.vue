<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { travel } from '../../data/site.js'

// The map data (≈ 50 KB gzipped) loads in its own chunk, after the first screen.
const TravelMap = defineAsyncComponent(() => import('../travel/TravelMap.vue'))

const active = ref('')
</script>

<template>
  <section id="travel" class="travel wrap block tone-navy" data-tone="navy">
    <p class="kicker"><span>Travel</span><span>Europe & around</span></p>

    <div class="travel-grid">
      <div class="travel-side">
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

      <div class="travel-map">
        <TravelMap :visited="travel.visited" :markers="travel.markers" :active="active" @hover="active = $event" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.travel-grid {
  display: grid;
  grid-template-columns: minmax(240px, 1fr) 2.2fr;
  gap: 56px;
  align-items: start;
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
  columns: 2;
  column-gap: 24px;
  margin-top: 40px;
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
    gap: 32px;
  }
  .travel-map {
    order: -1;
  }
}
</style>
