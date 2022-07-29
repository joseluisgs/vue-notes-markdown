<template>
  <div v-if="activeNote" class="h-full | flex flex-col">
    <div class="flex-1 | flex">
      <section class="flex-1">
        <!-- Esto lo hacemos siguiendo esto: https://vuejs.org/guide/components/events.html#usage-with-v-model -->
        <ActiveNoteMD v-model:body="activeNote.body" @blur-note="blurNote" class="w-full h-full p-3 | bg-gray-200" />
      </section>
      <ActiveNoteHTML :body="activeNote.body" class="p-3 | bg-gray-900 text-white | flex-1" />
    </div>
    <!-- Note Info and actions -->
    <section class="mt-3 | flex justify-end">
      <a @click="deleteNote" href="#" class="py-1 px-3 mr-3 | text-red-700 rounded-md">Delete note</a>
    </section>
    <section class="mt-3 | flex justify-end">
      <a @click="closeNote" href="#" class="py-1 px-3 | bg-gray-200 rounded-md">Close note</a>
    </section>
  </div>
  <div v-else class="h-full | flex justify-center items-center">
    Please select a note to start editing o &nbsp;<a @click="createNote" href="#" class="underline font-bold"> create a note</a> &nbsp;📝
  </div>
</template>

<script>
import { computed } from 'vue'

import NoteStore from '@/stores/notes'
import ActiveNoteHTML from './ActiveNoteHTML.vue'
import ActiveNoteMD from './ActiveNoteMD.vue'

export default {
  name: 'ActiveNote',

  components: {
    ActiveNoteHTML,
    ActiveNoteMD,
  },

  setup() {
    const noteStore = NoteStore()

    const activeNote = computed(() => (noteStore.activeNote ? noteStore.getNoteById(noteStore.activeNote) : null))

    const updateNote = ($event) => {
      noteStore.updateNote({
        id: activeNote.value.id,
        body: $event.target.value,
      })
    }

    // puedo tocar el estado directamente, pero para eso hemos hecho esta función...
    const closeNote = () => noteStore.setActiveNote()

    const createNote = () => noteStore.createNote()

    const deleteNote = () => noteStore.deleteNote()

    const blurNote = (value) => !value.length && deleteNote()

    return {
      // Podríamos devolver activeNote directamente pero luego habrá consultas remotas...
      activeNote,
      updateNote,
      closeNote,
      createNote,
      deleteNote,
      blurNote,
    }
  },
}
</script>
