<script setup>
/** CtaBand — emerald closing invitation used on every page above the footer. */
import RevealText from './RevealText.vue'

defineProps({
  eyebrow: { type: String, default: 'Next step' },
  title: { type: String, default: 'Let’s draw your home.' },
  note: { type: String, default: 'Tell us the rooms and the date. We will do the rest.' },
  primary: { type: String, default: 'Start a project' },
  secondary: { type: String, default: 'See projects' },
})
</script>

<template>
  <section class="relative overflow-hidden bg-ink py-20 md:py-28">
    <div
      class="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-emerald/25 blur-[110px]"
    />
    <div
      class="pointer-events-none absolute -bottom-32 left-1/4 h-[22rem] w-[22rem] rounded-full bg-gold/10 blur-[120px]"
    />

    <div class="shell relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
      <div class="max-w-2xl">
        <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
          <span class="h-1.5 w-1.5 animate-breathe rounded-full bg-gold" />
          <span class="eyebrow text-porcelain/55">{{ eyebrow }}</span>
        </div>
        <RevealText :text="title" tag="h2" class="display-xl mt-6 block !text-porcelain text-balance" />
        <p v-reveal="{ y: 18, delay: 0.15 }" class="lede mt-6 !text-porcelain/65">{{ note }}</p>
      </div>

      <div class="flex flex-wrap items-center gap-4" v-reveal="{ y: 20, delay: 0.2 }">
        <RouterLink to="/contact" class="btn btn-gold" data-cursor="link">
          <span>{{ primary }}</span>
          <i class="pi pi-arrow-right btn-arrow text-[0.75rem]" />
        </RouterLink>
        <RouterLink to="/projects" class="btn btn-ghost-light" data-cursor="link">
          <span>{{ secondary }}</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
