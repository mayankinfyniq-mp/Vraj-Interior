<script setup>
/**
 * ServicesView — an index that previews on hover, then one band per discipline.
 */
import { computed, ref } from 'vue'
import { services } from '@/data/site'
import PageHero from '@/components/ui/PageHero.vue'
import ServiceRow from '@/components/ui/ServiceRow.vue'
import ImageRotator from '@/components/ui/ImageRotator.vue'
import MarqueeBand from '@/components/ui/MarqueeBand.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import ImageLightbox from '@/components/ui/ImageLightbox.vue'
import RevealText from '@/components/ui/RevealText.vue'

const activeId = ref(services[0].id)
const activeService = computed(() => services.find((s) => s.id === activeId.value) || services[0])
const previewItems = computed(() =>
  activeService.value.images.map((image, i) => ({
    image,
    label: `${activeService.value.title} — 0${i + 1}`,
  })),
)

const lightbox = ref(false)
const lightboxSet = ref({ title: '', images: [] })
function open(service) {
  lightboxSet.value = {
    title: service.title,
    meta: service.kicker,
    images: service.images,
  }
  lightbox.value = true
}

const meta = [
  { label: 'Disciplines', value: 'Seven' },
  { label: 'Site work', value: 'Ahmedabad · Gandhinagar' },
  { label: 'Handover', value: '6–9 weeks' },
]
</script>

<template>
  <div>
    <PageHero
      title="From modular kitchen to mandir."
      note="Seven things we do, and nothing we don’t. Each one drawn, built and finished by the same team."
      image="/images/kitchen-01.jpg"
      :meta="meta"
    />

    <!-- index with preview -->
    <section class="section bg-porcelain">
      <div class="shell grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
            <span class="numbered text-gold-deep">Index</span>
            <span class="h-px w-10 bg-ink/20" />
            <span class="eyebrow text-stone">Hover to preview</span>
          </div>

          <div class="mt-10">
            <ServiceRow
              v-for="service in services"
              :key="service.id"
              :service="service"
              :active="service.id === activeId"
              @hover="activeId = $event"
              @open="open"
            />
          </div>
        </div>

        <aside class="hidden lg:block">
          <div class="sticky top-32">
            <ImageRotator
              :items="previewItems"
              :interval="3000"
              ratio="ratio-3-4"
              class="media-shadow rounded-[3px]"
            />
            <div class="mt-6 flex items-center justify-between gap-6">
              <p class="text-[0.78rem] uppercase tracking-wider2 text-stone">
                {{ activeService.index }} — {{ activeService.kicker }}
              </p>
              <button
                class="link-line text-ink"
                data-cursor="link"
                @click="open(activeService)"
              >
                <span>Open set</span>
                <i class="pi pi-arrow-right text-[0.7rem]" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <MarqueeBand
      :words="['Kitchen', 'Drawing room', 'Hall', 'Dining', 'Bedroom', 'Wardrobe', 'Pooja', 'Study']"
      :duration="52"
      tone="ink"
    />

    <!-- one band per discipline -->
    <section
      v-for="(service, i) in services"
      :id="service.id"
      :key="service.id"
      class="scroll-mt-28 border-b border-ink/10"
      :class="i % 2 === 0 ? 'bg-white' : 'bg-mist/50'"
    >
      <div class="shell grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
        <div :class="i % 2 === 1 ? 'lg:order-2' : ''">
          <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
            <span class="numbered text-gold-deep">{{ service.index }}</span>
            <span class="h-px w-8 bg-ink/20" />
            <span class="eyebrow text-stone">{{ service.kicker }}</span>
          </div>
          <RevealText :text="service.title" tag="h2" class="display-xl mt-6 block" />
          <p v-reveal="{ y: 20, delay: 0.1 }" class="lede mt-6">{{ service.blurb }}</p>
          <ul class="mt-8 flex flex-wrap gap-2.5" v-reveal="{ y: 20, delay: 0.15 }">
            <li v-for="p in service.points" :key="p" class="chip">{{ p }}</li>
          </ul>
          <button class="btn btn-outline mt-10" data-cursor="link" @click="open(service)">
            <span>View {{ service.images.length }} images</span>
            <i class="pi pi-arrow-right btn-arrow text-[0.72rem]" />
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4" :class="i % 2 === 1 ? 'lg:order-1' : ''">
          <figure
            v-reveal="'left'"
            class="media ratio-3-4 overflow-hidden rounded-[3px]"
            data-cursor="view"
            data-cursor-label="Open"
            @click="open(service)"
          >
            <img :src="service.images[0]" :alt="service.title" class="h-full w-full object-cover" loading="lazy" />
          </figure>
          <figure
            v-reveal="'right'"
            class="media ratio-3-4 mt-8 overflow-hidden rounded-[3px] sm:mt-12"
            data-cursor="view"
            data-cursor-label="Open"
            @click="open(service)"
          >
            <img :src="service.images[1]" :alt="service.title" class="h-full w-full object-cover" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <CtaBand
      eyebrow="Quotation"
      title="Send us the floor plan."
      note="We will come back with a scope and a number — no obligation."
      primary="Request a quote"
      secondary="See projects"
    />

    <ImageLightbox
      v-model="lightbox"
      :title="lightboxSet.title"
      :meta="lightboxSet.meta"
      :images="lightboxSet.images"
    />
  </div>
</template>
