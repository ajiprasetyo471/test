/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VTimePicker
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        light: true,
        background: '#f9fafb',
        colors: {
          'bg-main': '#f9fafb',
          'text-white': '#ffffff',
          'text-grey': '#666666',
          'text-grey-2': '#6B7280',
          'text-grey-3': '#A3A3A3',
          'bg-grey': '#F4F5F5',
          'bg-grey-2': '#EAEBEB',
          'text-orange': '#F87304',
          'bg-blue': '#00549B',
          'bg-blue-light': '#DDEFFC',
          'text-blue': '#1078CA'
        }
      }
    }
  }
})
