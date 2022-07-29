<template>
  <NoteListItem
    v-for="note in notes"
    :key="note.id"
    :note="note"
    class="p-3 my-4 | border-2 border-white bg-gray-300 shadow-xl rounded-md | cursor-pointer"
  />
</template>

<script>
import { computed } from 'vue'
import NoteStore from '@/stores/notes.js'
import NodeListItem from '@/components/NoteListItem.vue'

export default {
  name: 'NoteList',

  components: {
    NoteListItem: NodeListItem,
  },

  setup() {
    const noteStore = NoteStore()

    // Exponemos lo que queremos :)
    return {
      // con computed obtengo el valor real computado...
      notes: computed(() => noteStore.getNotesBySearchTerm()),
    }
  },
}
</script>
