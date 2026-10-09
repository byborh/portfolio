<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const links = [
  { to: { path: '/', hash: '#precision' }, label: 'Story' },
  { to: { path: '/', hash: '#now' }, label: 'Mango3D' },
  { to: { path: '/projects' }, label: 'Case studies' },
]
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <div class="nav-inner container">
      <RouterLink to="/" class="brand" @click="menuOpen = false">
        <span class="brand-mark">BR</span>
        <span class="brand-name">Beibarys<span class="dot">.</span></span>
      </RouterLink>

      <nav class="links" :class="{ open: menuOpen }">
        <RouterLink
          v-for="l in links"
          :key="l.label"
          :to="l.to"
          class="link"
          @click="menuOpen = false"
        >
          {{ l.label }}
        </RouterLink>
        <RouterLink to="/contact" class="btn btn-primary nav-cta" @click="menuOpen = false">
          <i class="bi bi-envelope"></i> Contact
        </RouterLink>
      </nav>

      <button
        class="burger"
        :class="{ open: menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.4s var(--ease), border-color 0.4s var(--ease),
    backdrop-filter 0.4s;
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(8, 8, 11, 0.7);
  backdrop-filter: blur(16px);
  border-bottom-color: var(--stroke);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 74px;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-display);
}
.brand-mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #0b0b0e;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  box-shadow: 0 6px 20px -8px var(--accent-glow);
}
.brand-name {
  font-weight: 600;
  font-size: 1.05rem;
}
.brand-name .dot {
  color: var(--accent);
}

/* Links */
.links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.link {
  font-size: 0.94rem;
  color: var(--text-muted);
  padding: 9px 15px;
  border-radius: 10px;
  position: relative;
  transition: color 0.3s;
}
.link:hover {
  color: var(--text);
}
.link::after {
  content: '';
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 4px;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s var(--ease);
}
.link:hover::after {
  transform: scaleX(1);
}
.nav-cta {
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 0.9rem;
}

/* Burger */
.burger {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  padding: 8px;
}
.burger span {
  width: 26px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.3s var(--ease), opacity 0.3s;
}
.burger.open span:first-child {
  transform: translateY(4px) rotate(45deg);
}
.burger.open span:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

@media (max-width: 820px) {
  .burger {
    display: flex;
  }
  .links {
    position: fixed;
    inset: 74px 0 auto 0;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
    padding: 20px 24px 28px;
    background: rgba(10, 10, 14, 0.96);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--stroke);
    transform: translateY(-120%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.4s var(--ease), opacity 0.3s;
  }
  .links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .link {
    padding: 14px 12px;
    font-size: 1.05rem;
  }
  .link::after {
    display: none;
  }
  .nav-cta {
    margin-left: 0;
    margin-top: 8px;
    justify-content: center;
  }
}
</style>
