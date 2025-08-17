<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Barre de navigation principale -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <!-- Logo + Nom entreprise -->
      <RouterLink to="/" class="navbar-brand d-flex align-items-center">
        <img
          src="../../public/img/micro-sud-logo.avif"
          alt="Logo Micro-Sud"
          class="me-2"
          style="height: 40px;"
        >
        <span class="fs-4 fw-bold">MICRO-SUD</span>
      </RouterLink>

      <!-- Bouton mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Contenu navigation -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item mx-1">
            <RouterLink to="/" class="nav-link px-3 py-2" active-class="active">
              <i class="bi bi-house-door me-1"></i> Accueil
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/machines" class="nav-link px-3 py-2" active-class="active">
              <i class="bi bi-gear me-1"></i> Machines
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/savoir-faire" class="nav-link px-3 py-2" active-class="active">
              <i class="bi bi-award me-1"></i> Savoir-faire
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/blogs" class="nav-link px-3 py-2" active-class="active">
              <i class="bi bi-newspaper me-1"></i> Blog
            </RouterLink>
          </li>
          <li class="nav-item ms-2">
            <RouterLink to="/contact" class="btn btn-success px-4 rounded-pill">
              <i class="bi bi-envelope me-1"></i> Contact
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Bannière sous la navbar (optionnelle) -->
  <div class="bg-success text-white py-2">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-8">
          <p class="mb-0">
            <i class="bi bi-star-fill me-2"></i> Leader en usinage de précision depuis 1998
          </p>
        </div>
        <div class="col-md-4 text-md-end">
          <a href="tel:+33123456789" class="text-white text-decoration-none">
            <i class="bi bi-telephone me-1"></i>+33 5 57 92 99 40
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  transition: all 0.3s ease;
  border-radius: 0.25rem;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.navbar {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}
</style>