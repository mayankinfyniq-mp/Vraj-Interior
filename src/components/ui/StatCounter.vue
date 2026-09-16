<script setup>
/** Counts up to `value` the first time it scrolls into view. */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/plugins/gsap'
import { prefersReducedMotion } from '@/composables/useSmoothScroll'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  label: { type: String, required: true },
  duration: { type: Number, default: 1.8 }
})

const display = ref(0)
const root = ref(null)
let st = null

onMounted(() => {
  if (prefersReducedMotion()) {
    display.value = props.value
    return
  }
  const obj = { n: 0 }
  st = gsap.to(obj, {
    n: props.value,
    duration: props.duration,
    ease: 'power2.out',
    onUpdate: () => {
      display.value = Math.round(obj.n)
    },
    scrollTrigger: {
      trigger: root.value,
      start: 'top 90%',
      once: true
    }
  })
})

onBeforeUnmount(() => {
  if (st) {
    st.scrollTrigger && st.scrollTrigger.kill()
    st.kill()
  }
})
</script>

<template>
  <div ref="root" class="flex flex-col gap-2">
    <span class="font-display text-[2.6rem] font-light leading-none text-walnut md:text-[3.4rem]">
      {{ display }}<span class="text-brass">{{ suffix }}</span>
    </span>
    <span class="h-px w-10 bg-linen" aria-hidden="true" />
    <span class="text-[0.74rem] uppercase tracking-widest2 text-stone">{{ label }}</span>
  </div>
</template>
