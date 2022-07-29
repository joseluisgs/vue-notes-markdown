<template>
  <div class="dev | container | p-3 my-3 mx-auto | flex">
    <!-- parte izquierda -->
    <section class="dev | w-1/4 p-3 mr-3">
      <!-- busquedas de notas -->
      <p>Search Notes</p>
      <!-- Lista de notas -->
      <NoteList />
    </section>
    <!-- parte derecha flex grow para que crezca todo-->
    <section class="dev | p-3 flex-grow">
      <!-- nota activa -->
      <ActiveNote />
    </section>
  </div>
</template>

<script>
import NoteList from '@/components/NoteList.vue'
import ActiveNote from '@/components/ActiveNote.vue'

export default {
  name: 'App',
  components: {
    NoteList,
    ActiveNote,
  },
}
</script>

<style scoped>
/** Mis estilos */
</style>
