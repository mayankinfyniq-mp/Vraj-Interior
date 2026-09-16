<script setup>
/**
 * App.vue — the shell that wraps every route.
 * Owns the preloader, cursor, scroll rail, nav, footer and the
 * page transition. Also keeps ScrollTrigger honest after each
 * navigation (new content = new measurements).
 */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ScrollTrigger } from '@/plugins/gsap'
import { initSmoothScroll, destroySmoothScroll, unlockScroll } from '@/composables/useSmoothScroll'
import { markReady } from '@/composables/useAppReady'

import Preloader from '@/components/Preloader.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import ScrollProgress from '@/components/ScrollProgress.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Toast from 'primevue/toast'

const route = useRoute()
const ready = ref(false) // true once the preloader has lifted
const showPreloader = ref(true)

function onPreloaderDone() {
  ready.value = true
  markReady()
  setTimeout(() => {
    showPreloader.value = false
    ScrollTrigger.refresh()
  }, 60)
}

// Safety net: never trap the user behind the preloader
const failsafe = setTimeout(() => {
  if (!ready.value) {
    ready.value = true
    markReady()
    showPreloader.value = false
    unlockScroll()
  }
}, 6500)

function refreshTriggers() {
  // Layout settles over two frames after a route swap
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  )
}

watch(
  () => route.fullPath,
  () => {
    refreshTriggers()
    // Images inside the new page change document height as they load
    setTimeout(refreshTriggers, 700)
  }
)

onMounted(() => {
  initSmoothScroll()
  window.addEventListener('load', refreshTriggers)
})

onBeforeUnmount(() => {
  clearTimeout(failsafe)
  window.removeEventListener('load', refreshTriggers)
  destroySmoothScroll()
})
</script>

<template>
  <Toast position="bottom-right" class="vj-toast" />

  <Transition name="preloader">
    <Preloader v-if="showPreloader" @done="onPreloaderDone" />
  </Transition>

  <CustomCursor />
  <ScrollProgress />
  <Navbar />

  <main
    id="main"
    class="relative min-h-screen"
    :class="ready ? 'opacity-100' : 'opacity-0'"
    style="transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)"
  >
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>

  <Footer />
</template>

<style>
.preloader-leave-active {
  transition: opacity 0.4s ease;
}
.preloader-leave-to {
  opacity: 0;
}
</style>
