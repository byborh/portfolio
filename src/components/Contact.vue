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
  <section class="contact-page py-5">
    <div class="container">
      <h1 class="text-center mb-4 fw-bold text-pink">Contact Me</h1>
      <p class="text-center mb-5 text-muted">Have a project in mind or just want to say hello? Let’s connect!</p>

      <div class="row justify-content-center">
        <div class="col-md-8">
          <!-- Contact Form -->
          <form @submit="handleSubmit" class="card p-4 shadow-sm border-0 rounded-4">
            <div class="mb-3">
              <label for="name" class="form-label fw-semibold">Name</label>
              <input v-model="name" type="text" class="form-control" id="name" placeholder="Bruce Wayne" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label fw-semibold">Email</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="bruce@wayneenterprises.com" required>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label fw-semibold">Message</label>
              <textarea v-model="message" class="form-control" id="message" rows="5" placeholder="Write your message here..." required></textarea>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-pink px-5 rounded-pill fw-bold">Send</button>
            </div>
          </form>

          <!-- Success Message -->
          <div v-if="success" class="alert alert-success mt-3 rounded-4 text-center">
            ✅ Your message has been sent successfully!
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div class="text-center mt-5">
        <p class="fw-semibold mb-3">Or reach me directly:</p>
        <div class="d-flex justify-content-center gap-4">
          <a href="https://github.com/" target="_blank" class="text-pink fs-4"><i class="bi bi-github"></i></a>
          <a href="https://linkedin.com/" target="_blank" class="text-pink fs-4"><i class="bi bi-linkedin"></i></a>
          <a href="https://twitter.com/" target="_blank" class="text-pink fs-4"><i class="bi bi-twitter"></i></a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: #111;
  color: #fff;
}
.form-control {
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
}
.btn-pink {
  background-color: #ff4da6;
  border: none;
  color: white;
  transition: all 0.3s ease;
}
.btn-pink:hover {
  background-color: #e63e92;
}
.text-pink { color: #ff4da6 !important; }
</style>
