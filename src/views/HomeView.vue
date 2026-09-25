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
          </div>
          <RevealText text="Small rooms, carefully resolved." tag="h2" class="display-lg mt-5 block max-w-[18ch]" />
        </div>
      </template>
    </ImageRail>

    <ProcessStrip />
    <TestimonialRow />

    <CtaBand />

    <ImageLightbox
      v-model="lightbox"
      :title="active.title"
      :meta="active.meta"
      :images="active.images"
    />
  </div>
</template>
