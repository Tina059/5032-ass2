// Import necessary CSS and libraries
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYQeAT1WPLS2lb2TRqrhJWy0hZvL-04bw",
  authDomain: "ass-f26fb.firebaseapp.com",
  projectId: "ass-f26fb",
  storageBucket: "ass-f26fb.appspot.com",
  messagingSenderId: "459493357077",
  appId: "1:459493357077:web:31c693c4e408f5d34cc01c",
  measurementId: "G-W3DXKTTMRH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const app = createApp(App)


app.use(PrimeVue, { theme: { preset: Aura } })


app.use(router)


app.mount('#app')
