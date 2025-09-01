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
    desc: 'Datte - Your go-to backend',
    img: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/byborh/task-queue'
  },
  {
    title: 'Micro-Sud',
    desc: 'Micro-Sud - Dynamic site | Front (Vue.js/Typescript) & Back (Node.js/Typescript) & DB (Redis) & Deployment (Docker).',
    img: 'https://images.unsplash.com/photo-1581091215360-59b624b1a244?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/byborh/micro-sud-back'
  },
  {
    title: 'Grenade',
    desc: 'Grenade - Express voting | Front (React.js/Typescript) & Back (Node.js/Typescript) & DB (DynamoDB) & Serverless (AWS Lambda) & CI/CD (Github Actions).',
    img: 'https://images.unsplash.com/photo-1612831455543-0ec6e66027f4?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/byborh/grenade-backend'
  }
])

</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="bg-dark text-white d-flex align-items-center" style="height:100vh;">
      <div class="container text-center">
        <h1 class="display-3 fw-bold mb-3">Beibarys Rakhymberdi</h1>
        <h2 class="fw-light text-pink mb-4">Full-Stack Developer - Platform & Services</h2>
        <p class="lead mb-5">Building impactful solutions with code, design and vision.</p>
        <div class="d-flex justify-content-center gap-3">
          <a href="#projects" class="btn btn-pink btn-lg px-4 py-3 rounded-pill">
            <i class="bi bi-code-slash me-2"></i> View Projects
          </a>
          <a href="#contact" class="btn btn-outline-light btn-lg px-4 py-3 rounded-pill">
            <i class="bi bi-envelope me-2"></i> Contact Me
          </a>
        </div>
      </div>
    </section>

    <!-- About Me -->
    <section class="py-5 bg-dark text-white">
      <div class="container text-center">
        <h2 class="display-5 fw-bold mb-4 text-pink">About Me</h2>
        <p class="lead mx-auto" style="max-width:800px;">
          Passionate IT developer with experience in web, cloud, and mobile applications.
          I thrive on solving complex problems, contributing to open-source, and
          building scalable, modern products.
        </p>
      </div>
    </section>

    <!-- Skills -->
    <section class="py-5 bg-black text-white">
      <div class="container text-center">
        <h2 class="display-5 fw-bold mb-5 text-pink">Skills</h2>
        <div class="row g-4">
          <div v-for="(skill, index) in skills" :key="index" class="col-6 col-md-4 col-lg-2">
            <div class="p-4 border border-pink rounded-4 shadow-sm h-100">
              <i :class="skill.icon" style="font-size:2rem;"></i>
              <p class="mt-3 mb-0">{{ skill.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="py-5 bg-dark text-white" id="projects">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold text-pink">Projects</h2>
          <p class="lead text-light">A selection of my latest works</p>
        </div>
        <div class="row g-4">
          <div v-for="(project, index) in projects" :key="index" class="col-md-6 col-lg-4">
            <div class="card bg-black text-white border-0 shadow-sm h-100">
              <img :src="project.img" class="card-img-top" alt="Project image">
              <div class="card-body">
                <h3 class="h5 fw-bold text-pink">{{ project.title }}</h3>
                <p class="text-light">{{ project.desc }}</p>
                <a :href="project.link" target="_blank" class="btn btn-outline-pink btn-sm">
                  <i class="bi bi-github me-1"></i> View Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="py-5 bg-black text-white" id="contact">
      <div class="container text-center">
        <h2 class="display-5 fw-bold text-pink mb-4">Contact</h2>
        <p class="lead mb-4">Let’s connect and build something impactful together.</p>
        <div class="d-flex justify-content-center gap-4">
          <a href="mailto:yourmail@example.com" class="text-white fs-3"><i class="bi bi-envelope"></i></a>
          <a href="https://github.com/byborh" target="_blank" class="text-white fs-3"><i class="bi bi-github"></i></a>
          <a href="https://linkedin.com/in/yourlinkedin" target="_blank" class="text-white fs-3"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.text-pink { color: #ff4da6 !important; }
.btn-pink { background-color: #ff4da6; border: none; color: white; }
.btn-pink:hover { background-color: #e63e92; }
.btn-outline-pink { border: 1px solid #ff4da6; color: #ff4da6; }
.btn-outline-pink:hover { background-color: #ff4da6; color: white; }
.border-pink { border-color: #ff4da6 !important; }
.bg-black { background-color: #0d0d0d !important; }
</style>
