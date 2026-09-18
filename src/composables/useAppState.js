import { reactive } from 'vue'

/**
 * Tiny shared app state — avoids a store dependency.
 * preloaderDone gates the hero's entrance animation.
 */
export const appState = reactive({
  preloaderDone: false,
  menuOpen: false,
  cursorLabel: '',
  cursorMode: 'default', // default | link | view | text | drag
})

export function setCursor(mode = 'default', label = '') {
  appState.cursorMode = mode
  appState.cursorLabel = label
}

export function resetCursor() {
  appState.cursorMode = 'default'
  appState.cursorLabel = ''
}
