<script setup>
/**
 * AboutView — the studio's story, philosophy, people and record.
 */
import { onMounted } from 'vue'
import { manifesto, pillars, timeline, team, stats } from '@/data/content'
import { projects } from '@/data/gallery'

import PageHero from '@/components/PageHero.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import RevealText from '@/components/ui/RevealText.vue'
import ScrubText from '@/components/ui/ScrubText.vue'
import ImageFrame from '@/components/ui/ImageFrame.vue'
import StatCounter from '@/components/ui/StatCounter.vue'
import MarqueeBand from '@/components/ui/MarqueeBand.vue'
import CtaBand from '@/components/home/CtaBand.vue'
import EyebrowLabel from '@/components/ui/EyebrowLabel.vue'

const storyFrames = [projects[12], projects[20]]
const wideFrame = projects[30]

onMounted(() => {
  document.title = 'About the Studio — Vraj Interior'
})
</script>

<template>
  <div class="bg-ivory">
    <PageHero
      eyebrow="About"
      index="03"
      crumb="About"
      title="A small studio that cares about the quiet details."
      lede="Thirteen years, one city, and a team that would rather finish one home properly than three quickly."
    />

    <!-- ================= STORY ================= -->
    <section class="py-20 md:py-24 lg:py-28">
      <div class="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <div class="relative">
            <ImageFrame
              :src="storyFrames[0].src"
              :lqip="storyFrames[0].lqip"
              :alt="storyFrames[0].title"
              ratio="4 / 5"
              reveal="clip"
              class="w-[86%]"
            />
            <ImageFrame
              :src="storyFrames[1].src"
              :lqip="storyFrames[1].lqip"
              :alt="storyFrames[1].title"
              ratio="1 / 1"
              reveal="clip"
              class="absolute -bottom-14 right-0 w-[52%] border-[6px] border-ivory shadow-[0_30px_70px_-40px_rgba(74,59,44,0.35)]"
            />
          </div>
        </div>

        <div class="lg:col-span-7 lg:pl-6">
          <EyebrowLabel text="Our story" index="01" />

          <ScrubText
            tag="h2"
            class="mt-7 font-display text-[clamp(1.5rem,3vw,2.3rem)] font-light leading-[1.36] text-walnut"
          >
            It began in a rented room in Navrangpura with two draftsmen, one
            carpenter and a stubborn idea: that a home should look lived in,
            not staged for a photograph.
          </ScrubText>

          <div class="mt-10 grid gap-7">
            <p
              v-for="(p, i) in manifesto.body"
              :key="i"
              v-reveal="{ delay: 0.05 * i }"
              class="js-reveal max-w-prose2 text-[0.95rem] leading-[1.9] text-stone"
            >
              {{ p }}
            </p>
          </div>

          <div v-reveal="{ delay: 0.16 }" class="js-reveal mt-10 flex items-center gap-5">
            <span class="h-px w-12 bg-brass" aria-hidden="true" />
            <div>
              <span class="block font-display text-[1.3rem] italic text-walnut">
                {{ manifesto.signature }}
              </span>
              <span class="block text-micro uppercase tracking-widest2 text-taupe">
                {{ manifesto.role }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PILLARS ================= -->
    <section class="bg-porcelain py-20 md:py-24 lg:py-28">
      <div class="shell">
        <SectionHeading
          eyebrow="Philosophy"
          title="Three beliefs that shape every drawing"
          italic-word="drawing"
          lede="They are not a marketing device — they are the three filters every decision passes through before it reaches a client."
          class="max-w-2xl"
        />

        <div v-reveal="{ child: '.pillar', stagger: 0.1 }" class="js-reveal mt-14 grid gap-10 md:grid-cols-3">
          <article v-for="p in pillars" :key="p.id" class="pillar flex flex-col gap-4">
            <span
              class="flex h-12 w-12 items-center justify-center rounded-full border border-linen text-[0.7rem] tracking-widest2 text-brass"
            >
              {{ p.id }}
            </span>
            <h3 class="font-display text-[1.5rem] font-light text-walnut">{{ p.title }}</h3>
            <span class="h-px w-full bg-linen" aria-hidden="true" />
            <p class="text-[0.9rem] leading-[1.9] text-stone">{{ p.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= WIDE FRAME ================= -->
    <section class="relative overflow-hidden">
      <div class="relative h-[46vh] min-h-[300px] w-full md:h-[62vh]">
        <img
          :src="wideFrame.src"
          :alt="wideFrame.title"
          loading="lazy"
          class="h-full w-full scale-110 object-cover"
          v-parallax="{ speed: 0.07 }"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent" />
      </div>

      <div class="shell relative -mt-20 pb-8 md:-mt-24">
        <div class="max-w-xl bg-ivory/95 p-9 shadow-[0_40px_90px_-50px_rgba(51,41,31,0.5)] backdrop-blur-sm md:p-11">
          <span class="eyebrow-rule eyebrow text-stone">Our material language</span>
          <RevealText tag="p" class="mt-5 font-display text-[1.45rem] font-light leading-[1.45] text-walnut">
            Lime plaster, solid oak, travertine, unglazed ceramic, brushed brass.
            Surfaces we are happy to watch age.
          </RevealText>
        </div>
      </div>
    </section>

    <!-- ================= TIMELINE ================= -->
    <section class="py-20 md:py-24 lg:py-28">
      <div class="shell">
        <SectionHeading
          eyebrow="Milestones"
          title="Thirteen years, one direction"
          italic-word="direction"
          class="max-w-xl"
        />

        <ol class="mt-14 border-t border-linen">
          <li
            v-for="(t, i) in timeline"
            :key="t.year"
            v-reveal="{ delay: i * 0.05 }"
            class="js-reveal group grid gap-3 border-b border-linen py-8 md:grid-cols-12 md:items-baseline md:gap-8"
          >
            <span class="font-display text-[1.7rem] text-brass md:col-span-2">{{ t.year }}</span>
            <h3 class="font-display text-[1.3rem] font-light text-walnut md:col-span-3">{{ t.title }}</h3>
            <p class="max-w-prose2 text-[0.9rem] leading-relaxed text-stone md:col-span-7">{{ t.copy }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ================= TEAM ================= -->
    <section class="bg-porcelain py-20 md:py-24 lg:py-28">
      <div class="shell">
        <SectionHeading
          eyebrow="The people"
          title="You will work with these three"
          italic-word="three"
          lede="No revolving cast of account managers. The people you meet at the first consultation are the people on your site."
          class="max-w-2xl"
        />

        <div v-reveal="{ child: '.member', stagger: 0.1 }" class="js-reveal mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="m in team" :key="m.name" class="member group">
            <ImageFrame :src="m.image" :alt="m.name" ratio="4 / 5" reveal="clip" />
            <h3 class="mt-5 font-display text-[1.4rem] font-light text-walnut">{{ m.name }}</h3>
            <p class="mt-1 text-micro uppercase tracking-widest2 text-brass-deep">{{ m.role }}</p>
            <p class="mt-3 text-[0.88rem] leading-relaxed text-stone">{{ m.bio }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ================= NUMBERS ================= -->
    <section class="bg-sand py-20 md:py-24">
      <div class="shell grid grid-cols-2 gap-y-14 lg:grid-cols-4">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          v-reveal="{ delay: i * 0.07 }"
          class="js-reveal px-2 md:px-6 lg:border-l lg:first:border-l-0 lg:border-taupe/40"
        >
          <StatCounter :value="s.value" :suffix="s.suffix" :label="s.label" />
        </div>
      </div>
    </section>

    <MarqueeBand
      :words="['Lime Plaster', 'Solid Oak', 'Travertine', 'Brushed Brass', 'Unglazed Ceramic']"
      :duration="40"
      tone="porcelain"
    />

    <CtaBand />
  </div>
</template>
