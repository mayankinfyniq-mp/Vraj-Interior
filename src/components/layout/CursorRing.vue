<script setup>
/**
 * CursorRing — a two-part cursor: a soft emerald halo that trails the pointer
 * and a small gold core that snaps to it exactly.
 * Hover targets declare intent with `data-cursor="link | view | text | drag"`.
 * Only runs on precise pointers; touch devices keep their native behaviour.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const halo = ref(null)
const core = ref(null)

let xTo, yTo, cxTo, cyTo
let enabled = false

function onMove(e) {
  if (!enabled) return
  xTo(e.clientX)
  yTo(e.clientY)
  cxTo(e.clientX)
  cyTo(e.clientY)
}

function applyMode(mode, label) {
  if (!enabled) return
  const el = halo.value
  const coreEl = core.value
  if (mode === 'view' || mode === 'drag') {
    gsap.to(el, { width: 92, height: 92, backgroundColor: '#06231E', borderColor: 'rgba(195,161,90,0)', duration: 0.45, ease: 'power3.out' })
    gsap.to(el.querySelector('[data-cursor-label]'), { autoAlpha: 1, duration: 0.3 })
    gsap.to(coreEl, { scale: 0, duration: 0.3 })
    el.querySelector('[data-cursor-label]').textContent = label || (mode === 'drag' ? 'Drag' : 'View')
  } else if (mode === 'link' || mode === 'text') {
    gsap.to(el, {
      width: mode === 'link' ? 54 : 8,
      height: mode === 'link' ? 54 : 26,
      borderRadius: mode === 'link' ? '999px' : '4px',
      backgroundColor: 'rgba(195,161,90,0.12)',
      borderColor: 'rgba(195,161,90,0.6)',
      duration: 0.4,
      ease: 'power3.out',
    })
    gsap.to(el.querySelector('[data-cursor-label]'), { autoAlpha: 0, duration: 0.2 })
    gsap.to(coreEl, { scale: mode === 'link' ? 0.3 : 0, duration: 0.3 })
  } else {
    gsap.to(el, {
      width: 36,
      height: 36,
      borderRadius: '999px',
      backgroundColor: 'rgba(10,46,39,0.04)',
      borderColor: 'rgba(10,46,39,0.28)',
      duration: 0.4,
      ease: 'power3.out',
    })
    gsap.to(el.querySelector('[data-cursor-label]'), { autoAlpha: 0, duration: 0.2 })
    gsap.to(coreEl, { scale: 1, duration: 0.3 })
  }
}

function onOver(e) {
  const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
  applyMode(target ? target.getAttribute('data-cursor') : 'default', target?.getAttribute('data-cursor-label'))
}
function onDown() {
  gsap.to(halo.value, { scale: 0.82, duration: 0.25, ease: 'power3.out' })
}
function onUp() {
  gsap.to(halo.value, { scale: 1, duration: 0.3, ease: 'power3.out' })
}
function onLeave() {
  gsap.to([halo.value, core.value], { autoAlpha: 0, duration: 0.25 })
}
function onEnter() {
  gsap.to([halo.value, core.value], { autoAlpha: 1, duration: 0.25 })
}

onMounted(() => {
  enabled = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!enabled) return

  document.documentElement.classList.add('has-cursor')
  gsap.set([halo.value, core.value], { xPercent: -50, yPercent: -50, autoAlpha: 0 })

  xTo = gsap.quickTo(halo.value, 'x', { duration: 0.5, ease: 'power3.out' })
  yTo = gsap.quickTo(halo.value, 'y', { duration: 0.5, ease: 'power3.out' })
  cxTo = gsap.quickTo(core.value, 'x', { duration: 0.12, ease: 'power3.out' })
  cyTo = gsap.quickTo(core.value, 'y', { duration: 0.12, ease: 'power3.out' })

  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseover', onOver, { passive: true })
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('mouseenter', onEnter)
})

onUnmounted(() => {
  document.documentElement.classList.remove('has-cursor')
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseover', onOver)
  window.removeEventListener('mousedown', onDown)
  window.removeEventListener('mouseup', onUp)
  document.removeEventListener('mouseleave', onLeave)
  document.removeEventListener('mouseenter', onEnter)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-[120] hidden md:block">
    <div
      ref="halo"
      class="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border border-ink/30"
      style="will-change: transform"
    >
      <span
        data-cursor-label
        class="invisible text-[0.62rem] uppercase tracking-label text-porcelain"
      />
    </div>
    <div ref="core" class="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold" style="will-change: transform" />
  </div>
</template>
