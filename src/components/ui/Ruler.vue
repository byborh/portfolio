<script setup>
import { computed } from 'vue'

const props = defineProps({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  // [{ at: Number, year: String, caption: String }]
  marks: { type: Array, required: true },
})

const placed = computed(() =>
  props.marks.map((m, i) => ({
    ...m,
    left: ((m.at - props.start) / (props.end - props.start)) * 100,
    edge: i === 0 ? 'is-first' : i === props.marks.length - 1 ? 'is-last' : '',
  }))
)
</script>

<template>
  <div class="ruler" role="list" aria-label="Journey">
    <div class="ruler-scale" aria-hidden="true"></div>
    <div
      v-for="m in placed"
      :key="m.year"
      class="ruler-mark"
      :class="m.edge"
      :style="{ left: `${m.left}%` }"
      role="listitem"
    >
      <span class="ruler-year mono">{{ m.year }}</span>
      <span class="ruler-caption mono">{{ m.caption }}</span>
    </div>
  </div>
</template>

<style scoped>
.ruler {
  position: relative;
  height: 74px;
  margin-inline: 8px;
}

/* Minor tick every 8px, major tick every 40px: reads as a steel rule. */
.ruler-scale {
  position: absolute;
  inset: 0 0 auto 0;
  height: 16px;
  border-top: 1px solid var(--stroke-strong);
  background:
    repeating-linear-gradient(90deg, var(--stroke-strong) 0 1px, transparent 1px 40px) top left / 100% 16px no-repeat,
    repeating-linear-gradient(90deg, var(--stroke) 0 1px, transparent 1px 8px) top left / 100% 8px no-repeat;
}

.ruler-mark {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding-top: 24px;
  white-space: nowrap;
}
.ruler-mark::before {
  content: '';
  position: absolute;
  top: 0;
  width: 1px;
  height: 22px;
  background: var(--accent);
}
/* Edge marks align inward so their captions stay inside the rule. */
.ruler-mark.is-first { align-items: flex-start; transform: none; }
.ruler-mark.is-last { align-items: flex-end; transform: translateX(-100%); }
.ruler-mark.is-first::before { left: 0; }
.ruler-mark.is-last::before { right: 0; }

.ruler-year {
  font-size: 0.82rem;
  color: var(--text);
}
.ruler-caption {
  font-size: 0.7rem;
  color: var(--text-faint);
  letter-spacing: 0.04em;
}

/* Captions overlap below ~640px: keep the years only. */
@media (max-width: 640px) {
  .ruler-caption { display: none; }
}
</style>
