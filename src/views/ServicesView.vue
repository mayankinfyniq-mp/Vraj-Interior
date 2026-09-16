<script setup>
/**
 * ServicesView — the full offering, one section per discipline,
 * followed by the studio promise, the process and an FAQ.
 */
import { ref, onMounted } from 'vue'
import { services, serviceHighlights } from '@/data/services'
import { processSteps, faqs } from '@/data/content'

import PageHero from '@/components/PageHero.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ImageFrame from '@/components/ui/ImageFrame.vue'
import RevealText from '@/components/ui/RevealText.vue'
import MagneticButton from '@/components/ui/MagneticButton.vue'
import CtaBand from '@/components/home/CtaBand.vue'

import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

const openFaq = ref('0')

onMounted(() => {
  document.title = 'Services — Vraj Interior'
})
</script>

<template>
  <div class="bg-ivory">
    <PageHero
      eyebrow="Services"
      index="02"
      crumb="Services"
      title="Everything your space needs, under one roof."
      lede="Design, joinery, execution and styling — handled by one team with one contract, one project manager and one agreed handover date."
    />

    <!-- ================= OFFERING ================= -->
    <section class="py-20 md:py-24 lg:py-28">
      <div class="shell flex flex-col gap-24 md:gap-32">
        <article
          v-for="(s, i) in services"
          :id="s.slug"
          :key="s.slug"
          class="scroll-mt-28 grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
        >
          <!-- Frame -->
          <div :class="['lg:col-span-6', i % 2 === 1 ? 'lg:order-2 lg:pl-8' : '']">
            <ImageFrame
              :src="s.image"
              :alt="s.title"
              ratio="4 / 3"
              reveal="clip"
              class="w-full"
            />
          </div>

          <!-- Copy -->
          <div :class="['lg:col-span-6', i % 2 === 1 ? 'lg:order-1' : '']">
            <div class="flex items-baseline gap-4">
              <span class="text-[0.7rem] tracking-widest2 text-brass">{{ s.id }}</span>
              <span class="h-px w-10 bg-linen" aria-hidden="true" />
              <span class="text-micro uppercase tracking-widest2 text-taupe">{{ s.duration }}</span>
            </div>

            <RevealText tag="h2" class="mt-6 font-display text-display-sm font-light text-walnut">
              {{ s.title }}
            </RevealText>

            <p v-reveal="{ delay: 0.08 }" class="js-reveal mt-5 text-[1rem] leading-[1.85] text-walnut/85">
              {{ s.excerpt }}
            </p>
            <p v-reveal="{ delay: 0.12 }" class="js-reveal mt-4 text-[0.93rem] leading-[1.9] text-stone">
              {{ s.body }}
            </p>

            <ul v-reveal="{ child: 'li', stagger: 0.06, delay: 0.16 }" class="js-reveal mt-8 grid gap-3 sm:grid-cols-2">
              <li
                v-for="d in s.deliverables"
                :key="d"
                class="flex items-start gap-3 text-[0.85rem] leading-relaxed text-stone"
              >
                <span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brass" />
                {{ d }}
              </li>
            </ul>

            <div v-reveal="{ delay: 0.22 }" class="js-reveal mt-9">
              <MagneticButton to="/contact" label="Enquire about this" variant="outline" />
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ================= PROMISE ================= -->
    <section class="bg-porcelain py-20 md:py-24">
      <div class="shell">
        <SectionHeading
          eyebrow="The studio promise"
          title="Four things we do not compromise on"
          italic-word="compromise"
          align="center"
          class="mx-auto max-w-2xl"
        />

        <div
          v-reveal="{ child: '.promise', stagger: 0.09 }"
          class="js-reveal mt-14 grid gap-px overflow-hidden bg-linen sm:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="h in serviceHighlights"
            :key="h.k"
            class="promise flex flex-col gap-3 bg-porcelain p-8 lg:p-9"
          >
            <span class="font-display text-[1.35rem] text-walnut">{{ h.k }}</span>
            <span class="h-px w-8 bg-brass" aria-hidden="true" />
            <span class="text-[0.86rem] leading-relaxed text-stone">{{ h.v }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PROCESS ================= -->
    <section class="py-20 md:py-24 lg:py-28">
      <div class="shell">
        <SectionHeading
          eyebrow="Engagement"
          title="From first call to handover"
          italic-word="handover"
          lede="The same five stages on every project, whether it is one wardrobe or an entire bungalow."
          class="max-w-xl"
        />

        <ol class="mt-14 grid gap-px bg-linen md:grid-cols-2 lg:grid-cols-5">
          <li
            v-for="(step, i) in processSteps"
            :key="step.id"
            v-reveal="{ delay: i * 0.06 }"
            class="js-reveal flex flex-col gap-4 bg-ivory p-7"
          >
            <span class="text-[0.68rem] tracking-widest2 text-brass">{{ step.id }}</span>
            <h3 class="font-display text-[1.35rem] font-light text-walnut">{{ step.title }}</h3>
            <p class="text-[0.85rem] leading-relaxed text-stone">{{ step.copy }}</p>
            <span class="mt-auto pt-4 text-micro uppercase tracking-widest2 text-taupe">
              {{ step.duration }}
            </span>
          </li>
        </ol>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="bg-porcelain py-20 md:py-24 lg:py-28">
      <div class="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-4">
          <SectionHeading
            eyebrow="Questions"
            title="Before you ask"
            italic-word="ask"
            lede="If something is missing here, call the studio — we would rather answer it directly."
          />
          <div class="mt-8">
            <MagneticButton to="/contact" label="Talk to a designer" variant="solid" />
          </div>
        </div>

        <div v-reveal="{ delay: 0.1 }" class="js-reveal lg:col-span-8">
          <Accordion v-model:value="openFaq" class="vj-accordion">
            <AccordionPanel
              v-for="(f, i) in faqs"
              :key="i"
              :value="String(i)"
              class="!border-0 !bg-transparent"
            >
              <AccordionHeader>
                <span class="flex items-baseline gap-4">
                  <span class="text-[0.68rem] tracking-widest2 text-brass">
                    {{ String(i + 1).padStart(2, '0') }}
                  </span>
                  {{ f.q }}
                </span>
              </AccordionHeader>
              <AccordionContent>
                <p class="max-w-prose2">{{ f.a }}</p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
