<script setup>
/**
 * RevealText — the signature typographic entrance.
 * Splits content into lines, masks each one, and slides it up from
 * behind its own mask as the block scrolls into view.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SplitType from 'split-type'
import { gsap, ScrollTrigger } from '@/plugins/gsap'
import { prefersReducedMotion } from '@/composables/useSmoothScroll'

const props = defineProps({
  tag: { type: String, default: 'p' },
  delay: { type: Number, default: 0 },
  stagger: { type: Number, default: 0.09 },
  duration: { type: Number, default: 1.25 },
  start: { type: String, default: 'top 86%' },
  once: { type: Boolean, default: true },
  splitBy: { type: String, default: 'lines' } // lines | words
})

const el = ref(null)
let split = null
let tween = null
let ro = null

function build() {
  if (!el.value) return
  const reduced = prefersReducedMotion()

  // Preserve the original sentence for assistive tech and copy-paste;
  // split line spans otherwise read as run-together words.
  const plain = (el.value.textContent || '').replace(/\s+/g, ' ').trim()
  if (plain) el.value.setAttribute('aria-label', plain)

  split = new SplitType(el.value, {
    types: props.splitBy,
    tagName: 'span',
    lineClass: 'rt-line'
  })

  const units = props.splitBy === 'lines' ? split.lines : split.words
  if (!units || !units.length) return

  if (reduced) {
    gsap.set(el.value, { opacity: 1 })
    return
  }

  // Wrap each unit so it can travel behind its own mask
  units.forEach((unit) => {
    unit.style.display = 'inline-block'
    unit.style.overflow = 'hidden'
    unit.style.verticalAlign = 'top'
    const inner = document.createElement('span')
    inner.className = 'rt-inner'
    inner.style.display = 'inline-block'
    inner.style.willChange = 'transform'
    while (unit.firstChild) inner.appendChild(unit.firstChild)
    unit.appendChild(inner)
  })

  const inners = units.map((u) => u.firstChild)

  gsap.set(el.value, { opacity: 1 })
  gsap.set(inners, { yPercent: 118, rotate: 1.5 })

  tween = gsap.to(inners, {
    yPercent: 0,
    rotate: 0,
    duration: props.duration,
    ease: 'expo.out',
    stagger: props.stagger,
    delay: props.delay,
    scrollTrigger: {
      trigger: el.value,
      start: props.start,
      once: props.once
    }
  })
}

function rebuild() {
  if (!el.value) return
  if (tween) {
    tween.scrollTrigger && tween.scrollTrigger.kill()
    tween.kill()
    tween = null
  }
  if (split) {
    split.revert()
    split = null
  }
  build()
  ScrollTrigger.refresh()
}

let resizeTimer = null
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(rebuild, 220)
}

onMounted(() => {
  // Wait a tick so webfonts settle before measuring line breaks
  requestAnimationFrame(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(build)
    } else {
      build()
    }
  })
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (tween) {
    tween.scrollTrigger && tween.scrollTrigger.kill()
    tween.kill()
  }
  if (split) split.revert()
})
</script>

<template>
  <component :is="tag" ref="el" class="js-reveal">
    <slot />
  </component>
</template>

<style scoped>
:deep(.rt-line) {
  display: block;
}
</style>
