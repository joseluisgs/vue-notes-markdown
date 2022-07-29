<template>
  <!-- Esto lo hacemos siguiendo esto: https://vuejs.org/guide/components/events.html#usage-with-v-model -->
  <textarea :value="body" @input="$emit('update:body', $event.target.value)"></textarea>
</template>

<script>
export default {
  name: 'ActiveNoteMD',

  props: {
    body: {
      type: String,
      required: true,
    },
  },

  emits: ['update:body'],
}
</script>
