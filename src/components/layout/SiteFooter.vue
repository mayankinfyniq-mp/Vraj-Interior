<script setup>
/**
 * SiteFooter — deep-emerald closing panel.
 * A slow marquee wordmark sits on top, then three quiet columns and a
 * bottom bar with a live clock for the studio.
 */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { nav, services, site } from '@/data/site'

const emit = defineEmits(['to-top'])
const year = new Date().getFullYear()
const clock = ref('')
let timer = null

function tick() {
  clock.value = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
onMounted(() => {
  tick()
  timer = window.setInterval(tick, 20000)
})
onUnmounted(() => window.clearInterval(timer))

const marquee = computed(() => `${site.name} · ${site.tagline} · Ahmedabad · `)
</script>

<template>
  <footer class="relative overflow-hidden bg-ink text-porcelain">
    <!-- marquee wordmark -->
    <div class="border-b border-porcelain/10 py-7 md:py-9">
      <div class="marquee" style="--marquee-duration: 34s; --marquee-gap: 2rem">
        <div class="marquee__track">
          <span
            v-for="n in 6"
            :key="n"
            class="wordmark whitespace-nowrap text-[1.6rem] uppercase tracking-wider2 text-porcelain/25 md:text-[2.1rem]"
            >{{ marquee }}</span
          >
        </div>
      </div>
    </div>

    <div class="shell grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
      <!-- identity -->
      <div v-reveal="{ y: 30 }">
        <div class="flex items-center gap-3">
          <span class="grid h-11 w-11 place-items-center rounded-full border border-porcelain/25">
            <span class="font-display text-porcelain">{{ site.monogram }}</span>
          </span>
          <span class="wordmark text-[1.15rem]">Vraj Interior</span>
        </div>
        <p class="mt-6 max-w-xs text-[0.9rem] font-light leading-relaxed text-porcelain/60">
          Turnkey residential interiors in {{ site.city }} — designed, built and delivered by one team.
        </p>
        <div class="mt-7 flex items-center gap-3">
          <a
            :href="site.instagram"
            target="_blank"
            rel="noreferrer"
            class="grid h-10 w-10 place-items-center rounded-full border border-porcelain/20 text-porcelain/70 transition-colors duration-500 hover:border-gold hover:text-gold"
            aria-label="Instagram"
            data-cursor="link"
            ><i class="pi pi-instagram text-[0.85rem]"
          /></a>
          <a
            :href="site.whatsapp"
            target="_blank"
            rel="noreferrer"
            class="grid h-10 w-10 place-items-center rounded-full border border-porcelain/20 text-porcelain/70 transition-colors duration-500 hover:border-gold hover:text-gold"
            aria-label="WhatsApp"
            data-cursor="link"
            ><i class="pi pi-whatsapp text-[0.85rem]"
          /></a>
          <a
            :href="site.phoneHref"
            class="grid h-10 w-10 place-items-center rounded-full border border-porcelain/20 text-porcelain/70 transition-colors duration-500 hover:border-gold hover:text-gold"
            aria-label="Call the studio"
            data-cursor="link"
            ><i class="pi pi-phone text-[0.85rem]"
          /></a>
        </div>
      </div>

      <!-- services -->
      <nav v-reveal="{ y: 30, delay: 0.1 }">
        <p class="eyebrow text-gold">Services</p>
        <ul class="mt-6 space-y-3">
          <li v-for="s in services.slice(0, 5)" :key="s.id">
            <RouterLink
              :to="{ path: '/services', hash: `#${s.id}` }"
              class="text-[0.92rem] font-light text-porcelain/70 transition-colors duration-500 hover:text-porcelain"
              data-cursor="link"
              >{{ s.title }}</RouterLink
            >
          </li>
        </ul>
      </nav>

      <!-- studio -->
      <div v-reveal="{ y: 30, delay: 0.15 }">
        <p class="eyebrow text-gold">Studio</p>
        <ul class="mt-6 space-y-4 text-[0.9rem] font-light text-porcelain/70">
          <li class="flex gap-3">
            <i class="pi pi-map-marker mt-0.5 text-[0.8rem] text-porcelain/40" />
            <span>{{ site.address }}</span>
          </li>
          <li class="flex gap-3">
            <i class="pi pi-envelope mt-0.5 text-[0.8rem] text-porcelain/40" />
            <a :href="`mailto:${site.email}`" class="transition-colors hover:text-porcelain">{{
              site.email
            }}</a>
          </li>
          <li class="flex gap-3">
            <i class="pi pi-clock mt-0.5 text-[0.8rem] text-porcelain/40" />
            <span>{{ site.hours }}</span>
          </li>
        </ul>
        <p class="mt-6 flex items-center gap-2 text-[0.72rem] uppercase tracking-label text-porcelain/40">
          <span class="h-1.5 w-1.5 animate-breathe rounded-full bg-gold" />
          Local time {{ clock }} IST
        </p>
      </div>
    </div>

    <!-- bottom bar -->
    <div class="shell flex flex-col items-center gap-4 border-t border-porcelain/10 py-7 text-center md:flex-row md:justify-between md:text-left">
      <p class="text-[0.72rem] uppercase tracking-wider2 text-porcelain/40">
        © {{ year }} Vraj Interior — All rights reserved
      </p>
      <p class="text-[0.72rem] uppercase tracking-wider2 text-porcelain/40">
        Design, factory &amp; site — in-house
      </p>
      <a
        href="#top"
        class="link-line text-[0.72rem] uppercase tracking-wider2 text-porcelain/60 hover:text-gold"
        data-cursor="link"
        @click.prevent="emit('to-top')"
      >
        <span>Back to top</span>
        <i class="pi pi-arrow-up text-[0.7rem]" />
      </a>
    </div>
  </footer>
</template>
