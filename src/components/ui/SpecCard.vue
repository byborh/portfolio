<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  // Short reference printed like a part number, e.g. 'LYC-01' or a date.
  code: { type: String, required: true },
  title: { type: String, required: true },
  meta: { type: String, default: '' },
  url: { type: String, default: '' },
  caseStudy: { type: String, default: '' },
})
</script>

<template>
  <article class="spec panel">
    <header class="spec-head mono">
      <span>{{ code }}</span>
      <a v-if="url" :href="url" target="_blank" rel="noopener" class="spec-meta">
        {{ meta }} <i class="bi bi-arrow-up-right"></i>
      </a>
      <span v-else-if="meta" class="spec-meta">{{ meta }}</span>
    </header>

    <div class="spec-body">
      <h3 class="spec-title">{{ title }}</h3>
      <slot />
    </div>

    <footer v-if="caseStudy" class="spec-foot">
      <RouterLink :to="caseStudy" class="spec-link mono">
        Case study <i class="bi bi-arrow-right"></i>
      </RouterLink>
    </footer>
  </article>
</template>

<style scoped>
.spec {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-sm);
  overflow: hidden;
  height: 100%;
}
.spec-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
  padding: 11px 18px;
  border-bottom: 1px solid var(--stroke);
}
.spec-meta {
  color: var(--text-muted);
  text-transform: none;
  letter-spacing: 0.02em;
}
a.spec-meta:hover {
  color: var(--accent);
}
.spec-body {
  flex: 1;
  padding: 20px 18px 22px;
}
.spec-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.2;
  margin-bottom: 10px;
}
.spec-foot {
  padding: 12px 18px;
  border-top: 1px dashed var(--stroke);
}
.spec-link {
  font-size: 0.78rem;
  color: var(--accent);
  display: inline-flex;
  gap: 8px;
}
.spec-link:hover i {
  transform: translateX(3px);
}
.spec-link i {
  transition: transform 0.3s var(--ease);
}
</style>
