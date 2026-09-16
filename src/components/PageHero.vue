<script setup>
/**
 * PageHero — the shared masthead for every inner page.
 * Keeps the rhythm identical across Services / About / Projects /
 * Contact so navigation feels like one continuous document.
 */
import RevealText from './ui/RevealText.vue'
import EyebrowLabel from './ui/EyebrowLabel.vue'

defineProps({
  eyebrow: { type: String, required: true },
  index: { type: String, default: '' },
  title: { type: String, required: true },
  lede: { type: String, default: '' },
  crumb: { type: String, required: true }
})
</script>

<template>
  <header class="relative overflow-hidden bg-ivory pb-16 pt-36 md:pb-20 md:pt-44 lg:pb-24 lg:pt-48">
    <!-- Soft horizon glow -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-sand/70 blur-3xl"
      aria-hidden="true"
    />

    <div class="shell relative">
      <!-- Breadcrumb -->
      <nav class="mb-12 flex items-center gap-3 text-micro uppercase tracking-widest2 text-taupe" aria-label="Breadcrumb">
        <RouterLink to="/" v-cursor="'link'" class="link-draw hover:text-brass-deep">Home</RouterLink>
        <span class="h-1 w-1 rounded-full bg-linen" />
        <span class="text-walnut">{{ crumb }}</span>
      </nav>

      <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-8">
          <EyebrowLabel :text="eyebrow" :index="index" />
          <RevealText tag="h1" class="mt-7 font-display text-display-md font-light text-walnut">
            {{ title }}
          </RevealText>
          <p
            v-if="lede"
            v-reveal="{ delay: 0.12 }"
            class="js-reveal mt-7 max-w-prose2 text-[1rem] leading-[1.9] text-stone"
          >
            {{ lede }}
          </p>
        </div>

        <div class="lg:col-span-4 lg:justify-self-end">
          <div v-reveal="{ delay: 0.2 }" class="js-reveal flex items-end gap-4">
            <span
              class="font-display text-[5rem] leading-[0.8] text-linen md:text-[6.5rem]"
              aria-hidden="true"
            >
              {{ index }}
            </span>
            <span class="mb-2 max-w-[9rem] text-micro uppercase leading-relaxed tracking-widest2 text-taupe">
              Vraj Interior<br />{{ 'Ahmedabad' }}
            </span>
          </div>
        </div>
      </div>

      <hr class="hairline mt-14" />
    </div>
  </header>
</template>
