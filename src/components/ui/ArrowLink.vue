<script setup>
/**
 * ArrowLink — the studio's primary inline CTA. The arrow slides out
 * and a second arrow slides in, so the motion never feels static.
 */
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  label: { type: String, required: true },
  tone: { type: String, default: 'walnut' }, // walnut | ivory
  size: { type: String, default: 'md' }
})

const isExternal = computed(() => !!props.href && !props.to)
const tag = computed(() => (props.to ? RouterLink : isExternal.value ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    v-cursor="'link'"
    :to="to || undefined"
    :href="href || undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="group inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-widest2 transition-colors duration-500"
    :class="[
      tone === 'ivory' ? 'text-ivory hover:text-brass-soft' : 'text-walnut hover:text-brass-deep',
      size === 'lg' ? 'text-[0.8rem]' : ''
    ]"
  >
    <span class="link-draw">{{ label }}</span>
    <span class="relative block h-4 w-6 overflow-hidden" aria-hidden="true">
      <svg
        class="absolute inset-0 h-4 w-6 transition-transform duration-[600ms] ease-silk group-hover:translate-x-6"
        viewBox="0 0 24 16"
        fill="none"
      >
        <path d="M0 8h22M16 1.5 22.5 8 16 14.5" stroke="currentColor" stroke-width="1.1" />
      </svg>
      <svg
        class="absolute inset-0 h-4 w-6 -translate-x-6 transition-transform duration-[600ms] ease-silk group-hover:translate-x-0"
        viewBox="0 0 24 16"
        fill="none"
      >
        <path d="M0 8h22M16 1.5 22.5 8 16 14.5" stroke="currentColor" stroke-width="1.1" />
      </svg>
    </span>
  </component>
</template>
