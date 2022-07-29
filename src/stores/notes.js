import { defineStore } from 'pinia'

const NoteStore = defineStore({
  id: 'NoteStore',

  state: () => ({
    notes: null,
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },

  actions: {
    fetchNotes(newNotes) {
      this.notes = newNotes
    },
  },
})

export default NoteStore
