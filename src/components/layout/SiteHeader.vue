<script setup>
/**
 * SiteHeader — floating "island" bar.
 * At the top of a page it is transparent and light-on-dark; once you scroll it
 * contracts into a porcelain bar and the type flips to ink. The centre nav uses
 * a rolling-text hover and a gold rail marks the active route.
 */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { nav, site } from '@/data/site'
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
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-[70] transition-transform duration-700 ease-premium"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <div
      class="transition-all duration-700 ease-premium"
      :class="
        scrolled
          ? 'bg-porcelain/90 backdrop-blur-xl border-b border-ink/[0.07] py-2.5'
          : 'bg-transparent py-5 md:py-7'
      "
    >
      <div class="shell flex items-center justify-between gap-6">
        <!-- brand -->
        <RouterLink
          to="/"
          class="group flex items-center gap-3"
          data-cursor="link"
          aria-label="Vraj Interior — home"
        >
          <span
            class="relative grid h-10 w-10 place-items-center rounded-full border transition-colors duration-700"
            :class="scrolled ? 'border-ink/15' : 'border-porcelain/30'"
          >
            <span
              class="font-display text-[0.95rem] leading-none transition-colors duration-700"
              :class="scrolled ? 'text-ink' : 'text-porcelain'"
              >{{ site.monogram }}</span
            >
            <span
              class="absolute inset-[3px] rounded-full border border-gold/0 transition-all duration-700 group-hover:border-gold/70"
            />
          </span>
          <span class="flex flex-col leading-none">
            <span
              class="wordmark text-[1.02rem] transition-colors duration-700 sm:text-[1.12rem]"
              :class="scrolled ? 'text-ink' : 'text-porcelain'"
              >Vraj Interior</span
            >
            <span
              class="mt-1 hidden text-[0.56rem] uppercase tracking-label transition-colors duration-700 sm:block"
              :class="scrolled ? 'text-stone' : 'text-porcelain/60'"
              >Interior Design Studio</span
            >
          </span>
        </RouterLink>

        <!-- desktop nav -->
        <nav class="hidden lg:flex items-center gap-9">
          <RouterLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="group relative flex items-baseline gap-2"
            data-cursor="link"
          >
            <span
              class="roll text-[0.78rem] uppercase tracking-wider2 transition-colors duration-700"
              :class="scrolled ? 'text-ink' : 'text-porcelain'"
            >
              <span>{{ item.label }}</span>
              <span aria-hidden="true">{{ item.label }}</span>
            </span>
            <span
              class="absolute -bottom-1.5 left-6 h-px w-[calc(100%-1.5rem)] origin-left bg-gold transition-transform duration-700 ease-premium"
              :class="isActive(item.to) ? 'scale-x-100' : 'scale-x-0'"
            />
          </RouterLink>
        </nav>

        <!-- actions -->
        <div class="flex items-center gap-3 sm:gap-4">

          <RouterLink
            to="/contact"
            class="btn hidden !px-6 !py-3 sm:inline-flex"
            :class="scrolled ? 'btn-ink' : 'btn-gold'"
            data-cursor="link"
          >
            <span>Enquire</span>
          </RouterLink>

          <button
            class="group flex items-center gap-2.5 lg:hidden"
            :aria-expanded="open"
            aria-label="Open menu"
            data-cursor="link"
            @click="appState.menuOpen = true"
          >
            <span
              class="numbered hidden sm:inline transition-colors duration-700"
              :class="scrolled ? 'text-ink' : 'text-porcelain'"
              >Menu</span
            >
            <span class="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border"
              :class="scrolled ? 'border-ink/15' : 'border-porcelain/30'">
              <span
                class="block h-px w-3.5 transition-all duration-500 group-hover:w-4"
                :class="scrolled ? 'bg-ink' : 'bg-porcelain'"
              />
              <span
                class="block h-px w-4 transition-all duration-500 group-hover:w-3"
                :class="scrolled ? 'bg-ink' : 'bg-porcelain'"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
