<script setup>
/**
 * ImageRotator — quiet crossfade slideshow (default 3s) with a slow push-in.
 * Used for the home hero, the service plates and anywhere a still would go stale.
 */
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] }, // [{ image, label }] or ['/img.jpg']
  interval: { type: Number, default: 3000 },
  ratio: { type: String, default: 'ratio-4-3' },
  fill: { type: Boolean, default: false },
  scrim: { type: Boolean, default: false },
  caption: { type: Boolean, default: true },
  controls: { type: Boolean, default: true },
  rounded: { type: String, default: '' },
})

const emit = defineEmits(['change'])
const index = ref(0)
let timer = null

const slides = computed(() =>
  props.items.map((item) => (typeof item === 'string' ? { image: item, label: '' } : item)),
)

function go(i) {
  index.value = (i + slides.value.length) % slides.value.length
  emit('change', index.value)
}

function start() {
  if (props.items.length < 2) return
  stop()
  timer = window.setInterval(() => go(index.value + 1), props.interval)
}
function stop() {
  if (timer) window.clearInterval(timer)
  timer = null
}

onMounted(start)
onUnmounted(stop)
watch(() => props.items, () => {
  index.value = 0
  start()
})
</script>

<template>
  <div
    class="media group/rotator bg-mist"
    :class="[
      fill ? 'absolute inset-0 h-full w-full' : ratio,
      rounded,
      scrim ? 'grain' : '',
    ]"
    data-cursor="drag"
    @mouseenter="stop"
    @mouseleave="start"
  >
    <div
      v-for="(slide, i) in slides"
      :key="slide.image"
      class="absolute inset-0 transition-opacity duration-[1200ms] ease-premium"
      :class="i === index ? 'opacity-100' : 'opacity-0'"
    >
      <img
        :src="slide.image"
        :alt="slide.label || 'Vraj Interior project'"
        class="h-full w-full object-cover"
        :class="i === index ? 'animate-slow-zoom' : ''"
        loading="lazy"
        decoding="async"
      />
    </div>

    <!-- scrim for light-on-dark usage -->
    <div
      v-if="scrim"
      class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/80"
      aria-hidden="true"
    />

    <!-- caption + controls -->
    <template v-if="controls && slides.length > 1">
      <div
        v-if="caption"
        class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6"
      >
        <div class="flex items-center gap-3">
          <span class="h-1.5 w-1.5 rounded-full bg-gold" />
          <span class="text-[0.68rem] uppercase tracking-wider2 text-porcelain/85">
            {{ slides[index]?.label }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span class="numbered text-porcelain/60">
            {{ String(index + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}
          </span>
        </div>
      </div>

      <!-- ticker -->
      <div class="absolute inset-x-0 bottom-0 flex">
        <button
          v-for="(slide, i) in slides"
          :key="`t-${slide.image}`"
          class="group/tick relative h-[3px] flex-1 overflow-hidden bg-porcelain/15"
          :aria-label="`Go to image ${i + 1}`"
          @click="go(i)"
        >
          <span
            class="absolute inset-y-0 left-0 bg-gold transition-all duration-700 ease-premium"
            :class="i === index ? 'w-full' : 'w-0'"
          />
        </button>
      </div>
    </template>
  </div>
</template>
