<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL
const machines = ref([])

// Fonction pour récupérer les machines depuis l'API
const fetchMachines = async () => {
  try {
    const response = await fetch(`${API_URL}/type/machine`)
    if (response.ok) {
      machines.value = await response.json()
    }
  } catch (error) {
    console.error('Erreur lors du chargement des machines:', error)
  }
}

onMounted(async () => {
  await fetchMachines()
})
</script>

<template>
  <main>
    <!-- Hero Section Machines -->
    <section class="bg-dark text-white position-relative overflow-hidden" style="height: 60vh;">
      <div class="position-absolute w-100 h-100 bg-dark opacity-75"></div>
      <div class="position-absolute w-100 h-100" style="background: url('https://www.megetech.fr/wp-content/uploads/2021/03/1N5A4691_EDIT-2.jpg') no-repeat center center; background-size: cover;"></div>
      
      <div class="container h-100 position-relative d-flex align-items-center">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-3 fw-bold mb-4">Notre <span class="text-success">Parc Machines</span></h1>
            <p class="lead mb-5">Découvrez notre équipement de haute technologie pour un usinage de précision exceptionnel</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Liste des machines -->
    <section class="py-5 py-lg-7">
      <div class="container">
        <!-- Filtres (optionnel) -->
        <div class="row mb-5">
          <div class="col-md-6 mx-auto text-center">
            <div class="input-group">
              <span class="input-group-text bg-success text-white border-success">
                <i class="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                class="form-control border-success" 
                placeholder="Rechercher une machine..."
                v-model="searchQuery"
              >
            </div>
          </div>
        </div>

        <!-- Machines Grid -->
        <div class="row g-4">
          <!-- Machine Card -->
          <div v-for="machine in machines" :key="machine.id" class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden transition-all">
              <div class="position-relative overflow-hidden" style="height: 250px;">
                <img 
                  :src="machine.img || 'https://via.placeholder.com/500x300?text=Micro-Sud'" 
                  class="card-img-top h-100 w-100 object-cover"
                  :alt="machine.title"
                >
                <div class="position-absolute bottom-0 start-0 bg-success text-white px-3 py-2">
                  <i class="bi bi-gear me-2"></i> Machine
                </div>
              </div>
              
              <div class="card-body">
                <h3 class="h4 fw-bold mb-3">{{ machine.title }}</h3>
                <p class="text-muted mb-4">{{ machine.content }}</p>
                
                <div class="d-flex justify-content-between align-items-center">
                  <span class="badge bg-success bg-opacity-10 text-success">
                    <i class="bi bi-calendar me-1"></i> 
                    {{ new Date(machine.date).toLocaleDateString() }}
                  </span>
                  <button class="btn btn-sm btn-success rounded-pill px-3">
                    Détails <i class="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Message si aucune machine -->
          <div v-if="machines.length === 0" class="col-12">
            <div class="alert alert-info text-center py-4">
              <i class="bi bi-info-circle-fill me-2"></i>
              Aucune machine disponible pour le moment.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 py-lg-7 bg-success bg-opacity-10">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h2 class="display-5 fw-bold mb-3">Un projet spécifique ?</h2>
            <p class="lead mb-0">Nos experts sont à votre disposition pour étudier vos besoins en usinage de précision.</p>
          </div>
          <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
            <RouterLink to="/contact" class="btn btn-success btn-lg px-4 py-3 rounded-pill">
              <i class="bi bi-chat-square-text me-2"></i> Contactez-nous
            </RouterLink>
          </div>
        </div>
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

.input-group-text {
  transition: all 0.3s ease;
}

.input-group:focus-within .input-group-text {
  background-color: var(--bs-success) !important;
  color: white !important;
}
</style>