// Import necessary CSS and libraries
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Create and configure the Vue application
const app = createApp(App)

// Configure PrimeVue with the Aura theme
app.use(PrimeVue, { theme: { preset: Aura } })

// Configure Vue Router
app.use(router)

// Mount the application to the DOM
app.mount('#app')
