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

const app = createApp(App)

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: ErpTheme,
    options: {
      darkModeSelector: '.app-dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
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
