<script setup>
import Media from '../Media.vue'
import { work, more } from '../../data/site.js'

const count = String(work.length).padStart(2, '0')
</script>

<template>
  <section id="work" class="work wrap block tone-blue" data-tone="blue">
    <p class="kicker"><span>Selected work</span><span>({{ count }})</span></p>

    <div class="grid">
      <a
        v-for="w in work"
        :key="w.title"
        :href="w.url"
        target="_blank"
        rel="noopener"
        class="item"
        :class="w.size"
        v-reveal
      >
        <div class="item-media">
          <Media :media="w.media" />
        </div>
        <div class="item-meta">
          <h3 class="item-title serif">{{ w.title }}</h3>
          <span class="muted">{{ w.year }}</span>
        </div>
        <p class="item-role">{{ w.role }}</p>
        <p v-for="d in w.did" :key="d" class="item-line">{{ d }}</p>
        <p class="item-stack muted">{{ w.stack.join(' · ') }}</p>
      </a>
    </div>

    <!-- Same reading as the cards above; a thick rule stands in for the picture. -->
    <div class="grid more">
      <a
        v-for="m in more"
        :key="m.title"
        :href="m.url"
        target="_blank"
        rel="noopener"
        class="item text-item"
        v-reveal
      >
        <p class="item-source">GitHub <span aria-hidden="true">↗</span></p>
        <div class="item-meta">
          <h3 class="item-title serif">{{ m.title }}</h3>
          <span class="muted">{{ m.year }}</span>
        </div>
        <p class="item-role">{{ m.role }}</p>
        <p v-for="d in m.did" :key="d" class="item-line">{{ d }}</p>
        <p class="item-stack muted">{{ m.stack.join(' · ') }}</p>
      </a>
    </div>
  </section>
</template>

<style scoped>

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px 24px;
}
.item.full {
  grid-column: 1 / -1;
}

.item-media {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--well);
}
.item.full .item-media {
  aspect-ratio: 16 / 8;
}
.item-media :deep(.media) {
  transition: transform 1.2s var(--ease);
}
.item:hover .item-media :deep(.media) {
  transform: scale(1.025);
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-top: 18px;
  font-size: 16px;
}
.item-title {
  font-size: clamp(30px, 3vw, 44px);
  line-height: 1.05;
  /* Red text on blue is under 3:1, so red shows as the hover underline instead. */
  background: linear-gradient(var(--red), var(--red)) 0 100% / 0 3px no-repeat;
  transition: background-size 0.5s var(--ease);
}
.item:hover .item-title {
  background-size: 100% 3px;
}
.item-role {
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--dim);
  margin: 6px 0 12px;
}
.item-line {
  font-size: 17px;
  line-height: 1.55;
  margin-top: 6px;
  max-width: 58ch;
}
.item-stack {
  font-size: 15px;
  margin-top: 14px;
}

.more {
  margin-top: 80px;
}
.item-source {
  padding-top: 14px;
  border-top: 6px solid var(--fg);
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--dim);
}
.text-item:hover .item-source {
  border-top-color: var(--red);
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }
  .item.full .item-media {
    aspect-ratio: 16 / 10;
  }
}
</style>
