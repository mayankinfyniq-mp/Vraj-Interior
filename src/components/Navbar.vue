<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from '@/plugins/gsap'
import { brand, contact, navLinks, socials } from '@/data/site'
import {
  lockScroll,
  unlockScroll,
  scrollToTop,
  prefersReducedMotion,
} from '@/composables/useSmoothScroll'
import Monogram from './ui/Monogram.vue'

const route = useRoute()

const scrolled = ref(false)
const hidden = ref(false)
const open = ref(false)
const overlay = ref(null)

let lastY = 0
let tl = null

function onScroll() {
  const y = window.scrollY || document.documentElement.scrollTop

  scrolled.value = y > 40

  if (y > 420 && !open.value) {
    hidden.value = y > lastY + 4
  } else {
    hidden.value = false
  }

  lastY = y
}

function openMenu() {
  open.value = true
  lockScroll()

  nextTick(() => {
    if (prefersReducedMotion() || !overlay.value) return

    tl = gsap.timeline()

    tl.set(overlay.value, { autoAlpha: 1 })
      .fromTo(
        overlay.value.querySelectorAll('.mm-curtain'),
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.75,
          ease: 'power4.inOut',
          stagger: 0.06,
        }
      )
      .fromTo(
        overlay.value.querySelectorAll('.mm-item'),
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'expo.out',
          stagger: 0.07,
        },
        '-=0.35'
      )
      .fromTo(
        overlay.value.querySelectorAll('.mm-foot > *'),
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.06,
        },
        '-=0.5'
      )
  })
}

function closeMenu() {
  if (!open.value) return

  if (prefersReducedMotion() || !overlay.value) {
    open.value = false
    unlockScroll()
    return
  }

  if (tl) tl.kill()

  gsap
    .timeline({
      onComplete: () => {
        open.value = false
        unlockScroll()
      },
    })
    .to(overlay.value.querySelectorAll('.mm-item'), {
      yPercent: -110,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      stagger: 0.04,
    })
    .to(
      overlay.value.querySelectorAll('.mm-curtain'),
      {
        yPercent: -100,
        duration: 0.6,
        ease: 'power4.inOut',
        stagger: 0.05,
      },
      '-=0.18'
    )
    .set(overlay.value, { autoAlpha: 0 })
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  }
)

function onKey(e) {
  if (e.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  unlockScroll()
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-[90] border-b border-linen/60 bg-ivory/95 shadow-[0_1px_0_rgba(219,207,188,0.8)] backdrop-blur-xl transition-[transform,background-color,box-shadow] duration-500 ease-silk"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <nav
      class="shell flex items-center justify-between gap-8 transition-[height] duration-500 ease-silk"
      :class="scrolled ? 'h-[70px]' : 'h-[92px]'"
      aria-label="Primary"
    >
      <RouterLink
        to="/"
        v-cursor="'link'"
        class="group flex items-center gap-3.5"
        @click="scrollToTop()"
      >
        <Monogram
          class="h-9 w-9 shrink-0 transition-transform duration-700 ease-silk group-hover:rotate-[-8deg]"
        />

        <span class="flex flex-col leading-none">
          <span class="font-display text-[1.42rem] tracking-[0.02em] text-walnut">
            {{ brand.shortName }}
          </span>

          <span
            class="mt-1 text-micro uppercase tracking-widest2 text-stone transition-colors group-hover:text-brass-deep"
          >
            Interior Studio
          </span>
        </span>
      </RouterLink>

      <ul class="hidden items-center gap-9 lg:flex">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            v-cursor="'link'"
            class="group relative flex items-baseline gap-1.5 py-2 text-[0.76rem] font-medium uppercase tracking-widest2 transition-colors duration-300"
            :class="
              route.path === link.to
                ? 'text-walnut'
                : 'text-stone hover:text-walnut'
            "
          >

            <span>{{ link.label }}</span>

            <span
              class="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-brass transition-transform duration-500 ease-silk"
              :class="
                route.path === link.to
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              "
            />
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-4">
        <a
          :href="contact.phoneHref"
          v-cursor="'link'"
          class="hidden text-[0.76rem] tracking-wide text-stone transition-colors hover:text-brass-deep xl:block"
        >
          {{ contact.phone }}
        </a>

        <RouterLink
          to="/contact"
          v-cursor="'link'"
          class="group relative hidden overflow-hidden rounded-full border border-walnut/25 px-6 py-3 text-[0.68rem] font-medium uppercase tracking-widest2 text-walnut transition-colors duration-500 hover:text-ivory lg:inline-flex"
        >
          <span
            class="absolute inset-0 -z-10 translate-y-full bg-walnut transition-transform duration-500 ease-silk group-hover:translate-y-0"
          />

          <span class="relative z-10">
            Book a Consultation
          </span>
        </RouterLink>

        <button
          type="button"
          class="relative flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          :aria-expanded="open"
          aria-label="Toggle menu"
          @click="open ? closeMenu() : openMenu()"
        >
          <span
            class="block h-px w-6 bg-walnut transition-transform duration-500 ease-silk"
            :class="open ? 'translate-y-[3.5px] rotate-45' : ''"
          />

          <span
            class="block h-px w-6 bg-walnut transition-transform duration-500 ease-silk"
            :class="open ? '-translate-y-[3.5px] -rotate-45' : ''"
          />
        </button>
      </div>
    </nav>
  </header>

  <div
    v-show="open"
    ref="overlay"
    class="fixed inset-0 z-[95] lg:hidden"
    style="visibility: hidden"
  >
    <div class="absolute inset-0 flex">
      <div
        v-for="i in 5"
        :key="i"
        class="mm-curtain h-full flex-1 bg-porcelain"
      />
    </div>

    <div class="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
      <nav class="flex flex-col" aria-label="Mobile">
        <div
          v-for="link in navLinks"
          :key="link.to"
          class="overflow-hidden py-1.5"
        >
          <RouterLink
            :to="link.to"
            class="mm-item flex items-baseline gap-4 font-display text-[2.6rem] font-light leading-tight text-walnut"
            @click="closeMenu()"
          >
            <span class="text-[0.7rem] font-sans tracking-widest2 text-brass">
              {{ link.index }}
            </span>

            <span>{{ link.label }}</span>
          </RouterLink>
        </div>
      </nav>

      <div class="mm-foot flex flex-col gap-6">
        <hr class="hairline" />

        <div class="grid grid-cols-2 gap-6 text-[0.8rem] text-stone">
          <div class="flex flex-col gap-1.5">
            <span class="text-micro uppercase tracking-widest2 text-taupe">
              Studio
            </span>

            <span>{{ contact.address.line1 }}</span>
            <span>
              {{ contact.address.city }} {{ contact.address.pincode }}
            </span>
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="text-micro uppercase tracking-widest2 text-taupe">
              Reach us
            </span>

            <a
              :href="contact.phoneHref"
              class="link-draw self-start"
            >
              {{ contact.phone }}
            </a>

            <a
              :href="contact.emailHref"
              class="link-draw self-start"
            >
              {{ contact.email }}
            </a>
          </div>
        </div>

        <div class="flex gap-5">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[0.7rem] uppercase tracking-widest2 text-stone hover:text-brass-deep"
          >
            {{ s.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>