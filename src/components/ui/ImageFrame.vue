<script setup>
/**
 * ImageFrame — every photo on the site passes through here.
 * Handles: inline blurred placeholder → sharp fade-in, clip-mask
 * scroll reveal, and an optional slow zoom on hover.
 */
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  lqip: { type: String, default: '' },
  alt: { type: String, default: '' },
  ratio: { type: [String, Number], default: '4 / 5' },
  reveal: { type: String, default: 'clip' }, // clip | clip-x | scale | none
  zoom: { type: Boolean, default: true },
  eager: { type: Boolean, default: false },
  sizes: { type: String, default: '' }
})

const loaded = ref(false)
const imgEl = ref(null)

onMounted(() => {
  if (imgEl.value && imgEl.value.complete) loaded.value = true
})

const ratioStyle =
  typeof props.ratio === 'number'
    ? { aspectRatio: String(props.ratio) }
    : { aspectRatio: props.ratio }
</script>

<template>
  <figure
    class="group/img relative overflow-hidden bg-sand"
    :style="ratioStyle"
    v-reveal="{ type: reveal }"
  >
    <!-- Blurred placeholder sits underneath, fades out on load -->
    <div
      v-if="lqip"
      class="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-silk"
      :style="{ backgroundImage: `url(${lqip})`, filter: 'blur(14px)', transform: 'scale(1.06)' }"
      :class="loaded ? 'opacity-0' : 'opacity-100'"
      aria-hidden="true"
    />

    <img
      ref="imgEl"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :decoding="eager ? 'sync' : 'async'"
      :sizes="sizes || undefined"
      class="h-full w-full object-cover transition-[transform,opacity,filter] duration-[1200ms] ease-silk"
      :class="[
        loaded ? 'opacity-100' : 'opacity-0',
        zoom ? 'group-hover/img:scale-[1.045]' : ''
      ]"
      @load="loaded = true"
    />

    <figcaption v-if="$slots.caption" class="pointer-events-none absolute inset-x-0 bottom-0 z-10">
      <slot name="caption" />
    </figcaption>

    <slot />
  </figure>
</template>
