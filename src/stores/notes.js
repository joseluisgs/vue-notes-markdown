import { defineStore } from 'pinia'
import removeMd from 'remove-markdown'

const NoteStore = defineStore({
  id: 'NoteStore',

  // Estado de nuestra store
  state: () => ({
    notes: [], // array de notas
    activeNote: null, // nota activa
    deleting: false, // estado de eliminación
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
  },

  // Acciones y mutaciones...
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
  },
})

export default NoteStore
