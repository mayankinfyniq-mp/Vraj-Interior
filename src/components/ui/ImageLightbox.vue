<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  meta: {
    type: String,
    default: '',
  },
  images: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const currentIndex = defineModel('currentIndex', {
  default: 0,
})

const currentImage = computed(() => {
  return props.images[currentIndex.value] || props.images[0] || ''
})

function close() {
  emit('update:modelValue', false)
}

function next() {
  if (!props.images.length) return

  currentIndex.value =
    (currentIndex.value + 1) % props.images.length
}

function previous() {
  if (!props.images.length) return

  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) %
    props.images.length
}

function selectImage(index) {
  currentIndex.value = index
}

function handleKeydown(event) {
  if (!props.modelValue) return

  if (event.key === 'Escape') {
    close()
  }

  if (event.key === 'ArrowRight') {
    next()
  }

  if (event.key === 'ArrowLeft') {
    previous()
  }
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      currentIndex.value = 0
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

watch(
  () => props.images,
  () => {
    currentIndex.value = 0
  },
)

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-250"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-ink/45 p-4 backdrop-blur-sm sm:p-6 md:p-8"
        @click.self="close"
      >
        <div
          class="relative flex h-[92svh] w-full max-w-[1400px] flex-col overflow-hidden rounded-[6px] bg-[#06382F] shadow-[0_30px_100px_rgba(0,0,0,0.28)]"
        >
          <div
            class="flex shrink-0 items-center justify-between gap-6 px-6 py-5 sm:px-7 sm:py-6 md:px-8"
          >
            <div class="flex min-w-0 items-center gap-5">
              <h2
                class="truncate font-display text-[1.35rem] leading-none text-porcelain sm:text-[1.55rem] md:text-[1.7rem]"
              >
                {{ title }}
              </h2>

              <span
                v-if="meta"
                class="hidden text-[0.65rem] uppercase tracking-[0.2em] text-porcelain/50 sm:block"
              >
                {{ meta }}
              </span>
            </div>

            <button
              type="button"
              aria-label="Close"
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-porcelain/25 text-porcelain transition-all duration-300 hover:border-porcelain/60 hover:bg-porcelain/10"
              @click="close"
            >
              <i class="pi pi-times text-[1rem]" />
            </button>
          </div>

          <div
            class="relative flex min-h-0 flex-1 items-center justify-center px-16 pb-5 sm:px-20 md:px-24"
          >
            <button
              v-if="images.length > 1"
              type="button"
              aria-label="Previous image"
              class="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/25 text-ink/80 backdrop-blur-sm transition-all duration-300 hover:bg-ink/40 sm:left-8 md:left-9"
              @click="previous"
            >
              <i class="pi pi-chevron-left text-[1rem]" />
            </button>

            <div
              class="flex h-full w-full items-center justify-center overflow-hidden"
            >
              <Transition
                mode="out-in"
                enter-active-class="transition-all duration-300"
                enter-from-class="scale-[0.98] opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition-all duration-200"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-[0.98] opacity-0"
              >
                <img
                  v-if="currentImage"
                  :key="currentImage"
                  :src="currentImage"
                  :alt="title"
                  class="max-h-full max-w-full object-contain"
                />
              </Transition>
            </div>

            <button
              v-if="images.length > 1"
              type="button"
              aria-label="Next image"
              class="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/25 text-ink/80 backdrop-blur-sm transition-all duration-300 hover:bg-ink/40 sm:right-8 md:right-9"
              @click="next"
            >
              <i class="pi pi-chevron-right text-[1rem]" />
            </button>
          </div>

          <div
            v-if="images.length > 1"
            class="shrink-0 bg-white px-6 py-4 sm:px-8 sm:py-5"
          >
            <div
              class="flex items-center gap-6 overflow-x-auto"
            >
              <button
                type="button"
                aria-label="Previous image"
                class="flex h-10 w-10 shrink-0 items-center justify-center text-stone transition-colors hover:text-ink"
                @click="previous"
              >
                <i class="pi pi-chevron-left text-[0.9rem]" />
              </button>

              <div
                class="flex min-w-0 flex-1 items-center justify-between gap-5"
              >
                <button
                  v-for="(image, index) in images"
                  :key="image + index"
                  type="button"
                  :aria-label="`View image ${index + 1}`"
                  class="group relative h-20 w-16 shrink-0 overflow-hidden transition-all duration-300 sm:h-20 sm:w-[58px] md:h-20 md:w-[60px]"
                  :class="
                    currentIndex === index
                      ? 'opacity-100'
                      : 'opacity-55 hover:opacity-100'
                  "
                  @click="selectImage(index)"
                >
                  <img
                    :src="image"
                    :alt="`${title} ${index + 1}`"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span
                    v-if="currentIndex === index"
                    class="absolute inset-0 border-2 border-gold"
                  />
                </button>
              </div>

              <button
                type="button"
                aria-label="Next image"
                class="flex h-10 w-10 shrink-0 items-center justify-center text-stone transition-colors hover:text-ink"
                @click="next"
              >
                <i class="pi pi-chevron-right text-[0.9rem]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>