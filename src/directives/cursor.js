/**
 * directives/cursor.js
 * ---------------------------------------------------------------
 * Declarative cursor states, e.g:
 *   v-cursor="'link'"
 *   v-cursor="{ variant: 'view', label: 'View Project' }"
 */
import { setCursor, resetCursor } from '@/composables/useCursor'

function parse(value) {
  if (!value) return { variant: 'link', label: '' }
  if (typeof value === 'string') return { variant: value, label: '' }
  return { variant: value.variant || 'link', label: value.label || '' }
}

export const cursorDirective = {
  mounted(el, binding) {
    const { variant, label } = parse(binding.value)
    el.__cursor = { variant, label }
    el.addEventListener('mouseenter', () => setCursor(variant, label))
    el.addEventListener('mouseleave', resetCursor)
  },
  updated(el, binding) {
    const { variant, label } = parse(binding.value)
    el.__cursor = { variant, label }
  },
  unmounted(el) {
    el.removeEventListener('mouseenter', () => setCursor())
    el.removeEventListener('mouseleave', resetCursor)
    resetCursor()
  }
}
