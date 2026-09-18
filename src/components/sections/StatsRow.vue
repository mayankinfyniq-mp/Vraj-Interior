<script setup>
import { stats } from '@/data/site'
import CountUp from '@/components/ui/CountUp.vue'
</script>

<template>
  <section class="border-y border-ink/10 bg-white">
    <div class="shell grid grid-cols-2 gap-y-10 py-12 md:grid-cols-4 md:py-16">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        v-reveal="{ y: 24, delay: i * 0.06 }"
        class="flex flex-col gap-2 border-ink/10 px-1 md:px-6"
        :class="i !== 0 ? 'md:border-l' : ''"
      >
        <span class="font-display text-[2rem] leading-none text-ink md:text-[2.6rem]">
          <CountUp :value="stat.value" :suffix="stat.suffix" />
        </span>
        <span class="text-[0.72rem] uppercase tracking-wider2 text-stone">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>
