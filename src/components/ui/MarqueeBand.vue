<script setup>
/**
 * MarqueeBand — a slow, seamless ticker. Two identical tracks run
 * side by side so the loop is invisible. Pauses on hover.
 */
defineProps({
  words: { type: Array, default: () => [] },
  duration: { type: Number, default: 38 },
  tone: { type: String, default: 'sand' } // sand | porcelain | brass
})

const toneClass = {
  sand: 'bg-sand text-walnut',
  porcelain: 'bg-porcelain text-walnut',
  brass: 'bg-brass text-ivory'
}
</script>

<template>
  <div
    class="relative w-full overflow-hidden border-y border-linen/60"
    :class="toneClass[tone]"
    aria-hidden="true"
  >
    <div class="marquee-track flex w-max items-center" :style="{ '--dur': duration + 's' }">
      <div class="marquee-run flex shrink-0 items-center">
        <template v-for="(w, i) in words" :key="'a' + i">
          <span class="whitespace-nowrap px-8 font-display text-[1.6rem] font-light md:text-[2rem]">
            {{ w }}
          </span>
          <span class="inline-block h-1 w-1 shrink-0 rounded-full bg-brass" />
        </template>
      </div>
      <div class="marquee-run flex shrink-0 items-center">
        <template v-for="(w, i) in words" :key="'b' + i">
          <span class="whitespace-nowrap px-8 font-display text-[1.6rem] font-light md:text-[2rem]">
            {{ w }}
          </span>
          <span class="inline-block h-1 w-1 shrink-0 rounded-full bg-brass" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  animation: marquee var(--dur, 38s) linear infinite;
  will-change: transform;
}
.marquee-track:hover {
  animation-play-state: paused;
}
@keyframes marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
