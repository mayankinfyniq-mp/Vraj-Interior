<script setup>
/**
 * HeroCarousel — full-bleed, cross-dissolving frames on a 3 second
 * beat, with a slow Ken Burns push on the active image.
 *
 * The entrance timeline waits for `appReady` so it plays after the
 * preloader curtains have lifted rather than behind them.
 */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { gsap } from '@/plugins/gsap'
import { heroSlides } from '@/data/content'
import { prefersReducedMotion } from '@/composables/useSmoothScroll'
import { appReady } from '@/composables/useAppReady'
import ArrowLink from '@/components/ui/ArrowLink.vue'

const SLIDE_MS = 3000

const current = ref(0)
const root = ref(null)
const eyebrowEl = ref(null)
const lineEls = ref([])
const tailEl = ref(null)
const railEl = ref(null)

let timer = null
let tl = null
let started = false

function setLineRef(el, i) {
  if (el) lineEls.value[i] = el
}

function goTo(i) {
  current.value = (i + heroSlides.length) % heroSlides.length
  restartTimer()
}
function next() {
  goTo(current.value + 1)
}
function restartTimer() {
  clearInterval(timer)
  timer = setInterval(next, SLIDE_MS)
}

function playIntro() {
  if (started || prefersReducedMotion() || !root.value) return
  started = true

  const lines = lineEls.value.filter(Boolean)
  const inners = lines.map((l) => l.firstElementChild || l)

  tl = gsap.timeline({ delay: 0.15 })
  tl.from(eyebrowEl.value, { opacity: 0, y: 16, duration: 0.9, ease: 'expo.out' })
    .from(
      inners,
      { yPercent: 115, duration: 1.35, ease: 'expo.out', stagger: 0.1 },
      '-=0.55'
    )
    .from(
      tailEl.value ? tailEl.value.children : [],
      { opacity: 0, y: 22, duration: 0.9, ease: 'expo.out', stagger: 0.09 },
      '-=0.85'
    )
    .from(railEl.value, { opacity: 0, x: 26, duration: 1, ease: 'expo.out' }, '-=0.9')
}

watch(appReady, (v) => {
  if (v) playIntro()
})
watch(current, () => {
  // Re-shuffle the eyebrow subtly per slide so the block never feels frozen
  if (prefersReducedMotion() || !eyebrowEl.value) return
  gsap.fromTo(
    eyebrowEl.value,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
  )
})

onMounted(() => {
  restartTimer()
  if (appReady.value) playIntro()
})
onBeforeUnmount(() => {
  clearInterval(timer)
  if (tl) tl.kill()
})
</script>

<template>
  <section
    ref="root"
    class="relative isolate flex h-[100svh] min-h-[600px] w-full items-end overflow-hidden bg-sand"
    aria-label="Featured work"
  >
    <!-- ================= FRAMES ================= -->
    <div class="absolute inset-0 -z-10">
      <div
        v-for="(slide, i) in heroSlides"
        :key="slide.src"
        class="absolute inset-0 transition-opacity ease-silk"
        :style="{
          opacity: i === current ? 1 : 0,
          transitionDuration: '1500ms',
          zIndex: i === current ? 2 : 1
        }"
        :aria-hidden="i !== current"
      >
        <img
          :src="slide.src"
          :alt="slide.eyebrow"
          :fetchpriority="i === 0 ? 'high' : 'low'"
          decoding="async"
          class="h-full w-full object-cover"
          :class="i === current && !prefersReducedMotion() ? 'ken-burns' : ''"
          :style="i === current ? { animationDelay: '0s' } : {}"
        />
      </div>

      <!-- Warm scrims: keeps type crisp without darkening the room -->
      <div class="absolute inset-0 z-[3] bg-gradient-to-t from-espresso/45 via-espresso/5 to-transparent" />
      <div class="absolute inset-0 z-[3] bg-gradient-to-r from-espresso/40 via-transparent to-transparent" />
      <div class="absolute inset-0 z-[3] bg-brass/5 mix-blend-overlay" />
    </div>

    <!-- ================= CONTENT ================= -->
    <div class="shell relative z-10 w-full pb-24 pt-36 md:pb-28">
      <div class="grid items-end gap-12 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <div
            ref="eyebrowEl"
            class="mb-7 flex items-center gap-4 text-micro uppercase tracking-widest2 text-ivory/85"
          >
            <span class="inline-block h-px w-10 bg-brass-soft" />
            <span>{{ heroSlides[current].eyebrow }}</span>
          </div>

          <h1 class="font-display text-display-lg font-light text-ivory">
            <span
              v-for="(key, i) in ['line1', 'line2', 'line3']"
              :key="key"
              :ref="(el) => setLineRef(el, i)"
              class="mask-line"
            >
              <span class="block">
                {{ heroSlides[current][key] }}
              </span>
            </span>
          </h1>

          <div ref="tailEl" class="mt-9 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
            <p class="max-w-sm text-[0.95rem] leading-[1.85] text-ivory/80">
              Interior design and turnkey execution from Ahmedabad — warm
              material, honest craft and rooms built to be lived in.
            </p>
          </div>
        </div>

        <!-- Vertical slide rail -->
        <div class="hidden lg:col-span-4 lg:flex lg:justify-end">
          <div ref="railEl" class="flex flex-col items-end gap-5">
            <button
              v-for="(slide, i) in heroSlides"
              :key="`btn-${i}`"
              type="button"
              v-cursor="'link'"
              class="group flex items-center gap-4 text-right"
              :aria-label="`Show slide ${i + 1}`"
              :aria-current="i === current"
              @click="goTo(i)"
            >
              <span
                class="h-px transition-all duration-700 ease-silk"
                :class="i === current ? 'w-16 bg-brass-soft' : 'w-7 bg-ivory/35 group-hover:bg-ivory/60'"
              />
              <span
                class="font-display text-[1.05rem] transition-colors duration-500"
                :class="i === current ? 'text-ivory' : 'text-ivory/50 group-hover:text-ivory/80'"
              >
                {{ String(i + 1).padStart(2, '0') }}
              </span>
            </button>

            <span class="mt-2 text-micro uppercase tracking-widest2 text-ivory/55">
              {{ String(current + 1).padStart(2, '0') }} / {{ String(heroSlides.length).padStart(2, '0') }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= BOTTOM META ================= -->
    <div class="absolute inset-x-0 bottom-0 z-10">
      <div class="shell flex items-center justify-between border-t border-ivory/15 py-5">
        <a
          href="#manifesto"
          v-cursor="'link'"
          class="group flex items-center gap-3 text-micro uppercase tracking-widest2 text-ivory/70 transition-colors hover:text-ivory"
        >
          <span class="relative block h-8 w-px overflow-hidden bg-ivory/25">
            <span class="absolute inset-x-0 top-0 h-3 animate-[scrollcue_2.4s_ease-in-out_infinite] bg-brass-soft" />
          </span>
          Scroll
        </a>

        <span class="text-micro uppercase tracking-widest2 text-ivory/60">
          {{ heroSlides[current].place }} · India
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ken-burns {
  animation: kenburns 6.2s cubic-bezier(0.33, 0.02, 0.2, 1) forwards;
  will-change: transform;
}
@keyframes kenburns {
  from {
    transform: scale(1.02) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.12) translate3d(-1.2%, -1.2%, 0);
  }
}
@keyframes scrollcue {
  0% {
    transform: translateY(-100%);
  }
  60%,
  100% {
    transform: translateY(320%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .ken-burns {
    animation: none;
  }
}
</style>
