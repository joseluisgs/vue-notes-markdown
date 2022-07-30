import { defineStore } from 'pinia'
import removeMd from 'remove-markdown'
import { auth, providerGoogle, db, notesCollection } from '@/services/Firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { query, onSnapshot, collection, where, doc, setDoc, updateDoc } from 'firebase/firestore'

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
      return removeMd(body.substring(0, 30))
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
    setNotes(newNotes) {
      this.notes = newNotes
    },

    setActiveNote(noteId = null) {
      this.activeNote = noteId
      console.log(`Nota activa es: ${this.activeNote}`)
    },

    async updateNote({ id, body }) {
      try {
        // Tenemos la referencia del documento...
        // console.log('update note: ' + id)
        const noteRef = doc(collection(db, notesCollection), id)
        // console.log('New Note to update -> ', noteRef.id)
        await updateDoc(noteRef, { body: body })
        // console.log('Nota actualizada con ID: ', noteRef.id)
      } catch (error) {
        throw new Error(error.message)
      }
    },

    async createNote() {
      try {
        // Como quiero la id, obtengo la id del documento generada
        const noteRef = doc(collection(db, notesCollection))
        const newNote = {
          id: noteRef.id,
          body: '',
          uid: this.user.uid,
          createdAt: Date.now(),
        }
        // console.log('New Note to add -> ', newNote)
        await setDoc(noteRef, newNote)
        // console.log('Nota salvada con ID: ', noteRef.id)
        this.setActiveNote(noteRef.id)
      } catch (error) {
        throw new Error(error.message)
      }
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
        this.setUser(null)
        this.setNotes([])
      } catch (error) {
        throw new Error(error.message)
      }
    },

    checkAuth() {
      auth.onAuthStateChanged((user) => {
        this.setUser(user)
        // Si estamos logueados, cargamos las notas
        if (user) {
          this.getNotes()
        }
      })
    },

    // https://stackoverflow.com/questions/47043651/this-document-does-not-exist-and-will-not-appear-in-queries-or-snapshots-but-id
    async getNotes() {
      // Obtener ideas en tiempos real, primero la consulta, luego la recorro y la guardo en el array
      const q = query(
        collection(db, notesCollection),
        // Order
        // orderBy('createdAt', 'desc'),
        // Solo las de este usuario uid
        where('uid', '==', this.user.uid)
      )

      onSnapshot(q, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data())
          let { body, uid, createdAt } = doc.data()
          notes.push({
            id: doc.id,
            uid,
            body,
            createdAt,
          })
        })
        this.setNotes(notes)
      })
    },
  },
})

export default NoteStore
