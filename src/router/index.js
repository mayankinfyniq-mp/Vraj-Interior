import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToTop, scrollToEl } from '@/composables/useSmoothScroll'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Vraj Interior — Interior Design Studio, Ahmedabad' },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Services — Kitchens, Living, Bedrooms | Vraj Interior' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: 'Projects — Vraj Interior' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Studio — Vraj Interior' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contact — Vraj Interior' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Not found — Vraj Interior' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})

router.afterEach(async (to) => {
  if (to.meta?.title) document.title = to.meta.title
  await nextTick()
  scrollToTop()
  /* let the new page paint, then re-measure every scroll trigger */
  window.setTimeout(() => {
    ScrollTrigger.refresh()
    if (to.hash) {
      const el = document.querySelector(to.hash)
      if (el) scrollToEl(el, -110)
    }
  }, 460)
})

export default router
