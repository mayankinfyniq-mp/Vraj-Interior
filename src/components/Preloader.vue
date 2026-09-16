<script setup>
/**
 * Preloader — a held first impression rather than a loading bar.
 * Preloads the hero frames, counts to 100, then lifts five curtains
 * to reveal the page. Scroll stays locked until it's gone.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/plugins/gsap'
import { lockScroll, unlockScroll, prefersReducedMotion } from '@/composables/useSmoothScroll'
import { heroSlides } from '@/data/content'

const emit = defineEmits(['done'])

const root = ref(null)
const wordRef = ref(null)
const barRef = ref(null)
const metaRef = ref(null)
const counter = ref(0)
const gone = ref(false)
const COLUMNS = 5

let tl = null

function preload(list) {
  return Promise.all(
    list.map(
      (s) =>
        new Promise((resolve) => {
          const img = new Image()
          img.onload = img.onerror = resolve
          img.src = s.src
        })
    )
  )
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function playExit() {
  const reduced = prefersReducedMotion()

  if (reduced) {
    gone.value = true
    unlockScroll()
    emit('done')
    return
  }

  tl = gsap.timeline({
    onComplete: () => {
      gone.value = true
      unlockScroll()
      emit('done')
    }
  })

  tl.to([wordRef.value, barRef.value, metaRef.value], {
    opacity: 0,
    y: -14,
    duration: 0.5,
    ease: 'power2.inOut',
    stagger: 0.05
  })
    .to(
      '.pl-curtain',
      {
        yPercent: -101,
        duration: 1.15,
        ease: 'power4.inOut',
        stagger: 0.07
      },
      '-=0.15'
    )
    .set(root.value, { pointerEvents: 'none' })
}

onMounted(async () => {
  lockScroll()

  const sources = heroSlides.map((s) => s.src)

  // Counter eases toward 100 regardless of network speed
  const counterTween = gsap.to(
    { v: 0 },
    {
      v: 96,
      duration: 2.1,
      ease: 'power1.inOut',
      onUpdate() {
        counter.value = Math.round(this.targets()[0].v)
      }
    }
  )

  if (prefersReducedMotion()) {
    counter.value = 100
    counterTween.kill()
    playExit()
    return
  }

  // Word mark + rule introduction
  gsap.from(wordRef.value, { opacity: 0, y: 22, duration: 1.1, ease: 'expo.out', delay: 0.1 })
  gsap.from(barRef.value, { scaleX: 0, duration: 1.3, ease: 'expo.out', delay: 0.35 })
  gsap.from(metaRef.value, { opacity: 0, duration: 0.9, delay: 0.6 })

  await Promise.all([preload(sources), wait(2100)])

  counterTween.kill()
  gsap.to(
    { v: counter.value },
    {
      v: 100,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate() {
        counter.value = Math.round(this.targets()[0].v)
      },
      onComplete: () => wait(280).then(playExit)
    }
  )
})

onBeforeUnmount(() => {
  if (tl) tl.kill()
  unlockScroll()
})
</script>

<template>
  <div
    v-if="!gone"
    ref="root"
    class="fixed inset-0 z-[120] flex items-center justify-center"
    role="status"
    aria-live="polite"
    aria-label="Loading Vraj Interior"
  >
    <!-- Curtains that lift away -->
    <div class="pointer-events-none absolute inset-0 flex">
      <div
        v-for="i in COLUMNS"
        :key="i"
        class="pl-curtain h-full flex-1 bg-ivory"
        :style="{ boxShadow: 'inset -1px 0 0 rgba(219,207,188,0.5)' }"
      />
    </div>

    <!-- Foreground content -->
    <div class="relative z-10 flex w-full max-w-md flex-col items-center gap-9 px-6 text-center">
      <svg
        ref="wordRef"
        class="h-10 w-auto text-walnut"
        viewBox="0 0 190 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 6 L34 34 L56 6"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M74 6 L96 34 L118 6"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="162" cy="30" r="4" fill="#B08D57" />
        <path d="M134 6 L134 34" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
      </svg>

      <div class="flex flex-col items-center gap-5">
        <span class="text-micro uppercase tracking-widest2 text-stone">Vraj Interior</span>
        <div ref="barRef" class="h-px w-52 origin-center bg-walnut/25">
          <div
            class="h-px bg-brass transition-[width] duration-200 ease-out"
            :style="{ width: counter + '%' }"
          />
        </div>
      </div>

      <div ref="metaRef" class="flex w-full items-baseline justify-between text-micro uppercase tracking-widest2 text-taupe">
        <span>Ahmedabad · Est. 2012</span>
        <span class="font-sans tabular-nums">{{ String(counter).padStart(3, '0') }}</span>
      </div>
    </div>
  </div>
</template>
