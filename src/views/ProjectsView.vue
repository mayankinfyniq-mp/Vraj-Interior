<script setup>
/**
 * ProjectsView — the full archive.
 * 38 frames, filterable by category, each opening into a keyboard
 * navigable lightbox built on PrimeVue's Dialog.
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { projects, CATEGORIES, byCategory } from '@/data/gallery'

import PageHero from '@/components/PageHero.vue'
import ImageFrame from '@/components/ui/ImageFrame.vue'

import Dialog from 'primevue/dialog'

const active = ref('all')
const list = computed(() => byCategory(active.value))

const lightbox = ref(false)
const currentId = ref(null)
const currentIndex = computed(() => list.value.findIndex((p) => p.id === currentId.value))
const currentItem = computed(() => list.value[currentIndex.value] || null)

function open(item) {
  currentId.value = item.id
  lightbox.value = true
}
function step(delta) {
  if (!list.value.length) return
  const next = (currentIndex.value + delta + list.value.length) % list.value.length
  currentId.value = list.value[next].id
}
function onKey(e) {
  if (!lightbox.value) return
  if (e.key === 'Escape') lightbox.value = false
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}

/** Every 7th tile goes wide — a small rhythm break in the grid. */
function isWide(i) {
  return i % 7 === 3
}

const counts = computed(() => {
  const map = { all: projects.length }
  CATEGORIES.slice(1).forEach((c) => {
    map[c.key] = projects.filter((p) => p.category === c.key).length
  })
  return map
})

onMounted(() => {
  document.title = 'Projects — Vraj Interior'
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="bg-ivory">
    <PageHero
      eyebrow="Archive"
      index="04"
      crumb="Projects"
      title="Two hundred and forty rooms, one material language."
      lede="A working archive of homes, kitchens, workspaces and details delivered across Ahmedabad and Gujarat."
    />

    <section class="pb-24 pt-12 md:pb-32">
      <div class="shell">
        <!-- Filters -->
        <div class="flex flex-wrap items-center gap-3 border-b border-linen pb-8">
          <button
            v-for="c in CATEGORIES"
            :key="c.key"
            type="button"
            v-cursor="'link'"
            class="group relative overflow-hidden rounded-full border px-5 py-2.5 text-[0.72rem] uppercase tracking-widest2 transition-colors duration-500 ease-silk"
            :class="
              active === c.key
                ? 'border-walnut bg-walnut text-ivory'
                : 'border-linen text-stone hover:border-taupe hover:text-walnut'
            "
            :aria-pressed="active === c.key"
            @click="active = c.key"
          >
            <span class="relative z-10">{{ c.label }}</span>
            <span class="ml-2 text-[0.62rem] opacity-60">{{ counts[c.key] }}</span>
          </button>

          <span class="ml-auto hidden text-micro uppercase tracking-widest2 text-taupe md:block">
            {{ list.length }} {{ list.length === 1 ? 'frame' : 'frames' }}
          </span>
        </div>

        <!-- Grid -->
        <div class="mt-10 grid grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <button
            v-for="(p, i) in list"
            :key="p.id"
            type="button"
            v-cursor="{ variant: 'view', label: 'View' }"
            class="group block w-full text-left"
            :class="isWide(i) ? 'sm:col-span-2' : ''"
            @click="open(p)"
          >
            <ImageFrame
              :src="p.src"
              :lqip="p.lqip"
              :alt="`${p.title} — ${p.categoryLabel}`"
              :ratio="isWide(i) ? '16 / 10' : '4 / 5'"
              reveal="clip"
            >
              <template #caption>
                <div
                  class="flex translate-y-4 items-end justify-between gap-4 bg-gradient-to-t from-espresso/55 via-espresso/10 to-transparent px-5 pb-5 pt-20 opacity-0 transition-all duration-700 ease-silk group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <span>
                    <span class="block font-display text-[1.15rem] text-ivory">{{ p.title }}</span>
                    <span class="mt-0.5 block text-micro uppercase tracking-widest2 text-ivory/75">
                      {{ p.categoryLabel }}
                    </span>
                  </span>
                  <span class="text-micro uppercase tracking-widest2 text-ivory/70">{{ p.year }}</span>
                </div>
              </template>
            </ImageFrame>

            <!-- Always-visible meta on touch / small screens -->
            <div class="mt-3 flex items-baseline justify-between gap-3 md:hidden">
              <span class="font-display text-[1.05rem] text-walnut">{{ p.title }}</span>
              <span class="text-micro uppercase tracking-widest2 text-taupe">{{ p.year }}</span>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- ================= LIGHTBOX ================= -->
    <Dialog
      v-model:visible="lightbox"
      modal
      :dismissable-mask="true"
      :draggable="false"
      class="vj-dialog"
      :style="{ width: 'min(96vw, 1180px)' }"
      :pt="{ mask: { class: 'p-overlay-mask p-dialog-mask p-component-overlay p-dialog-mask' } }"
    >
      <template #header>
        <div class="flex w-full items-center justify-between gap-6">
          <div>
            <h2 class="font-display text-[1.35rem] font-light text-walnut">
              {{ currentItem?.title }}
            </h2>
            <p class="mt-0.5 text-micro uppercase tracking-widest2 text-taupe">
              {{ currentItem?.categoryLabel }} · {{ currentItem?.location }} · {{ currentItem?.year }}
            </p>
          </div>
          <span class="hidden shrink-0 text-micro tabular-nums tracking-widest2 text-taupe sm:block">
            {{ String(currentIndex + 1).padStart(2, '0') }} /
            {{ String(list.length).padStart(2, '0') }}
          </span>
        </div>
      </template>

      <div v-if="currentItem" class="relative bg-sand">
        <img
          :src="currentItem.src"
          :alt="currentItem.title"
          class="max-h-[74vh] w-full object-contain"
        />

        <!-- Prev -->
        <button
          type="button"
          aria-label="Previous project"
          v-cursor="'link'"
          class="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/85 text-walnut shadow-sm transition-all duration-500 hover:bg-brass hover:text-ivory md:left-5"
          @click="step(-1)"
        >
          <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M15 8H2M7 3L2 8l5 5" stroke="currentColor" stroke-width="1.2" />
          </svg>
        </button>

        <!-- Next -->
        <button
          type="button"
          aria-label="Next project"
          v-cursor="'link'"
          class="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/85 text-walnut shadow-sm transition-all duration-500 hover:bg-brass hover:text-ivory md:right-5"
          @click="step(1)"
        >
          <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.2" />
          </svg>
        </button>

        <p class="px-6 py-4 text-center text-[0.72rem] uppercase tracking-widest2 text-taupe sm:hidden">
          {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(list.length).padStart(2, '0') }}
        </p>
      </div>
    </Dialog>
  </div>
</template>
