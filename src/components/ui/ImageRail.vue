<script setup>
/**
 * ImageRail — a pinned horizontal gallery driven by vertical scroll.
 * Desktop: GSAP pin + translate (2D only).
 * Mobile / reduced-motion: a normal swipeable row.
 */
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  items: { type: Array, default: () => [] }, // [{ image, label, meta }]
  height: { type: String, default: '78vh' },
})

const section = ref(null)
const viewport = ref(null)
const track = ref(null)
let ctx = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const distance = () => Math.max(0, track.value.scrollWidth - viewport.value.offsetWidth)
      const tween = gsap.to(track.value, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.value,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      return () => tween.kill()
    })
    return () => mm.revert()
  }, section.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="section" class="relative overflow-hidden bg-porcelain">
    <div class="shell flex items-end justify-between pb-8 pt-16 md:pt-20">
      <slot name="header" />
      <span class="hidden items-center gap-2 text-[0.68rem] uppercase tracking-wider2 text-stone md:flex">
        <i class="pi pi-arrow-right text-[0.7rem] text-gold" />
        Scroll to travel
      </span>
    </div>

    <div ref="viewport" class="overflow-hidden pb-14 md:pb-20">
      <div
        ref="track"
        class="flex w-max gap-4 px-5 sm:gap-6 md:px-10 lg:gap-8 xl:px-16"
        :style="{ height }"
      >
        <figure
          v-for="(item, i) in items"
          :key="item.image + i"
          class="group relative h-full shrink-0 overflow-hidden"
          :class="i % 2 === 0 ? 'w-[76vw] sm:w-[46vw] lg:w-[34vw]' : 'w-[62vw] sm:w-[38vw] lg:w-[26vw] self-end h-[78%]'"
          data-cursor="view"
          data-cursor-label="View"
        >
          <img
            :src="item.image"
            :alt="item.label || 'Vraj Interior'"
            class="h-full w-full object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05]"
            loading="lazy"
          />
          <figcaption class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/75 to-transparent p-5">
            <span class="text-[0.78rem] uppercase tracking-wider2 text-porcelain">{{ item.label }}</span>
            <span class="numbered text-porcelain/60">{{ String(i + 1).padStart(2, '0') }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
