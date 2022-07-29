<template>
  <div v-if="activeNote" class="h-full | flex flex-col">
    <div class="flex-1 | flex">
      <section class="flex-1">
        <textarea :value="activeNote.body" @input="updateNote" class="w-full h-full p-3 | bg-gray-200"></textarea>
      </section>
      <ActiveNoteHTML :body="activeNote.body" class="p-3 | bg-gray-900 text-white | flex-1" />
    </div>
    <!-- Note Info and actions -->
    <section class="mt-3 | flex justify-end">
      <a @click="closeNote" href="#" class="bg-gray-200 py-1 px-3 rounded-md">Close note</a>
    </section>
  </div>
  <div v-else class="h-full | flex justify-center items-center">Please select a note to start editing 📝</div>
</template>

<script>
import { computed } from 'vue'

import NoteStore from '@/stores/notes'
import ActiveNoteHTML from './ActiveNoteHTML.vue'

export default {
  name: 'ActiveNote',

  components: {
    ActiveNoteHTML,
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

    const closeNote = () => {
      // puedo tocar el estado directamente, pero para eso hemos hecho esta función...
      noteStore.setActiveNote()
    }

    return {
      // Podríamos devolver activeNote directamente pero luego habrá consultas remotas...
      activeNote,
      updateNote,
      closeNote,
    }
  },
}
</script>
