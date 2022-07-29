<template>
  <!-- Esto lo hacemos siguiendo esto: https://vuejs.org/guide/components/events.html#usage-with-v-model -->
  <textarea ref="textarea" :value="body" @input="$emit('update:body', $event.target.value)" @blur="$emit('blur-note', $event.target.value)" />
</template>

<script>
import { ref, onMounted, onUpdated } from 'vue'
export default {
  name: 'ActiveNoteMD',

  props: {
    body: {
      type: String,
      required: true,
    },
  },

  emits: ['update:body', 'blur-note'],

  setup() {
    // Refereciamos el componente HTML del dom
    const textarea = ref(null)
    const focusTextarea = () => textarea.value.focus()

    // siempre que lo montemos o actualicemos nos traemos el focus
    onMounted(focusTextarea)
    onUpdated(focusTextarea)

    return {
      textarea,
    }
  },
}
</script>
