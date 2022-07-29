<template>
  <NoteListItem v-for="note in notes" :key="note.id" :note="note" />
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
      notes: computed(() => noteStore.notes),
    }
  },
}
</script>

<style>
</style>