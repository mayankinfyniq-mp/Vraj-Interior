<script setup>
import { stats, marqueeWords } from '@/data/content'
import StatCounter from '@/components/ui/StatCounter.vue'
import MarqueeBand from '@/components/ui/MarqueeBand.vue'
</script>

<template>
  <section class="relative bg-sand">
    <MarqueeBand :words="marqueeWords" :duration="42" tone="sand" />

    <div class="shell grid grid-cols-2 gap-y-14 py-20 md:py-24 lg:grid-cols-4 lg:py-28">
      <div
        v-for="(s, i) in stats"
        :key="s.label"
        v-reveal="{ delay: i * 0.08 }"
        class="js-reveal px-2 md:px-6 lg:border-l lg:first:border-l-0 lg:border-linen"
      >
        <StatCounter :value="s.value" :suffix="s.suffix" :label="s.label" />
      </div>
    </div>

    <MarqueeBand :words="marqueeWords" :duration="52" tone="sand" />
  </section>
</template>
