<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container">
      <!-- Logo + Name -->
      <RouterLink to="/" class="navbar-brand d-flex align-items-center">
        <i class="bi bi-code-slash fs-3 text-pink me-2"></i>
        <span class="fs-4 fw-bold text-pink">Beibarys Rakhymberdi</span>
      </RouterLink>

      <!-- Mobile button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation links -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item mx-1">
            <RouterLink to="/" class="nav-link px-3 py-2" active-class="active">
              <i class="bi bi-house-door me-1"></i> Home
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/about" class="nav-link px-3 py-2" active-class="active">
              <i class="bi bi-person me-1"></i> About
            </RouterLink>Beibarys 
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/projects" class="nav-link px-3 py-2" active-class="active">
              <i class="bi bi-folder me-1"></i> Projects
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/skills" class="nav-link px-3 py-2" active-class="active">
              <i class="bi bi-lightning me-1"></i> Skills
            </RouterLink>
          </li>
          <li class="nav-item mx-1">
            <RouterLink to="/blog" class="nav-link px-3 py-2" active-class="active">
              <i class="bi bi-journal-text me-1"></i> Blog
            </RouterLink>
          </li> -->
          <li class="nav-item ms-2">
            <RouterLink to="/contact" class="btn btn-pink px-4 rounded-pill">
              <i class="bi bi-envelope me-1"></i> Contact
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  transition: all 0.3s ease;
  border-radius: 0.25rem;
}

.nav-link:hover, .nav-link.active {
  background-color: rgba(255, 77, 166, 0.15);
  color: #ff4da6 !important;
}

.navbar {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
}

.text-pink { color: #ff4da6 !important; }
.btn-pink { background-color: #ff4da6; border: none; color: white; }
.btn-pink:hover { background-color: #e63e92; }
</style>
