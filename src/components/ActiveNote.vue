<template>
  <div class="h-full | flex items-stretch">
    <section class="flex-1">
      <textarea v-if="activeNote" :value="activeNote.body" @input="updateNote" class="w-full h-full p-3 | bg-gray-200"></textarea>
    </section>
    <article class="p-3 | bg-gray-900 text-white | flex-1">HTML will be here</article>
  </div>
</template>

<script>
import { computed } from 'vue'
import NoteStore from '@/stores/notes'

export default {
  name: 'ActiveNote',

  setup() {
    const noteStore = NoteStore()

    const activeNote = computed(() => (noteStore.activeNote ? noteStore.getNoteById(noteStore.activeNote) : null))

    const updateNote = ($event) => {
      noteStore.updateNote({
        id: activeNote.value.id,
        body: $event.target.value,
      })
    }

    return {
      // Podríamos devolver activeNote directamente pero luego habrá consultas remotas...
      activeNote,
      updateNote,
    }
  },
}
</script>
