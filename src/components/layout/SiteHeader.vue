<script setup>
/**
 * SiteHeader — floating island navigation.
 * Uses a solid porcelain background so the logo and navigation
 * remain clearly visible over every hero image.
 */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { nav } from '@/data/site'
import { appState } from '@/composables/useAppState'

const route = useRoute()
const scrolled = ref(false)
const hidden = ref(false)
const open = computed(() => appState.menuOpen)

let lastY = 0

function onScroll() {
  const y = window.scrollY

  scrolled.value = y > 40
  hidden.value = !open.value && y > 620 && y > lastY

  lastY = y
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const isActive = (to) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-[70] transition-transform duration-700 ease-premium"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <!-- NAVBAR -->
    <div
      class="border-b border-ink/[0.08] bg-porcelain shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-700 ease-premium"
      :class="scrolled ? 'py-2.5' : 'py-4 md:py-5'"
    >
      <div class="shell flex items-center justify-between gap-6">

<RouterLink
  to="/"
  class="group flex items-center gap-2.5"
  data-cursor="link"
  aria-label="Vraj Interior — home"
>
  <img
    src="/images/logo.png"
    alt="Vraj Interior"
    class="block h-8 w-auto max-w-[90px] object-contain object-left transition-transform duration-500 group-hover:scale-[1.03] sm:h-9 sm:max-w-[100px]"
  />
<!-- 
  <span
    class="wordmark text-[1rem] leading-none text-ink sm:text-[1.08rem]"
  >
    Vraj Interior
  </span> -->
</RouterLink>
        <nav class="hidden items-center gap-9 lg:flex">
          <RouterLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="group relative flex items-baseline gap-2"
            data-cursor="link"
          >
            <span
              class="roll text-[0.78rem] uppercase tracking-wider2 text-ink transition-colors duration-700"
            >
              <span>{{ item.label }}</span>

              <span aria-hidden="true">
                {{ item.label }}
              </span>
            </span>

            <!-- Active gold rail -->
            <span
              class="absolute -bottom-1.5 left-6 h-px w-[calc(100%-1.5rem)] origin-left bg-gold transition-transform duration-700 ease-premium"
              :class="
                isActive(item.to)
                  ? 'scale-x-100'
                  : 'scale-x-0'
              "
            />
          </RouterLink>
        </nav>

        <!-- =====================================================
             ACTIONS
        ====================================================== -->
        <div class="flex items-center gap-3 sm:gap-4">

          <!-- ENQUIRE -->
          <RouterLink
            to="/contact"
            class="btn hidden !px-6 !py-3 sm:inline-flex btn-gold"
            data-cursor="link"
          >
            <span>Enquire</span>
          </RouterLink>

          <!-- MOBILE MENU -->
          <button
            class="group flex items-center gap-2.5 lg:hidden"
            :aria-expanded="open"
            aria-label="Open menu"
            data-cursor="link"
            @click="appState.menuOpen = true"
          >
            <span
              class="numbered hidden text-ink transition-colors duration-700 sm:inline"
            >
              Menu
            </span>

            <span
              class="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-gold"
            >
              <span
                class="block h-px w-3.5 bg-ink transition-all duration-500 group-hover:w-4"
              />

              <span
                class="block h-px w-4 bg-ink transition-all duration-500 group-hover:w-3"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>