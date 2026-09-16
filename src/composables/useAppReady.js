import { ref } from 'vue'

/**
 * Shared flag set by App.vue the moment the preloader lifts.
 * Sections that own an entrance timeline wait on this so the hero
 * reveals itself *after* the curtains, not behind them.
 */
export const appReady = ref(false)
export function markReady() {
  appReady.value = true
}
