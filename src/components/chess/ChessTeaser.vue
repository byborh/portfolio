<script setup>
import { RouterLink } from 'vue-router'
import ChessBoard from './ChessBoard.vue'
import { replay } from '../../lib/chess.js'

const props = defineProps({
  // offHours.chess from src/data/site.js
  chess: { type: Object, required: true },
})

// The board shows the opening's first move, 1. h4, with its arrow.
const first = props.chess.lines[0].moves[0]
const position = replay([first])[1]
const lineCount = props.chess.lines.length
</script>

<template>
  <div class="teaser">
    <RouterLink to="/chess" class="teaser-board" aria-label="Open the Kádas Opening lesson">
      <ChessBoard :pieces="position" :move="first" label="Chess board after 1. h4, the Kádas Opening" />
    </RouterLink>
    <div class="teaser-text">
      <h2 class="teaser-title serif">{{ chess.opening }}</h2>
      <p class="teaser-elo"><span class="serif">{{ chess.elo }}</span> Elo</p>
      <p class="teaser-line">1. h4 — one of the rarest first moves in chess. {{ lineCount }} lines, every move explained.</p>
      <RouterLink to="/chess" class="teaser-link serif">Learn the opening <span aria-hidden="true">→</span></RouterLink>
    </div>
  </div>
</template>

<style scoped>
.teaser {
  display: grid;
  grid-template-columns: minmax(0, 380px) 1fr;
  gap: 56px;
  align-items: center;
}
.teaser-board {
  display: block;
  transition: transform 0.6s var(--ease);
}
.teaser-board:hover {
  transform: rotate(-2deg) scale(1.02);
}
.teaser-title {
  font-size: clamp(48px, 8vw, 120px);
  line-height: 0.9;
  letter-spacing: -0.03em;
}
.teaser-elo {
  margin-top: 12px;
  font-size: 16px;
  color: var(--dim);
}
.teaser-elo .serif {
  font-size: 40px;
  color: var(--fg);
}
.teaser-line {
  font-size: 18px;
  line-height: 1.55;
  max-width: 44ch;
  margin-top: 18px;
}
.teaser-link {
  display: inline-flex;
  gap: 12px;
  margin-top: 28px;
  font-size: clamp(28px, 3vw, 40px);
  border-bottom: 3px solid var(--red);
}
.teaser-link span {
  transition: transform 0.5s var(--ease);
}
.teaser-link:hover span {
  transform: translateX(8px);
}

@media (max-width: 760px) {
  .teaser {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .teaser-board {
    max-width: 300px;
  }
}
</style>
