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
import VueScrollPicker from 'vue-scroll-picker'
import { QuillEditor } from '@vueup/vue-quill'
// import setup from "@/services/setupInterceptors";

const globalOptions = {
  modules: {
    toolbar: ['bold', 'italic', 'underline']
  },
  placeholder: 'Kamu belum menambahkan keterangan bio...',
  theme: 'snow'
}

QuillEditor.props.globalOptions.default = () => globalOptions

export function registerPlugins(app) {
  app
    .component('Icon', Icon)
    .component('QuillEditor', QuillEditor)
    .component('VueDatePicker', VueDatePicker)
    .use(VueScrollPicker)
    .use(vuetify)
    .use(router)
    .use(store)
}
