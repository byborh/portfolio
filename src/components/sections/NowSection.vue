<script setup>
import SpecCard from '../ui/SpecCard.vue'
import { now } from '../../data/story.js'
</script>

<template>
  <section class="section container" id="now">
    <p class="section-label" v-reveal>{{ now.label }}</p>
    <h2 class="section-title" v-reveal>{{ now.title }}</h2>
    <p class="section-lead" v-reveal>{{ now.lead }}</p>

    <div class="products">
      <div v-for="(p, i) in now.products" :key="p.ref" v-reveal="{ delay: i * 90 }">
        <SpecCard :code="p.ref" :title="p.name" :meta="p.meta" :url="p.url">
          <p class="product-about">{{ p.about }}</p>
          <p class="product-work-label mono">My work</p>
          <p class="product-work">{{ p.work }}</p>
        </SpecCard>
      </div>
    </div>

    <p class="extra mono" v-reveal><i class="bi bi-plus-lg"></i> {{ now.extra }}</p>
  </section>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 44px;
}
.product-about {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 18px;
}
.product-work-label {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
}
.product-work {
  font-size: 0.95rem;
}
.extra {
  margin-top: 22px;
  font-size: 0.82rem;
  color: var(--text-muted);
  display: flex;
  gap: 10px;
  align-items: center;
}
.extra i {
  color: var(--accent);
}

@media (max-width: 900px) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
