<script setup>
/**
 * Footer — the closing argument.
 * A full-width invitation, then the directory, then an oversized
 * wordmark that bleeds off the bottom edge.
 */
import { brand, contact, navLinks, socials } from '@/data/site'
import { services } from '@/data/services'
import Monogram from './ui/Monogram.vue'
import ArrowLink from './ui/ArrowLink.vue'
import RevealText from './ui/RevealText.vue'
import { scrollToTop } from '@/composables/useSmoothScroll'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative overflow-hidden bg-porcelain">
    <!-- ==========================================================
         1. INVITATION
         ========================================================== -->
    <div class="shell relative grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-end lg:py-28">
      <div class="lg:col-span-7">
        <div class="eyebrow-rule eyebrow mb-7 text-stone">Start a project</div>
        <RevealText tag="h2" class="text-display-md text-walnut">
          Let's design a space you'll still love in ten years.
        </RevealText>
      </div>

      <div class="flex flex-col items-start gap-7 lg:col-span-5 lg:items-end lg:text-right">
        <p v-reveal="{ delay: 0.1 }" class="js-reveal max-w-sm text-[0.95rem] leading-[1.85] text-stone">
          Bring us a floor plan, a half-finished room or just an idea. The first
          conversation is always free, and we will tell you honestly if we are not
          the right studio for it.
        </p>
        <div v-reveal="{ delay: 0.18 }" class="js-reveal flex flex-wrap items-center gap-5 lg:justify-end">
          <RouterLink
            to="/contact"
            v-cursor="'link'"
            class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-walnut px-8 py-4 text-[0.72rem] font-medium uppercase tracking-widest2 text-ivory"
          >
            <span class="absolute inset-0 -z-10 translate-y-full bg-brass-deep transition-transform duration-500 ease-silk group-hover:translate-y-0" />
            <span class="relative z-10">Book a consultation</span>
            <svg class="relative z-10 h-3 w-3 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.2" />
            </svg>
          </RouterLink>
          <ArrowLink :href="`https://wa.me/919825041728`" label="WhatsApp us" />
        </div>
      </div>
    </div>

    <hr class="hairline" />

    <!-- ==========================================================
         2. DIRECTORY
         ========================================================== -->
    <div class="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
      <!-- Brand column -->
      <div class="lg:col-span-4">
        <RouterLink to="/" v-cursor="'link'" class="group inline-flex items-center gap-3.5" @click="scrollToTop()">
          <Monogram class="h-10 w-10 shrink-0 transition-transform duration-700 ease-silk group-hover:-rotate-[8deg]" />
          <span class="flex flex-col leading-none">
            <span class="font-display text-[1.6rem] text-walnut">{{ brand.shortName }}</span>
            <span class="mt-1 text-micro uppercase tracking-widest2 text-stone">Interior Studio</span>
          </span>
        </RouterLink>

        <p class="mt-6 max-w-xs text-[0.9rem] leading-[1.85] text-stone">
          {{ brand.description }}
        </p>

        <ul class="mt-8 flex flex-wrap gap-2.5">
          <li v-for="s in socials" :key="s.label">
            <a
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              v-cursor="'link'"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-linen text-[0.62rem] uppercase tracking-widest2 text-stone transition-all duration-500 ease-silk hover:border-brass hover:bg-brass hover:text-ivory"
            >
              {{ s.short }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Explore -->
      <nav class="lg:col-span-2" aria-label="Footer navigation">
        <h3 class="text-micro uppercase tracking-widest2 text-taupe">Explore</h3>
        <ul class="mt-6 flex flex-col gap-3.5">
          <li v-for="l in navLinks" :key="l.to">
            <RouterLink
              :to="l.to"
              v-cursor="'link'"
              class="link-draw text-[0.9rem] text-walnut/85 transition-colors hover:text-brass-deep"
            >
              {{ l.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Services -->
      <nav class="lg:col-span-3" aria-label="Services">
        <h3 class="text-micro uppercase tracking-widest2 text-taupe">Services</h3>
        <ul class="mt-6 flex flex-col gap-3.5">
          <li v-for="s in services" :key="s.slug">
            <RouterLink
              :to="`/services#${s.slug}`"
              v-cursor="'link'"
              class="link-draw text-[0.9rem] leading-snug text-walnut/85 transition-colors hover:text-brass-deep"
            >
              {{ s.title }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Contact -->
      <div class="lg:col-span-3">
        <h3 class="text-micro uppercase tracking-widest2 text-taupe">Studio</h3>
        <address class="mt-6 flex flex-col gap-4 text-[0.9rem] not-italic leading-relaxed text-stone">
          <span>
            {{ contact.address.line1 }}<br />
            {{ contact.address.line2 }}<br />
            {{ contact.address.city }}, {{ contact.address.region }} {{ contact.address.pincode }}
          </span>

          <a v-cursor="'link'" :href="contact.phoneHref" class="link-draw self-start text-walnut hover:text-brass-deep">
            {{ contact.phone }}
          </a>
          <a v-cursor="'link'" :href="contact.emailHref" class="link-draw self-start text-walnut hover:text-brass-deep">
            {{ contact.email }}
          </a>

          <span class="flex flex-col gap-1 pt-2 text-[0.82rem] text-taupe">
            <span v-for="h in contact.hours" :key="h.day" class="flex justify-between gap-4">
              <span>{{ h.day }}</span><span>{{ h.time }}</span>
            </span>
          </span>
        </address>
      </div>
    </div>

    <!-- ==========================================================
         3. OVERSIZED WORDMARK
         ========================================================== -->
    <div class="relative select-none overflow-hidden" aria-hidden="true">
      <div class="shell">
        <div
          class="flex translate-y-[16%] items-end justify-between whitespace-nowrap font-display leading-[0.78] text-walnut/[0.07]"
          style="font-size: clamp(4rem, 17vw, 15rem)"
        >
          <span>Vraj</span>
          <span class="italic text-brass/10">Interior</span>
        </div>
      </div>
    </div>

    <!-- ==========================================================
         4. LEGAL BAR
         ========================================================== -->
    <div class="relative border-t border-linen/70">
      <div class="shell flex flex-col gap-4 py-7 text-[0.74rem] text-taupe md:flex-row md:items-center md:justify-between">
        <p>© {{ year }} {{ brand.name }}. All rights reserved.</p>
        <p class="flex items-center gap-2">
          <span class="inline-block h-1 w-1 rounded-full bg-brass" />
          {{ brand.city }}, {{ brand.region }} · Est. {{ brand.established }}
        </p>
        <button
          type="button"
          v-cursor="'link'"
          class="group inline-flex items-center gap-2.5 self-start uppercase tracking-widest2 transition-colors hover:text-brass-deep md:self-auto"
          @click="scrollToTop(false)"
        >
          Back to top
          <svg class="h-3.5 w-3.5 transition-transform duration-500 ease-silk group-hover:-translate-y-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 15V2M3 7l5-5 5 5" stroke="currentColor" stroke-width="1.2" />
          </svg>
        </button>
      </div>
    </div>
  </footer>
</template>
