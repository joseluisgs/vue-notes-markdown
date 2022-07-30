import { defineStore } from 'pinia'
import removeMd from 'remove-markdown'
import { auth, providerGoogle, db, userCollections, notesCollection } from '@/services/Firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import {
  query,
  onSnapshot,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

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
      // buscamos la nota y si existe obtenemos el título
      const note = state.notes.find((note) => note.id === id)
      if (note) {
        return removeMd(note.body.substring(0, 30))
      }
    },

    getNotesBySearchTerm: (state) => () => {
      let filter = new RegExp(state.searchTerm, 'i') // patron de búsqueda ignorando mayúsculas o minúsculas
      return (
        state.notes
          // Filtramos por las que tengan esa expresión regular
          .filter((note) => note.body.match(filter))
          // Ordenamos de mas moderna a antigua
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      )
      // ordenamos por fecha
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
      // console.log(`Nota activa es: ${this.activeNote}`)
    },

    async updateNote({ id, body }) {
      try {
        // Tenemos la referencia del documento...
        //console.log(`update note: ${id}`)
        const noteRef = doc(collection(db, userCollections, this.user.uid, notesCollection), id)
        // console.log('New Note to update -> ', noteRef.id)
        await updateDoc(noteRef, { body: body })
        // console.log('Nota actualizada con ID: ', noteRef.id)
      } catch (error) {
        throw new Error(error.message)
      }
    },

    async createNote() {
      try {
        // Como quiero la id, obtengo la id del documento generada db/users/id/notes
        const noteRef = doc(collection(db, userCollections, this.user.uid, notesCollection))
        const newNote = {
          id: noteRef.id,
          body: '',
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

    async deleteNote() {
      try {
        // Tenemos la referencia del documento...
        // console.log(`delete note: ${this.activeNote}`)
        const noteRef = doc(
          collection(db, userCollections, this.user.uid, notesCollection),
          this.activeNote
        )
        // console.log('New Note to delete -> ', noteRef.id)
        await deleteDoc(noteRef)
        this.activeNote = null
        this.deleting = false
      } catch (error) {
        throw new Error(error.message)
      }
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
      // Obtenemos la subcoleccion de notas dentro de usuarios; db(userColección(uid).collection(notas)), todo en la misma
      // como escribir el path db/usuarios/id/notas
      const q = query(collection(db, userCollections, this.user.uid, notesCollection))
      // Obtener notas  en tiempos real, primero la consulta, luego la recorro y la guardo en el array
      // Lo haría así si no uso subcolecciones.... pero al usarlas ya no hace falta filtar por usuario
      // const q = query(
      //   collection(db, notesCollection),
      //   // Order
      //   // orderBy('createdAt', 'desc'),
      //   // Solo las de este usuario uid
      //   where('uid', '==', this.user.uid)
      // )

      onSnapshot(q, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data())
          let { body, createdAt } = doc.data()
          notes.push({
            id: doc.id,
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
