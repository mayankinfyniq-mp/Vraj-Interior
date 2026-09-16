<script setup>
/**
 * MagneticButton — nudges gently toward the pointer, then springs
 * home. Subtle, and exactly the kind of detail that reads "crafted".
 *
 * Note: `tag` can resolve to a component (RouterLink), so the ref may
 * be a component instance rather than a DOM node — `resolveEl()`
 * handles both.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from '@/plugins/gsap'
import { prefersReducedMotion } from '@/composables/useSmoothScroll'

const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  label: { type: String, required: true },
  variant: { type: String, default: 'solid' }, // solid | outline | brass
  icon: { type: Boolean, default: true }
})

const root = ref(null)
const inner = ref(null)

const tag = props.to ? RouterLink : props.href ? 'a' : 'button'

/** Return a real DOM node whether the ref holds an element or a component. */
function resolveEl(r) {
  if (!r) return null
  if (typeof Element !== 'undefined' && r instanceof Element) return r
  const el = r.$el
  return el && el.nodeType === 1 ? el : null
}

function onMove(e) {
  const el = resolveEl(root.value)
  if (prefersReducedMotion() || !el) return
  const r = el.getBoundingClientRect()
  const x = e.clientX - (r.left + r.width / 2)
  const y = e.clientY - (r.top + r.height / 2)
  gsap.to(el, { x: x * 0.22, y: y * 0.35, duration: 0.7, ease: 'power3.out' })
  if (inner.value) gsap.to(inner.value, { x: x * 0.08, y: y * 0.12, duration: 0.7, ease: 'power3.out' })
}

function onLeave() {
  const el = resolveEl(root.value)
  if (!el) return
  gsap.to([el, inner.value].filter(Boolean), {
    x: 0,
    y: 0,
    duration: 0.9,
    ease: 'elastic.out(1, 0.45)'
  })
}

onMounted(() => {
  if (prefersReducedMotion()) return
  const el = resolveEl(root.value)
  if (!el) return
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
})

onBeforeUnmount(() => {
  const el = resolveEl(root.value)
  if (!el) return
  el.removeEventListener('mousemove', onMove)
  el.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <component
    :is="tag"
    ref="root"
    v-cursor="'link'"
    :to="to || undefined"
    :href="href || undefined"
    class="btn group"
    :class="{
      'btn-solid': variant === 'solid',
      'btn-outline': variant === 'outline',
      'btn-brass': variant === 'brass'
    }"
  >
    <span ref="inner" class="relative z-10">{{ label }}</span>
    <svg
      v-if="icon"
      class="relative z-10 h-3 w-3 transition-transform duration-500 ease-silk group-hover:translate-x-1"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.2" />
    </svg>
  </component>
</template>
