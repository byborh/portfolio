<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL
const blogs = ref([])
const featuredPost = ref(null)

// Chargement des blogs
const fetchBlogs = async () => {
  try {
    const response = await fetch(`${API_URL}/type/blog`)
    if (response.ok) {
      blogs.value = await response.json()
      // Mettre le premier blog en vedette
      if (blogs.value.length > 0) {
        featuredPost.value = blogs.value[0]
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des blogs:', error)
  }
}

onMounted(async () => {
  await fetchBlogs()
})

// Formater la date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="bg-dark text-white position-relative overflow-hidden" style="height: 60vh;">
      <div class="position-absolute w-100 h-100 bg-dark opacity-75"></div>
      <div class="position-absolute w-100 h-100" style="background: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop') no-repeat center center; background-size: cover;"></div>
      
      <div class="container h-100 position-relative d-flex align-items-center">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-3 fw-bold mb-4">Le Blog <span class="text-success">Micro-Sud</span></h1>
            <p class="lead mb-5">Actualités, innovations et expertise en usinage de précision</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Article vedette -->
    <section class="py-5" v-if="featuredPost">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div class="row g-0">
                <div class="col-lg-6">
                  <img 
                    :src="featuredPost.img || 'https://via.placeholder.com/800x600?text=Micro-Sud'" 
                    class="img-fluid h-100 object-cover" 
                    :alt="featuredPost.title"
                  >
                </div>
                <div class="col-lg-6 bg-light">
                  <div class="card-body p-4 p-lg-5">
                    <div class="d-flex align-items-center mb-3">
                      <span class="badge bg-success me-2">À la une</span>
                      <small class="text-muted">{{ formatDate(featuredPost.date) }}</small>
                    </div>
                    <h2 class="display-6 fw-bold mb-3">{{ featuredPost.title }}</h2>
                    <p class="lead mb-4">{{ featuredPost.content.substring(0, 150) }}...</p>
                    <RouterLink 
                      :to="`/blog/${featuredPost.id}`" 
                      class="btn btn-success btn-lg rounded-pill px-4"
                    >
                      Lire l'article <i class="bi bi-arrow-right ms-2"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Liste des articles -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold mb-3">Nos <span class="text-success">derniers articles</span></h2>
            <p class="lead text-muted">Découvrez nos actualités et partages d'expertise</p>
          </div>
        </div>

        <div class="row g-4">
          <!-- Article -->
          <div 
            v-for="(blog, index) in blogs.slice(1)" 
            :key="blog.id" 
            class="col-lg-4 col-md-6"
            :class="{ 'mt-lg-5': index % 2 !== 0 }"
          >
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden transition-all">
              <div class="position-relative" style="height: 200px;">
                <img 
                  :src="blog.img || 'https://via.placeholder.com/500x300?text=Micro-Sud'" 
                  class="card-img-top h-100 w-100 object-cover"
                  :alt="blog.title"
                >
                <div class="position-absolute top-0 end-0 bg-success text-white px-3 py-1">
                  <small>{{ formatDate(blog.date) }}</small>
                </div>
              </div>
              <div class="card-body">
                <h3 class="h4 fw-bold mb-3">{{ blog.title }}</h3>
                <p class="text-muted mb-4">{{ blog.content.substring(0, 100) }}...</p>
                <RouterLink 
                  :to="`/blog/${blog.id}`" 
                  class="btn btn-outline-success rounded-pill px-4"
                >
                  Lire plus <i class="bi bi-arrow-right ms-2"></i>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Message si aucun article -->
          <div v-if="blogs.length === 0" class="col-12">
            <div class="alert alert-info text-center py-4">
              <i class="bi bi-info-circle-fill me-2"></i>
              Aucun article disponible pour le moment.
            </div>
          </div>
        </div>

        <!-- Pagination (optionnelle) -->
        <div class="d-flex justify-content-center mt-5">
          <nav>
            <ul class="pagination">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                  <i class="bi bi-chevron-left"></i>
                </a>
              </li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">
                  <i class="bi bi-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <!-- CTA Newsletter -->
    <section class="py-5 py-lg-7 bg-success text-white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold mb-4">Restez informés</h2>
            <p class="lead mb-5">Abonnez-vous à notre newsletter pour recevoir nos derniers articles et actualités</p>
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="input-group">
                  <input 
                    type="email" 
                    class="form-control form-control-lg border-0" 
                    placeholder="Votre email"
                  >
                  <button class="btn btn-dark btn-lg px-4" type="button">
                    S'abonner <i class="bi bi-envelope-arrow-up ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
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

.page-item.active .page-link {
  background-color: var(--bs-success);
  border-color: var(--bs-success);
}

.page-link {
  color: var(--bs-success);
}

.input-group:focus-within {
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}
</style>