import { defineStore } from 'pinia'
import removeMd from 'remove-markdown'
import { auth, providerGoogle } from '@/services/Firebase'
import { signInWithPopup, signOut } from 'firebase/auth'

const NoteStore = defineStore({
  id: 'NoteStore',

  // Estado de nuestra store
  state: () => ({
    notes: [], // array de notas
    activeNote: null, // nota activa
    deleting: false, // estado de eliminación
    searchTerm: '', // término de búsqueda
    user: null, // usuario actual
  }),

  // Operaciones sobre el estado
  getters: {
    // getter para que me devuleva la nota que coincide....
    getNoteById: (state) => (noteId) => {
      return state.notes.find((note) => note.id === noteId)
    },

    getNoteTitle: (state) => (noteId) => {
      const id = noteId ? noteId : state.activeNote
      const body = state.notes.find((note) => note.id === id).body
      return removeMd(body.substring(0, 20))
    },

    getNotesBySearchTerm: (state) => () => {
      let filter = new RegExp(state.searchTerm, 'i') // patron de búsqueda ignorando mayúsculas o minúsculas
      return state.notes.filter((note) => note.body.match(filter))
    },
  },

  // Acciones y mutaciones...
  // Con pinia no es necesario hacer tabntos set porque podemos tocar el estado... pero así encapuslo la
  // lógica de cómo acceder y tocar dicho estado.
  actions: {
    fetchNotes(newNotes) {
      this.notes = newNotes
    },

    setActiveNote(noteId = null) {
      this.activeNote = noteId
    },

    updateNote({ id, body }) {
      const noteToUpdate = this.notes.find((note) => note.id === id)
      noteToUpdate.body = body
    },

    createNote() {
      const newNote = {
        id: Date.now(),
        body: '',
      }
      this.notes.unshift(newNote)
      this.setActiveNote(newNote.id)
    },

    deleteNote() {
      const index = this.notes.findIndex((note) => note.id === this.activeNote)
      this.notes.splice(index, 1)
      this.activeNote = null
      this.deleting = false
    },

    setDeleting(deleting) {
      this.deleting = deleting
    },

    setSearchTerm(searchTerm) {
      this.searchTerm = searchTerm
    },

    setUser(user) {
      this.user = user
      console.log()
    },

    async userLogin() {
      try {
        await signInWithPopup(auth, providerGoogle)
      } catch (error) {
        throw new Error(error.message)
      }
    },

    async userLogout() {
      try {
        await signOut(auth)
        this.user = null
      } catch (error) {
        throw new Error(error.message)
      }
    },

    checkAuth() {
      auth.onAuthStateChanged((user) => {
        this.setUser(user)
      })
    },
  },
})

export default NoteStore
