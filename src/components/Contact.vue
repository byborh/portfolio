<script setup>
import { ref, computed } from 'vue'
import { profile, socials } from '../data/profile.js'

const EMAIL = profile.email

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const copyButton = {
  idle: { icon: 'bi bi-clipboard', text: 'Copy address' },
  copied: { icon: 'bi bi-check-lg', text: 'Copied!' },
  failed: { icon: 'bi bi-x-lg', text: 'Copy failed — select it' },
}
const copyStatus = ref('idle')

const canSend = computed(() => name.value.trim() && message.value.trim())

function send() {
  if (!canSend.value) return
  const subj = subject.value.trim() || `Portfolio — message from ${name.value}`
  const body = `${message.value}\n\n— ${name.value}${email.value ? ` (${email.value})` : ''}`
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(EMAIL)
    copyStatus.value = 'copied'
  } catch (err) {
    // Clipboard API needs a secure context and user permission: tell the user to copy by hand.
    console.warn('Clipboard write failed', err)
    copyStatus.value = 'failed'
  }
  setTimeout(() => (copyStatus.value = 'idle'), 1800)
}
</script>

<template>
  <main class="contact-page">
    <div class="container">
      <header class="ct-head">
        <p class="section-label" v-reveal>Contact</p>
        <h1 class="ct-title" v-reveal>Let's talk.</h1>
        <p class="section-lead" v-reveal>
          Whether it's a role, a collaboration or just a good technical
          conversation — my inbox is open. I usually reply within a day.
        </p>
      </header>

      <div class="ct-grid">
        <!-- Form -->
        <form class="ct-form panel" @submit.prevent="send" v-reveal>
          <div class="row">
            <div class="field">
              <label for="name">Name <span>*</span></label>
              <input id="name" v-model="name" type="text" placeholder="Ada Lovelace" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" v-model="email" type="email" placeholder="ada@compute.io" />
            </div>
          </div>
          <div class="field">
            <label for="subject">Subject</label>
            <input id="subject" v-model="subject" type="text" placeholder="A project idea…" />
          </div>
          <div class="field">
            <label for="message">Message <span>*</span></label>
            <textarea id="message" v-model="message" rows="6" placeholder="Tell me what you have in mind." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="!canSend">
            <i class="bi bi-send"></i> Compose email
          </button>
          <p class="ct-note mono">
            <i class="bi bi-shield-lock"></i>
            Opens your mail app — nothing is stored or sent through a server.
          </p>
        </form>

        <!-- Direct channels -->
        <aside class="ct-side">
          <div class="ct-email panel" v-reveal>
            <p class="ct-side-label mono">Direct email</p>
            <p class="ct-email-value">{{ EMAIL }}</p>
            <button class="btn btn-ghost ct-copy" @click="copyEmail">
              <i :class="copyButton[copyStatus].icon"></i>
              {{ copyButton[copyStatus].text }}
            </button>
          </div>

          <div class="ct-channels" v-reveal>
            <a
              v-for="c in socials"
              :key="c.label"
              :href="c.url"
              target="_blank"
              rel="noopener"
              class="ct-channel panel"
            >
              <i :class="c.icon"></i>
              <div>
                <span class="cc-label">{{ c.label }}</span>
                <span class="cc-value mono">{{ c.handle }}</span>
              </div>
              <i class="bi bi-arrow-up-right cc-arrow"></i>
            </a>
          </div>

          <div class="ct-loc panel" v-reveal>
            <i class="bi bi-geo-alt"></i>
            <div>
              <span class="cc-label">Based in</span>
              <span class="cc-value mono">{{ profile.location }} 🇫🇷</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-page {
  padding-top: 130px;
  min-height: 100vh;
}
.ct-head {
  max-width: 620px;
  margin-bottom: 48px;
}
.ct-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.6rem, 7vw, 4.5rem);
  letter-spacing: -0.03em;
  margin-bottom: 18px;
}

.ct-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 24px;
  align-items: start;
}

/* Form */
.ct-form {
  padding: 34px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field label {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.field label span {
  color: var(--accent);
}
.field input,
.field textarea {
  font-family: var(--font-body);
  font-size: 0.98rem;
  color: var(--text);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--stroke);
  border-radius: var(--radius-sm);
  padding: 13px 15px;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
  resize: vertical;
}
.field input::placeholder,
.field textarea::placeholder {
  color: var(--text-faint);
}
.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none;
}
.ct-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.76rem;
  color: var(--text-faint);
}

/* Side */
.ct-side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ct-email {
  padding: 26px;
}
.ct-side-label {
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}
.ct-email-value {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin-bottom: 18px;
  word-break: break-all;
}
.ct-copy {
  padding: 10px 18px;
  font-size: 0.88rem;
}

.ct-channels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ct-channel,
.ct-loc {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
}
.ct-channel > i:first-child,
.ct-loc > i:first-child {
  font-size: 1.3rem;
  color: var(--accent);
}
.ct-channel > div,
.ct-loc > div {
  display: flex;
  flex-direction: column;
}
.cc-label {
  font-size: 0.9rem;
  color: var(--text);
}
.cc-value {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.cc-arrow {
  margin-left: auto;
  color: var(--text-faint);
  transition: transform 0.3s var(--ease), color 0.3s;
}
.ct-channel:hover .cc-arrow {
  color: var(--accent);
  transform: translate(3px, -3px);
}

@media (max-width: 860px) {
  .ct-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 520px) {
  .row {
    grid-template-columns: 1fr;
  }
  .ct-form {
    padding: 24px;
  }
}
</style>
