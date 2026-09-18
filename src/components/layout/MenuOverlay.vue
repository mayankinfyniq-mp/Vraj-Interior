<script setup>
/**
 * MenuOverlay — full-bleed emerald panel for mobile navigation.
 * Links stagger in, a preview image follows the hovered row, and the
 * studio details sit pinned to the bottom.
 */
import { computed, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import { faqs, nav, site } from '@/data/site'
import { appState } from '@/composables/useAppState'
import { lockScroll } from '@/composables/useSmoothScroll'

const route = useRoute()
const panel = ref(null)
const preview = ref(null)
const hovered = ref(0)

const previews = [
  '/images/living-01.jpg',
  '/images/kitchen-01.jpg',
  '/images/suite-green-01.jpg',
  '/images/dining-01.jpg',
  '/images/pooja-02.jpg',
]

const open = computed(() => appState.menuOpen)

function close() {
  appState.menuOpen = false
}

watch(open, async (isOpen) => {
  lockScroll(isOpen)
  if (!isOpen) {
    hovered.value = 0
    gsap.set(panel.value, { autoAlpha: 0, yPercent: -2 })
    return
  }
  await nextTick()
  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .set(panel.value, { autoAlpha: 1, yPercent: -2, clipPath: 'inset(0% 0% 100% 0%)' })
    .to(panel.value, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85 })
    .to(panel.value, { yPercent: 0, duration: 0.7 }, 0)
    .from('[data-menu-item]', { y: 42, opacity: 0, duration: 0.7, stagger: 0.055 }, 0.18)
    .from('[data-menu-foot]', { y: 24, opacity: 0, duration: 0.6 }, 0.4)
})
</script>

<template>
  <div
    ref="panel"
    class="fixed inset-0 z-[90] invisible opacity-0"
    :class="open ? '' : 'pointer-events-none'"
    aria-modal="true"
    role="dialog"
  >
    <div class="absolute inset-0 bg-ink" />
    <div
      class="absolute inset-0 opacity-[0.06]"
      style="
        background-image: radial-gradient(circle at 1px 1px, #f7f8f5 1px, transparent 0);
        background-size: 22px 22px;
      "
    />

    <div class="relative flex h-full flex-col">
      <!-- top bar -->
      <div class="shell flex items-center justify-between py-6">
        <span class="wordmark text-[1.05rem] text-porcelain">Vraj Interior</span>
        <button
          class="flex items-center gap-3 text-porcelain/70 transition-colors hover:text-gold"
          aria-label="Close menu"
          @click="close"
        >
          <span class="numbered hidden sm:inline">Close</span>
          <span class="relative grid h-10 w-10 place-items-center rounded-full border border-porcelain/25">
            <i class="pi pi-times text-[0.8rem]" />
          </span>
        </button>
      </div>

      <!-- links -->
      <div class="shell flex flex-1 flex-col justify-center gap-10 pb-6 md:flex-row md:items-center md:gap-16">
        <ul class="flex-1">
          <li
            v-for="(item, i) in nav"
            :key="item.to"
            data-menu-item
            class="border-b border-porcelain/10 py-4 md:py-5"
            @mouseenter="hovered = i"
          >
            <RouterLink
              :to="item.to"
              class="group flex items-center justify-between"
              @click="close"
            >
              <span class="flex items-baseline gap-4">
                <span class="numbered text-porcelain/35">{{ item.index }}</span>
                <span
                  class="font-display text-[2rem] leading-none transition-colors duration-500 md:text-[2.6rem]"
                  :class="route.path === item.to ? 'text-gold' : 'text-porcelain group-hover:text-gold'"
                  >{{ item.label }}</span
                >
              </span>
              <i
                class="pi pi-arrow-up-right text-porcelain/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
              />
            </RouterLink>
          </li>
        </ul>

        <!-- preview -->
        <div class="hidden w-[38%] lg:block">
          <div class="media ratio-3-4 overflow-hidden rounded-[4px]">
            <img
              :src="previews[hovered]"
              :alt="nav[hovered]?.label"
              class="!h-full w-full object-cover transition-all duration-700"
            />
          </div>
          <p class="mt-4 text-[0.72rem] uppercase tracking-wider2 text-porcelain/45">
            {{ nav[hovered]?.label }} — Vraj Interior
          </p>
        </div>
      </div>

      <!-- foot -->
      <div
        data-menu-foot
        class="shell grid gap-5 border-t border-porcelain/10 py-7 text-[0.85rem] font-light text-porcelain/60 sm:grid-cols-3"
      >
        <a :href="site.phoneHref" class="transition-colors hover:text-gold">{{ site.phone }}</a>
        <a :href="`mailto:${site.email}`" class="transition-colors hover:text-gold sm:text-center">{{
          site.email
        }}</a>
        <p class="sm:text-right">{{ faqs[3].a }}</p>
      </div>
    </div>
  </div>
</template>
