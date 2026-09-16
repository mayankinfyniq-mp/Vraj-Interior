<script setup>
/**
 * ProcessSection — a five-stage timeline. The vertical rule draws
 * itself downward in step with the scroll position.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/plugins/gsap'
import { processSteps } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { prefersReducedMotion } from '@/composables/useSmoothScroll'

const track = ref(null)
const fill = ref(null)
let st = null

onMounted(() => {
  if (prefersReducedMotion() || !track.value || !fill.value) {
    if (fill.value) fill.value.style.transform = 'scaleY(1)'
    return
  }
  st = gsap.fromTo(
    fill.value,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      transformOrigin: 'top center',
      scrollTrigger: {
        trigger: track.value,
        start: 'top 72%',
        end: 'bottom 78%',
        scrub: 0.5
      }
    }
  )
})

onBeforeUnmount(() => {
  if (st) {
    st.scrollTrigger && st.scrollTrigger.kill()
    st.kill()
  }
})
</script>

<template>
  <section class="bg-porcelain py-24 md:py-32 lg:py-36">
    <div class="shell">
      <SectionHeading
        eyebrow="How we work"
        index="04"
        title="A process with no surprises"
        italic-word="surprises"
        lede="Five stages, agreed dates, one project manager. You always know what is happening on site this week."
        class="max-w-xl"
      />

      <div ref="track" class="relative mt-16 md:mt-20">
        <!-- Rule + progress fill -->
        <div class="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-linen md:block" aria-hidden="true">
          <div ref="fill" class="h-full w-px origin-top bg-brass" />
        </div>

        <ol class="flex flex-col">
          <li
            v-for="(step, i) in processSteps"
            :key="step.id"
            class="group relative grid gap-4 pb-12 pl-0 md:grid-cols-12 md:gap-8 md:pb-14 md:pl-16"
            v-reveal="{ delay: i * 0.05 }"
          >
            <!-- Node -->
            <span
              class="absolute left-0 top-1.5 hidden h-10 w-10 items-center justify-center rounded-full border border-linen bg-porcelain text-[0.65rem] tracking-widest2 text-brass transition-colors duration-500 group-hover:border-brass group-hover:bg-brass group-hover:text-ivory md:flex"
            >
              {{ step.id }}
            </span>

            <div class="md:col-span-4">
              <div class="flex items-baseline gap-3">
                <span class="text-[0.7rem] tracking-widest2 text-brass md:hidden">{{ step.id }}</span>
                <h3 class="font-display text-[1.6rem] font-light leading-tight text-walnut">
                  {{ step.title }}
                </h3>
              </div>
              <span class="mt-2 block text-micro uppercase tracking-widest2 text-taupe">
                {{ step.duration }}
              </span>
            </div>

            <p class="max-w-prose2 text-[0.93rem] leading-[1.9] text-stone md:col-span-5">
              {{ step.copy }}
            </p>

            <div class="md:col-span-3 md:text-right">
              <span
                class="inline-flex items-center gap-2 border border-linen bg-ivory/70 px-4 py-2 text-[0.72rem] uppercase tracking-widest2 text-umber"
              >
                <span class="h-1 w-1 rounded-full bg-brass" />
                {{ step.output }}
              </span>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
