<script setup>
/**
 * ServicesPreview — an index of what the studio does.
 * On pointer devices a floating frame tracks the cursor and swaps
 * its image per row; on touch the images simply sit inline.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { services } from '@/data/services'
import { gsap } from '@/plugins/gsap'
import { prefersReducedMotion } from '@/composables/useSmoothScroll'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ArrowLink from '@/components/ui/ArrowLink.vue'

const root = ref(null)
const floater = ref(null)
const activeIndex = ref(-1)
const isDesktop = ref(false)

let xTo = null
let yTo = null

function onMove(e) {
  if (!isDesktop.value || !floater.value || prefersReducedMotion()) return
  xTo?.(e.clientX)
  yTo?.(e.clientY)
}

function enter(i) {
  if (!isDesktop.value) return
  activeIndex.value = i
  gsap.to(floater.value, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power3.out' })
}
function leave() {
  if (!isDesktop.value) return
  gsap.to(floater.value, { autoAlpha: 0, scale: 0.92, duration: 0.35, ease: 'power2.out' })
}

function checkDesktop() {
  isDesktop.value =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1024
}

onMounted(() => {
  checkDesktop()
  window.addEventListener('resize', checkDesktop)
  if (isDesktop.value && floater.value && !prefersReducedMotion()) {
    gsap.set(floater.value, { autoAlpha: 0, scale: 0.92, xPercent: -50, yPercent: -50 })
    xTo = gsap.quickTo(floater.value, 'x', { duration: 0.65, ease: 'power3.out' })
    yTo = gsap.quickTo(floater.value, 'y', { duration: 0.65, ease: 'power3.out' })
    window.addEventListener('mousemove', onMove, { passive: true })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDesktop)
  window.removeEventListener('mousemove', onMove)
})
</script>

<template>
  <section
    ref="root"
    class="relative bg-porcelain py-24 md:py-32 lg:py-36"
    @mouseleave="leave()"
  >
    <div class="shell">
      <div class="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="What we do"
          index="02"
          title="Six ways we can help"
          italic-word="help"
          lede="From a single wardrobe to a full turnkey build — every engagement starts with the same conversation about how you live."
          class="max-w-xl"
        />
        <ArrowLink to="/services" label="All services" class="hidden md:inline-flex" />
      </div>

      <!-- Index rows -->
      <ul class="mt-16 border-t border-linen">
        <li
          v-for="(s, i) in services"
          :key="s.slug"
          class="group relative border-b border-linen"
          v-reveal="{ delay: i * 0.04 }"
        >
          <RouterLink
            :to="`/services#${s.slug}`"
            class="flex items-center gap-6 py-7 md:gap-10 md:py-8"
            @mouseenter="enter(i)"
          >
            <span class="w-10 shrink-0 text-[0.7rem] tracking-widest2 text-brass md:w-14">
              {{ s.id }}
            </span>

            <h3
              class="flex-1 font-display text-[clamp(1.35rem,2.6vw,2.05rem)] font-light leading-tight text-walnut transition-[transform,color] duration-500 ease-silk group-hover:translate-x-2 md:group-hover:translate-x-4"
            >
              {{ s.title }}
            </h3>

            <p class="hidden max-w-xs text-[0.85rem] leading-relaxed text-stone lg:block">
              {{ s.excerpt }}
            </p>

            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-linen text-walnut transition-all duration-500 ease-silk group-hover:border-brass group-hover:bg-brass group-hover:text-ivory"
            >
              <svg class="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.2" />
              </svg>
            </span>
          </RouterLink>

          <!-- Touch / mobile inline thumb -->
          <div class="px-0 pb-6 md:hidden">
            <img
              :src="s.image"
              :alt="s.title"
              loading="lazy"
              class="aspect-[16/10] w-full object-cover"
            />
          </div>
        </li>
      </ul>

      <ArrowLink to="/services" label="All services" class="mt-12 md:hidden" />
    </div>

    <!-- Cursor-tracking preview (desktop only) -->
    <div
      v-if="isDesktop"
      ref="floater"
      class="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[300px] w-[230px] overflow-hidden lg:block"
      aria-hidden="true"
    >
      <div class="relative h-full w-full overflow-hidden shadow-[0_40px_90px_-40px_rgba(51,41,31,0.55)]">
        <img
          v-for="(s, i) in services"
          :key="s.slug"
          :src="s.image"
          :alt="''"
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-silk"
          :style="{ opacity: activeIndex === i ? 1 : 0 }"
        />
      </div>
    </div>
  </section>
</template>
