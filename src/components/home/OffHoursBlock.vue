<script setup>
import TriathlonRace from '../off/TriathlonRace.vue'
import ChessLesson from '../off/ChessLesson.vue'
import { offHours } from '../../data/site.js'
</script>

<template>
  <section id="off" class="off wrap block tone-blue" data-tone="blue">
    <p class="kicker"><span>Off hours</span><span>Swim · Bike · Run · Chess</span></p>

    <div class="off-part">
      <div class="off-head">
        <h2 class="off-title serif">Triathlon</h2>
        <p class="muted">One hour each.</p>
      </div>
      <TriathlonRace :legs="offHours.triathlon" />
    </div>

    <div class="off-part">
      <div class="off-head chess-head">
        <h2 class="off-title serif">{{ offHours.chess.opening }}</h2>
        <p class="elo"><span class="elo-num serif">{{ offHours.chess.elo }}</span> <span class="muted">Elo</span></p>
      </div>
      <ChessLesson :lines="offHours.chess.lines" />
    </div>

  </section>
</template>

<style scoped>
.off-part + .off-part {
  margin-top: 140px;
}

.off-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 24px;
  font-size: 16px;
}
.off-title {
  font-size: clamp(48px, 8vw, 120px);
  line-height: 0.9;
  letter-spacing: -0.03em;
}

.chess-head {
  align-items: flex-end;
  margin-bottom: 36px;
}
.elo {
  white-space: nowrap;
}
.elo-num {
  font-size: clamp(56px, 9vw, 140px);
  line-height: 0.85;
  letter-spacing: -0.04em;
}


@media (max-width: 760px) {
  .chess-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
