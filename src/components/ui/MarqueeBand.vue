<script setup>
/**
 * MarqueeBand — oversized word ribbon. Words alternate solid ink and outline
 * so the band reads as typography, not decoration.
 */
defineProps({
  words: { type: Array, default: () => [] },
  duration: { type: Number, default: 40 },
  direction: { type: String, default: 'normal' }, // normal | reverse
  tone: { type: String, default: 'light' }, // light | ink | gold
  size: { type: String, default: 'md' }, // sm | md | lg
})

const sizeMap = {
  sm: 'text-[1.4rem] md:text-[1.9rem]',
  md: 'text-[2rem] md:text-[3.2rem]',
  lg: 'text-[2.6rem] md:text-[4.6rem]',
}
</script>

<template>
  <div
    class="marquee select-none border-y py-6 md:py-9"
    :class="[
      tone === 'ink' ? 'border-porcelain/10 bg-ink' : 'border-ink/10 bg-porcelain',
      tone === 'gold' ? 'border-gold/20 bg-mist' : '',
    ]"
    :data-direction="direction === 'reverse' ? 'reverse' : 'normal'"
    :style="{ '--marquee-duration': `${duration}s` }"
  >
    <div class="marquee__track gap-8 md:gap-12">
      <template v-for="n in 4" :key="n">
        <span
          v-for="(word, i) in words"
          :key="`${n}-${word}`"
          class="font-display whitespace-nowrap leading-none"
          :class="[
            sizeMap[size],
            tone === 'ink'
              ? i % 2 === 0
                ? 'text-porcelain/90'
                : 'text-transparent [-webkit-text-stroke:1px_rgba(247,248,245,0.35)]'
              : i % 2 === 0
                ? 'text-ink/85'
                : 'text-transparent [-webkit-text-stroke:1px_rgba(10,46,39,0.3)]',
          ]"
        >
          {{ word }}
        </span>
        <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
      </template>
    </div>
  </div>
</template>
