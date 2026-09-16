/**
 * main.js — application bootstrap
 * Order matters: fonts → global styles → PrimeVue → plugins.
 */
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import App from './App.vue'
import router from './router'

import directives from './directives'
import { VrajPreset } from './theme/prime-preset'

import './assets/styles/main.css'
import './theme/prime-overrides.css'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: VrajPreset,
    options: {
      darkModeSelector: '.never-dark', // light-only studio
      cssLayer: false
    }
  },
  ripple: false,
  inputStyle: 'outlined'
})

app.use(ToastService)
app.directive('tooltip', Tooltip)
app.use(directives)

app.mount('#app')
