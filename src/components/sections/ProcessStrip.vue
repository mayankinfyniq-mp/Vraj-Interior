<script setup>
/** ProcessStrip — four movements of a project on one gold rail. */
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { process } from '@/data/site'

const root = ref(null)

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  gsap.fromTo(
    '[data-process-rail]',
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'power2.out',
      duration: 1.6,
      scrollTrigger: { trigger: root.value, start: 'top 78%', once: true },
    },
  )
  gsap.from('[data-process-node]', {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    stagger: 0.16,
    ease: 'back.out(2)',
    scrollTrigger: { trigger: root.value, start: 'top 78%', once: true },
  })
})
</script>

<template>
  <section ref="root" class="section bg-white">
    <div class="shell">
      <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
          <span class="numbered text-gold-deep">03</span>
          <span class="h-px w-10 bg-ink/20" />
          <span class="eyebrow text-stone">How it runs</span>
        </div>
        <p class="text-[0.72rem] uppercase tracking-wider2 text-stone">Six to nine weeks on site</p>
      </div>

      <div class="relative mt-16">
        <span class="absolute left-0 right-0 top-[5px] h-px bg-ink/10" />
        <span data-process-rail class="absolute left-0 right-0 top-[5px] h-px origin-left bg-gold" />

        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="step in process" :key="step.index" class="relative pt-10">
            <span
              data-process-node
              class="absolute left-0 top-0 grid h-[11px] w-[11px] place-items-center rounded-full border border-gold bg-white"
            >
              <span class="h-[3px] w-[3px] rounded-full bg-gold" />
            </span>
            <span class="numbered text-stone/60">{{ step.index }}</span>
            <h3 class="display-sm mt-3">{{ step.title }}</h3>
            <p class="mt-2 text-[0.88rem] font-light leading-relaxed text-stone">{{ step.note }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
