<script setup>
/**
 * SectionHeading — eyebrow + display heading + optional supporting
 * line. Every one of these animates in with the line-mask reveal.
 */
import EyebrowLabel from './EyebrowLabel.vue'
import RevealText from './RevealText.vue'

defineProps({
  eyebrow: { type: String, default: '' },
  index: { type: String, default: '' },
  title: { type: String, required: true },
  italicWord: { type: String, default: '' },
  lede: { type: String, default: '' },
  align: { type: String, default: 'left' }, // left | center
  size: { type: String, default: 'md' } // md | lg
})
</script>

<template>
  <header
    class="flex flex-col gap-5"
    :class="align === 'center' ? 'items-center text-center' : 'items-start'"
  >
    <EyebrowLabel v-if="eyebrow" :text="eyebrow" :index="index" />

    <RevealText
      tag="h2"
      :class="[
        'font-display text-walnut',
        size === 'lg' ? 'text-display-md' : 'text-display-sm',
        align === 'center' ? 'mx-auto' : ''
      ]"
    >
      <span v-if="!italicWord">{{ title }}</span>
      <span v-else v-html="title.replace(italicWord, `<em class='font-light italic text-brass-deep'>${italicWord}</em>`)" />
    </RevealText>

    <p
      v-if="lede"
      v-reveal="{ delay: 0.12 }"
      class="js-reveal max-w-prose2 text-[0.98rem] leading-[1.85] text-stone"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ lede }}
    </p>
  </header>
</template>
