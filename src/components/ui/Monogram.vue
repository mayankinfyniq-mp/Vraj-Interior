<script setup>
/**
 * Monogram — the studio mark. A "V" and an "I" drawn on the same
 * construction as the Cormorant wordmark, with a brass full stop.
 */
defineProps({ })
</script>

<template>
  <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="62" height="62" rx="2" stroke="currentColor" stroke-opacity="0.28" stroke-width="1" />
    <path
      d="M18 15 L27.5 48 L37 15"
      class="text-walnut"
      stroke="currentColor"
      stroke-width="2.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M45 15 V48" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" />
    <circle cx="45" cy="52.5" r="2.6" fill="#B08D57" />
  </svg>
</template>
