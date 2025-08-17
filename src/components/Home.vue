<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

// Données récupérées depuis le backend
const historique = ref('')
const engagements = ref('')
const savoirFaire = ref([])
const machines = ref([])
const latestPosts = ref([])

// Chargement des données
onMounted(async () => {
  await fetchHomeData()
})

async function fetchHomeData() {
  try {
    // Récupération de l'historique
    const historiqueResponse = await fetch(`${API_URL}/type/historique`)
    if (historiqueResponse.ok) {
      const data = await historiqueResponse.json()
      historique.value = data[0]?.content || ''
    }

    // Récupération des engagements
    const engagementsResponse = await fetch(`${API_URL}/type/engagements`)
    if (engagementsResponse.ok) {
      const data = await engagementsResponse.json()
      engagements.value = data[0]?.content || ''
    }

    // Récupération des savoir-faire (3 premiers)
    const savoirFaireResponse = await fetch(`${API_URL}/type/savoir_faire?limit=3`)
    if (savoirFaireResponse.ok) {
      savoirFaire.value = await savoirFaireResponse.json()
    }

    // Récupération des machines (pour la section parallaxe)
    const machinesResponse = await fetch(`${API_URL}/type/machine?limit=3`)
    if (machinesResponse.ok) {
      machines.value = await machinesResponse.json()
    }

    // Récupération des derniers articles (2 derniers)
    const postsResponse = await fetch(`${API_URL}/type/blog?limit=2&sort=date:desc`)
    if (postsResponse.ok) {
      latestPosts.value = await postsResponse.json()
    }

  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
}

// Formater la date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="bg-dark text-white position-relative overflow-hidden" style="height: 90vh;">
      <div class="position-absolute w-100 h-100 bg-dark opacity-75"></div>
      <div class="position-absolute w-100 h-100" style="background: url('https://chaplain.fr/wp-content/uploads/2019/03/chaplain-usinage-700x533.jpg') no-repeat center center; background-size: cover;"></div>
      
      <div class="container h-100 position-relative d-flex align-items-center">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h1 class="display-3 fw-bold mb-4">L'USINAGE DE PRÉCISION <span class="text-success">RÉINVENTÉ</span></h1>
            <p class="lead mb-5">Des solutions sur mesure pour l'industrie du futur. Précision, qualité et innovation au service de votre réussite.</p>
            <div class="d-flex justify-content-center gap-3">
              <RouterLink to="/savoir-faire" class="btn btn-success btn-lg px-4 py-3 rounded-pill">
                <i class="bi bi-gear me-2"></i> Notre savoir-faire
              </RouterLink>
              <RouterLink to="/contact" class="btn btn-outline-light btn-lg px-4 py-3 rounded-pill">
                <i class="bi bi-chat-square-text me-2"></i> Contactez-nous
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications Section -->
      <div class="position-absolute bottom-0 start-0 ps-4 pb-3">
        <div class="d-flex align-items-center gap-3">
          <img src="../../public/img/afaq-9001.jpg" 
              alt="Certification AFNOR ISO 9001" 
              class="img-fluid" 
              style="height: 100px; width: auto;">
          
          <img src="../../public/img/afaq_9100.png" 
              alt="Certification EN AS JISQ 9100" 
              class="img-fluid" 
              style="height: 100px; width: auto;">
        </div>
      </div>
    </section>

    <!-- À propos + Historique -->
    <section class="py-5 py-lg-7">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop" alt="Atelier d'usinage" class="img-fluid rounded-4 shadow">
          </div>
          <div class="col-lg-6">
            <h2 class="display-5 fw-bold mb-4">Micro-Sud : <span class="text-success">L'excellence industrielle</span> depuis 1998</h2>
            <p class="lead mb-4" v-html="historique"></p>
            <div class="d-flex gap-3">
              <RouterLink to="/savoir-faire" class="btn btn-outline-success btn-lg px-4">
                Notre histoire
              </RouterLink>
              <RouterLink to="/machines" class="btn btn-success btn-lg px-4">
                Voir nos machines
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Engagements -->
    <section class="py-5 bg-success bg-opacity-10">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <h2 class="display-5 fw-bold mb-4">Nos <span class="text-success">Engagements</span></h2>
            <div class="bg-white p-4 p-lg-5 rounded-4 shadow-sm">
              <p class="lead mb-0" v-html="engagements"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Savoir-faire -->
    <section class="py-5 py-lg-7 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">Nos <span class="text-success">Savoir-Faire</span></h2>
          <p class="lead text-muted mx-auto" style="max-width: 700px;">L'expertise Micro-Sud au service de vos projets les plus exigeants</p>
        </div>
        
        <div class="row g-4">
          <div v-for="(savoir, index) in savoirFaire" :key="index" class="col-md-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <div class="card-body p-4 text-center">
                <div class="bg-success bg-opacity-10 text-success rounded-circle p-4 d-inline-block mb-4">
                  <i class="bi bi-award" style="font-size: 2rem;"></i>
                </div>
                <h3 class="h4 fw-bold mb-3">{{ savoir.title || 'Savoir-Faire' }}</h3>
                <p class="text-muted mb-4" v-html="savoir.content"></p>
                <RouterLink to="/savoir-faire" class="btn btn-link text-success text-decoration-none p-0">
                  En savoir plus <i class="bi bi-arrow-right ms-2"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Galerie machines -->
    <section class="py-5 py-lg-7 position-relative overflow-hidden" style="background: url('https://www.megetech.fr/wp-content/uploads/2021/03/1N5A4691_EDIT-2.jpg') no-repeat center center; background-size: cover; background-attachment: fixed; height: 500px;">
      <div class="position-absolute w-100 h-100 bg-dark opacity-75"></div>
      <div class="container position-relative h-100 d-flex align-items-center">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h2 class="display-5 fw-bold text-white mb-4">Un parc machine <span class="text-success">ultra-moderne</span></h2>
            <p class="lead text-white mb-5">Nos centres d'usinage 5 axes dernière génération nous permettent de réaliser les pièces les plus complexes avec une précision inégalée.</p>
            <RouterLink to="/machines" class="btn btn-success btn-lg px-5 py-3 rounded-pill">
              <i class="bi bi-gear me-2"></i> Découvrir nos machines
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Derniers articles -->
    <section class="py-5 py-lg-7">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">Notre <span class="text-success">Actualité</span></h2>
          <p class="lead text-muted mx-auto" style="max-width: 700px;">Découvrez nos dernières innovations, acquisitions et réflexions sur l'industrie du futur</p>
        </div>
        
        <div class="row g-4">
          <div v-for="(post, index) in latestPosts" :key="index" class="col-md-6">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <div class="card-body p-4">
                <span class="badge bg-success bg-opacity-10 text-success mb-3">{{ formatDate(post.date) }}</span>
                <h3 class="h4 fw-bold mb-3">{{ post.title }}</h3>
                <p class="text-muted mb-4">{{ post.content.substring(0, 150) }}...</p>
                <RouterLink :to="`/blog/${post.id}`" class="btn btn-link text-success text-decoration-none p-0">
                  Lire l'article <i class="bi bi-arrow-right ms-2"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5">
          <RouterLink to="/blogs" class="btn btn-outline-success btn-lg px-5">
            Voir tous les articles
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Contact -->
    <section class="py-5 py-lg-7 bg-dark text-white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold mb-4">Prêt à <span class="text-success">révolutionner</span> votre production ?</h2>
            <p class="lead mb-5">Nos experts sont à votre disposition pour étudier votre projet et vous proposer la solution la plus adaptée à vos besoins.</p>
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
/* Styles optionnels pour améliorer l'affichage */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>