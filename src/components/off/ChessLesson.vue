<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useVisible, prefersReducedMotion } from '../../composables/useVisible.js'
import { replay, moveLabel, FILES } from '../../lib/chess.js'

const props = defineProps({
  // [{ name, tag, moves: [{ san, mark?, from, to, rook?, note }] }]
  lines: { type: Array, required: true },
})

const STEP_MS = 3400 // time to read one note
const LINE_PAUSE_MS = 2600

// U+FE0E forces the text glyph: without it, Windows draws the pawn as a colour emoji.
const GLYPH = { k: '♚︎', q: '♛︎', r: '♜︎', b: '♝︎', n: '♞︎', p: '♟︎' }

// Every line is replayed once, up front: a wrong move in the data fails here, loudly.
const positions = props.lines.map((line) => replay(line.moves))

const squares = Array.from({ length: 64 }, (_, i) => {
  const file = i % 8
  const rank = 8 - Math.floor(i / 8)
  return { name: `${FILES[file]}${rank}`, light: (file + rank) % 2 === 0 }
})

const root = ref(null)
const visible = useVisible(root)
const lineIndex = ref(0)
const ply = ref(1)
const autoplay = ref(true)

const line = computed(() => props.lines[lineIndex.value])
const pieces = computed(() => positions[lineIndex.value][ply.value])
const move = computed(() => (ply.value ? line.value.moves[ply.value - 1] : null))
const label = (i, m) => moveLabel(i, m.san) + (m.mark ?? '')

function center(sq) {
  return { x: FILES.indexOf(sq[0]) + 0.5, y: 8 - Number(sq[1]) + 0.5 }
}
const arrow = computed(() => {
  if (!move.value) return null
  const a = center(move.value.from)
  const b = center(move.value.to)
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

// ---- Navigation ----
function go(n) {
  ply.value = Math.min(Math.max(n, 0), line.value.moves.length)
}
function pickLine(i) {
  lineIndex.value = i
  ply.value = 1
}
// Any manual action stops the tour: the visitor now leads.
function manual(action) {
  autoplay.value = false
  action()
}
function onKey(e) {
  if (e.key === 'ArrowRight') manual(() => go(ply.value + 1))
  else if (e.key === 'ArrowLeft') manual(() => go(ply.value - 1))
  else return
  e.preventDefault()
}

// ---- Autoplay tour: every move of every line ----
let timer = 0
function tick() {
  if (ply.value < line.value.moves.length) {
    go(ply.value + 1)
    timer = setTimeout(tick, ply.value === line.value.moves.length ? LINE_PAUSE_MS + STEP_MS : STEP_MS)
    return
  }
  pickLine((lineIndex.value + 1) % props.lines.length)
  timer = setTimeout(tick, STEP_MS)
}
function sync() {
  clearTimeout(timer)
  if (visible.value && autoplay.value && !prefersReducedMotion()) timer = setTimeout(tick, STEP_MS)
}
watch([visible, autoplay], sync)
onBeforeUnmount(() => clearTimeout(timer))

function togglePlay() {
  autoplay.value = !autoplay.value
}
</script>

<template>
  <div ref="root" class="lesson" tabindex="0" aria-label="Kádas Opening lesson. Use the arrow keys to step through the moves." @keydown="onKey">
    <div class="lines" role="tablist" aria-label="Lines">
      <button
        v-for="(l, i) in lines"
        :key="l.name"
        role="tab"
        class="line-tab"
        :class="{ on: i === lineIndex }"
        :aria-selected="i === lineIndex"
        @click="manual(() => pickLine(i))"
      >
        <span class="line-name">{{ l.name }}</span>
        <span class="line-tag">{{ l.tag }}</span>
      </button>
    </div>

    <div class="lesson-grid">
      <div class="board-wrap">
        <div class="board" role="img" :aria-label="`Position after ${move ? label(ply - 1, move) : 'the start'}`">
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
              <marker id="lesson-head" viewBox="0 0 4 4" refX="2" refY="2" markerWidth="3" markerHeight="3" orient="auto">
                <path d="M0 0 L4 2 L0 4 Z" />
              </marker>
            </defs>
            <line :x1="arrow.x1" :y1="arrow.y1" :x2="arrow.x2" :y2="arrow.y2" marker-end="url(#lesson-head)" />
          </svg>
        </div>
      </div>

      <div class="panel">
        <p class="panel-move serif" aria-live="polite">
          {{ move ? label(ply - 1, move) : 'Start' }}
        </p>
        <p class="panel-note">{{ move ? move.note : 'The starting position. Press next.' }}</p>

        <ol class="moves">
          <li v-for="(m, i) in line.moves" :key="i">
            <button
              class="move"
              :class="{ on: i === ply - 1, mistake: m.mark === '??' }"
              @click="manual(() => go(i + 1))"
            >{{ label(i, m) }}</button>
          </li>
        </ol>

        <div class="controls">
          <button class="ctrl" aria-label="Previous move" @click="manual(() => go(ply - 1))">←</button>
          <button class="ctrl play" :aria-label="autoplay ? 'Pause the tour' : 'Play the tour'" @click="togglePlay">
            <span aria-hidden="true">{{ autoplay ? '❚❚' : '▶' }}</span>
          </button>
          <button class="ctrl" aria-label="Next move" @click="manual(() => go(ply + 1))">→</button>
          <span class="counter muted">{{ ply }} / {{ line.moves.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lesson:focus-visible {
  outline: 2px solid var(--fg);
  outline-offset: 12px;
}

/* ---- Line tabs ---- */
.lines {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}
.line-tab {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 10px 14px;
  border: 1px solid var(--rule);
  background: transparent;
  color: var(--fg);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}
.line-tab:hover {
  border-color: var(--fg);
}
.line-tab.on {
  background: var(--yellow);
  border-color: var(--yellow);
  color: var(--navy);
}
.line-tag {
  font-size: 12px;
  opacity: 0.8;
}

/* ---- Board ---- */
.lesson-grid {
  display: grid;
  grid-template-columns: minmax(0, 480px) 1fr;
  gap: 48px;
  align-items: start;
}
.board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  aspect-ratio: 1;
  width: 100%;
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
  font-size: clamp(22px, 4.4vw, 42px);
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

/* ---- Panel ---- */
.panel-move {
  font-size: clamp(44px, 6vw, 84px);
  line-height: 0.95;
  letter-spacing: -0.02em;
}
.panel-note {
  font-size: 17px;
  line-height: 1.55;
  max-width: 46ch;
  margin-top: 18px;
  min-height: 5.2em;
}

.moves {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 28px;
}
.move {
  padding: 5px 9px;
  border: 0;
  background: transparent;
  color: var(--dim);
  font: inherit;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}
.move:hover {
  color: var(--fg);
}
.move.on {
  background: var(--fg);
  color: var(--bg);
}
.move.mistake:not(.on) {
  text-decoration: underline var(--red) 2px;
  text-underline-offset: 4px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}
.ctrl {
  min-width: 44px;
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--fg);
  background: transparent;
  color: var(--fg);
  font: inherit;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.ctrl:hover {
  background: var(--fg);
  color: var(--bg);
}
/* Icon only: yellow on red is 4.0:1, enough for a graphic (3:1), not for small text. */
.ctrl.play {
  background: var(--red);
  border-color: var(--red);
  color: var(--yellow);
  min-width: 64px;
  font-size: 18px;
}
.counter {
  margin-left: 8px;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 860px) {
  .lesson-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .panel-note {
    min-height: 0;
  }
}
</style>
