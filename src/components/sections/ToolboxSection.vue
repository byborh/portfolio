<script setup>
import { toolbox } from '../../data/story.js'
</script>

<template>
  <section class="section container" id="toolbox">
    <p class="section-label" v-reveal>{{ toolbox.label }}</p>
    <h2 class="section-title" v-reveal>{{ toolbox.title }}</h2>

    <dl class="groups">
      <div v-for="(g, i) in toolbox.groups" :key="g.name" class="group" v-reveal="{ delay: i * 60 }">
        <dt class="group-name mono">{{ g.name }}</dt>
        <dd class="group-items">
          <span v-for="t in g.items" :key="t" class="chip">{{ t }}</span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.groups {
  margin-top: 32px;
  display: grid;
}
.group {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 20px;
  align-items: baseline;
  padding: 16px 0;
  border-bottom: 1px dashed var(--stroke);
}
.group-name {
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.group-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 640px) {
  .group {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
