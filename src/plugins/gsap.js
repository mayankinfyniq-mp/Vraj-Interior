/**
 * plugins/gsap.js
 * ---------------------------------------------------------------
 * Single registration point for GSAP + ScrollTrigger so the plugin
 * is never registered twice (a classic source of broken triggers).
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}

gsap.defaults({ ease: 'power3.out', duration: 1 })

export { gsap, ScrollTrigger }
