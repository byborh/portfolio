<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL
const skills = ref([])

// Chargement des savoir-faire
const fetchSkills = async () => {
  try {
    const response = await fetch(`${API_URL}/type/section`)
    if (response.ok) {
      skills.value = await response.json()
    }
  } catch (error) {
    console.error('Erreur lors du chargement des savoir-faire:', error)
  }
}

onMounted(async () => {
  await fetchSkills()
})
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="bg-dark text-white position-relative overflow-hidden" style="height: 60vh;">
      <div class="position-absolute w-100 h-100 bg-dark opacity-75"></div>
      <div class="position-absolute w-100 h-100" style="background: url('https://mlllust3grvb.i.optimole.com/w:auto/h:auto/q:mauto/f:best/ig:avif/https://usifab3d.fr/wp-content/uploads/2020/10/fraisage-numerique-cnc-usifab3D.jpg') no-repeat center center; background-size: cover;"></div>
      
      <div class="container h-100 position-relative d-flex align-items-center">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-3 fw-bold mb-4">Notre <span class="text-success">Savoir-Faire</span></h1>
            <p class="lead mb-5">{{ new Date().getFullYear() - 1998 }} ans d'expertise en usinage de précision au service de vos projets les plus exigeants</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Savoir-Faire -->
    <section class="py-5 py-lg-7">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold mb-3">L'excellence <span class="text-success">industrielle</span></h2>
            <p class="lead text-muted">Découvrez les compétences qui font de Micro-Sud un maître d'œuvre dans son secteur</p>
          </div>
        </div>

        <!-- Grille des savoir-faire -->
        <div class="row g-4">
          <!-- Carte Savoir-Faire -->
          <div v-for="skill in skills" :key="skill.id" class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden transition-all">
              <div class="position-relative overflow-hidden" style="height: 200px;">
                <img 
                  :src="skill.img || 'https://via.placeholder.com/500x300?text=Micro-Sud'" 
                  class="card-img-top h-100 w-100 object-cover"
                  :alt="skill.title"
                >
                <div class="position-absolute bottom-0 start-0 bg-success text-white px-3 py-2">
                  <i class="bi bi-award me-2"></i> Expertise
                </div>
              </div>
              
              <div class="card-body">
                <h3 class="h4 fw-bold mb-3">{{ skill.title }}</h3>
                
                <!-- Liste des compétences -->
                <ul class="list-unstyled" v-if="skill.content">
                  <li v-for="(item, index) in skill.content.split('\n')" :key="index" class="mb-2">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Message si aucun savoir-faire -->
          <div v-if="skills.length === 0" class="col-12">
            <div class="alert alert-info text-center py-4">
              <i class="bi bi-info-circle-fill me-2"></i>
              Nos savoir-faire sont en cours de mise à jour.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Process -->
    <section class="py-5 py-lg-7 bg-success bg-opacity-10">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <img src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=2070&auto=format&fit=crop" alt="Processus Micro-Sud" class="img-fluid rounded-4 shadow">
          </div>
          <div class="col-lg-6">
            <h2 class="display-5 fw-bold mb-4">Notre <span class="text-success">process</span> qualité</h2>
            <div class="d-flex mb-4">
              <div class="me-4">
                <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                  <i class="bi bi-1-circle-fill fs-5"></i>
                </div>
              </div>
              <div>
                <h4 class="h5 fw-bold">Analyse technique</h4>
                <p class="mb-0 text-muted">Étude approfondie de votre projet et de ses contraintes</p>
              </div>
            </div>
            <div class="d-flex mb-4">
              <div class="me-4">
                <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                  <i class="bi bi-2-circle-fill fs-5"></i>
                </div>
              </div>
              <div>
                <h4 class="h5 fw-bold">Prototypage</h4>
                <p class="mb-0 text-muted">Validation des spécifications par un prototype</p>
              </div>
            </div>
            <div class="d-flex">
              <div class="me-4">
                <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                  <i class="bi bi-3-circle-fill fs-5"></i>
                </div>
              </div>
              <div>
                <h4 class="h5 fw-bold">Production & contrôle</h4>
                <p class="mb-0 text-muted">Fabrication et contrôle qualité systématique</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 py-lg-7 bg-dark text-white">
      <div class="container text-center">
        <h2 class="display-5 fw-bold mb-4">Prêt à concrétiser <span class="text-success">votre projet</span> ?</h2>
        <p class="lead mb-5 mx-auto" style="max-width: 700px;">Notre équipe d'experts est à votre disposition pour étudier vos besoins en usinage de précision</p>
        <RouterLink to="/contact" class="btn btn-success btn-lg px-5 py-3 rounded-pill">
          <i class="bi bi-chat-square-text me-2"></i> Contactez nos experts
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}

.object-cover {
  object-fit: cover;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.list-unstyled li {
  transition: transform 0.3s ease;
}

.list-unstyled li:hover {
  transform: translateX(5px);
}
</style>