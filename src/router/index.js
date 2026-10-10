import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/photos', name: 'photos', component: () => import('../pages/PhotosPage.vue') },
  { path: '/chess', name: 'chess', component: () => import('../pages/ChessPage.vue') },
  // Old /projects and /contact links land on the home page.
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // The fixed header is 60px tall: keep anchors clear of it. Smooth only within the same page.
    if (to.hash) return { el: to.hash, top: 60, behavior: to.path === from.path ? 'smooth' : 'auto' }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
