<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-dark text-white pt-5 pb-4">
    <div class="container">
      <div class="row g-4">
        <!-- Colonne 1 - Présentation -->
        <div class="col-lg-4">
          <h3 class="h4 mb-4 d-flex align-items-center">
            <img
              src="../../public/img/micro-sud-logo.avif"
              alt="Logo Micro-Sud"
              class="me-2"
              style="height: 30px;"
            >
            MICRO-SUD
          </h3>
          <p class="text-muted">
            Spécialiste de l'usinage de précision depuis 1998. Nous mettons notre savoir-faire à votre service pour des pièces mécaniques de qualité.
          </p>
          <div class="mt-4">
            <a href="https://www.linkedin.com/company/sasmicro-sud/?originalSubdomain=fr" class="text-white me-3"><i class="bi bi-linkedin fs-5"></i></a>
          </div>
        </div>

        <!-- Colonne 2 - Liens rapides -->
        <div class="col-lg-2 col-md-4">
          <h5 class="h6 text-uppercase text-success mb-4">Liens rapides</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <RouterLink to="/" class="text-white text-decoration-none">Accueil</RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/machines" class="text-white text-decoration-none">Nos machines</RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/savoir-faire" class="text-white text-decoration-none">Savoir-faire</RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/blogs" class="text-white text-decoration-none">Actualités</RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="text-white text-decoration-none">Contact</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Colonne 3 - Contact -->
        <div class="col-lg-3 col-md-4">
          <h5 class="h6 text-uppercase text-success mb-4">Contact</h5>
          <ul class="list-unstyled text-muted">
            <li class="mb-3">
              <i class="bi bi-geo-alt-fill text-success me-2"></i>
             5 Rue Faraday, 33700 Mérignac
            </li>
            <li class="mb-3">
              <i class="bi bi-telephone-fill text-success me-2"></i>
             +33 5 57 92 99 40
            </li>
            <li class="mb-3">
              <i class="bi bi-envelope-fill text-success me-2"></i>
              ms@micro-sud.fr
            </li>
            <li>
              <i class="bi bi-clock-fill text-success me-2"></i>
             Lundi au Jeudi : 07H00 à 17H00<br>Vendredi : 07h00 à 12h00
            </li>
          </ul>
        </div>

        <!-- Colonne 4 - Newsletter -->
        <div class="col-lg-3 col-md-4">
          <h5 class="h6 text-uppercase text-success mb-4">Newsletter</h5>
          <p class="text-muted small">
            Abonnez-vous pour recevoir nos actualités et offres spéciales.
          </p>
          <div class="input-group mb-3">
            <input type="email" class="form-control bg-secondary border-0" placeholder="Votre email">
            <button class="btn btn-success" type="button">
              <i class="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-top border-secondary mt-4 pt-4">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0 small text-muted">
              &copy; {{ currentYear }} Micro-Sud. Tous droits réservés.
            </p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <RouterLink to="/mentions-legales" class="small text-muted text-decoration-none me-3">Mentions légales</RouterLink>
            <RouterLink to="/politique-confidentialite" class="small text-muted text-decoration-none me-3">Confidentialité</RouterLink>
            <RouterLink to="/cookies" class="small text-muted text-decoration-none">Cookies</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer a {
  transition: color 0.3s ease;
}

footer a:hover {
  color: var(--bs-success) !important;
}

.input-group {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>