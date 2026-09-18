<script setup>
import { ref } from 'vue'

defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
  tall: { type: Boolean, default: false },
})
const emit = defineEmits(['open'])
const hovered = ref(false)
</script>

<template>
  <article
    class="group relative"
    data-cursor="view"
    data-cursor-label="Open"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="emit('open', project)"
  >
    <div class="media overflow-hidden rounded-[3px]" :class="tall ? 'ratio-3-4' : 'ratio-4-3'">
      <img
        :src="project.cover"
        :alt="project.title"
        class="h-full w-full object-cover transition-transform duration-[1400ms] ease-premium"
        :class="hovered ? 'scale-[1.05]' : 'scale-100'"
        loading="lazy"
        decoding="async"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent opacity-0 transition-opacity duration-700"
        :class="hovered ? 'opacity-100' : ''"
      />
      <span class="absolute left-5 top-5 numbered text-porcelain/80">
        {{ String(index + 1).padStart(2, '0') }}
      </span>
      <span
        class="absolute right-5 top-5 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-porcelain/95 text-ink opacity-0 transition-all duration-700 ease-premium"
        :class="hovered ? 'translate-y-0 opacity-100' : ''"
      >
        <i class="pi pi-arrow-up-right text-[0.8rem]" />
      </span>
    </div>

    <div class="mt-5 flex items-start justify-between gap-6">
      <div>
        <h3 class="display-sm">{{ project.title }}</h3>
        <p class="mt-1.5 text-[0.78rem] uppercase tracking-wider2 text-stone">{{ project.meta }}</p>
      </div>
      <span class="chip mt-1 hidden shrink-0 sm:inline-flex">{{ project.category }}</span>
    </div>
  </article>
</template>
