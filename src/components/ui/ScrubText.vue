<script setup>
/**
 * ScrubText — words fade from a whisper to full contrast as you
 * scroll through the paragraph. The effect that makes a long
 * statement feel like it is being spoken.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SplitType from 'split-type'
import { gsap, ScrollTrigger } from '@/plugins/gsap'
import { prefersReducedMotion } from '@/composables/useSmoothScroll'

const props = defineProps({
  tag: { type: String, default: 'p' },
  from: { type: String, default: '#DBCFBC' }, // linen
  to: { type: String, default: '#4A3B2C' }, // walnut
  start: { type: String, default: 'top 78%' },
  end: { type: String, default: 'bottom 62%' },
  stagger: { type: Number, default: 0.4 }
})

const el = ref(null)
let split = null
let tween = null
let resizeTimer = null

function build() {
  if (!el.value) return

  const plain = (el.value.textContent || '').replace(/\s+/g, ' ').trim()
  if (plain) el.value.setAttribute('aria-label', plain)

  if (prefersReducedMotion()) {
    el.value.style.opacity = 1
    return
  }

  split = new SplitType(el.value, { types: 'words', tagName: 'span' })
  if (!split.words || !split.words.length) return

  gsap.set(el.value, { opacity: 1 })
  gsap.set(split.words, { color: props.from })

  tween = gsap.to(split.words, {
    color: props.to,
    ease: 'none',
    stagger: props.stagger,
    scrollTrigger: {
      trigger: el.value,
      start: props.start,
      end: props.end,
      scrub: 0.6
    }
  })
}

function rebuild() {
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
}

function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(rebuild, 220)
}

onMounted(() => {
  requestAnimationFrame(() => {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build)
    else build()
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
