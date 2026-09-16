<script setup>
/**
 * CtaBand — a full-bleed image band with a warm scrim and a single
 * centred invitation. The image parallaxes gently behind the type.
 */
import { projects } from '@/data/gallery'
import RevealText from '@/components/ui/RevealText.vue'
import MagneticButton from '@/components/ui/MagneticButton.vue'

const frame = projects[8]
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <div class="absolute inset-0 -z-10">
      <img
        :src="frame.src"
        :alt="frame.title"
        loading="lazy"
        class="h-full w-full scale-110 object-cover"
        v-parallax="{ speed: 0.06 }"
      />
      <div class="absolute inset-0 bg-espresso/45" />
      <div class="absolute inset-0 bg-gradient-to-r from-espresso/30 via-transparent to-espresso/30" />
    </div>

    <div class="shell relative flex flex-col items-center py-28 text-center md:py-36">
      <span class="eyebrow-rule eyebrow text-brass-soft">Ready when you are</span>

      <RevealText
        tag="h2"
        class="mt-8 max-w-3xl font-display text-display-md font-light text-ivory"
      >
        Tell us about the space. We'll tell you what it could become.
      </RevealText>

      <p
        v-reveal="{ delay: 0.1 }"
        class="js-reveal mt-7 max-w-md text-[0.95rem] leading-[1.9] text-ivory/80"
      >
        Send us a floor plan or a few photographs. You will hear back from a
        designer — not a sales desk — within one working day.
      </p>

      <div v-reveal="{ delay: 0.18 }" class="js-reveal mt-11">
        <MagneticButton to="/contact" label="Start a conversation" variant="brass" />
      </div>
    </div>
  </section>
</template>
