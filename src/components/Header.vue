<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark-custom fixed-top">
    <div class="container">
      <!-- Logo + Name -->
      <RouterLink to="/" class="navbar-brand d-flex align-items-center">
        <i class="bi bi-code-slash fs-3 text-pink me-2"></i>
        <span class="fs-4 fw-bold text-pink">Name Name</span>
      </RouterLink>

      <!-- Mobile button -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation links -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item mx-2">
            <RouterLink to="/" class="nav-link" active-class="active">
              <i class="bi bi-house-door me-1"></i> Home
            </RouterLink>
          </li>
          <li class="nav-item mx-2">
            <RouterLink to="/projects" class="nav-link" active-class="active">
              <i class="bi bi-folder me-1"></i> Projects
            </RouterLink>
          </li>
          <li class="nav-item mx-2">
            <RouterLink to="/contact" class="btn btn-pink px-4 rounded-pill fw-semibold shadow-sm">
              <i class="bi bi-envelope me-1"></i> Contact
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* --- Background --- */
.bg-dark-custom {
  background: #0a0a0a; /* vrai noir */
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
}

/* --- Nav Links --- */
.nav-link {
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}

.nav-link:hover,
.nav-link.active {
  color: #ff4da6 !important;
  background: rgba(255, 77, 166, 0.1);
  text-shadow: 0 0 6px rgba(255, 77, 166, 0.5);
}

/* --- Branding --- */
.text-pink {
  color: #ff4da6 !important;
  text-shadow: 0 0 8px rgba(255, 77, 166, 0.4);
}

/* --- Button --- */
.btn-pink {
  background-color: #ff4da6;
  border: none;
  color: #fff;
  transition: all 0.3s ease;
}
.btn-pink:hover {
  background-color: #e63e92;
  box-shadow: 0 0 12px rgba(255, 77, 166, 0.4);
}

/* --- Navbar Toggle (mobile) --- */
.navbar-toggler-icon {
  filter: invert(1);
}
</style>
