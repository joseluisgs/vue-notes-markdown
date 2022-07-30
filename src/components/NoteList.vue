<template>
  <!-- Animacion -->
  <transition-group name="list-complete">
    <NoteListItem
      v-for="note in notes"
      :key="note.id"
      :note="note"
      class="list-complete-item p-3 my-4 | border-2 border-white bg-gray-300 shadow-xl rounded-md | cursor-pointer"
    />
  </transition-group>
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
<!-- https://vuejs.org/guide/built-ins/transition-group.html -->
<style scoped>
  .list-complete-item {
    transition: all 0.8s ease;
  }
  .list-complete-enter-from,
  .list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: relative;
  }
</style>
