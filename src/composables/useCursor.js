/**
 * useCursor.js
 * ---------------------------------------------------------------
 * A tiny reactive store driving the bespoke cursor. Components
 * declare intent (hover / view / drag / text) without ever touching
 * the DOM; CustomCursor.vue simply renders the current state.
 */
import { reactive } from 'vue'

export const cursor = reactive({
  enabled: false,
  variant: 'default', // default | link | view | drag | text | hidden
  label: '',
  x: 0,
  y: 0,
  pressed: false
})

export function setCursor(variant = 'default', label = '') {
  cursor.variant = variant
  cursor.label = label
}

export function resetCursor() {
  cursor.variant = 'default'
  cursor.label = ''
}

/** Enable the fancy cursor only on devices that actually have one. */
export function detectCursorSupport() {
  if (typeof window === 'undefined') return false
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const notReduced = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const wideEnough = window.innerWidth >= 900
  return finePointer && notReduced && wideEnough
}
