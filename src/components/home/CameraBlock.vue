<script setup>
import YouTubeFilm from '../camera/YouTubeFilm.vue'
import { camera } from '../../data/site.js'

const [featured, vlog, short] = camera.films
</script>

<template>
  <!-- Red block: yellow on red is 4.0:1, so every text here is large (24px or more). -->
  <section id="films" class="camera wrap block tone-red" data-tone="red">
    <header class="cam-head">
      <h2 class="cam-title serif">Behind <em>the camera</em></h2>
      <a :href="camera.channel" target="_blank" rel="noopener" class="cam-channel serif ulink">YouTube ↗</a>
    </header>

    <div class="cam-row first">
      <figure v-reveal>
        <YouTubeFilm :film="featured" />
        <figcaption class="cam-cap serif">
          <span>{{ featured.title }}</span><span>{{ featured.year }}</span>
        </figcaption>
        <p class="cam-line serif">{{ featured.line }}</p>
      </figure>
      <figure v-reveal>
        <YouTubeFilm :film="short" />
        <figcaption class="cam-cap serif">
          <span>{{ short.line }}</span><span>{{ short.year }}</span>
        </figcaption>
      </figure>
    </div>

    <div class="cam-row second">
      <figure v-reveal>
        <YouTubeFilm :film="vlog" />
        <figcaption class="cam-cap serif">
          <span>{{ vlog.title }}</span><span>{{ vlog.year }}</span>
        </figcaption>
        <p class="cam-line serif">{{ vlog.line }}</p>
      </figure>
      <!-- The channel's own description, in its words. -->
      <blockquote class="cam-quote serif" v-reveal>
        “Documenting my life as a Computer Science engineering student in France.”
      </blockquote>
    </div>

  </section>
</template>

<style scoped>
.cam-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  margin-bottom: 56px;
}
.cam-title {
  font-size: clamp(56px, 10vw, 160px);
  line-height: 0.86;
  letter-spacing: -0.035em;
}
.cam-title em {
  font-style: italic;
}
.cam-channel {
  font-size: 28px;
  white-space: nowrap;
}

.cam-row {
  display: grid;
  gap: 24px;
  align-items: start;
}
/* 3fr wide + 1fr tall: a 16:9 and a 9:16 come out at almost the same height. */
.cam-row.first {
  grid-template-columns: 3fr 1fr;
}
.cam-row.second {
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin-top: 72px;
}

.cam-cap {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 14px;
  font-size: 28px;
  line-height: 1.1;
}
.cam-line {
  font-size: 24px;
  line-height: 1.2;
  opacity: 0.92;
}
.cam-quote {
  font-size: clamp(32px, 3.6vw, 52px);
  line-height: 1.08;
  font-style: italic;
  padding-left: 8%;
}


@media (max-width: 760px) {
  .cam-head {
    flex-direction: column;
    gap: 16px;
  }
  .cam-row.first,
  .cam-row.second {
    grid-template-columns: 1fr;
  }
  .cam-row.first figure:last-child {
    max-width: 260px;
  }
  .cam-quote {
    padding-left: 0;
  }
}
</style>
