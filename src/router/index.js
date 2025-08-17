import { createRouter, createWebHashHistory  } from 'vue-router'
import Machine from '../components/Machine.vue'
import Home from '../components/Home.vue'
import BlogVue from '../components/Blog.vue'
import SavoirFaireVue from '../components/SavoirFaire.vue'
import Contact from '../components/Contact.vue'
import Politique from '../components/Politique.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/machines', component: Machine },
  { path: '/blogs', component: BlogVue },
  { path: '/savoir-faire', component: SavoirFaireVue },
  { path: '/contact', component: Contact },
  { path: '/politique', component: Politique },

  // Route catch-all à la fin pour rediriger les routes non trouvées
  { path: '/:pathMatch(.*)*', component: Home },
]

const router = createRouter({
  history: createWebHashHistory (),
  routes,
})

export default router
