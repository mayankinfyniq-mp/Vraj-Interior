<script setup>
import { testimonials } from '@/data/site'
</script>

<template>
  <section class="section bg-mist/60">
    <div class="shell">
      <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
        <span class="numbered text-gold-deep">04</span>
        <span class="h-px w-10 bg-ink/20" />
        <span class="eyebrow text-stone">Clients</span>
      </div>

      <div class="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        <blockquote
          v-for="(t, i) in testimonials"
          :key="t.name"
          v-reveal="{ y: 26, delay: i * 0.08 }"
          class="flex flex-col justify-between border-t border-ink/15 pt-7"
        >
          <p class="font-display text-[1.3rem] leading-snug text-ink">“{{ t.quote }}”</p>
          <footer class="mt-6 flex items-center gap-3">
            <span class="h-px w-6 bg-gold" />
            <span class="text-[0.78rem] text-stone">{{ t.name }} — {{ t.meta }}</span>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>
