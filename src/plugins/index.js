/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import store from './pinia'
import { Icon } from '@iconify/vue'
import VueDatePicker from '@vuepic/vue-datepicker'
// import setup from "@/services/setupInterceptors";

export function registerPlugins(app) {
  app
    .component('Icon', Icon)
    .component('VueDatePicker', VueDatePicker)
    .use(vuetify)
    .use(router)
    .use(store)
}
