import { defineConfig } from 'vite-plugin-windicss'
// Plugins opcionales si quieres mejorarlo: https://windicss.org/plugins/transform.html
import typography from 'windicss/plugin/typography'
import forms from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  plugins: [typography, forms],
  theme: {
    fontFamily: {
      sans: ['Ubuntu', 'ui-sans-serif', 'system-ui'],
      serif: ['Montserrat', 'ui-serif', 'Georgia'],
      mono: ['Fira Sans', 'ui-monospace', 'SFMono-Regular'],
    },
    minHeight: {
      0: '0',
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      full: '100vh',
    },
  },
})
