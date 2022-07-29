<template>
  <!-- Delete note -->
  <DeleteNote v-if="noteStore.deleting" />
  <div class="container | min-h-1/2 p-3 my-3 mx-auto | bg-white rounded-xl shadow-2xl | flex">
    <!-- parte izquierda -->
    <section class="w-1/4 p-3 mr-3 | bg-gray-100">
      <!-- busquedas de notas -->
      <SearchNote />
      <!-- Lista de notas -->
      <NoteList />
    </section>
    <!-- parte derecha flex grow para que crezca todo-->
    <section class="p-3 | flex-grow">
      <!-- nota activa -->
      <ActiveNote />
    </section>
  </div>
</template>

<script>
  import NoteList from '@/components/NoteList.vue'
  import ActiveNote from '@/components/ActiveNote.vue'
  import DeleteNote from '@/components/DeleteNote.vue'
  import NoteStore from '@/stores/notes'
  import SearchNote from '@/components/SearchNote.vue'

  export default {
    name: 'App',
    components: {
      NoteList,
      ActiveNote,
      DeleteNote,
      SearchNote,
    },

    setup() {
      const noteStore = new NoteStore()

      return {
        noteStore,
      }
    },
  }
</script>
