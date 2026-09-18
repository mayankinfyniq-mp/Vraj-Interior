import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'
import { VrajPreset } from './theme/preset'
import reveal from './directives/reveal'

/* Styles — order matters: fonts, primeicons, tailwind (see src/styles/main.css) */
import '@fontsource/marcellus/400.css'
import '@fontsource-variable/jost/index.css'
import 'primeicons/primeicons.css'
import './styles/main.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  ripple: false,
  theme: {
    preset: VrajPreset,
    options: {
      darkModeSelector: '.vraj-dark',
      cssLayer: false,
    },
  },
})
app.use(ToastService)

/* v-reveal — IntersectionObserver + GSAP scroll reveals (no 3D) */
app.directive('reveal', reveal)

app.mount('#app')
