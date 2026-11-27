import './assets/styles/main.css'
import './theme/color-mode'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'
import ErpTheme from './theme/erp-theme'
import { overlayZIndex } from './theme/erp-theme/foundations/layers'
import { primeVueLocale } from './utils/locale'

const app = createApp(App)

app.use(PrimeVue, {
  ripple: true,
  locale: primeVueLocale,
  zIndex: overlayZIndex,
  theme: {
    preset: ErpTheme,
    options: {
      darkModeSelector: '.app-dark',
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue, components, utilities',
      },
    },
  },
})
app.use(createPinia())
app.use(ConfirmationService)
app.use(DialogService)
app.use(ToastService)
app.use(router)

app.mount('#app')
