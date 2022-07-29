<template>
  <input
    v-model="searchTerm"
    type="search"
    placeholder="search notes"
    class="w-full p-2 | border-2 rounded-md"
  />
</template>

<script>
  import { computed } from 'vue'
  import NoteStore from '@/stores/notes'
  export default {
    name: 'SearchNote',

    setup() {
      const noteStore = NoteStore()

      const searchTerm = computed({
        get: () => noteStore.searchTerm,
        set: (value) => noteStore.setSearchTerm(value),
      })

      return {
        searchTerm,
      }
    },
  }
</script>
