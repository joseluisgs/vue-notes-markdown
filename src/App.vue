<script>
import NoteList from '@/components/NoteList.vue'

export default {
  name: 'App',
  components: {
    NoteList,
  },
}
</script>

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
      <p>Active Note</p>
    </section>
  </div>
</template>

<style scoped>
/** Mis estilos */
.dev {
  border: 1px solid red;
}
</style>
