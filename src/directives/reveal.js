/**
 * directives/reveal.js
 * ---------------------------------------------------------------
 * `v-reveal` — one directive for every scroll-in animation used on
 * the site. Keeps views declarative and free of GSAP boilerplate.
 *
 *   v-reveal                                  → fade + rise
 *   v-reveal="{ delay: 0.1 }"                 → fade + rise, delayed
 *   v-reveal="{ type: 'clip' }"               → image mask wipe up
 *   v-reveal="{ type: 'clip-x' }"             → image mask wipe from left
 *   v-reveal="{ type: 'scale' }"              → image scale-out reveal
 *   v-reveal="{ child: '.item', stagger: .08 }" → stagger direct children
 *   v-reveal="{ y: 0, distance: 60 }"         → tune the travel
 */
import { gsap, ScrollTrigger } from '@/plugins/gsap'
import { prefersReducedMotion } from '@/composables/useSmoothScroll'

const DEFAULTS = {
  type: 'fade', // fade | clip | clip-x | scale | none
  delay: 0,
  duration: 1.1,
  distance: 36,
  scale: 0.94,
  stagger: 0,
  child: null,
  start: 'top 88%',
  once: true,
  scrub: false
}

function buildFrom(el, o) {
  switch (o.type) {
    case 'clip':
      return { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 }
    case 'clip-x':
      return { clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 }
    case 'scale':
      return { scale: o.scale, opacity: 0, transformOrigin: 'center' }
    case 'none':
      return { opacity: 0 }
    default:
      return { y: o.distance, opacity: 0 }
  }
}

function buildTo(el, o) {
  switch (o.type) {
    case 'clip':
    case 'clip-x':
      return {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        ease: 'expo.out',
        duration: 1.45
      }
    case 'scale':
      return { scale: 1, opacity: 1, ease: 'expo.out', duration: 1.4 }
    case 'none':
      return { opacity: 1 }
    default:
      return { y: 0, opacity: 1, ease: 'expo.out', duration: o.duration }
  }
}

export const revealDirective = {
  mounted(el, binding) {
    if (prefersReducedMotion()) {
      el.style.opacity = 1
      return
    }

    const o = { ...DEFAULTS, ...(binding.value || {}) }
    const targets = o.child ? Array.from(el.querySelectorAll(o.child)) : [el]
    if (!targets.length) return

    if (o.child && o.stagger > 0) el.style.opacity = 1

    gsap.set(targets, buildFrom(el, o))

    const tween = gsap.to(targets, {
      ...buildTo(el, o),
      delay: o.delay,
      stagger: o.stagger,
      scrollTrigger: {
        trigger: el,
        start: o.start,
        once: o.once,
        scrub: o.scrub || undefined,
        // markers: false
      }
    })

    el.__revealTween = tween
  },
  unmounted(el) {
    const tween = el.__revealTween
    if (tween) {
      if (tween.scrollTrigger) tween.scrollTrigger.kill()
      tween.kill()
      el.__revealTween = null
    }
  }
}

/**
 * directives/parallax.js — subtle depth on scroll.
 *   v-parallax="{ speed: 0.12 }"
 */
export const parallaxDirective = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return
    const speed = binding.value?.speed ?? 0.12
    const tween = gsap.fromTo(
      el,
      { yPercent: -speed * 100 },
      {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    )
    el.__parallaxTween = tween
  },
  unmounted(el) {
    const tween = el.__parallaxTween
    if (tween) {
      if (tween.scrollTrigger) tween.scrollTrigger.kill()
      tween.kill()
      el.__parallaxTween = null
    }
  }
}

export { ScrollTrigger }
