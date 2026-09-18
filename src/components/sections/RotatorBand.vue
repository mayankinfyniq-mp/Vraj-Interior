<script setup>
/** RotatorBand — full-width frame that moves on every three seconds. */
import { rotatorBand } from '@/data/site'
import ImageRotator from '@/components/ui/ImageRotator.vue'
import RevealText from '@/components/ui/RevealText.vue'

const items = rotatorBand
</script>

<template>
  <section class="section bg-porcelain pb-0 md:pb-0">
    <div class="shell flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between">
      <RevealText text="A walk through recent homes." tag="h2" class="display-lg block max-w-[16ch]" />
      <p class="text-[0.72rem] uppercase tracking-wider2 text-stone">
        Kitchen · Hall · Suite · Study
      </p>
    </div>

    <div class="px-0">
      <ImageRotator :items="items" ratio="ratio-21-9" :interval="3000" class="grain" />
    </div>
  </section>
</template>
