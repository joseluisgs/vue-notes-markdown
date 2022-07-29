<template>
  <article @click="setActiveNote">
    {{ title }}
  </article>
</template>

<script>
import { computed } from 'vue'
import removeMd from 'remove-markdown'
import NoteStore from '@/stores/notes'
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
    const noteStore = NoteStore()

    return {
      // Con computed obtengo el valor real computado...
      title: computed(() => removeMd(props.note.body.substring(0, 20))),
      setActiveNote: () => noteStore.setActiveNote(props.note.id),
    }
  },
}
</script>
