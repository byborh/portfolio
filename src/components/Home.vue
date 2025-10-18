<script setup>
import { ref } from 'vue'

const skills = ref([
  { name: 'Typescript', icon: 'bi bi-braces' },
  { name: 'Vue.js', icon: 'bi bi-lightning' },
  { name: 'Node.js', icon: 'bi bi-server' },
  { name: 'Docker', icon: 'bi bi-box' },
  { name: 'Spring Boot', icon: 'bi bi-cpu' },
  { name: 'Angular', icon: 'bi bi-diagram-3' },
  { name: 'CI/CD', icon: 'bi bi-arrow-repeat' },
  { name: 'SQL', icon: 'bi bi-database' },
  { name: 'Redis', icon: 'bi bi-lightning-charge' },
  { name: 'Python', icon: 'bi bi-terminal' },
  { name: 'AWS Lambda', icon: 'bi bi-cloud' },
  { name: 'Git', icon: 'bi bi-git' }
])

const projects = ref([
  {
    title: 'Datte',
    desc: 'Datte - Your go-to backend.',
    img: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/byborh/datte'
  },
  {
    title: 'Physics',
    desc: 'Learn and review physics easily.',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    link: 'https://github.com/byborh/physics'
  },
  {
    title: 'Grenade',
    desc: 'Serverless voting app with AWS Lambda & DynamoDB.',
    img: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980',
    link: 'https://github.com/byborh/grenade-backend'
  }
])
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="hero-section d-flex align-items-center justify-content-center text-center text-white">
      <div class="glass-box p-5 rounded-5">
        <h1 class="display-3 fw-bold mb-3 neon-pink">Name Name</h1>
        <h2 class="fw-light text-cyan mb-4">Full-Stack Developer</h2>
        <p class="lead mb-5 text-light">Building impactful solutions with code, design, and vision.</p>
        <div class="d-flex justify-content-center gap-3">
          <a href="#projects" class="btn-glass px-4 py-3 rounded-pill">
            <i class="bi bi-code-slash me-2"></i> View Projects
          </a>
          <a href="#contact" class="btn-glass-outline px-4 py-3 rounded-pill">
            <i class="bi bi-envelope me-2"></i> Contact Me
          </a>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="py-5 bg-transparent text-white">
      <div class="container text-center">
        <h2 class="display-5 fw-bold mb-5 neon-pink">Skills</h2>
        <div class="row g-4 justify-content-center">
          <div v-for="(skill, index) in skills" :key="index" class="col-6 col-md-4 col-lg-2">
            <div class="skill-card glass-box p-4 rounded-4 h-100">
              <i :class="skill.icon" class="fs-1 text-cyan"></i>
              <p class="mt-3 mb-0">{{ skill.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
<section class="py-5 bg-transparent text-white" id="projects">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold neon-pink">Projects</h2>
      <p class="lead text-light">A selection of my latest works</p>
    </div>

    <div class="row g-4">
      <div
        v-for="(project, index) in projects.slice(0, 3)"
        :key="index"
        class="col-md-6 col-lg-4"
      >
        <div class="project-card glass-box h-100 overflow-hidden">
          <img :src="project.img" class="card-img-top" alt="Project image">
          <div class="p-4">
            <h3 class="h5 fw-bold text-cyan">{{ project.title }}</h3>
            <p class="text-light">{{ project.desc }}</p>
            <a :href="project.link" target="_blank" class="btn-glass-outline btn-sm">
              <i class="bi bi-github me-1"></i> View Code
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔹 Bouton pour voir plus de projets -->
    <div class="text-center mt-5">
      <RouterLink to="/projects" class="btn-glass px-4 py-2 rounded-pill">
        <i class="bi bi-collection me-2"></i> View All Projects
      </RouterLink>
    </div>
  </div>
</section>


    <!-- Contact -->
    <section class="py-5 text-white" id="contact">
      <div class="container text-center">
        <h2 class="display-5 fw-bold neon-pink mb-4">Contact</h2>
        <p class="lead mb-4">Let’s connect and build something impactful together.</p>
        <div class="d-flex justify-content-center gap-4 fs-3">
          <a href="mailto:@example.com" class="text-cyan"><i class="bi bi-envelope"></i></a>
          <a href="https://github.com/" target="_blank" class="text-cyan"><i class="bi bi-github"></i></a>
          <a href="https://linkedin.com/in/https://www.linkedin.com/in/-660b482a8/" target="_blank" class="text-cyan"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* === BACKGROUND === */
main {
  background: linear-gradient(135deg, rgba(10,10,20,0.95), rgba(0,0,0,0.9)),
              url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=80') center/cover fixed;
  backdrop-filter: blur(8px);
  min-height: 100vh;
}

/* === COLORS === */
.neon-pink { color: #ff4da6; }
.text-cyan { color: #00eaff; }

/* === HERO SECTION === */
.hero-section {
  height: 100vh;
  background: transparent;
  position: relative;
}

/* === GLASS EFFECT === */
.glass-box {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(255, 77, 166, 0.2);
  transition: all 0.3s ease;
}
.glass-box:hover {
  box-shadow: 0 0 25px rgba(0, 234, 255, 0.3);
  transform: scale(1.02);
}

/* === BUTTONS === */
.btn-glass {
  background: linear-gradient(90deg, #ff4da6, #00eaff);
  color: #fff;
  border: none;
  transition: 0.3s;
}
.btn-glass:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}

.btn-glass-outline {
  background: transparent;
  border: 1px solid #00eaff;
  color: #00eaff;
  transition: 0.3s;
}
.btn-glass-outline:hover {
  background: #00eaff;
  color: #000;
}

/* === SKILLS === */
.skill-card {
  transition: transform 0.3s, box-shadow 0.3s;
}
.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 234, 255, 0.3);
}

/* === PROJECTS === */
.project-card img {
  transition: transform 0.4s ease;
}
.project-card:hover img {
  transform: scale(1.1);
}

/* Bouton "View All Projects" */
.btn-glass {
  background: rgba(255, 255, 255, 0.1);
  color: #ff4da6;
  border: 1px solid rgba(255, 77, 166, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}
.btn-glass:hover {
  background: rgba(255, 77, 166, 0.15);
  border-color: #ff4da6;
  color: #fff;
  transform: translateY(-2px);
}

</style>
