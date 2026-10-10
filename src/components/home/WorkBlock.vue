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

    <ul class="more">
      <li v-for="m in more" :key="m.title" v-reveal>
        <a :href="m.url" target="_blank" rel="noopener" class="more-row">
          <span class="more-title serif">{{ m.title }}</span>
          <span class="more-line muted">{{ m.line }}</span>
          <span class="muted">{{ m.year }} ↗</span>
        </a>
      </li>
    </ul>
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
  list-style: none;
  margin-top: 80px;
  border-top: 1px solid var(--rule);
}
.more-row {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 24px;
  align-items: baseline;
  padding: 18px 0;
  border-bottom: 1px solid var(--rule);
  font-size: 16px;
  transition: padding 0.5s var(--ease);
}
.more-row:hover {
  padding-left: 10px;
}
.more-title {
  font-size: 28px;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }
  .item.full .item-media {
    aspect-ratio: 16 / 10;
  }
  .more-row {
    grid-template-columns: 1fr auto;
    gap: 4px 16px;
  }
  .more-line {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}
</style>
