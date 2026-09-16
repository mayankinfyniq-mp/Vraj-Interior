<script setup>
/** Small letterspaced section label with a leading hairline rule. */
defineProps({
  text: { type: String, required: true },
  index: { type: String, default: '' },
  tone: { type: String, default: 'stone' }
})
</script>

<template>
  <div class="flex items-center gap-4 eyebrow" :class="`text-${tone}`">
    <span class="inline-block h-px w-8 bg-current opacity-60" aria-hidden="true" />
    <span>{{ text }}</span>
    <span v-if="index" class="text-brass/80">{{ index }}</span>
  </div>
</template>
