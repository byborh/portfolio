<script setup>
import { theSwitch } from '../../data/story.js'
</script>

<template>
  <section class="section container" id="switch">
    <div class="switch-grid">
      <div>
        <p class="section-label" v-reveal>{{ theSwitch.label }}</p>
        <h2 class="section-title" v-reveal>{{ theSwitch.title }}</h2>
        <p v-for="(p, i) in theSwitch.paragraphs" :key="i" class="switch-text" v-reveal>{{ p }}</p>
      </div>

      <div class="switch-side">
        <pre class="repo panel mono" v-reveal><span class="c-faint">$ gh repo view {{ theSwitch.firstRepo.name }}</span>
<span class="c-key">created</span>  {{ theSwitch.firstRepo.created }}
<span class="c-key">about</span>    {{ theSwitch.firstRepo.about }}</pre>

        <ol class="steps" v-reveal>
          <li v-for="s in theSwitch.steps" :key="s.what + s.when" class="step">
            <span class="step-when mono">{{ s.when }}</span>
            <span class="step-what">{{ s.what }}</span>
            <span class="step-where">{{ s.where }}</span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.switch-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
}
/* Grid items default to min-width: auto, so the <pre> would widen the column on mobile. */
.switch-grid > * {
  min-width: 0;
}
.switch-text {
  color: var(--text-muted);
  font-size: 1.04rem;
  line-height: 1.75;
  max-width: 58ch;
  margin-bottom: 16px;
}

.repo {
  border-radius: var(--radius-sm);
  padding: 20px 22px;
  font-size: 0.84rem;
  line-height: 1.9;
  color: var(--text);
  overflow-x: auto;
  white-space: pre;
}
.c-faint {
  color: var(--text-faint);
}
.c-key {
  color: var(--accent);
}

.steps {
  list-style: none;
  margin-top: 22px;
  border-left: 1px solid var(--stroke-strong);
}
.step {
  position: relative;
  display: grid;
  gap: 2px;
  padding: 0 0 20px 22px;
}
.step::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
}
.step-when {
  font-size: 0.74rem;
  color: var(--text-faint);
}
.step-what {
  font-weight: 500;
}
.step-where {
  font-size: 0.9rem;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .switch-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
