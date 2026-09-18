<script setup>
/**
 * SiteLayout — the shell every page shares:
 * progress rule, header, mobile menu, routed page (with transition) and footer.
 * Also owns the single smooth-scroll instance.
 */
import { onMounted, onUnmounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'
import MenuOverlay from './MenuOverlay.vue'
import ScrollProgress from './ScrollProgress.vue'
import { destroySmoothScroll, initSmoothScroll, scrollToTop } from '@/composables/useSmoothScroll'

let onLoad = null

onMounted(() => {
  initSmoothScroll()
  onLoad = () => ScrollTrigger.refresh()
  window.addEventListener('load', onLoad)
})

onUnmounted(() => {
  window.removeEventListener('load', onLoad)
  destroySmoothScroll()
})
</script>

<template>
  <div id="top" class="relative min-h-screen">
    <ScrollProgress />
    <SiteHeader />
    <MenuOverlay />

    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <SiteFooter @to-top="scrollToTop(false)" />
  </div>
</template>
