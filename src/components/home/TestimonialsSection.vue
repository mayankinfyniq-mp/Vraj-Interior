<script setup>
/**
 * TestimonialsSection — one long quote at a time. Cross-fades on a
 * 7 second beat, with manual prev/next and a hairline progress rail.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/plugins/gsap'
import { testimonials } from '@/data/content'
import { prefersReducedMotion } from '@/composables/useSmoothScroll'
import EyebrowLabel from '@/components/ui/EyebrowLabel.vue'

const current = ref(0)
const quoteEl = ref(null)
const metaEl = ref(null)
let timer = null

const BEAT = 7000

function show(i) {
  const next = (i + testimonials.length) % testimonials.length
  if (next === current.value) return
  current.value = next
  if (prefersReducedMotion()) return
  gsap.fromTo(
    [quoteEl.value, metaEl.value],
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08 }
  )
  restart()
}
function next() {
  show(current.value + 1)
}
function prev() {
  show(current.value - 1)
}
function restart() {
  clearInterval(timer)
  timer = setInterval(next, BEAT)
}

onMounted(() => restart())
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section class="relative overflow-hidden bg-ivory py-24 md:py-32 lg:py-36">
    <!-- Oversized quotation mark -->
    <span
      class="pointer-events-none absolute -top-10 right-6 select-none font-display text-[16rem] leading-none text-sand/70 md:right-16 md:text-[22rem]"
      aria-hidden="true"
    >
      &ldquo;
    </span>

    <div class="shell relative">
      <EyebrowLabel text="Client words" index="05" />

      <div class="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <blockquote class="lg:col-span-8">
          <p
            ref="quoteEl"
            class="font-display text-[clamp(1.4rem,3.1vw,2.35rem)] font-light leading-[1.42] tracking-[-0.01em] text-walnut"
          >
            {{ testimonials[current].quote }}
          </p>

          <footer ref="metaEl" class="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span class="text-[0.8rem] uppercase tracking-widest2 text-walnut">
              {{ testimonials[current].author }}
            </span>
            <span class="h-1 w-1 rounded-full bg-brass" />
            <span class="text-[0.8rem] text-stone">{{ testimonials[current].meta }}</span>
            <span class="h-1 w-1 rounded-full bg-brass" />
            <span class="text-[0.8rem] text-taupe">{{ testimonials[current].year }}</span>
          </footer>
        </blockquote>

        <!-- Controls -->
        <div class="flex flex-col items-start justify-end gap-8 lg:col-span-4 lg:items-end">
          <div class="flex gap-3">
            <button
              type="button"
              v-cursor="'link'"
              aria-label="Previous testimonial"
              class="flex h-12 w-12 items-center justify-center rounded-full border border-linen text-walnut transition-all duration-500 ease-silk hover:border-brass hover:bg-brass hover:text-ivory"
              @click="prev()"
            >
              <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M15 8H2M7 3L2 8l5 5" stroke="currentColor" stroke-width="1.2" />
              </svg>
            </button>
            <button
              type="button"
              v-cursor="'link'"
              aria-label="Next testimonial"
              class="flex h-12 w-12 items-center justify-center rounded-full border border-linen text-walnut transition-all duration-500 ease-silk hover:border-brass hover:bg-brass hover:text-ivory"
              @click="next()"
            >
              <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.2" />
              </svg>
            </button>
          </div>

          <!-- Rail -->
          <div class="flex items-center gap-2.5">
            <button
              v-for="(t, i) in testimonials"
              :key="i"
              type="button"
              :aria-label="`Show testimonial ${i + 1}`"
              :aria-current="i === current"
              v-cursor="'link'"
              class="h-8 w-8 py-3"
              @click="show(i)"
            >
              <span
                class="block h-px transition-all duration-500 ease-silk"
                :class="i === current ? 'w-8 bg-brass' : 'w-4 bg-linen hover:bg-taupe'"
              />
            </button>
            <span class="ml-3 text-micro tabular-nums tracking-widest2 text-taupe">
              {{ String(current + 1).padStart(2, '0') }} / {{ String(testimonials.length).padStart(2, '0') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
