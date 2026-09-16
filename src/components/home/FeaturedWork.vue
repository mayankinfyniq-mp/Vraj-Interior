<script setup>
/**
 * FeaturedWork — a deliberately asymmetric editorial grid.
 * Five frames of varying height, each wiping in from a mask as it
 * enters the viewport. Every fifth tile in the archive goes wide.
 */
import { featuredProjects } from '@/data/gallery'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ImageFrame from '@/components/ui/ImageFrame.vue'
import ArrowLink from '@/components/ui/ArrowLink.vue'

const items = featuredProjects.slice(0, 5)
const wideIndex = 3 // which tile spans two columns on large screens
</script>

<template>
  <section class="bg-ivory py-24 md:py-32 lg:py-36">
    <div class="shell">
      <div class="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          index="03"
          title="Rooms we're proud of"
          italic-word="proud"
          lede="A small selection from our Ahmedabad archive. Every project was designed, drawn and built by the same in-house team."
          class="max-w-xl"
        />
        <ArrowLink to="/projects" label="Full archive" class="hidden md:inline-flex" />
      </div>

      <div class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
        <RouterLink
          v-for="(p, i) in items"
          :key="p.id"
          to="/projects"
          v-cursor="{ variant: 'view', label: 'View' }"
          class="group block"
          :class="[
            i === wideIndex ? 'lg:col-span-7' : 'lg:col-span-5',
            i === 1 ? 'sm:mt-14' : '',
            i === 4 ? 'lg:col-span-5 lg:translate-y-10' : ''
          ]"
        >
          <ImageFrame
            :src="p.src"
            :lqip="p.lqip"
            :alt="p.title"
            :ratio="i === wideIndex ? '16 / 11' : '4 / 5'"
            reveal="clip"
          >
            <template #caption>
              <div
                class="translate-y-3 bg-gradient-to-t from-espresso/55 to-transparent px-5 pb-5 pt-16 opacity-0 transition-all duration-700 ease-silk group-hover:translate-y-0 group-hover:opacity-100"
              >
                <span class="block font-display text-[1.2rem] text-ivory">{{ p.title }}</span>
                <span class="mt-1 block text-micro uppercase tracking-widest2 text-ivory/75">
                  {{ p.categoryLabel }} · {{ p.year }}
                </span>
              </div>
            </template>
          </ImageFrame>

          <div class="mt-4 flex items-baseline justify-between gap-4">
            <span class="font-display text-[1.15rem] text-walnut">{{ p.title }}</span>
            <span class="text-micro uppercase tracking-widest2 text-taupe">{{ p.year }}</span>
          </div>
        </RouterLink>
      </div>

      <ArrowLink to="/projects" label="Full archive" class="mt-16 md:hidden" />
    </div>
  </section>
</template>
