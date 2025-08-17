import { createRouter, createWebHashHistory  } from 'vue-router'
import Home from '../components/Home.vue'
import Contact from '../components/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/contact', component: Contact },

  // Route catch-all à la fin pour rediriger les routes non trouvées
  { path: '/:pathMatch(.*)*', component: Home },
]

const router = createRouter({
  history: createWebHashHistory (),
  routes,
})

export default router
