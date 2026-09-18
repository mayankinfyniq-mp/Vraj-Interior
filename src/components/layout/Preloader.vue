<script setup>
/**
 * Preloader — emerald curtain with a counting rule and staggered wordmark.
 * Locks scroll, then lifts away in four panels and unlocks the hero animation.
 */
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { appState } from '@/composables/useAppState'
import { lockScroll } from '@/composables/useSmoothScroll'

const root = ref(null)
const counter = ref(0)
const letters = 'VRAJ'.split('')

onMounted(() => {
  lockScroll(true)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const finish = () => {
    appState.preloaderDone = true
    lockScroll(false)
    gsap.set(root.value, { display: 'none' })
  }

  if (reduce) {
    counter.value = 100
    window.setTimeout(finish, 250)
    return
  }

  const tl = gsap.timeline({ onComplete: finish })

  tl.from('[data-pre-letter]', {
    yPercent: 118,
    duration: 0.9,
    ease: 'power4.out',
    stagger: 0.07,
  })
    .from('[data-pre-meta]', { opacity: 0, y: 14, duration: 0.6 }, 0.35)
    .to(
      { v: 0 },
      {
        v: 100,
        duration: 1.15,
        ease: 'power2.inOut',
        onUpdate() {
          counter.value = Math.round(this.targets()[0].v)
        },
      },
      0.1,
    )
    .to('[data-pre-rule]', { scaleX: 1, duration: 1.15, ease: 'power2.inOut' }, 0.1)
    .to('[data-pre-inner]', { yPercent: -110, opacity: 0, duration: 0.65, ease: 'power3.in' }, 1.45)
    .to(
      '[data-pre-panel]',
      {
        yPercent: -100,
        duration: 0.95,
        ease: 'power4.inOut',
        stagger: { each: 0.075, from: 'start' },
      },
      1.62,
    )
})
</script>

<template>
  <div ref="root" class="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
    <!-- curtain -->
    <div class="absolute inset-0 flex">
      <span
        v-for="n in 4"
        :key="n"
        data-pre-panel
        class="h-full flex-1 bg-ink"
        :class="n % 2 === 0 ? 'bg-ink' : 'bg-ink-900'"
      />
    </div>

    <div class="relative flex h-full flex-col justify-between">
      <div class="shell flex items-center justify-between pt-8">
        <span class="numbered text-porcelain/45" data-pre-meta>Interior Design Studio — Ahmedabad</span>
        <span class="numbered text-porcelain/45" data-pre-meta>Est. 2013</span>
      </div>

      <div class="shell" data-pre-inner>
        <h1 class="display-hero flex overflow-hidden text-porcelain">
          <span v-for="(l, i) in letters" :key="i" class="overflow-hidden">
            <span data-pre-letter class="inline-block">{{ l }}</span>
          </span>
          <span class="ml-4 hidden self-end pb-4 md:block">
            <span data-pre-letter class="wordmark inline-block text-[0.8rem] uppercase tracking-label text-gold"
              >Interior</span
            >
          </span>
        </h1>
        <p class="mt-6 max-w-sm text-[0.88rem] font-light text-porcelain/50" data-pre-meta>
          Preparing the gallery…
        </p>
      </div>

      <div class="shell pb-10" data-pre-inner>
        <div class="flex items-end justify-between gap-8">
          <div class="h-px flex-1 origin-left scale-x-0 bg-porcelain/25" data-pre-rule />
          <span class="font-display text-[1.6rem] leading-none text-gold tabular-nums">
            {{ String(counter).padStart(3, '0') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
