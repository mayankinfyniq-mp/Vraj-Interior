<script setup>
/**
 * HomeHero — full-bleed slideshow (3s), one short line of type, two actions.
 * The entrance timeline waits for the preloader curtain to lift.
 */
import { onMounted, ref, watch } from 'vue'
import gsap from 'gsap'
import { appState } from '@/composables/useAppState'
import { heroSlides, site } from '@/data/site'
import ImageRotator from '@/components/ui/ImageRotator.vue'
import { scrollToEl } from '@/composables/useSmoothScroll'

const root = ref(null)
const played = ref(false)

function play() {
  if (played.value || !root.value) return
  played.value = true
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

  if (reduce) {
    gsap.set('[data-hero-line] .rt-inner, [data-hero-fade]', { y: 0, yPercent: 0, opacity: 1 })
    return
  }

  tl.from('[data-hero-line] .rt-inner', { yPercent: 118, opacity: 0, duration: 1.15, stagger: 0.08 })
    .from('[data-hero-fade]', { y: 26, opacity: 0, duration: 0.9, stagger: 0.09 }, 0.35)
    .from('[data-hero-rule]', { scaleX: 0, duration: 1.2, ease: 'power2.inOut' }, 0.25)
    .from('[data-hero-side] > *', { y: 18, opacity: 0, duration: 0.7, stagger: 0.07 }, 0.5)
}

onMounted(() => {
  if (appState.preloaderDone) play()
})
watch(
  () => appState.preloaderDone,
  (done) => done && window.setTimeout(play, 60),
)
</script>

<template>
  <section ref="root" class="relative isolate min-h-[100svh] overflow-hidden pt-32 md:pt-36">
    <ImageRotator
      fill
      scrim
      :caption="false"
      :controls="false"
      :interval="3000"
      :items="heroSlides"
      rounded=""
    />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-porcelain/95 to-transparent" />

    <div class="relative shell flex min-h-[calc(100svh-9rem)] flex-col justify-between pb-10">
      <!-- top meta -->
      <div class="flex flex-wrap items-center gap-x-6 gap-y-3" data-hero-side>
        <span class="chip chip--light">{{ site.city }} · Est. {{ site.established }}</span>
        <span class="flex items-center gap-2 text-[0.7rem] uppercase tracking-wider2 text-porcelain/60">
          <span class="h-1.5 w-1.5 animate-breathe rounded-full bg-gold" />
          Turnkey residential interiors
        </span>
      </div>

      <!-- headline block -->
      <div class="max-w-4xl">
        <h1 data-hero-line class="display-hero !text-porcelain">
          <span class="block">
            <span class="rt-word mr-[0.22em]"><span class="rt-inner">Homes,</span></span>
            <span class="rt-word"><span class="rt-inner">quietly</span></span>
          </span>
          <span class="block italic text-gold-light">
            <span class="rt-word"><span class="rt-inner">composed.</span></span>
          </span>
        </h1>

        <div data-hero-rule class="mt-8 h-px w-full max-w-xl origin-left bg-porcelain/25" />

        <div class="mt-8 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <p data-hero-fade class="max-w-sm text-[0.95rem] font-light leading-relaxed text-porcelain/70">
            Modular kitchens, living halls, bedrooms and pooja rooms — designed, built and handed
            over by one team.
          </p>
          <div data-hero-fade class="flex flex-wrap items-center gap-4">
            <RouterLink to="/contact" class="btn btn-gold" data-cursor="link">
              <span>Start a project</span>
              <i class="pi pi-arrow-right btn-arrow text-[0.75rem]" />
            </RouterLink>
            <button
              class="btn btn-ghost-light"
              data-cursor="link"
              @click="scrollToEl('[data-hero-projects]')"
            >
              <span>View work</span>
            </button>
          </div>
        </div>
      </div>

      <!-- bottom rail -->
      <div class="mt-10 flex items-end justify-between gap-6" data-hero-side>
        <div class="flex items-center gap-4">
          <span
            v-for="(slide, i) in heroSlides"
            :key="slide.label"
            class="hidden text-[0.66rem] uppercase tracking-wider2 text-porcelain/45 md:block"
          >
            {{ String(i + 1).padStart(2, '0') }} {{ slide.label }}
          </span>
        </div>
        <span class="flex items-center gap-3 text-[0.66rem] uppercase tracking-label text-porcelain/55">
          Scroll
          <span class="block h-8 w-px animate-breathe bg-porcelain/40" />
        </span>
      </div>
    </div>
  </section>
</template>
