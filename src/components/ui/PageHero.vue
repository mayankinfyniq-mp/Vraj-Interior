<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
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

let animation = null

onMounted(() => {
  const reduce = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (reduce || !layer.value || !root.value) return

  animation = gsap.fromTo(
    layer.value,
    {
      yPercent: -4,
      scale: 1.04,
    },
    {
      yPercent: 5,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
})

onUnmounted(() => {
  animation?.scrollTrigger?.kill()
  animation?.kill()
})
</script>

<template>
  <section
    ref="root"
    class="relative isolate overflow-hidden bg-ink pt-36 md:pt-44"
  >
    <div
      ref="layer"
      class="absolute inset-0 -z-10 will-change-transform"
    >
      <img
        :src="image"
        :alt="title"
        class="h-full w-full object-cover object-center opacity-[0.52] sm:opacity-[0.48] md:opacity-[0.42]"
      />
    </div>

    <div
      class="absolute inset-0 -z-10 bg-ink/20"
    />

    <div
      class="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink/85 via-ink/40 to-ink/20 md:block"
    />

    <div
      class="absolute inset-0 -z-10 bg-gradient-to-b from-ink/35 via-transparent to-ink/90 md:hidden"
    />

    <div
      class="absolute inset-x-0 bottom-0 -z-10 h-[45%] bg-gradient-to-t from-ink/90 to-transparent md:hidden"
    />

    <div class="shell pb-14 md:pb-20">
      <div
        class="mb-12 flex items-center justify-between md:mb-16"
      >
        <div
          v-if="index || eyebrow"
          class="flex items-center gap-3"
        >
          <span
            v-if="index"
            class="numbered text-[0.62rem] text-gold-light"
          >
            {{ index }}
          </span>

          <span
            v-if="index && eyebrow"
            class="h-px w-7 bg-porcelain/25"
          />

          <span
            v-if="eyebrow"
            class="text-[0.52rem] uppercase tracking-[0.2em] text-porcelain/60 sm:text-[0.58rem]"
          >
            {{ eyebrow }}
          </span>
        </div>
      </div>

      <RevealText
        :text="title"
        tag="h1"
        mode="immediate"
        class="display-xl block max-w-4xl !text-porcelain text-balance !text-[clamp(2.4rem,8vw,5.8rem)] !leading-[0.92] !tracking-[-0.055em]"
        :stagger="0.05"
      />

      <div
        class="mt-6 h-px w-16 bg-gold sm:mt-7 sm:w-20"
      />

      <div
        class="mt-6 flex flex-col gap-7 md:mt-8 md:flex-row md:items-end md:justify-between md:gap-10"
      >
        <p
          v-if="note"
          class="lede max-w-md !text-porcelain/70 !text-[0.78rem] !leading-[1.7] sm:!text-[0.88rem]"
        >
          {{ note }}
        </p>

        <dl
          v-if="meta.length"
          class="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-porcelain/15 pt-4 sm:gap-x-10 md:min-w-[320px] md:border-t-0 md:pt-0"
        >
          <div
            v-for="m in meta"
            :key="m.label"
          >
            <dt
              class="text-[0.5rem] uppercase tracking-[0.18em] text-porcelain/45 sm:text-[0.56rem]"
            >
              {{ m.label }}
            </dt>

            <dd
              class="mt-1 font-display text-[0.92rem] leading-tight text-porcelain sm:text-[1.05rem]"
            >
              {{ m.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="hairline-light" />
  </section>
</template>