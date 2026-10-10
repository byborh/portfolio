<script setup>
import ChessLesson from '../components/chess/ChessLesson.vue'
import { offHours } from '../data/site.js'

const { chess } = offHours
</script>

<template>
  <main>
    <section class="chess-page wrap block tone-blue" data-tone="blue">
      <p class="kicker"><span>Chess</span><span>{{ chess.elo }} Elo</span></p>
      <h1 class="chess-title serif">{{ chess.opening }}</h1>
      <p class="chess-lead">
        1. h4 — one of the rarest first moves in chess. {{ chess.lines.length }} lines from published theory, every move
        explained. Press play, or step through with the arrow keys.
      </p>
      <ChessLesson :lines="chess.lines" />
    </section>
  </main>
</template>

<style scoped>
.chess-title {
  font-size: clamp(64px, 12vw, 200px);
  line-height: 0.86;
  letter-spacing: -0.035em;
}
.chess-lead {
  font-size: 19px;
  line-height: 1.55;
  max-width: 56ch;
  margin: 24px 0 56px;
}
</style>
