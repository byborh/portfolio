<script setup>
import { computed, useId } from 'vue'
import { FILES } from '../../lib/chess.js'

const props = defineProps({
  // [{ id, type, side, sq }] from src/lib/chess.js
  pieces: { type: Array, required: true },
  // Last move { from, to } to highlight with an arrow, or null.
  move: { type: Object, default: null },
  label: { type: String, required: true },
})

// U+FE0E forces the text glyph: without it, Windows draws the pawn as a colour emoji.
const GLYPH = { k: '♚︎', q: '♛︎', r: '♜︎', b: '♝︎', n: '♞︎', p: '♟︎' }

const squares = Array.from({ length: 64 }, (_, i) => {
  const file = i % 8
  const rank = 8 - Math.floor(i / 8)
  return { name: `${FILES[file]}${rank}`, light: (file + rank) % 2 === 0 }
})

// Two boards can share a page: each arrow head needs its own marker id.
const headId = `head-${useId()}`

function center(sq) {
  return { x: FILES.indexOf(sq[0]) + 0.5, y: 8 - Number(sq[1]) + 0.5 }
}
const arrow = computed(() => {
  if (!props.move) return null
  const a = center(props.move.from)
  const b = center(props.move.to)
  // Stop short of the target centre so the head does not cover the piece.
  const len = Math.hypot(b.x - a.x, b.y - a.y)
  const k = (len - 0.32) / len
  return { x1: a.x, y1: a.y, x2: a.x + (b.x - a.x) * k, y2: a.y + (b.y - a.y) * k }
})

function place(sq) {
  const x = FILES.indexOf(sq[0])
  const y = 8 - Number(sq[1])
  return { transform: `translate(${x * 100}%, ${y * 100}%)` }
}
</script>

<template>
  <div class="board" role="img" :aria-label="label">
    <span
      v-for="s in squares"
      :key="s.name"
      class="square"
      :class="{ light: s.light, hit: move && (move.from === s.name || move.to === s.name) }"
    ></span>
    <span
      v-for="p in pieces"
      :key="p.id"
      class="piece"
      :class="p.side === 'w' ? 'white' : 'black'"
      :style="place(p.sq)"
      aria-hidden="true"
    >{{ GLYPH[p.type] }}</span>
    <svg v-if="arrow" class="arrow" viewBox="0 0 8 8" aria-hidden="true">
      <defs>
        <marker :id="headId" viewBox="0 0 4 4" refX="2" refY="2" markerWidth="3" markerHeight="3" orient="auto">
          <path d="M0 0 L4 2 L0 4 Z" />
        </marker>
      </defs>
      <line :x1="arrow.x1" :y1="arrow.y1" :x2="arrow.x2" :y2="arrow.y2" :marker-end="`url(#${headId})`" />
    </svg>
  </div>
</template>

<style scoped>
.board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  aspect-ratio: 1;
  width: 100%;
  /* Pieces scale with the board, whatever its size on the page. */
  container-type: inline-size;
}
.square {
  background: var(--gold);
}
.square.light {
  background: var(--yellow);
}
.square.hit {
  box-shadow: inset 0 0 0 999px rgba(208, 0, 0, 0.2);
}
.piece {
  position: absolute;
  top: 0;
  left: 0;
  width: 12.5%;
  height: 12.5%;
  display: grid;
  place-items: center;
  font-size: 9cqi;
  line-height: 1;
  font-family: 'Segoe UI Symbol', 'Noto Sans Symbols 2', 'DejaVu Sans', serif;
  transition: transform 0.6s var(--ease);
}
.piece.white {
  color: var(--navy);
}
.piece.black {
  color: var(--red);
}
.arrow {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.arrow line {
  stroke: var(--red);
  stroke-width: 0.14;
  stroke-linecap: round;
  opacity: 0.85;
}
.arrow path {
  fill: var(--red);
}
</style>
