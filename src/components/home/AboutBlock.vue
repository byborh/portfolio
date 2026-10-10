<script setup>
import { profile } from '../../data/profile.js'
import { about, skills } from '../../data/site.js'
</script>

<template>
  <section id="about" class="about wrap block tone-navy" data-tone="navy">
    <p class="kicker"><span>About</span><span>{{ profile.location }}, France</span></p>

    <div class="about-grid">
      <img
        :src="profile.photo"
        :alt="`Portrait of ${profile.name}`"
        class="about-photo"
        width="200"
        height="200"
        loading="lazy"
      />
      <div>
        <h2 class="about-intro serif" v-reveal>{{ about.intro }}</h2>
        <p v-for="l in about.lines" :key="l" class="about-line" v-reveal>{{ l }}</p>
        <p class="about-open" v-reveal><span class="dot" aria-hidden="true"></span>{{ about.open }}</p>
      </div>
    </div>

    <div class="skills">
      <h3 class="skills-title serif">What I work with</h3>
      <dl class="skills-grid">
        <div v-for="g in skills" :key="g.area" class="skill" v-reveal>
          <dt class="skill-area">{{ g.area }}</dt>
          <dd class="skill-items">
            <span v-for="item in g.items" :key="item" class="chip">{{ item }}</span>
          </dd>
        </div>
        <div class="skill" v-reveal>
          <dt class="skill-area">Speaks</dt>
          <dd class="skill-items">
            <span v-for="l in profile.languages" :key="l" class="chip">{{ l }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 48px;
  align-items: start;
}
.about-photo {
  width: 100%;
  /* The height attribute would win over aspect-ratio and stretch the photo on narrow screens. */
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  filter: grayscale(1) contrast(1.05);
  border: 3px solid var(--yellow);
}
.about-intro {
  font-size: clamp(34px, 4.6vw, 64px);
  line-height: 1.04;
  letter-spacing: -0.02em;
  max-width: 20ch;
  margin-bottom: 28px;
}
.about-line {
  font-size: clamp(18px, 1.6vw, 21px);
  line-height: 1.55;
  max-width: 52ch;
  margin-bottom: 12px;
}
.about-open {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  font-size: 16px;
  color: var(--dim);
}
.dot {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 0 3px rgba(208, 0, 0, 0.25);
}

/* ---- Skills ---- */
.skills {
  margin-top: 96px;
}
.skills-title {
  font-size: clamp(30px, 3.4vw, 46px);
  line-height: 1;
  margin-bottom: 28px;
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px 40px;
}
.skill {
  border-top: 1px solid var(--rule);
  padding-top: 14px;
}
.skill-area {
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 12px;
}
.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid var(--rule);
  font-size: 15px;
  line-height: 1.2;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}
.chip:hover {
  background: var(--yellow);
  border-color: var(--yellow);
  color: var(--navy);
}

@media (max-width: 760px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .about-photo {
    width: 140px;
  }
}
</style>
