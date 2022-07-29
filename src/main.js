import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'virtual:windi.css'
import 'virtual:windi-devtools'

import './assets/styles/base.css'

// Creamos la aplicación
const app = createApp(App)

// Le metemos los plugins que necesita: router y store pinia
app.use(createPinia())
app.use(router)

app.mount('#app')
