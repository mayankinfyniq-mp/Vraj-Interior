<script setup>
/**
 * ManifestoSection — the studio's statement of intent.
 * The paragraph's words brighten as you scroll through them, which
 * pulls the eye down the page without a single bounce animation.
 */
import { manifesto, stats } from '@/data/content'
import ScrubText from '@/components/ui/ScrubText.vue'
import EyebrowLabel from '@/components/ui/EyebrowLabel.vue'
import ImageFrame from '@/components/ui/ImageFrame.vue'
import { projects } from '@/data/gallery'

const frames = [projects[3], projects[15]]
</script>

<template>
  <section id="manifesto" class="relative overflow-hidden bg-ivory py-24 md:py-32 lg:py-40">
    <div class="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
      <!-- Left: word-scrubbed statement -->
      <div class="lg:col-span-7 lg:pr-8">
        <EyebrowLabel :text="manifesto.eyebrow" index="01" />

        <ScrubText
          tag="p"
          class="mt-9 font-display text-[clamp(1.55rem,3.4vw,2.6rem)] font-light leading-[1.34] tracking-[-0.01em] text-walnut"
        >
          We design interiors that feel settled the day you move in — warm,
          unhurried and built to age well. Fewer gestures, better materials, and
          details you only notice after a month.
        </ScrubText>

        <div class="mt-12 grid gap-7 sm:grid-cols-2">
          <p
            v-for="(para, i) in manifesto.body"
            :key="i"
            v-reveal="{ delay: 0.06 * i }"
            class="js-reveal text-[0.93rem] leading-[1.9] text-stone"
          >
            {{ para }}
          </p>
        </div>

        <div v-reveal="{ delay: 0.14 }" class="js-reveal mt-12 flex items-center gap-5">
          <span class="inline-block h-px w-12 bg-brass" aria-hidden="true" />
          <div class="flex flex-col">
            <span class="font-display text-[1.35rem] italic text-walnut">{{ manifesto.signature }}</span>
            <span class="text-micro uppercase tracking-widest2 text-taupe">{{ manifesto.role }}</span>
          </div>
        </div>
      </div>

      <!-- Right: stacked frames with parallax -->
      <div class="lg:col-span-5">
        <div class="relative">
          <ImageFrame
            :src="frames[0].src"
            :lqip="frames[0].lqip"
            :alt="frames[0].title"
            ratio="4 / 5"
            reveal="clip"
            class="w-[78%]"
          />
          <ImageFrame
            :src="frames[1].src"
            :lqip="frames[1].lqip"
            :alt="frames[1].title"
            ratio="3 / 4"
            reveal="clip"
            class="absolute -bottom-16 right-0 w-[52%] border-[6px] border-ivory shadow-[0_30px_70px_-40px_rgba(74,59,44,0.35)]"
          />

          <!-- Floating stat chip -->
          <div
            v-reveal="{ type: 'scale', delay: 0.3 }"
            class="js-reveal absolute -left-4 bottom-24 hidden bg-ivory/95 px-6 py-5 shadow-[0_24px_60px_-34px_rgba(74,59,44,0.4)] backdrop-blur-sm sm:block md:-left-10"
          >
            <span class="block font-display text-[2.2rem] leading-none text-walnut">{{ stats[0].value }}+</span>
            <span class="mt-1.5 block text-micro uppercase tracking-widest2 text-stone">
              {{ stats[0].label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
