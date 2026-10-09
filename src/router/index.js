import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../components/Projects.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../components/Contact.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const target = { el: to.hash, top: 90, behavior: 'smooth' }
      if (to.path === from.path) return target
      // The out-in page transition (App.vue, 0.35s) mounts the new page late: wait for the anchor to exist.
      return new Promise((resolve) => setTimeout(() => resolve(target), 400))
    }
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
