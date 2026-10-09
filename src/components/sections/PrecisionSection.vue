<script setup>
import { precision } from '../../data/story.js'
</script>

<template>
  <section class="section container precision" id="precision">
    <div class="precision-grid">
      <div>
        <p class="section-label" v-reveal>{{ precision.label }}</p>
        <h2 class="section-title" v-reveal>{{ precision.title }}</h2>
        <p v-for="(p, i) in precision.paragraphs" :key="i" class="precision-text" v-reveal>
          {{ p }}
        </p>
        <div class="precision-tools" v-reveal>
          <span v-for="t in precision.tools" :key="t" class="chip">{{ t }}</span>
        </div>
      </div>

      <!-- Generic stepped shaft: no client part is shown. -->
      <figure class="drawing panel" v-reveal>
        <svg viewBox="0 0 400 250" role="img" aria-labelledby="drawing-title">
          <title id="drawing-title">Technical drawing of a stepped shaft with toleranced dimensions</title>

          <line x1="20" y1="120" x2="380" y2="120" class="d-center" />

          <path d="M60 95 H130 V75 H270 V100 H340 V140 H270 V165 H130 V145 H60 Z" class="d-part" />
          <line x1="130" y1="75" x2="130" y2="165" class="d-edge" />
          <line x1="270" y1="75" x2="270" y2="165" class="d-edge" />

          <!-- Overall length -->
          <line x1="60" y1="150" x2="60" y2="208" class="d-ext" />
          <line x1="340" y1="145" x2="340" y2="208" class="d-ext" />
          <line x1="60" y1="200" x2="340" y2="200" class="d-dim" marker-start="url(#arrow)" marker-end="url(#arrow)" />
          <text x="200" y="194" text-anchor="middle" class="d-text">140.00 ± 0.02</text>

          <!-- Critical diameter, highlighted -->
          <line x1="270" y1="75" x2="300" y2="75" class="d-ext" />
          <line x1="270" y1="165" x2="300" y2="165" class="d-ext" />
          <line x1="292" y1="75" x2="292" y2="165" class="d-dim d-key" marker-start="url(#arrow-key)" marker-end="url(#arrow-key)" />
          <text x="392" y="58" text-anchor="end" class="d-text d-key-text">Ø 45.000 ± 0.005</text>

          <!-- Step length -->
          <line x1="130" y1="70" x2="130" y2="40" class="d-ext" />
          <line x1="270" y1="70" x2="270" y2="40" class="d-ext" />
          <line x1="130" y1="46" x2="270" y2="46" class="d-dim" marker-start="url(#arrow)" marker-end="url(#arrow)" />
          <text x="200" y="40" text-anchor="middle" class="d-text">70.00 ± 0.01</text>

          <defs>
            <marker id="arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L8 4 L0 8 Z" class="d-arrow" />
            </marker>
            <marker id="arrow-key" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L8 4 L0 8 Z" class="d-arrow-key" />
            </marker>
          </defs>
        </svg>

        <figcaption class="titleblock mono">
          <span><em>Drawn</em> B.R.</span>
          <span><em>Unit</em> mm</span>
          <span><em>Scale</em> 2:1</span>
          <span class="titleblock-pass"><em>Result</em> PASS</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.precision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.precision-text {
  color: var(--text-muted);
  font-size: 1.04rem;
  line-height: 1.75;
  max-width: 58ch;
  margin-bottom: 16px;
}
.precision-text:last-of-type {
  color: var(--text);
}

.precision-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 26px;
}

/* ---- Technical drawing ---- */
.drawing {
  border-radius: var(--radius-sm);
  overflow: hidden;
  /* Faint engineering grid behind the part. */
  background-image:
    linear-gradient(var(--stroke) 1px, transparent 1px),
    linear-gradient(90deg, var(--stroke) 1px, transparent 1px);
  background-size: 20px 20px;
}
.drawing svg {
  display: block;
  width: 100%;
  height: auto;
  padding: 18px 12px 6px;
}

.d-center {
  stroke: var(--text-faint);
  stroke-width: 1;
  stroke-dasharray: 14 4 3 4;
}
.d-part {
  fill: rgba(255, 255, 255, 0.04);
  stroke: var(--text);
  stroke-width: 1.6;
}
.d-edge {
  stroke: var(--text-muted);
  stroke-width: 1;
}
.d-ext {
  stroke: var(--text-faint);
  stroke-width: 0.8;
}
.d-dim {
  stroke: var(--text-muted);
  stroke-width: 0.9;
}
.d-arrow {
  fill: var(--text-muted);
}
.d-key {
  stroke: var(--accent);
}
.d-arrow-key {
  fill: var(--accent);
}
.d-text {
  font-family: var(--font-mono);
  font-size: 12px;
  fill: var(--text-muted);
}
.d-key-text {
  fill: var(--accent);
}

.titleblock {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--stroke-strong);
  font-size: 0.72rem;
  color: var(--text);
}
.titleblock span {
  padding: 10px 14px;
  border-right: 1px solid var(--stroke);
}
.titleblock span:last-child {
  border-right: 0;
}
.titleblock em {
  display: block;
  font-style: normal;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.titleblock-pass {
  color: #4ade80;
}

@media (max-width: 900px) {
  .precision-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
@media (max-width: 480px) {
  .titleblock {
    grid-template-columns: repeat(2, 1fr);
  }
  .titleblock span:nth-child(2) {
    border-right: 0;
  }
  .titleblock span:nth-child(-n + 2) {
    border-bottom: 1px solid var(--stroke);
  }
}
</style>
