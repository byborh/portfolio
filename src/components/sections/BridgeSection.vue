<script setup>
import { RouterLink } from 'vue-router'
import { bridge } from '../../data/story.js'
</script>

<template>
  <section class="section container" id="bridge">
    <p class="section-label" v-reveal>{{ bridge.label }}</p>
    <h2 class="section-title bridge-title" v-reveal>{{ bridge.title }}</h2>
    <p class="section-lead" v-reveal>{{ bridge.lead }}</p>

    <div class="versions">
      <article
        v-for="(v, i) in bridge.versions"
        :key="v.ref"
        class="version panel"
        :class="{ shipped: v.shipped }"
        v-reveal="{ delay: i * 90 }"
      >
        <header class="version-head mono">
          <span>{{ v.ref }}</span>
          <span class="version-status">
            <i :class="v.shipped ? 'bi bi-check2-circle' : 'bi bi-x-circle'"></i>
            {{ v.status }}
          </span>
        </header>
        <div class="version-body">
          <div class="version-stack">
            <span v-for="t in v.stack" :key="t" class="chip">{{ t }}</span>
          </div>
          <p class="version-note">{{ v.note }}</p>
        </div>
        <footer class="version-foot mono">
          {{ v.repos }} {{ v.repos > 1 ? 'repositories' : 'repository' }}
        </footer>
      </article>
    </div>

    <div class="lesson panel" v-reveal>
      <p class="lesson-title mono">{{ bridge.lesson.title }}</p>
      <p class="lesson-text">{{ bridge.lesson.text }}</p>
      <div class="lesson-actions">
        <a :href="bridge.live" target="_blank" rel="noopener" class="btn btn-ghost">
          <i class="bi bi-box-arrow-up-right"></i> micro-sud.vercel.app
        </a>
        <RouterLink :to="bridge.caseStudy" class="btn btn-ghost">
          Case study <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bridge-title {
  max-width: 22ch;
}

.versions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 44px;
}
.version {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.version-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 12px 18px;
  border-bottom: 1px solid var(--stroke);
}
.version-status {
  display: inline-flex;
  gap: 6px;
  color: var(--text-faint);
}
.version.shipped {
  border-color: rgba(74, 222, 128, 0.35);
}
.version.shipped .version-status {
  color: #4ade80;
}
.version-body {
  flex: 1;
  padding: 18px;
}
.version-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}
.version-note {
  color: var(--text-muted);
  font-size: 0.95rem;
}
.version-foot {
  font-size: 0.72rem;
  color: var(--text-faint);
  padding: 10px 18px;
  border-top: 1px dashed var(--stroke);
}

.lesson {
  margin-top: 22px;
  padding: 26px 28px;
  border-radius: var(--radius-sm);
  border-left: 2px solid var(--accent);
}
.lesson-title {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}
.lesson-text {
  font-size: 1.12rem;
  line-height: 1.65;
  max-width: 70ch;
  margin-bottom: 22px;
}
.lesson-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 900px) {
  .versions {
    grid-template-columns: 1fr;
  }
}
</style>
