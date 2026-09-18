<script setup>
/**
 * IntroStatement — short manifesto on the left, two offset images drifting at
 * different speeds on the right. Text is deliberately sparse.
 */
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import RevealText from '@/components/ui/RevealText.vue'

const root = ref(null)

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  gsap.fromTo(
    '[data-drift-a]',
    { yPercent: -7 },
    { yPercent: 7, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true } },
  )
  gsap.fromTo(
    '[data-drift-b]',
    { yPercent: 9 },
    { yPercent: -9, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: true } },
  )
})
</script>

<template>
  <section ref="root" class="section bg-porcelain">
    <div class="shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
      <div class="lg:sticky lg:top-32 lg:self-start">
        <div class="flex items-center gap-3" v-reveal="{ y: 14 }">
          <span class="numbered text-gold-deep">01</span>
          <span class="h-px w-10 bg-ink/20" />
          <span class="eyebrow text-stone">The studio</span>
        </div>

        <RevealText
          text="We draw it, build it, hand over the keys."
          tag="h2"
          class="display-xl mt-7 block max-w-[15ch] text-balance"
        />

        <p v-reveal="{ y: 22, delay: 0.1 }" class="lede mt-8">
          One workshop and one site team in Ahmedabad. No middle layers, no guesswork — every board
          is cut to a drawing you have already approved.
        </p>

        <RouterLink to="/about" class="link-line mt-8 text-ink" data-cursor="link">
          <span>The studio</span>
          <i class="pi pi-arrow-right text-[0.7rem]" />
        </RouterLink>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:gap-6">
        <figure data-drift-a class="media ratio-3-4 overflow-hidden rounded-[3px]">
          <img src="/images/dining-02.jpg" alt="Kitchen and dining detail" class="h-full w-full object-cover" loading="lazy" />
        </figure>
        <figure data-drift-b class="media ratio-3-4 mt-12 overflow-hidden rounded-[3px] sm:mt-20">
          <img src="/images/suite-green-02.jpg" alt="Green bedroom suite" class="h-full w-full object-cover" loading="lazy" />
        </figure>
      </div>
    </div>
  </section>
</template>
