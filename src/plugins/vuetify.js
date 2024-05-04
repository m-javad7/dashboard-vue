/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { fa } from 'vuetify/locale'
// Composables
import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDateInput,
  },

  locale: {
    locale: 'fa',
    fallback: 'fa',
    messages: { fa },
    rtl: {fa: true},
  },
  rtl: true,
  theme: {
    // defaultTheme: 'dark',
  },
})
