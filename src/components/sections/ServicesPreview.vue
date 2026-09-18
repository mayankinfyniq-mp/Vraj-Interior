<script setup>
/**
 * ServicesPreview — hover a discipline on the left, the plate on the right
 * swaps to that service's images (auto-rotating every 3s as well).
 */
import { computed, ref } from 'vue'
import { services } from '@/data/site'
import ImageRotator from '@/components/ui/ImageRotator.vue'

const active = ref(services[0].id)
const list = computed(() => services.slice(0, 5))
const current = computed(() => services.find((s) => s.id === active.value) || services[0])

const items = computed(() =>
  current.value.images.map((image, i) => ({ image, label: `${current.value.title} — 0${i + 1}` })),
)
</script>

<template>
  <section class="section bg-mist/60">
    <div class="shell">
      <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
          <span class="numbered text-gold-deep">02</span>
          <span class="h-px w-10 bg-ink/20" />
          <span class="eyebrow text-stone">What we make</span>
        </div>
        <RouterLink to="/services" class="link-line text-ink" data-cursor="link">
          <span>All services</span>
          <i class="pi pi-arrow-right text-[0.7rem]" />
        </RouterLink>
      </div>

      <div class="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <!-- list -->
        <ul class="order-2 lg:order-1">
          <li
            v-for="(service, i) in list"
            :key="service.id"
            v-reveal="{ y: 20, delay: i * 0.05 }"
            class="group border-t border-ink/10 last:border-b"
            data-cursor="link"
            @mouseenter="active = service.id"
            @focusin="active = service.id"
            @click="active = service.id"
          >
            <div class="flex items-center gap-5 py-6 md:py-7">
              <span
                class="numbered w-8 shrink-0 transition-colors duration-500"
                :class="active === service.id ? 'text-gold-deep' : 'text-stone/50'"
              >
                {{ service.index }}
              </span>
              <h3
                class="display-md flex-1 transition-all duration-700 ease-premium"
                :class="active === service.id ? 'text-emerald lg:translate-x-2' : 'text-ink/70'"
              >
                {{ service.title }}
              </h3>
              <span class="text-[0.72rem] uppercase tracking-wider2 text-stone/80">
                {{ service.kicker.split(' · ')[0] }}
              </span>
            </div>
          </li>
        </ul>

        <!-- plate -->
        <div class="order-1 lg:order-2">
          <ImageRotator
            :items="items"
            class="media-shadow rounded-[3px]"
            :interval="3000"
            ratio="ratio-4-3"
          />
          <p class="mt-5 max-w-md text-[0.9rem] font-light leading-relaxed text-stone">
            {{ current.blurb }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
