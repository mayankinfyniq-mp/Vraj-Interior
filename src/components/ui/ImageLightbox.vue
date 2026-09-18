<script setup>
/** ImageLightbox — PrimeVue dialog + galleria viewer for project sets. */
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import Galleria from 'primevue/galleria'

const props = defineProps({
  images: { type: Array, default: () => [] },
  title: { type: String, default: '' },
  meta: { type: String, default: '' },
})
const visible = defineModel({ type: Boolean, default: false })

const gallery = computed(() =>
  props.images.map((src, i) => ({ itemImageSrc: src, thumbnailImageSrc: src, alt: `${props.title} ${i + 1}` })),
)
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    dismissableMask
    :showHeader="false"
    :draggable="false"
    class="w-[94vw] max-w-6xl !bg-transparent !shadow-none"
    :pt="{ content: { class: '!p-0 !bg-transparent' } }"
  >
    <div class="relative overflow-hidden rounded-[6px] bg-ink/95 p-3 backdrop-blur-md md:p-5">
      <button
        class="absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full border border-porcelain/25 text-porcelain transition-colors hover:border-gold hover:text-gold"
        aria-label="Close gallery"
        @click="visible = false"
      >
        <i class="pi pi-times text-[0.8rem]" />
      </button>

      <div class="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 pr-14">
        <h3 class="display-sm !text-porcelain">{{ title }}</h3>
        <span class="text-[0.72rem] uppercase tracking-wider2 text-porcelain/50">{{ meta }}</span>
      </div>

      <Galleria
        :value="gallery"
        :numVisible="5"
        :circular="true"
        :showItemNavigators="true"
        :showThumbnails="gallery.length > 1"
        container-class="max-w-full"
        class="vraj-galleria"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.item.itemImageSrc"
            :alt="slotProps.item.alt"
            class="max-h-[68vh] w-full object-contain"
          />
        </template>
        <template #thumbnail="slotProps">
          <img
            :src="slotProps.item.thumbnailImageSrc"
            :alt="slotProps.item.alt"
            class="h-14 w-full cursor-pointer object-cover md:h-16"
          />
        </template>
      </Galleria>
    </div>
  </Dialog>
</template>
