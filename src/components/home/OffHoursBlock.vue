<script setup>
import TriathlonRace from '../off/TriathlonRace.vue'
import ChessTeaser from '../chess/ChessTeaser.vue'
import { offHours } from '../../data/site.js'
</script>

<template>
  <section id="off" class="off wrap block tone-blue" data-tone="blue">
    <p class="kicker"><span>Off hours</span><span>Swim · Bike · Run · Chess</span></p>

    <div class="triathlon">
      <div class="off-head">
        <h2 class="off-title serif">Triathlon</h2>
        <p class="muted">One hour each.</p>
      </div>
      <TriathlonRace :legs="offHours.triathlon" />
    </div>

    <div class="off-part">
      <ChessTeaser :chess="offHours.chess" />
    </div>

  </section>
</template>

<style scoped>
.off-part {
  margin-top: 120px;
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
</style>
