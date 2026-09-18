import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * v-reveal
 * --------
 * Usage:
 *   v-reveal                                  → default fade + rise
 *   v-reveal="{ y: 60, delay: 0.1 }"          → tuned
 *   v-reveal="'left'" | "'right'" | "'mask'"   → named presets
 *   v-reveal="{ children: true, stagger: 0.08 }"  → animates direct children
 *
 * Plain 2D transforms only — no 3D, no rotation.
 */

const presets = {
  up: { y: 44, x: 0, opacity: 0 },
  left: { x: -56, y: 0, opacity: 0 },
  right: { x: 56, y: 0, opacity: 0 },
  mask: { y: 0, opacity: 0, scaleY: 1, clipPath: 'inset(0% 0% 100% 0%)' },
  fade: { opacity: 0, y: 0, x: 0 },
}

function parse(value) {
  if (typeof value === 'string') {
    const preset = presets[value] || presets.up
    return { ...preset, duration: 1.05, ease: 'power3.out', start: 'top 88%' }
  }
  if (value && typeof value === 'object') {
    return {
      duration: 1.05,
      ease: 'power3.out',
      start: 'top 88%',
      y: 0,
      x: 0,
      opacity: 0,
      ...value,
    }
  }
  return { ...presets.up, duration: 1.05, ease: 'power3.out', start: 'top 88%' }
}

export default {
  mounted(el, binding) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(el, { clearProps: 'all' })
      return
    }

    const opts = parse(binding.value)
    const targets = opts.children ? Array.from(el.children) : el
    const { start, children, stagger, delay, ...tween } = opts

    const duration = tween.duration
    const ease = tween.ease
    delete tween.duration
    delete tween.ease
    delete tween.start

    gsap.set(targets, tween)
    el.__revealTween = gsap.to(targets, {
      y: 0,
      x: 0,
      opacity: 1,
      scaleY: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration,
      ease,
      delay: delay || 0,
      stagger: children ? stagger ?? 0.08 : 0,
      scrollTrigger: {
        trigger: el,
        start: start || 'top 88%',
        once: true,
      },
      onComplete: () => {
        gsap.set(targets, { clearProps: 'clipPath,willChange' })
      },
    })
  },
  unmounted(el) {
    el.__revealTween?.scrollTrigger?.kill()
    el.__revealTween?.kill()
    delete el.__revealTween
  },
}
