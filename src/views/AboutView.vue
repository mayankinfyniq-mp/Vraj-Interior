<script setup>
/**
 * AboutView — studio, standards and the people behind the drawings.
 */
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { site, values } from '@/data/site'
import PageHero from '@/components/ui/PageHero.vue'
import StatsRow from '@/components/sections/StatsRow.vue'
import ProcessStrip from '@/components/sections/ProcessStrip.vue'
import TestimonialRow from '@/components/sections/TestimonialRow.vue'
import MarqueeBand from '@/components/ui/MarqueeBand.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
import RevealText from '@/components/ui/RevealText.vue'

const root = ref(null)

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  gsap.fromTo(
    '[data-about-image]',
    { yPercent: -6 },
    {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  )
})

const meta = [
  { label: 'Founded', value: '2013' },
  { label: 'Workshop', value: 'Vatva, Ahmedabad' },
  { label: 'Team', value: '18 people' },
]
</script>

<template>
  <div ref="root">
    <PageHero
      title="One studio, one standard."
      note="We keep the drawings, the workshop and the site crew together — so nothing is lost in translation."
      image="/images/suite-wood-01.jpg"
      :meta="meta"
    />

    <StatsRow />

    <!-- manifesto -->
    <section class="section bg-porcelain">
      <div class="shell grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
            <span class="numbered text-gold-deep">01</span>
            <span class="h-px w-10 bg-ink/20" />
            <span class="eyebrow text-stone">{{ site.city }}</span>
          </div>
          <RevealText
            text="Eighteen people, one workshop, one standard."
            tag="h2"
            class="display-xl mt-7 block max-w-[16ch] text-balance"
          />
          <p v-reveal="{ y: 22, delay: 0.1 }" class="lede mt-8">
            Vraj Interior began as a two-man joinery unit. Twelve years later the same hands still
            check every drawer and every hinge before a project closes.
          </p>

          <ul class="mt-12 space-y-8">
            <li
              v-for="value in values"
              :key="value.index"
              v-reveal="{ y: 22 }"
              class="flex gap-5 border-t border-ink/10 pt-6"
            >
              <span class="numbered pt-1 text-gold-deep">{{ value.index }}</span>
              <div>
                <h3 class="display-sm">{{ value.title }}</h3>
                <p class="mt-1.5 max-w-md text-[0.9rem] font-light leading-relaxed text-stone">
                  {{ value.note }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div class="relative">
          <figure data-about-image class="media ratio-3-4 overflow-hidden rounded-[3px]">
            <img src="/images/study-01.jpg" alt="Study and shelving detail" class="h-full w-full object-cover" loading="lazy" />
          </figure>
          <figure class="media ratio-1-1 absolute -bottom-10 -left-6 hidden w-[46%] overflow-hidden rounded-[3px] shadow-lift lg:block">
            <img src="/images/detail-art.jpg" alt="Wall art detail" class="h-full w-full object-cover" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <MarqueeBand
      :words="['Drawings', 'Joinery', 'Stone', 'Lighting', 'Styling']"
      :duration="46"
      direction="reverse"
    />

    <ProcessStrip />

    <!-- founder note -->
    <section class="section bg-white">
      <div class="shell grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <RevealText
          text="“If it will annoy you in year three, we change it in week one.”"
          tag="blockquote"
          class="display-lg block max-w-[22ch] !font-display"
        />
        <div class="flex flex-col gap-6">
          <p v-reveal="{ y: 20 }" class="lede">
            Vraj Patel, principal designer, still walks every site twice a week.
          </p>
          <div v-reveal="{ y: 20, delay: 0.08 }" class="flex flex-wrap items-center gap-x-10 gap-y-4">
            <div>
              <p class="font-display text-[1.05rem] text-ink">Vraj Patel</p>
              <p class="text-[0.72rem] uppercase tracking-wider2 text-stone">Principal designer</p>
            </div>
            <RouterLink to="/contact" class="link-line text-ink" data-cursor="link">
              <span>Talk to the studio</span>
              <i class="pi pi-arrow-right text-[0.7rem]" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <TestimonialRow />

    <CtaBand
      eyebrow="Visit us"
      title="See the workshop."
      note="Drop in, feel the finishes, then decide."
      primary="Plan a visit"
      secondary="See services"
    />
  </div>
</template>
