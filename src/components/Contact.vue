<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const formData = ref({
  name: '',
  poem: '',
  email: '',
  phone: '',
  country: 'France',
  message: '',
  privacy: false
})

const formErrors = ref({
  email: false,
  message: false,
  privacy: false
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref(false)

const validateForm = () => {
  let isValid = true
  
  formErrors.value = {
    email: !formData.value.email,
    message: !formData.value.message,
    privacy: !formData.value.privacy
  }

  if (!formData.value.email || !formData.value.message || !formData.value.privacy) {
    isValid = false
  }

  return isValid
}

const sendEmail = () => {
  const serviceID = 'service_mzjeofg'
  const templateID = 'template_fjux3cm'
  const publicKey = 'DeZ8a0iFdV2ua_JsL'

  const templateParams = {
    from_name: formData.value.name,
    from_email: formData.value.email,
    phone: formData.value.phone ? `${formData.value.country} ${formData.value.phone}` : 'Non renseigné',
    poem: formData.value.poem || 'Aucun poème fourni',
    message: formData.value.message,
    to_email: 'astragonta@gmail.com'
  }

  emailjs.send(serviceID, templateID, templateParams, publicKey)
    .then(() => {
      isSubmitting.value = false
      submitSuccess.value = true
      formData.value = {
        name: '',
        poem: '',
        email: '',
        phone: '',
        country: 'France',
        message: '',
        privacy: false
      }
    })
    .catch(() => {
      isSubmitting.value = false
      submitError.value = true
    })
}

const handleSubmit = (e) => {
  e.preventDefault()
  
  if (validateForm()) {
    isSubmitting.value = true
    submitError.value = false
    
    // Envoi du mail via EmailJS
    sendEmail()
  }
}
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="bg-dark text-white position-relative overflow-hidden" style="height: 40vh;">
      <div class="position-absolute w-100 h-100 bg-dark opacity-75"></div>
      <div class="position-absolute w-100 h-100" style="background: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop') no-repeat center center; background-size: cover;"></div>
      
      <div class="container h-100 position-relative d-flex align-items-center">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-3 fw-bold mb-4">Nous <span class="text-success">contacter</span></h1>
            <p class="lead mb-0">Une question, un projet ? Notre équipe est à votre écoute.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="py-5 py-lg-7">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div class="card-body p-4 p-lg-5">
                <div v-if="submitSuccess" class="alert alert-success text-center">
                  <i class="bi bi-check-circle-fill me-2"></i>
                  Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
                </div>

                <div v-else-if="submitError" class="alert alert-danger text-center">
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>
                  Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.
                </div>

                <form @submit="handleSubmit" v-else>
                  <div class="mb-4">
                    <h2 class="h3 fw-bold text-center mb-4">Formulaire de contact</h2>
                    <p class="text-muted text-center mb-5">Remplissez ce formulaire et nous vous recontacterons rapidement</p>
                  </div>

                  <!-- Nom -->
                  <div class="mb-4">
                    <label for="name" class="form-label">Votre nom</label>
                    <input 
                      type="text" 
                      class="form-control form-control-lg" 
                      id="name"
                      v-model="formData.name"
                      placeholder="Votre nom complet"
                    >
                  </div>

                  <!-- Poème -->
                  <div class="mb-4">
                    <label for="poem" class="form-label">Please enter a small poem</label>
                    <textarea 
                      class="form-control form-control-lg" 
                      id="poem"
                      v-model="formData.poem"
                      rows="3"
                      placeholder="Écrivez un petit poème..."
                    ></textarea>
                    <small class="text-muted">Ce champ est optionnel mais nous serions ravis de le lire</small>
                  </div>

                  <!-- Email -->
                  <div class="mb-4">
                    <label for="email" class="form-label">Adresse e-mail <span class="text-danger">*</span></label>
                    <input 
                      type="email" 
                      class="form-control form-control-lg" 
                      :class="{ 'is-invalid': formErrors.email }"
                      id="email"
                      v-model="formData.email"
                      placeholder="email@exemple.com"
                      required
                    >
                    <div v-if="formErrors.email" class="invalid-feedback">
                      Veuillez entrer une adresse e-mail valide
                    </div>
                  </div>

                  <!-- Téléphone -->
                  <div class="mb-4">
                    <label for="phone" class="form-label">Téléphone</label>
                    <div class="input-group">
                      <select 
                        class="form-select form-select-lg" 
                        style="max-width: 120px;"
                        v-model="formData.country"
                      >
                        <option value="France">🇫🇷 +33</option>
                        <option value="Belgique">🇧🇪 +32</option>
                        <option value="Suisse">🇨🇭 +41</option>
                        <option value="Luxembourg">🇱🇺 +352</option>
                      </select>
                      <input 
                        type="tel" 
                        class="form-control form-control-lg" 
                        id="phone"
                        v-model="formData.phone"
                        placeholder="6 12 34 56 78"
                      >
                    </div>
                  </div>

                  <!-- Message -->
                  <div class="mb-4">
                    <label for="message" class="form-label">Votre message <span class="text-danger">*</span></label>
                    <textarea 
                      class="form-control form-control-lg" 
                      :class="{ 'is-invalid': formErrors.message }"
                      id="message"
                      v-model="formData.message"
                      rows="5"
                      placeholder="Décrivez votre projet ou votre demande..."
                      required
                    ></textarea>
                    <div v-if="formErrors.message" class="invalid-feedback">
                      Veuillez entrer votre message
                    </div>
                  </div>

                  <!-- Confidentialité -->
                  <div class="mb-4">
                    <div class="form-check">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        id="privacy"
                        :class="{ 'is-invalid': formErrors.privacy }"
                        v-model="formData.privacy"
                      >
                      <label class="form-check-label" for="privacy">
                        J'ai lu et j'accepte la <RouterLink to="/politique" class="text-success">Politique de confidentialité</RouterLink> <span class="text-danger">*</span>
                      </label>
                      <div v-if="formErrors.privacy" class="invalid-feedback">
                        Vous devez accepter notre politique de confidentialité
                      </div>
                    </div>
                  </div>

                  <!-- Submit -->
                  <div class="d-grid mt-5">
                    <button 
                      type="submit" 
                      class="btn btn-success btn-lg py-3 rounded-pill"
                      :disabled="isSubmitting"
                    >
                      <span v-if="isSubmitting">
                        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Envoi en cours...
                      </span>
                      <span v-else>
                        <i class="bi bi-send-fill me-2"></i> Envoyer le message
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Informations de contact -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card border-0 bg-white shadow-sm rounded-4 h-100">
              <div class="card-body text-center p-4">
                <div class="bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-block mb-3">
                  <i class="bi bi-geo-alt-fill fs-3"></i>
                </div>
                <h3 class="h5 fw-bold mb-3">Adresse</h3>
                <p class="mb-0">5 Rue Faraday<br>33700 Mérignac, France</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border-0 bg-white shadow-sm rounded-4 h-100">
              <div class="card-body text-center p-4">
                <div class="bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-block mb-3">
                  <i class="bi bi-telephone-fill fs-3"></i>
                </div>
                <h3 class="h5 fw-bold mb-3">Téléphone</h3>
                <p class="mb-0">+33 5 57 92 99 40<br>Lun-Ven: 7h-17h</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border-0 bg-white shadow-sm rounded-4 h-100">
              <div class="card-body text-center p-4">
                <div class="bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-block mb-3">
                  <i class="bi bi-envelope-fill fs-3"></i>
                </div>
                <h3 class="h5 fw-bold mb-3">Email</h3>
                <p class="mb-0">ms@micro-sud.fr<br>Lun-Ven: 7h-17h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.form-control-lg, .form-select-lg {
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
}

textarea.form-control-lg {
  min-height: 120px;
}
</style>