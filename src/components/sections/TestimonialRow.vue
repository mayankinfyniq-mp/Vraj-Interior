<script setup>
import { testimonials } from '@/data/site'
</script>

<template>
  <section class="section overflow-hidden bg-mist/60">
    <div class="shell">
      <div
        class="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between"
      >

        <p
          class="max-w-xs text-[0.62rem] uppercase leading-[1.6] tracking-[0.18em] text-stone/60 sm:text-[0.68rem]"
        >
          Spaces shaped around the people who live in them.
        </p>
      </div>

      <div
        class="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3 md:gap-6 lg:mt-16"
      >
        <blockquote
          v-for="(t, i) in testimonials"
          :key="t.name"
          v-reveal="{ y: 26, delay: i * 0.08 }"
          class="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[4px] border border-ink/10 bg-white p-6 text-ink transition-all duration-500 hover:-translate-y-1 hover:border-emerald hover:bg-emerald hover:text-porcelain hover:shadow-[0_20px_50px_rgba(20,30,25,0.12)] sm:min-h-[310px] sm:p-7 lg:p-8"
        >
          <div>
            <div
              class="flex items-start justify-between"
            >
              <span
                class="font-display text-[4rem] leading-[0.7] text-gold-deep/35 transition-colors duration-500 group-hover:text-gold-light/80"
              >
                “
              </span>

              <span
                class="text-[0.55rem] uppercase tracking-[0.2em] text-stone/45 transition-colors duration-500 group-hover:text-porcelain/45"
              >
                0{{ i + 1 }}
              </span>
            </div>

            <p
              class="mt-7 font-display text-[1.25rem] leading-[1.35] tracking-[-0.015em] text-ink transition-colors duration-500 group-hover:text-porcelain sm:text-[1.35rem]"
            >
              {{ t.quote }}
            </p>
          </div>

          <footer
            class="mt-8 border-t border-ink/10 pt-5 transition-colors duration-500 group-hover:border-porcelain/15"
          >
            <div class="flex items-center gap-3">
              <span
                class="h-px w-7 bg-gold transition-colors duration-500 group-hover:bg-gold-light"
              />

              <span
                class="text-[0.72rem] font-medium text-ink/80 transition-colors duration-500 group-hover:text-porcelain/90"
              >
                {{ t.name }}
              </span>
            </div>

            <span
              class="mt-2 block pl-10 text-[0.58rem] uppercase tracking-[0.15em] text-stone/60 transition-colors duration-500 group-hover:text-porcelain/45"
            >
              {{ t.meta }}
            </span>
          </footer>

          <span
            class="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full border border-gold/10 transition-all duration-700 group-hover:scale-125 group-hover:border-gold-light/15"
          />
        </blockquote>
      </div>
    </div>
  </section>
</template>