/**
 * useSmoothScroll.js
 * ---------------------------------------------------------------
 * Lenis-powered inertial scrolling, wired into the GSAP ticker so
 * ScrollTrigger and Lenis share a single RAF loop. Without this,
 * scroll-linked animations jitter by one frame.
 */
import Lenis from 'lenis'

let lenis = null
let rafHandler = null

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getLenis() {
  return lenis
}

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.7,
    syncTouch: false
  })

  // Register with GSAP's ticker (set up by plugins/gsap.js)
  import('@/plugins/gsap').then(({ gsap, ScrollTrigger }) => {
    lenis.on('scroll', ScrollTrigger.update)
    rafHandler = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafHandler)
    gsap.ticker.lagSmoothing(0)
  })

  return lenis
}

export function destroySmoothScroll() {
  if (!lenis) return
  import('@/plugins/gsap').then(({ gsap }) => {
    if (rafHandler) gsap.ticker.remove(rafHandler)
  })
  lenis.destroy()
  lenis = null
  rafHandler = null
}

/** Used by the preloader and the mobile menu to freeze the page. */
export function lockScroll() {
  document.documentElement.classList.add('lenis-stopped')
  if (lenis) lenis.stop()
  document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
  document.documentElement.classList.remove('lenis-stopped')
  if (lenis) lenis.start()
  document.body.style.overflow = ''
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo(0, 0)
}

export function scrollToEl(target, offset = -80) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.3 })
  else if (typeof target !== 'number') {
    const el = document.querySelector(target)
    if (el) window.scrollTo({ top: el.offsetTop + offset, behavior: 'smooth' })
  }
}
