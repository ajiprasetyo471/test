/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        dark: true,
        background: "#212332",
        colors: {
          "purple-1": "#664DC9",
          "bg-card": "#2B2E3F",
          "bg-sidebar": "#2A2E3F",
          "bg-blue": "#1837E0",
          "bg-orange": "#FF621E",
          "blue-1": "#3E80EB",
          "red-1": "#EF4B4B",
        },
      },
    },
  },
});
