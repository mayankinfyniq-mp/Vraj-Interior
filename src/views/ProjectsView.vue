<script setup>
/**
 * ProjectsView — filterable portfolio in a soft masonry grid.
 */
import { computed, ref } from 'vue'
import SelectButton from 'primevue/selectbutton'
import { projectFilters, projects } from '@/data/site'
import PageHero from '@/components/ui/PageHero.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import ImageLightbox from '@/components/ui/ImageLightbox.vue'

const filter = ref('All')
const lightbox = ref(false)
const active = ref({ title: '', meta: '', images: [] })

const visible = computed(() =>
  filter.value === 'All' ? projects : projects.filter((p) => p.category === filter.value),
)

function open(project) {
  active.value = { title: project.title, meta: project.meta, images: project.images }
  lightbox.value = true
}

const meta = [
  { label: 'Homes', value: '260+' },
  { label: 'Since', value: '2013' },
  { label: 'Studio', value: 'Ahmedabad' },
]
</script>

<template>
  <div>
    <PageHero
      title="Rooms we have handed over."
      note="Kitchens, halls, bedrooms and mandirs — photographed the week we finished them."
      image="/images/living-02.jpg"
      :meta="meta"
    />

    <section class="section bg-porcelain">
      <div class="shell">
        <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div v-reveal="{ y: 14 }" class="flex items-center gap-3">
            <span class="numbered text-gold-deep">{{ String(visible.length).padStart(2, '0') }}</span>
            <span class="h-px w-10 bg-ink/20" />
            <span class="eyebrow text-stone">Projects</span>
          </div>

          <div v-reveal="{ y: 14, delay: 0.08 }">
            <SelectButton
              v-model="filter"
              :options="projectFilters"
              :allowEmpty="false"
              :pt="{ root: { class: 'flex-wrap gap-2' } }"
            />
          </div>
        </div>

        <div class="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
          <div
            v-for="(project, i) in visible"
            :key="project.id"
            class="mb-6 break-inside-avoid lg:mb-8"
            v-reveal="{ y: 34, delay: (i % 3) * 0.07 }"
          >
            <ProjectCard :project="project" :index="i" :tall="i % 3 === 1" @open="open" />
          </div>
        </div>

        <p
          v-if="!visible.length"
          class="py-20 text-center text-[0.9rem] font-light text-stone"
        >
          New work in this category is on the way.
        </p>
      </div>
    </section>

    <CtaBand
      eyebrow="Your turn"
      title="Your home could be next."
      note="Share the plan and we will map out the rooms."
      primary="Book a visit"
      secondary="See services"
    />

    <ImageLightbox
      v-model="lightbox"
      :title="active.title"
      :meta="active.meta"
      :images="active.images"
    />
  </div>
</template>
