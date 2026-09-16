<script setup>
/** Hairline scroll indicator pinned to the very top of the viewport. */
import { ref, onMounted, onBeforeUnmount } from 'vue'

const scale = ref(0)
function update() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  scale.value = h > 0 ? Math.min(1, window.scrollY / h) : 0
}
onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[2px]">
    <div
      class="h-full origin-left bg-brass transition-[transform] duration-150 ease-out"
      :style="{ transform: `scaleX(${scale})` }"
    />
  </div>
</template>
