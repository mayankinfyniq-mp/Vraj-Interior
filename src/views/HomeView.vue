<script setup>
/**
 * HomeView — the four-minute tour:
 * hero → figures → manifesto → services → rotating band → pinned gallery →
 * process → voices → invitation.
 */
import { computed, ref } from 'vue'
import { projects } from '@/data/site'
import HomeHero from '@/components/sections/HomeHero.vue'
import StatsRow from '@/components/sections/StatsRow.vue'
import IntroStatement from '@/components/sections/IntroStatement.vue'
import ServicesPreview from '@/components/sections/ServicesPreview.vue'
import RotatorBand from '@/components/sections/RotatorBand.vue'
import ProcessStrip from '@/components/sections/ProcessStrip.vue'
import TestimonialRow from '@/components/sections/TestimonialRow.vue'
import MarqueeBand from '@/components/ui/MarqueeBand.vue'
import ImageRail from '@/components/ui/ImageRail.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import RevealText from '@/components/ui/RevealText.vue'
import ImageLightbox from '@/components/ui/ImageLightbox.vue'

const railItems = computed(() =>
  projects.map((p) => ({ image: p.cover, label: p.title, meta: p.meta })),
)

const lightbox = ref(false)
const active = ref({ title: '', meta: '', images: [] })

function open(project) {
  active.value = { title: project.title, meta: project.meta, images: project.images }
  lightbox.value = true
}
</script>

<template>
  <div>
    <HomeHero />

    <div data-hero-projects>
      <MarqueeBand
        :words="['Kitchens', 'Living halls', 'Bedrooms', 'Pooja rooms', 'Studies', 'Turnkey']"
        :duration="44"
      />
      <StatsRow />
    </div>

    <IntroStatement />
    <ServicesPreview />
    <RotatorBand />

    <ImageRail :items="railItems">
      <template #header>
        <div>
          <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
            <span class="numbered text-gold-deep">02b</span>
            <span class="h-px w-10 bg-ink/20" />
            <span class="eyebrow text-stone">Selected work</span>
          </div>
          <RevealText text="Small rooms, carefully resolved." tag="h2" class="display-lg mt-5 block max-w-[18ch]" />
        </div>
      </template>
    </ImageRail>

    <!-- project grid preview -->
    <section class="section bg-white">
      <div class="shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(project, i) in projects.slice(0, 3)"
          :key="project.id"
          v-reveal="{ y: 30, delay: i * 0.07 }"
          class="group relative"
          data-cursor="view"
          data-cursor-label="Open"
          @click="open(project)"
        >
          <div class="media ratio-3-4 overflow-hidden rounded-[3px]">
            <img
              :src="project.cover"
              :alt="project.title"
              class="h-full w-full object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05]"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          </div>
          <div class="mt-5 flex items-center justify-between">
            <h3 class="display-sm">{{ project.title }}</h3>
            <span class="text-[0.72rem] uppercase tracking-wider2 text-stone">{{ project.category }}</span>
          </div>
        </article>
      </div>
    </section>

    <ProcessStrip />
    <TestimonialRow />

    <MarqueeBand
      :words="['Designed', 'Built', 'Finished', 'Handed over']"
      direction="reverse"
      tone="ink"
      size="lg"
    />

    <CtaBand />

    <ImageLightbox
      v-model="lightbox"
      :title="active.title"
      :meta="active.meta"
      :images="active.images"
    />
  </div>
</template>
