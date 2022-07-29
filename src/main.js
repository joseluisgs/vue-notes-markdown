import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'

import 'virtual:windi.css'
import 'virtual:windi-devtools'

import './assets/styles/base.css'

// creamos la store con las notas
import notesJson from '@/stores/notes.json'
import NoteStore from '@/stores/notes.js'

// Creamos la aplicación
const app = createApp(App)

// Le metemos los plugins que necesita: router y store pinia
app.use(createPinia())
// app.use(router)

app.mount('#app')

// Cargamos las notas
const noteStore = NoteStore()
noteStore.fetchNotes(notesJson)
console.log(noteStore.notes)
