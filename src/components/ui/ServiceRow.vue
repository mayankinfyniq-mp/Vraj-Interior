<script setup>
/**
 * ServiceRow — one line of the services index.
 * Hovering a row drives the sticky preview beside it.
 */
defineProps({
  service: { type: Object, required: true },
  active: { type: Boolean, default: false },
})
const emit = defineEmits(['hover', 'open'])
</script>

<template>
  <div
    class="group border-t border-ink/10 py-7 transition-colors duration-500 md:py-9"
    :class="active ? 'bg-mist/60' : 'bg-transparent'"
    data-cursor="link"
    @mouseenter="emit('hover', service.id)"
    @click="emit('open', service)"
  >
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
      <span class="numbered w-10 shrink-0" :class="active ? 'text-gold-deep' : 'text-stone/60'">
        {{ service.index }}
      </span>

      <div class="flex flex-1 flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-8">
        <h3
          class="display-md transition-transform duration-700 ease-premium md:group-hover:translate-x-2"
          :class="active ? 'text-emerald' : 'text-ink'"
        >
          {{ service.title }}
        </h3>
        <p class="text-[0.78rem] uppercase tracking-wider2 text-stone md:text-right">
          {{ service.kicker }}
        </p>
      </div>

      <i
        class="pi pi-arrow-right hidden shrink-0 text-[0.9rem] transition-all duration-500 md:block"
        :class="active ? 'translate-x-1 text-gold-deep' : 'text-stone/50'"
      />
    </div>

    <div
      class="grid overflow-hidden transition-all duration-700 ease-premium"
      :class="active ? 'mt-5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="min-h-0">
        <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:pl-[3.5rem]">
          <p class="lede !max-w-[46ch]">{{ service.blurb }}</p>
          <ul class="flex flex-wrap gap-2.5">
            <li v-for="p in service.points" :key="p" class="chip">{{ p }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
