/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        light: true,
        background: '#f9fafb',
        colors: {
          'bg-main': '#f9fafb',
          'text-grey': '#666666',
          'text-grey-2': '#6B7280',
          'text-orange': '#F87304',
          'bg-blue': '#00549B',
          'text-blue': '#1078CA'
        }
      }
    }
  }
})
