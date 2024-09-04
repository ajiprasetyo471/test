/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import '@styles/styles.scss'

// Composables

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
