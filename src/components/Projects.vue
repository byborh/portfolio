<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

// 🔹 Récupération des fichiers Markdown
const markdownFiles = import.meta.glob('/src/components/projects/*.md', { as: 'raw' })

const projects = ref([])
const expanded = ref({})

// 🔹 Chargement dynamique
onMounted(async () => {
  const loadedProjects = []

  for (const path in markdownFiles) {
    const content = await markdownFiles[path]()
    const lines = content.split('\n')
    let github = null

    // 🔹 On détecte une ligne du type "github: ..."
    if (lines[0].startsWith('github:')) {
      github = lines[0].replace('github:', '').trim()
      lines.shift() // on retire cette ligne du markdown
    }

    const markdownContent = lines.join('\n')
    const html = marked(markdownContent)
    const name = path.split('/').pop().replace('.md', '')

    loadedProjects.push({
      name,
      title: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      html,
      github
    })
  }

  projects.value = loadedProjects
})

// 🔹 Gestion de l’ouverture/fermeture
const toggleExpand = (name) => {
  expanded.value[name] = !expanded.value[name]
}
</script>

<template>
  <section class="projects-page py-5">
    <div class="container">
      <h1 class="display-5 fw-bold text-center mb-5 text-pink">Projects</h1>

      <div v-if="projects.length === 0" class="text-center text-muted">
        Loading projects...
      </div>

      <div v-else class="d-flex flex-column gap-4">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-block p-4 rounded-4 shadow-lg"
        >
          <!-- Header bloc -->
          <div
            class="d-flex justify-content-between align-items-center"
            @click="toggleExpand(project.name)"
            style="cursor:pointer;"
          >
            <h2 class="h5 fw-bold text-pink mb-0">{{ project.title }}</h2>
            <i
              class="bi"
              :class="expanded[project.name] ? 'bi-chevron-up' : 'bi-chevron-down'"
            ></i>
          </div>

          <!-- Contenu -->
          <transition name="fade">
            <div v-if="expanded[project.name]" class="project-content mt-3">
              <div v-html="project.html"></div>

              <!-- 🔹 Bouton GitHub -->
              <div v-if="project.github" class="mt-4 text-end">
                <a
                  :href="project.github"
                  target="_blank"
                  class="btn-github"
                >
                  <i class="bi bi-github me-2"></i>View on GitHub
                </a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: radial-gradient(circle at top left, #0a0a0a, #000);
  color: #fff;
  backdrop-filter: blur(8px);
  margin-top: 50px;
}

/* --- Project block --- */
.project-block {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 77, 166, 0.15);
  transition: all 0.3s ease;
}
.project-block:hover {
  border-color: #ff4da6;
  box-shadow: 0 0 18px rgba(255, 77, 166, 0.2);
  transform: translateY(-3px);
}

/* --- Text --- */
.text-pink {
  color: #ff4da6;
  text-shadow: 0 0 10px rgba(255, 77, 166, 0.4);
}

/* --- Markdown content --- */
.project-content {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  font-size: 0.95rem;
}
.project-content h1, .project-content h2, .project-content h3 {
  color: #ff4da6;
  margin-top: 1rem;
}
.project-content a {
  color: #ff4da6;
  text-decoration: none;
}
.project-content a:hover {
  text-decoration: underline;
}

/* --- Bouton GitHub --- */
.btn-github {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 77, 166, 0.15);
  border: 1px solid rgba(255, 77, 166, 0.4);
  color: #ff4da6;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
}
.btn-github:hover {
  background: #ff4da6;
  color: #fff;
  transform: translateY(-2px);
}

/* --- Animation --- */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-5px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 1000px;
  transform: translateY(0);
}
</style>
