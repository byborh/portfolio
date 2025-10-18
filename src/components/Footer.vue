<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer-dark text-light pt-5 pb-4">
    <div class="container">
      <div class="row g-4 justify-content-between">
        <!-- Colonne 1 - Présentation -->
        <div class="col-lg-5 col-md-12">
          <h3 class="h4 mb-4 text-pink">Name Name</h3>
          <p class="text-muted">
            Développeur Full Stack & Créateur d’expériences digitales.  
            Passionné par l’innovation, la cybersécurité et l’open source.
          </p>
          <div class="mt-4">
            <a href="https://github.com/mail" target="_blank" class="social-link me-3">
              <i class="bi bi-github fs-4"></i>
            </a>
            <a href="https://www.linkedin.com/in/name-name-660b482a8/" target="_blank" class="social-link">
              <i class="bi bi-linkedin fs-4"></i>
            </a>
          </div>
        </div>

        <!-- Colonne 2 - Liens rapides -->
        <div class="col-lg-3 col-md-4">
          <h5 class="h6 text-uppercase text-pink mb-4">Navigation</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <RouterLink to="/" class="footer-link">Accueil</RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/projects" class="footer-link">Projets</RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="footer-link">Contact</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Colonne 3 - Contact -->
        <div class="col-lg-4 col-md-4">
          <h5 class="h6 text-uppercase text-pink mb-4">Contact</h5>
          <ul class="list-unstyled text-muted">
            <li class="mb-3">
              <i class="bi bi-envelope-fill text-pink me-2"></i> mail@email.com
            </li>
            <li>
              <i class="bi bi-geo-alt-fill text-pink me-2"></i> Bordeaux
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-top border-secondary mt-4 pt-4 text-center">
        <p class="mb-0 small text-muted">
          &copy; {{ currentYear }} Name Name. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-dark {
  background: #0a0a0a; /* vrai noir profond */
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Couleurs principales */
.text-pink {
  color: #ff4da6;
}
.text-muted {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* Liens */
.footer-link {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  transition: color 0.3s ease;
}
.footer-link:hover {
  color: #ff4da6;
}

/* Icônes sociales */
.social-link {
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}
.social-link:hover {
  color: #ff4da6;
  transform: scale(1.1);
}

/* Douce lueur autour des titres roses */
.text-pink {
  text-shadow: 0 0 8px rgba(255, 77, 166, 0.4);
}
</style>
