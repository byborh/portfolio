<script setup>
import SpecCard from '../ui/SpecCard.vue'
import { sideQuests } from '../../data/story.js'
</script>

<template>
  <section class="section container" id="side-quests">
    <p class="section-label" v-reveal>{{ sideQuests.label }}</p>
    <h2 class="section-title" v-reveal>{{ sideQuests.title }}</h2>

    <div class="quests">
      <div v-for="(q, i) in sideQuests.items" :key="q.name" v-reveal="{ delay: i * 70 }">
        <SpecCard :code="q.ref" :title="q.name" :case-study="q.link">
          <p class="quest-role mono">{{ q.role }}</p>
          <p class="quest-text">{{ q.text }}</p>
        </SpecCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quests {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-top: 36px;
}
.quest-role {
  font-size: 0.78rem;
  color: var(--accent);
  margin-bottom: 10px;
}
.quest-text {
  color: var(--text-muted);
  font-size: 0.95rem;
}

@media (max-width: 760px) {
  .quests {
    grid-template-columns: 1fr;
  }
}
</style>
