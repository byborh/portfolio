<script setup>
import SpecCard from '../ui/SpecCard.vue'
import { path } from '../../data/story.js'
</script>

<template>
  <section class="section container" id="path">
    <p class="section-label" v-reveal>{{ path.label }}</p>
    <h2 class="section-title" v-reveal>{{ path.title }}</h2>
    <p class="section-lead" v-reveal>{{ path.lead }}</p>

    <div class="tools">
      <div
        v-for="(t, i) in path.items"
        :key="t.name"
        :class="{ featured: t.featured }"
        v-reveal="{ delay: i * 80 }"
      >
        <SpecCard :code="t.ref" :title="t.name" :meta="t.meta" :url="t.url" :case-study="t.link">
          <p class="tool-text">{{ t.text }}</p>
          <p v-if="t.note" class="tool-note mono">{{ t.note }}</p>
        </SpecCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tools {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 44px;
}
.featured {
  grid-column: 1 / -1;
}
.tool-text {
  color: var(--text-muted);
  font-size: 0.95rem;
  max-width: 75ch;
}
.tool-note {
  margin-top: 14px;
  font-size: 0.76rem;
  color: var(--text-faint);
}

@media (max-width: 760px) {
  .tools {
    grid-template-columns: 1fr;
  }
}
</style>
