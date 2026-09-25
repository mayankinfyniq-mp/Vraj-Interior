<script setup>
import { ref } from 'vue'

defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
  tall: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['open'])
const hovered = ref(false)
</script>

<template>
  <article
    class="group w-full cursor-pointer"
    data-cursor="view"
    data-cursor-label="Open"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="emit('open', project)"
  >
    <div
      class="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-ink/5"
    >
      <img
        :src="project.cover"
        :alt="project.title"
        class="h-full w-full object-cover transition-transform duration-[1200ms] ease-out"
        :class="hovered ? 'scale-[1.04]' : 'scale-100'"
        loading="lazy"
        decoding="async"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
      />

      <span
        class="absolute left-4 top-4 text-[0.58rem] uppercase tracking-[0.16em] text-white/80"
      >
        {{ String(index + 1).padStart(2, '0') }}
      </span>

      <span
        class="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-porcelain text-ink transition-all duration-500"
        :class="
          hovered
            ? 'translate-y-0 opacity-100'
            : 'translate-y-2 opacity-0'
        "
      >
        <i class="pi pi-arrow-up-right text-[0.68rem]" />
      </span>
    </div>

    <div
      class="mt-4 flex items-center justify-between gap-4 sm:mt-5"
    >
      <div class="min-w-0">
        <h3
          class="truncate text-[1.05rem] font-medium leading-tight tracking-[-0.02em] text-emerald sm:text-[1.15rem]"
        >
          {{ project.title }}
        </h3>

        <p
          v-if="project.meta"
          class="mt-1 truncate text-[0.58rem] uppercase tracking-[0.15em] text-stone/70 sm:text-[0.62rem]"
        >
          {{ project.meta }}
        </p>
      </div>

      <span
        class="hidden shrink-0 text-[0.55rem] uppercase tracking-[0.15em] text-stone/60 sm:block"
      >
        {{ project.category }}
      </span>
    </div>

    <div class="mt-4 h-px w-full bg-ink/10 sm:mt-5">
      <div
        class="h-full origin-left bg-gold transition-transform duration-500"
        :class="hovered ? 'scale-x-100' : 'scale-x-0'"
      />
    </div>
  </article>
</template>