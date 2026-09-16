<script setup>
/**
 * HomeView — composes the homepage narrative:
 * hero → manifesto → services index → selected work → process →
 * numbers → client words → invitation.
 */
import { onMounted } from 'vue'
import HeroCarousel from '@/components/home/HeroCarousel.vue'
import ManifestoSection from '@/components/home/ManifestoSection.vue'
import ServicesPreview from '@/components/home/ServicesPreview.vue'
import FeaturedWork from '@/components/home/FeaturedWork.vue'
import ProcessSection from '@/components/home/ProcessSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import CtaBand from '@/components/home/CtaBand.vue'

onMounted(() => {
  document.title = 'Vraj Interior — Interior Design Studio, Ahmedabad'
})
</script>

<template>
  <div class="bg-ivory">
    <HeroCarousel />
    <ManifestoSection />
    <ServicesPreview />
    <FeaturedWork />
    <ProcessSection />
    <StatsSection />
    <TestimonialsSection />
    <CtaBand />
  </div>
</template>
