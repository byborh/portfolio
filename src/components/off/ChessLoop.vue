<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useVisible, prefersReducedMotion } from '../../composables/useVisible.js'

const props = defineProps({
  // [[from, to, san]]
  moves: { type: Array, required: true },
})

const STEP_MS = 1100
const HOLD_MS = 2600

// U+FE0E forces the text glyph: without it, Windows draws the pawn as a colour emoji.
const GLYPH = { k: '♚︎', q: '♛︎', r: '♜︎', b: '♝︎', n: '♞︎', p: '♟︎' }
const BACK_RANK = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
const FILES = 'abcdefgh'

function startPosition() {
  const pieces = []
  FILES.split('').forEach((file, i) => {
    pieces.push({ id: `w${file}1`, type: BACK_RANK[i], side: 'w', sq: `${file}1` })
    pieces.push({ id: `w${file}2`, type: 'p', side: 'w', sq: `${file}2` })
    pieces.push({ id: `b${file}7`, type: 'p', side: 'b', sq: `${file}7` })
    pieces.push({ id: `b${file}8`, type: BACK_RANK[i], side: 'b', sq: `${file}8` })
  })
  return pieces
}

const squares = Array.from({ length: 64 }, (_, i) => {
  const file = i % 8
  const rank = 8 - Math.floor(i / 8)
  return { name: `${FILES[file]}${rank}`, light: (file + rank) % 2 === 0 }
})

const root = ref(null)
const visible = useVisible(root)
const pieces = ref(startPosition())
const ply = ref(0)

const last = computed(() => (ply.value ? props.moves[ply.value - 1] : null))

function place(sq) {
  const x = FILES.indexOf(sq[0])
  const y = 8 - Number(sq[1])
  return { transform: `translate(${x * 100}%, ${y * 100}%)` }
}

function play(n) {
  const [from, to] = props.moves[n]
  const piece = pieces.value.find((p) => p.sq === from)
  // A missing piece means the move list is wrong: fail loudly instead of drawing a broken board.
  if (!piece) throw new Error(`ChessLoop: no piece on ${from} for move ${n + 1}`)
  piece.sq = to
}

let timer = 0

function next() {
  if (ply.value === props.moves.length) {
    pieces.value = startPosition()
    ply.value = 0
    timer = setTimeout(next, STEP_MS)
    return
  }
  play(ply.value)
  ply.value += 1
  timer = setTimeout(next, ply.value === props.moves.length ? HOLD_MS : STEP_MS)
}

function showFinal() {
  pieces.value = startPosition()
  props.moves.forEach((_, n) => play(n))
  ply.value = props.moves.length
}

watch(visible, (isVisible) => {
  if (prefersReducedMotion()) return showFinal()
  clearTimeout(timer)
  if (isVisible) timer = setTimeout(next, 600)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div ref="root" class="chess">
    <div class="board" role="img" :aria-label="`Chess board: ${moves.map((m) => m[2]).join(' ')}`">
      <span
        v-for="s in squares"
        :key="s.name"
        class="square"
        :class="{ light: s.light, hit: last && (last[0] === s.name || last[1] === s.name) }"
      ></span>
      <span
        v-for="p in pieces"
        :key="p.id"
        class="piece"
        :class="p.side === 'w' ? 'white' : 'black'"
        :style="place(p.sq)"
        aria-hidden="true"
      >{{ GLYPH[p.type] }}</span>
    </div>
    <p class="chess-move" aria-hidden="true">{{ last ? last[2] : '—' }}</p>
  </div>
</template>

<style scoped>
.board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  aspect-ratio: 1;
  width: 100%;
  max-width: 440px;
}
.square {
  background: var(--gold);
}
.square.light {
  background: var(--yellow);
}
.square.hit {
  box-shadow: inset 0 0 0 999px rgba(208, 0, 0, 0.22);
}

.piece {
  position: absolute;
  top: 0;
  left: 0;
  width: 12.5%;
  height: 12.5%;
  display: grid;
  place-items: center;
  font-size: clamp(22px, 4.2vw, 40px);
  line-height: 1;
  font-family: 'Segoe UI Symbol', 'Noto Sans Symbols 2', 'DejaVu Sans', serif;
  transition: transform 0.7s var(--ease);
}
.piece.white {
  color: var(--navy);
}
.piece.black {
  color: var(--red);
}

.chess-move {
  margin-top: 14px;
  font-size: 13px;
  color: var(--dim);
  font-variant-numeric: tabular-nums;
}
</style>
