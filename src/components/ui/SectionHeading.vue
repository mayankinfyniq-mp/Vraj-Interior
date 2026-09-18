<script setup>
/** Shared section header: index, eyebrow, serif headline, optional side note. */
import RevealText from './RevealText.vue'

defineProps({
  index: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  note: { type: String, default: '' },
  light: { type: Boolean, default: false },
  align: { type: String, default: 'left' }, // left | center | split
})
</script>

<template>
  <header
    class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    :class="align === 'center' ? 'text-center md:flex-col md:items-center' : ''"
  >
    <div :class="align === 'center' ? 'mx-auto max-w-2xl' : ''">
      <div
        v-if="eyebrow || index"
        v-reveal="{ y: 14 }"
        class="mb-5 flex items-center gap-3"
        :class="align === 'center' ? 'justify-center' : ''"
      >
        <span v-if="index" class="numbered" :class="light ? 'text-gold' : 'text-gold-deep'">{{ index }}</span>
        <span class="h-px w-8" :class="light ? 'bg-porcelain/30' : 'bg-ink/20'" />
        <span class="eyebrow" :class="light ? 'text-porcelain/65' : 'text-stone'">{{ eyebrow }}</span>
      </div>

      <RevealText
        :text="title"
        tag="h2"
        class="display-lg block text-balance"
        :class="light ? '!text-porcelain' : '!text-ink'"
      />
    </div>

    <p
      v-if="note"
      v-reveal="{ y: 20, delay: 0.1 }"
      class="lede md:max-w-[34ch] md:text-right"
      :class="[light ? '!text-porcelain/70' : '', align === 'center' ? 'mx-auto text-center md:text-center' : '']"
    >
      {{ note }}
    </p>
  </header>
</template>
