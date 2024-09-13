/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-scroll-picker/lib/style.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// Components
import App from './App.vue'

import '@styles/styles.scss'

// Composables

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
