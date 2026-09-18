<script setup>
/**
 * RevealText — splits a line into words and lifts each one out of a mask.
 * Pure 2D transforms, scrub-free, triggered once when scrolled into view
 * (or immediately on mount for hero copy).
 */
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  text: { type: String, default: '' },
  tag: { type: String, default: 'h2' },
  mode: { type: String, default: 'scroll' }, // scroll | immediate
  delay: { type: Number, default: 0 },
  stagger: { type: Number, default: 0.055 },
  duration: { type: Number, default: 0.95 },
  start: { type: String, default: 'top 86%' },
})

const root = ref(null)

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const inners = root.value?.querySelectorAll('.rt-inner')
  if (!inners?.length) return

  if (reduce) {
    gsap.set(inners, { yPercent: 0, opacity: 1 })
    return
  }

  const tween = {
    yPercent: 0,
    opacity: 1,
    duration: props.duration,
    ease: 'power4.out',
    stagger: props.stagger,
    delay: props.delay,
  }

  if (props.mode === 'immediate') {
    gsap.set(inners, { yPercent: 112 })
    gsap.to(inners, tween)
  } else {
    gsap.set(inners, { yPercent: 112, opacity: 0 })
    gsap.to(inners, {
      ...tween,
      scrollTrigger: { trigger: root.value, start: props.start, once: true },
    })
  }
})
</script>

<template>
  <component :is="tag" ref="root" class="inline-block">
    <span
      v-for="(word, i) in text.split(' ')"
      :key="`${word}-${i}`"
      class="rt-word"
      :class="i !== text.split(' ').length - 1 ? 'mr-[0.24em]' : ''"
    >
      <span class="rt-inner">{{ word }}</span>
    </span>
  </component>
</template>
