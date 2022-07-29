<template>
  <article class="p-3 my-4 | border-2 border-gray-300 rounded-md | cursor-pointer">
    {{ title }}
  </article>
</template>

<script>
import { computed } from 'vue'
import removeMd from 'remove-markdown'
export default {
  name: 'NoteListItem',
  // Necesitamos propiedades para psarle su información
  props: {
    note: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    // Cargamos las librerías propias  o específicas de este componente. A mi me gusta más un import... pero parta gustos colores

    return {
      // Con computed obtengo el valor real computado...
      title: computed(() => removeMd(props.note.body.substring(0, 20))),
    }
  },
}
</script>

<style></style>