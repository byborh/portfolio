<script setup>
import { method } from '../../data/story.js'
</script>

<template>
  <section class="section container" id="method">
    <p class="section-label" v-reveal>{{ method.label }}</p>
    <h2 class="section-title" v-reveal>{{ method.title }}</h2>

    <div class="method panel" role="table" aria-label="From workshop to software" v-reveal>
      <div class="m-row m-head mono" role="row">
        <span role="columnheader">Workshop</span>
        <span role="columnheader">Software</span>
        <span role="columnheader">Proof</span>
      </div>
      <div v-for="r in method.rows" :key="r.workshop" class="m-row" role="row">
        <span class="m-workshop" role="cell">{{ r.workshop }}</span>
        <span class="m-software" role="cell">{{ r.software }}</span>
        <span class="m-proof" role="cell">{{ r.proof }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.method {
  margin-top: 36px;
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.m-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1.4fr;
  gap: 24px;
  padding: 18px 22px;
  border-bottom: 1px dashed var(--stroke);
}
.m-row:last-child {
  border-bottom: 0;
}
.m-head {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  border-bottom: 1px solid var(--stroke);
  padding-block: 12px;
}
.m-workshop {
  color: var(--text-muted);
}
.m-software {
  font-weight: 500;
}
.m-proof {
  color: var(--text-muted);
  font-size: 0.93rem;
}
.m-proof::before {
  content: '→ ';
  color: var(--accent);
}

@media (max-width: 760px) {
  .m-head {
    display: none;
  }
  .m-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
