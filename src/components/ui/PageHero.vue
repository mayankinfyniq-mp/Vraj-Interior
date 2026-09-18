<script setup>
/**
 * PageHero — the dark opening band shared by every inner page.
 * A slow parallax on the image layer, then a masked headline reveal.
 */
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import RevealText from './RevealText.vue'

const props = defineProps({
  index: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  note: { type: String, default: '' },
  image: { type: String, default: '/images/living-02.jpg' },
  meta: { type: Array, default: () => [] },
})

const root = ref(null)
const layer = ref(null)

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  gsap.fromTo(
    layer.value,
    { yPercent: -6, scale: 1.06 },
    {
      yPercent: 8,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
    },
  )
})
</script>

<template>
  <section ref="root" class="relative isolate overflow-hidden bg-ink pt-36 md:pt-44">
    <div ref="layer" class="absolute inset-0 -z-10">
      <img :src="image" :alt="title" class="h-full w-full object-cover opacity-[0.42]" />
    </div>
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/92" />

    <div class="shell pb-14 md:pb-20">
      <div class="flex items-center gap-4" v-reveal="{ y: 14 }">
        <span v-if="index" class="numbered text-gold">{{ index }}</span>
        <span class="h-px w-10 bg-porcelain/25" />
        <span class="eyebrow text-porcelain/60">{{ eyebrow }}</span>
      </div>

      <RevealText
        :text="title"
        tag="h1"
        mode="immediate"
        class="display-xl mt-7 block max-w-4xl !text-porcelain text-balance"
        :stagger="0.06"
      />

      <div class="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p v-if="note" class="lede !text-porcelain/70">{{ note }}</p>
        <dl v-if="meta.length" class="flex flex-wrap gap-x-10 gap-y-4">
          <div v-for="m in meta" :key="m.label">
            <dt class="text-[0.66rem] uppercase tracking-label text-porcelain/45">{{ m.label }}</dt>
            <dd class="mt-1 font-display text-[1.05rem] text-porcelain">{{ m.value }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="hairline-light" />
  </section>
</template>
