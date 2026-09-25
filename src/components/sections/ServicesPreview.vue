<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { services } from '@/data/site'
import ImageRotator from '@/components/ui/ImageRotator.vue'

const active = ref(services[0].id)
const mobileOpen = ref(false)
const mobileService = ref(null)

const list = computed(() => services.slice(0, 5))

const current = computed(
  () => services.find((s) => s.id === active.value) || services[0],
)

const items = computed(() =>
  current.value.images.map((image, i) => ({
    image,
    label: `${current.value.title} — 0${i + 1}`,
  })),
)

const mobileItems = computed(() => {
  if (!mobileService.value) return []

  return mobileService.value.images.map((image, i) => ({
    image,
    label: `${mobileService.value.title} — 0${i + 1}`,
  }))
})

function selectService(service) {
  active.value = service.id
}

function openMobileService(service) {
  active.value = service.id
  mobileService.value = service
  mobileOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeMobileService() {
  mobileOpen.value = false
  document.body.style.overflow = ''
}

function handleEscape(event) {
  if (event.key === 'Escape' && mobileOpen.value) {
    closeMobileService()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <section class="section overflow-hidden bg-mist/60">
    <div class="shell">
      <div
        class="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between"
      >

        <RouterLink
          to="/services"
          class="link-line self-start text-ink sm:self-auto"
          data-cursor="link"
        >
          <span>All services</span>
          <i class="pi pi-arrow-right text-[0.7rem]" />
        </RouterLink>
      </div>

      <div
        class="mt-8 grid gap-8 sm:mt-10 sm:gap-10 lg:mt-12 lg:grid-cols-[1fr_1fr] lg:gap-16"
      >
        <!-- Desktop image preview -->
        <div
          class="order-1 hidden md:block lg:order-1"
        >
          <div class="overflow-hidden rounded-[3px]">
            <ImageRotator
              :items="items"
              class="media-shadow"
              :interval="3000"
              ratio="ratio-4-3"
            />
          </div>

          <p
            class="mt-4 max-w-xl text-[0.82rem] font-light leading-[1.75] text-stone sm:mt-5 sm:text-[0.9rem]"
          >
            {{ current.blurb }}
          </p>
        </div>

        <!-- Services -->
        <ul
          class="order-2 lg:order-2"
        >
          <li
            v-for="(service, i) in list"
            :key="service.id"
            v-reveal="{ y: 20, delay: i * 0.05 }"
            class="group border-t border-ink/10 last:border-b"
            data-cursor="link"
            @mouseenter="selectService(service)"
          >
            <button
              type="button"
              class="flex w-full items-center gap-3 py-5 text-left sm:gap-5 sm:py-6 md:py-7"
              @click="openMobileService(service)"
            >
              <span
                class="numbered w-7 shrink-0 text-[0.65rem] transition-colors duration-500 sm:w-8"
                :class="
                  active === service.id
                    ? 'text-gold-deep'
                    : 'text-stone/50'
                "
              >
                {{ service.index }}
              </span>

              <h3
                class="display-md min-w-0 flex-1 text-[1.35rem] leading-tight transition-all duration-700 ease-premium sm:text-[1.7rem] md:text-[2rem]"
                :class="
                  active === service.id
                    ? 'text-emerald lg:translate-x-2'
                    : 'text-ink/70'
                "
              >
                {{ service.title }}
              </h3>

              <span
                class="hidden shrink-0 text-right text-[0.62rem] uppercase tracking-wider2 text-stone/70 sm:block sm:max-w-[110px]"
              >
                {{ service.kicker.split(' · ')[0] }}
              </span>

              <i
                class="pi pi-arrow-up-right shrink-0 text-[0.7rem] transition-all duration-500 sm:hidden"
                :class="
                  active === service.id
                    ? 'text-gold-deep'
                    : 'text-stone/40'
                "
              />
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mobile service window -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-250"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-[100] flex items-end bg-ink/60 p-3 backdrop-blur-sm md:hidden sm:p-5"
        @click.self="closeMobileService"
      >
        <Transition
          appear
          enter-active-class="transition duration-400 ease-out"
          enter-from-class="translate-y-full opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-full opacity-0"
        >
          <div
            v-if="mobileOpen && mobileService"
            class="relative max-h-[92svh] w-full overflow-y-auto rounded-[10px] bg-[#f4f0e8] shadow-2xl"
          >
            <div
              class="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-[#f4f0e8]/95 px-5 py-4 backdrop-blur-md"
            >
              <div class="flex items-center gap-3">
                <span
                  class="text-[0.58rem] uppercase tracking-[0.2em] text-gold-deep"
                >
                  {{ mobileService.index }}
                </span>

                <span class="h-px w-6 bg-ink/20" />

                <span
                  class="text-[0.55rem] uppercase tracking-[0.18em] text-stone"
                >
                  Service
                </span>
              </div>

              <button
                type="button"
                aria-label="Close service"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:bg-ink hover:text-white"
                @click="closeMobileService"
              >
                <i class="pi pi-times text-[0.7rem]" />
              </button>
            </div>

            <div class="p-5 sm:p-7">
              <div class="mb-6">
                <span
                  class="mb-2 block text-[0.56rem] uppercase tracking-[0.2em] text-gold-deep"
                >
                  {{ mobileService.kicker }}
                </span>

                <h2
                  class="text-[2rem] font-medium leading-[0.95] tracking-[-0.04em] text-emerald sm:text-[2.5rem]"
                >
                  {{ mobileService.title }}
                </h2>
              </div>

              <div class="overflow-hidden rounded-[5px]">
                <ImageRotator
                  :items="mobileItems"
                  class="media-shadow"
                  :interval="3000"
                  ratio="ratio-4-3"
                />
              </div>

              <div class="mt-6">
                <p
                  class="text-[0.88rem] font-light leading-[1.8] text-stone sm:text-[0.95rem]"
                >
                  {{ mobileService.blurb }}
                </p>
              </div>

              <div
                class="mt-7 flex items-center justify-between border-t border-ink/10 pt-5"
              >
                <span
                  class="text-[0.55rem] uppercase tracking-[0.2em] text-stone/60"
                >
                  Vraj Interior
                </span>

                <RouterLink
                  to="/contact"
                  class="inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.15em] text-emerald"
                  @click="closeMobileService"
                >
                  Enquire
                  <i class="pi pi-arrow-right text-[0.65rem]" />
                </RouterLink>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </section>
</template>