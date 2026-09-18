<script setup>
/** Hairline gold progress rule pinned to the very top of the viewport. */
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const bar = ref(null)
let tween = null

onMounted(() => {
  tween = gsap.to(bar.value, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  })
})

onUnmounted(() => {
  tween?.scrollTrigger?.kill()
  tween?.kill()
})
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-[80] h-px bg-transparent">
    <div ref="bar" class="h-full w-full origin-left scale-x-0 bg-gold/70" />
  </div>
</template>
