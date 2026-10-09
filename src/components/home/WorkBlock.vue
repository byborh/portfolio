<script setup>
import Media from '../Media.vue'
import { work, more } from '../../data/site.js'

const count = String(work.length).padStart(2, '0')
</script>

<template>
  <section id="work" class="work wrap">
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
        <p class="item-line muted">{{ w.line }}</p>
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
.work {
  padding-top: 120px;
}

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
  background: var(--wash);
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
  margin-top: 16px;
  font-size: 14px;
}
.item-title {
  font-size: clamp(24px, 2.4vw, 34px);
  line-height: 1.1;
}
.item-line {
  font-size: 14px;
  margin-top: 4px;
  max-width: 52ch;
}

.more {
  list-style: none;
  margin-top: 80px;
  border-top: 1px solid var(--line);
}
.more-row {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 24px;
  align-items: baseline;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
  font-size: 14px;
  transition: padding 0.5s var(--ease);
}
.more-row:hover {
  padding-left: 10px;
}
.more-title {
  font-size: 24px;
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
