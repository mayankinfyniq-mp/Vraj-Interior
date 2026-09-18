import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let rafId = null

/** Create the single Lenis instance for the app and wire it to GSAP. */
export function initSmoothScroll() {
  if (lenis) return lenis

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return null

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    lerp: 0.1,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function destroySmoothScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

export function getLenis() {
  return lenis
}

export function lockScroll(locked) {
  document.documentElement.classList.toggle('is-locked', locked)
  if (!lenis) return
  locked ? lenis.stop() : lenis.start()
}

export function scrollToTop(immediate = true) {
  if (lenis) {
    lenis.scrollTo(0, { immediate })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
  window.scrollTo(0, 0)
}

export function scrollToEl(target, offset = -80) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.15 })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
