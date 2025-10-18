<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const success = ref(false)

const handleSubmit = (e) => {
  e.preventDefault()

  const mailtoLink = `mailto:ton.email@exemple.com?subject=Message de ${name.value} (${email.value})&body=${encodeURIComponent(message.value)}`

  window.location.href = mailtoLink
  success.value = true

  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <section class="contact-page d-flex align-items-center justify-content-center text-white">
    <div class="container text-center">
      <h1 class="display-4 fw-bold neon-pink mb-3">Contact Me</h1>
      <p class="text-light mb-5">Have a project in mind or just want to say hello? Let’s connect!</p>

      <div class="row justify-content-center">
        <div class="col-md-8">
          <!-- Contact Form -->
          <form @submit="handleSubmit" class="glass-box p-5 rounded-5 shadow-lg">
            <div class="mb-4 text-start">
              <label for="name" class="form-label fw-semibold text-cyan">Name</label>
              <input
                v-model="name"
                type="text"
                class="form-control glass-input"
                id="name"
                placeholder="Bruce Wayne"
                required
              />
            </div>
            <div class="mb-4 text-start">
              <label for="email" class="form-label fw-semibold text-cyan">Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control glass-input"
                id="email"
                placeholder="bruce@wayneenterprises.com"
                required
              />
            </div>
            <div class="mb-4 text-start">
              <label for="message" class="form-label fw-semibold text-cyan">Message</label>
              <textarea
                v-model="message"
                class="form-control glass-input"
                id="message"
                rows="5"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <div class="text-center mt-4">
              <button type="submit" class="btn-glass px-5 py-2 rounded-pill fw-bold">
                <i class="bi bi-send me-2"></i> Send
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <transition name="fade">
            <div v-if="success" class="alert-glass mt-4 text-center">
              ✅ Your message has been sent successfully!
            </div>
          </transition>
        </div>
      </div>

      <!-- Social Links -->
      <div class="text-center mt-5">
        <p class="fw-semibold mb-3 text-light">Or reach me directly:</p>
        <div class="d-flex justify-content-center gap-4 fs-3">
          <a href="https://github.com/" target="_blank" class="text-cyan"><i class="bi bi-github"></i></a>
          <a href="https://www.linkedin.com/in/PRENOM-NOOM-660b482a8/" target="_blank" class="text-cyan"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* === BACKGROUND === */
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10,10,20,0.9), rgba(0,0,0,0.95)),
              url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80') center/cover fixed;
  backdrop-filter: blur(10px);
  padding: 80px 0;
}

/* === COLORS === */
.neon-pink { color: #ff4da6; }
.text-cyan { color: #00eaff; }

/* === GLASS EFFECT === */
.glass-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  box-shadow: 0 0 20px rgba(255, 77, 166, 0.2);
  transition: all 0.3s ease;
}
.glass-box:hover {
  box-shadow: 0 0 25px rgba(0, 234, 255, 0.25);
  transform: scale(1.02);
}

/* === INPUTS === */
.glass-input {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.glass-input:focus {
  border-color: #00eaff;
  box-shadow: 0 0 10px rgba(0, 234, 255, 0.3);
  outline: none;
}

/* === BUTTONS === */
.btn-glass {
  background: linear-gradient(90deg, #ff4da6, #00eaff);
  color: #fff;
  border: none;
  transition: all 0.3s ease;
}
.btn-glass:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* === SUCCESS MESSAGE === */
.alert-glass {
  background: rgba(0, 234, 255, 0.1);
  border: 1px solid rgba(0, 234, 255, 0.3);
  border-radius: 1rem;
  color: #00eaff;
  padding: 1rem;
  backdrop-filter: blur(6px);
  font-weight: 500;
}

/* === ANIMATION === */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
