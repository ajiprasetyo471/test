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
          'text-grey-4': '#484848',
          'text-grey-5': '#3F3F3F',
          'text-grey-6': '#ADADAD',
          'bg-grey': '#F4F5F5',
          'bg-grey-2': '#EAEBEB',
          'bg-grey-3': '#C5CAD0',
          'bg-orange': '#FCF4DB',
          'border-orange': '#F2C94C',
          'text-orange': '#F87304',
          'text-orange-2': '#FDD5B4',
          'bg-blue': '#00549B',
          'bg-blue-2': '#1950AC',
          'bg-blue-light': '#DDEFFC',
          'text-blue': '#1078CA',
          'text-blue-2': '#06377A',
          'text-red': '#FF4141',
          'text-red-2': '#E84040'
        }
      }
    }
  }
})
