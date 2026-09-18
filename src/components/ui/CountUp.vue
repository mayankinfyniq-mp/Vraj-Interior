<script setup>
/** CountUp — figure rises to its value the first time it scrolls into view. */
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  duration: { type: Number, default: 1.8 },
})

const display = ref(0)
const root = ref(null)

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    display.value = props.value
    return
  }
  const state = { v: 0 }
  gsap.to(state, {
    v: props.value,
    duration: props.duration,
    ease: 'power2.out',
    scrollTrigger: { trigger: root.value, start: 'top 90%', once: true },
    onUpdate: () => {
      display.value = Math.round(state.v)
    },
  })
})
</script>

<template>
  <span ref="root" class="tabular-nums">{{ display }}<span class="text-gold">{{ suffix }}</span></span>
</template>
