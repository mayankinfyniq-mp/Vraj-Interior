<script setup>
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

  const reduce = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (reduce) {
    gsap.set(
      '[data-hero-top], [data-hero-title] .rt-inner, [data-hero-fade], [data-hero-line], [data-hero-bottom]',
      {
        y: 0,
        yPercent: 0,
        opacity: 1,
        scaleX: 1,
      },
    )
    return
  }

  const tl = gsap.timeline({
    defaults: {
      ease: 'power4.out',
    },
  })

  tl.from('[data-hero-top]', {
    y: -20,
    opacity: 0,
    duration: 0.7,
  })
    .from(
      '[data-hero-title] .rt-inner',
      {
        yPercent: 115,
        opacity: 0,
        duration: 1.05,
        stagger: 0.08,
      },
      0.15,
    )
    .from(
      '[data-hero-line]',
      {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power2.inOut',
      },
      0.5,
    )
    .from(
      '[data-hero-fade]',
      {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
      },
      0.55,
    )
    .from(
      '[data-hero-bottom]',
      {
        y: 12,
        opacity: 0,
        duration: 0.6,
      },
      0.75,
    )
}

onMounted(() => {
  if (appState.preloaderDone) {
    play()
  }
})

watch(
  () => appState.preloaderDone,
  (done) => {
    if (done) {
      window.setTimeout(play, 60)
    }
  },
)
</script>

<template>
  <section
    ref="root"
    class="relative isolate min-h-[100svh] overflow-hidden bg-[#18221e]"
  >
    <ImageRotator
      fill
      scrim
      :caption="false"
      :controls="false"
      :interval="3000"
      :items="heroSlides"
      rounded=""
    />

    <div
      class="pointer-events-none absolute inset-0 bg-black/25"
    />

    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#101713]/45 via-[#101713]/10 to-[#101713]/25"
    />

    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#101713]/25 via-transparent to-[#101713]/50"
    />

    <div
      class="relative flex min-h-[100svh] flex-col px-5 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28 lg:px-12"
    >

      <div
        class="flex flex-1 items-end pb-16 pt-20 sm:pb-20 sm:pt-24 md:items-center md:pb-10 md:pt-16"
      >
        <div
          class="grid w-full grid-cols-1 items-end md:grid-cols-12"
        >
          <div
            class="md:col-span-9 md:col-start-2 lg:col-span-8 lg:col-start-3"
          >
            <div
              data-hero-fade
              class="mb-4 flex items-center justify-center gap-2 sm:mb-6 sm:gap-3"
            >
              <span
                class="h-px w-5 bg-[#dcb56b] sm:w-10"
              />

              <span
                class="text-[0.42rem] uppercase tracking-[0.2em] text-[#dcb56b] sm:text-[0.56rem]"
              >
                Spaces with intention
              </span>

              <span
                class="h-px w-5 bg-[#dcb56b] sm:w-10"
              />
            </div>

            <h1
              data-hero-title
              class="mx-auto max-w-[800px] text-center !text-[#f4eee3]"
            >
              <span
                class="block text-[clamp(2.5rem,10vw,6.5rem)] font-medium leading-[0.86] tracking-[-0.065em]"
              >
                <span class="rt-word mr-[0.1em]">
                  <span class="rt-inner">
                    Homes,
                  </span>
                </span>

                <span class="rt-word">
                  <span class="rt-inner">
                    quietly
                  </span>
                </span>
              </span>

              <span
                class="block text-[clamp(2.5rem,10vw,6.5rem)] font-medium italic leading-[0.94] tracking-[-0.065em] text-[#dcb56b]"
              >
                <span class="rt-word">
                  <span class="rt-inner">
                    composed.
                  </span>
                </span>
              </span>
            </h1>

            <div
              data-hero-line
              class="mx-auto mt-5 h-px w-full max-w-lg origin-center bg-[#f4eee3]/25 sm:mt-7"
            />

            <p
              data-hero-fade
              class="mx-auto mt-4 max-w-[330px] text-center text-[0.62rem] font-light leading-[1.65] text-[#f4eee3]/65 sm:mt-6 sm:max-w-lg sm:text-[0.86rem] sm:leading-[1.8]"
            >
              Thoughtful interiors shaped through material, light,
              proportion and the rhythm of everyday living.
            </p>

            <div
              data-hero-fade
              class="mt-5 flex flex-wrap items-center justify-center gap-4 sm:mt-8 sm:gap-6"
            >
              <RouterLink
                to="/contact"
                class="btn btn-gold"
                data-cursor="link"
              >
                <span>Start a project</span>

                <i
                  class="pi pi-arrow-right btn-arrow text-[0.65rem]"
                />
              </RouterLink>

              <button
                type="button"
                class="btn btn-ghost-light"
                data-cursor="link"
                @click="scrollToEl('[data-hero-projects]')"
              >
                <span>View our work</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>