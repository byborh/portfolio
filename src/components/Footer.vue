<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-dark text-light pt-5 pb-4">
    <div class="container">
      <div class="row g-4">
        <!-- Colonne 1 - Présentation -->
        <div class="col-lg-4">
          <h3 class="h4 mb-4 text-pink">Beibarys Rakhymberdi</h3>
          <p class="text-muted">
            Développeur Full Stack & Créateur d’expériences digitales.  
            Passionné par l’innovation, la cybersécurité et l’open source.
          </p>
          <div class="mt-4">
            <a href="https://github.com/byborh" target="_blank" class="text-light me-3"><i class="bi bi-github fs-4"></i></a>
            <a href="https://www.linkedin.com/in/beibarys-rakhymberdi-660b482a8/" target="_blank" class="text-light me-3"><i class="bi bi-linkedin fs-4"></i></a>
          </div>
        </div>

        <!-- Colonne 2 - Liens rapides -->
        <div class="col-lg-2 col-md-4">
          <h5 class="h6 text-uppercase text-pink mb-4">Navigation</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><RouterLink to="/" class="text-light text-decoration-none">Accueil</RouterLink></li>
            <li class="mb-2"><RouterLink to="/projects" class="text-light text-decoration-none">Projets</RouterLink></li>
            <li><RouterLink to="/contact" class="text-light text-decoration-none">Contact</RouterLink></li>
          </ul>
        </div>

        <!-- Colonne 3 - Contact -->
        <div class="col-lg-3 col-md-4">
          <h5 class="h6 text-uppercase text-pink mb-4">Contact</h5>
          <ul class="list-unstyled text-muted">
            <li class="mb-3"><i class="bi bi-envelope-fill text-pink me-2"></i> byborh@email.com</li>
            <li><i class="bi bi-geo-alt-fill text-pink me-2"></i> Bordeaux</li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-top border-secondary mt-4 pt-4">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0 small text-muted">
              &copy; {{ currentYear }} Beibarys Rakhymberdi. Tous droits réservés.
            </p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <RouterLink to="/mentions-legales" class="small text-muted text-decoration-none me-3">Mentions légales</RouterLink>
            <RouterLink to="/confidentialite" class="small text-muted text-decoration-none">Confidentialité</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.text-pink {
  color: #ff4da6;
}
.btn-pink {
  background-color: #ff4da6;
  color: #fff;
}
.btn-pink:hover {
  background-color: #e04392;
}
footer a {
  transition: color 0.3s ease;
}
footer a:hover {
  color: #ff4da6 !important;
}
</style>
