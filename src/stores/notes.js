import { defineStore } from 'pinia'

const NoteStore = defineStore({
  id: 'NoteStore',

  // Estado de nuestra store
  state: () => ({
    notes: [], // array de notas
    activeNote: null, // nota activa
  }),

  // Operaciones sobre el estado
  getters: {
    // getter para que me devuleva la nota que coincide....
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id)
    },
  },

  // Acciones y mutaciones...
  actions: {
    fetchNotes(newNotes) {
      this.notes = newNotes
    },
    setActiveNote(noteId = null) {
      this.activeNote = noteId
    },
  },
})

export default NoteStore
