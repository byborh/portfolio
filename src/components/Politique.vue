<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const politique = ref([])

const fetchPolitique = async () => {
  try {
    const response = await fetch(`${API_URL}/type/politique`)
    if (response.ok) {
      politique.value = await response.json()
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la politique:', error)
  }
}

onMounted(() => {
  fetchPolitique()
})
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="bg-dark text-white position-relative overflow-hidden py-5 py-lg-7">
      <div class="position-absolute w-100 h-100 bg-dark opacity-75"></div>
      <div class="position-absolute w-100 h-100" style="background: url('https://images.unsplash.com/photo-1604514628550-37477afdf4e3?q=80&w=2070&auto=format&fit=crop') no-repeat center center; background-size: cover;"></div>
      
      <div class="container position-relative py-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h1 class="display-4 fw-bold mb-4">Politique <span class="text-success">d'entreprise</span></h1>
            <p class="lead mb-0">Nos engagements et principes directeurs</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenu politique -->
    <section class="py-5 py-lg-7">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div v-if="politique.length === 0" class="text-center py-5">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Chargement...</span>
              </div>
              <p class="mt-3">Chargement de nos politiques...</p>
            </div>

            <div v-for="(item, index) in politique" :key="index" class="mb-5">
              <div class="d-flex align-items-center mb-4">
                <div class="bg-success bg-opacity-10 text-success rounded-circle p-3 d-flex align-items-center justify-content-center me-4">
                  <i class="bi bi-file-text-fill fs-3"></i>
                </div>
                <h2 class="h3 fw-bold mb-0 text-capitalize">{{ item.type }}</h2>
              </div>
              
              <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div class="card-body p-4 p-lg-5">
                  <div class="content" v-html="item.content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 py-lg-7 bg-dark text-white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold mb-4">Des questions sur nos <span class="text-success">politiques</span> ?</h2>
            <p class="lead mb-5">Notre équipe est à votre disposition pour toute clarification ou information complémentaire.</p>
            <RouterLink to="/contact" class="btn btn-success btn-lg px-5 py-3 rounded-pill">
              <i class="bi bi-chat-square-text me-2"></i> Contactez-nous
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.content {
  line-height: 1.8;
}

.content :deep(h3) {
  color: var(--bs-success);
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.content :deep(ul) {
  padding-left: 1.5rem;
}

.content :deep(li) {
  margin-bottom: 0.5rem;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>