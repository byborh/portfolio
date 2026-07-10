<script setup>
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()

const socials = [
  { icon: 'bi bi-github', url: 'https://github.com/byborh', label: 'GitHub' },
  { icon: 'bi bi-linkedin', url: 'https://www.linkedin.com/in/rakhymberdi/', label: 'LinkedIn' },
  { icon: 'bi bi-globe', url: 'https://rakhymberdi.com/', label: 'Website' },
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-cta panel">
        <div>
          <p class="section-label">Let's build</p>
          <h2 class="footer-title">Got a project or an idea?<br />Let's make it real.</h2>
        </div>
        <RouterLink to="/contact" class="btn btn-primary">
          Start a conversation <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>

      <div class="footer-grid">
        <div class="footer-brand">
          <span class="brand-mark">BR</span>
          <div>
            <p class="fb-name">Beibarys Rakhymberdi</p>
            <p class="fb-role mono">Platform &amp; Service Developer</p>
          </div>
        </div>

        <nav class="footer-nav">
          <RouterLink to="/" class="fn-link">Home</RouterLink>
          <RouterLink to="/projects" class="fn-link">Projects</RouterLink>
          <RouterLink to="/contact" class="fn-link">Contact</RouterLink>
        </nav>

        <div class="footer-social">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.url"
            target="_blank"
            rel="noopener"
            class="fs-link"
            :aria-label="s.label"
          >
            <i :class="s.icon"></i>
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="mono">© {{ year }} Beibarys Rakhymberdi — Bordeaux, France</p>
        <p class="mono">Built with Vue · Deployed with intent</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  z-index: 1;
  padding-block: 40px 48px;
  border-top: 1px solid var(--stroke);
  margin-top: 60px;
}

.footer-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
  padding: 40px;
  margin-bottom: 56px;
  background: linear-gradient(135deg, rgba(232, 120, 63, 0.08), rgba(255, 255, 255, 0.02));
}
.footer-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  margin-top: 4px;
}

.footer-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  flex-wrap: wrap;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--stroke);
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.brand-mark {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-weight: 700;
  color: #0b0b0e;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
}
.fb-name {
  font-family: var(--font-display);
  font-weight: 600;
}
.fb-role {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.footer-nav {
  display: flex;
  gap: 22px;
}
.fn-link {
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: color 0.3s;
}
.fn-link:hover {
  color: var(--accent);
}

.footer-social {
  display: flex;
  gap: 12px;
}
.fs-link {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--stroke);
  color: var(--text-muted);
  font-size: 1.1rem;
  transition: all 0.3s var(--ease);
}
.fs-link:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-3px);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 24px;
}
.footer-bottom p {
  font-size: 0.78rem;
  color: var(--text-faint);
}

@media (max-width: 640px) {
  .footer-cta {
    padding: 28px;
  }
  .footer-grid {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
