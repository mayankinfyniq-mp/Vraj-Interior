<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { process } from '@/data/site'

const root = ref(null)

onMounted(() => {
  const reduce = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (reduce) return

  gsap.fromTo(
    '[data-process-rail]',
    {
      scaleY: 0,
    },
    {
      scaleY: 1,
      transformOrigin: 'top center',
      ease: 'power2.out',
      duration: 1.4,
      scrollTrigger: {
        trigger: root.value,
        start: 'top 80%',
        once: true,
      },
    },
  )

  gsap.from('[data-process-node]', {
    scale: 0,
    opacity: 0,
    duration: 0.55,
    stagger: 0.15,
    ease: 'back.out(2)',
    scrollTrigger: {
      trigger: root.value,
      start: 'top 80%',
      once: true,
    },
  })

  gsap.from('[data-process-content]', {
    y: 18,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: root.value,
      start: 'top 80%',
      once: true,
    },
  })
})
</script>

<template>
  <section
    ref="root"
    class="section overflow-hidden bg-white"
  >
    <div class="shell">
      <div
        class="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between"
      >

        <p
          class="text-[0.6rem] uppercase tracking-[0.18em] text-stone/70 sm:text-[0.7rem]"
        >
          Six to nine weeks on site
        </p>
      </div>

      <!-- Mobile timeline -->
      <div
        class="relative mt-10 md:hidden"
      >
        <span
          class="absolute left-[7px] top-2 bottom-2 w-px bg-ink/10"
        />

        <span
          data-process-rail
          class="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gold"
        />

        <div class="space-y-8">
          <div
            v-for="(step, i) in process"
            :key="step.index"
            class="relative flex gap-6"
          >
            <span
              data-process-node
              class="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold bg-white"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>

            <div
              data-process-content
              class="min-w-0 flex-1 border-b border-ink/10 pb-8"
              :class="{ 'border-b-0': i === process.length - 1 }"
            >
              <div
                class="flex items-center gap-3"
              >
                <span
                  class="text-[0.55rem] uppercase tracking-[0.2em] text-gold-deep"
                >
                  Step {{ step.index }}
                </span>

                <span class="h-px w-5 bg-ink/15" />
              </div>

              <h3
                class="mt-2 text-[1.65rem] font-medium leading-[1] tracking-[-0.035em] text-emerald"
              >
                {{ step.title }}
              </h3>

              <p
                class="mt-3 max-w-[280px] text-[0.78rem] font-light leading-[1.75] text-stone"
              >
                {{ step.note }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop timeline -->
      <div
        class="relative mt-16 hidden md:block"
      >
        <span
          class="absolute left-0 right-0 top-[5px] h-px bg-ink/10"
        />

        <span
          data-process-rail
          class="absolute left-0 right-0 top-[5px] h-px origin-left bg-gold"
        />

        <div
          class="grid gap-8 lg:grid-cols-4 lg:gap-10"
        >
          <div
            v-for="step in process"
            :key="step.index"
            class="relative pt-10"
          >
            <span
              data-process-node
              class="absolute left-0 top-0 grid h-[11px] w-[11px] place-items-center rounded-full border border-gold bg-white"
            >
              <span class="h-[3px] w-[3px] rounded-full bg-gold" />
            </span>

            <div data-process-content>
              <span
                class="numbered text-stone/60"
              >
                {{ step.index }}
              </span>

              <h3
                class="display-sm mt-3"
              >
                {{ step.title }}
              </h3>

              <p
                class="mt-2 max-w-xs text-[0.88rem] font-light leading-relaxed text-stone"
              >
                {{ step.note }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>