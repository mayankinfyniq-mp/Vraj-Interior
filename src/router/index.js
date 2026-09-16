/**
 * router/index.js
 * ---------------------------------------------------------------
 * History routing with intelligent scroll restoration: jumps to the
 * top on a new page, but glides to an anchor when a hash is present.
 */
import { createRouter, createWebHistory } from 'vue-router'
import { scrollToTop, scrollToEl } from '@/composables/useSmoothScroll'
import { seo } from '@/data/site'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Interior Design Studio, Ahmedabad' }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Services' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About the Studio' }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: 'Projects' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contact' }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return null // handled in afterEach
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.afterEach((to) => {
  // Title
  const base = seo.titleTemplate.replace('%s', to.meta.title || 'Studio')
  document.title = to.meta.title === 'Interior Design Studio, Ahmedabad' ? base : base

  // Scroll handling — Lenis needs to be told, not the browser
  requestAnimationFrame(() => {
    if (to.hash) {
      setTimeout(() => scrollToEl(to.hash, -100), 120)
    } else {
      scrollToTop(true)
    }
  })
})

export default router
