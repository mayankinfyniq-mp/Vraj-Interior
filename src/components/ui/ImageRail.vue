<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const section = ref(null)
const visibleCards = ref(new Set())
let observer = null

function isVisible(index) {
  return visibleCards.value.has(index)
}

function revealCard(index) {
  visibleCards.value = new Set([
    ...visibleCards.value,
    index,
  ])
}

onMounted(() => {
  if (!section.value) return

  const cards = section.value.querySelectorAll(
    '[data-project-card]',
  )

  if (!cards.length) return

  const reduce = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (reduce) {
    cards.forEach((_, index) => {
      revealCard(index)
    })
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const index = Number(
          entry.target.getAttribute('data-index'),
        )

        revealCard(index)
        observer?.unobserve(entry.target)
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    },
  )

  cards.forEach((card) => {
    observer.observe(card)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="section"
    class="relative overflow-hidden bg-porcelain"
  >
    <div
      class="shell pb-16 pt-14 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20"
    >
      <div
        class="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between"
      >
        <slot name="header" />

        <span
          class="hidden items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-stone/65 md:flex"
        >
          <span class="h-px w-7 bg-gold/60" />
          Explore spaces
        </span>
      </div>

      <div
        v-if="items.length"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <article
          v-for="(item, i) in items"
          :key="item.image + i"
          :data-index="i"
          data-project-card
          class="group overflow-hidden rounded-[4px] border border-ink/10 bg-white transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,30,25,0.08)]"
          :class="
            isVisible(i)
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          "
          data-cursor="view"
          data-cursor-label="View"
        >
          <div
            class="relative h-[155px] overflow-hidden sm:h-[170px] lg:h-[150px] xl:h-[160px]"
          >
            <img
              :src="item.image"
              :alt="item.label || 'Vraj Interior'"
              class="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
              loading="lazy"
            />

            <div
              class="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
            />

            <span
              class="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/10 text-[0.52rem] text-white/80 backdrop-blur-sm"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>

          <div
            class="flex min-h-[82px] items-center justify-between gap-3 px-4 py-4 sm:px-5"
          >
            <div class="min-w-0">
              <h3
                class="truncate text-[0.92rem] font-medium tracking-[-0.015em] text-emerald sm:text-[0.98rem]"
              >
                {{ item.label || 'Interior Space' }}
              </h3>

              <p
                v-if="item.meta"
                class="mt-1 truncate text-[0.56rem] uppercase tracking-[0.15em] text-stone/60"
              >
                {{ item.meta }}
              </p>
            </div>

            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink/40 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-white"
            >
              <i
                class="pi pi-arrow-up-right text-[0.62rem]"
              />
            </span>
          </div>
        </article>
      </div>

      <div
        v-else
        class="border-y border-ink/10 py-12 text-center"
      >
        <p
          class="text-[0.7rem] uppercase tracking-[0.2em] text-stone/60"
        >
          Spaces coming soon
        </p>
      </div>
    </div>
  </section>
</template>