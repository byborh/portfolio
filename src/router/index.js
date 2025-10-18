import { createRouter, createWebHistory  } from 'vue-router'
import Home from '../components/Home.vue'
import Contact from '../components/Contact.vue'
import Projects from '../components/Projects.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/contact', component: Contact },
  { path: '/projects', component: Projects },

  // Route catch-all à la fin pour rediriger les routes non trouvées
  { path: '/:pathMatch(.*)*', component: Home },
]

const router = createRouter({
  history: createWebHistory (),
  routes,
})

export default router
