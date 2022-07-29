<template>
  <div v-if="activeNote" class="h-full | flex flex-col">
    <div class="flex-1 | flex">
      <section class="flex-1">
        <textarea :value="activeNote.body" @input="updateNote" class="w-full h-full p-3 | bg-gray-200"></textarea>
      </section>
      <article v-html="markdown" class="p-3 | bg-gray-900 text-white | flex-1 | mdscss"></article>
    </div>
    <!-- Note Info and actions -->
    <section class="mt-3 | flex justify-end">
      <a @click="closeNote" href="#" class="bg-gray-200 py-1 px-3 rounded-md">Close note</a>
    </section>
  </div>
  <div v-else class="h-full | flex justify-center items-center">Please select a note to start editing 📝</div>
</template>

<script>
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import NoteStore from '@/stores/notes'

export default {
  name: 'ActiveNote',

  setup() {
    const noteStore = NoteStore()

    const activeNote = computed(() => (noteStore.activeNote ? noteStore.getNoteById(noteStore.activeNote) : null))

    const updateNote = ($event) => {
      noteStore.updateNote({
        id: activeNote.value.id,
        body: $event.target.value,
      })
    }

    const closeNote = () => {
      // puedo tocar el estado directamente, pero para eso hemos hecho esta función...
      noteStore.setActiveNote()
    }
    // Para trasformar markdown a html y lo sanetizamos??? (vaya palabrajo!!!) para que el usuario no meta nada raro...
    const markdown = computed(() => (activeNote.value ? marked(DOMPurify.sanitize(activeNote.value.body)) : null))

    return {
      // Podríamos devolver activeNote directamente pero luego habrá consultas remotas...
      activeNote,
      updateNote,
      closeNote,
      markdown,
    }
  },
}
</script>

<style scoped>
.mdscss {
  font-size: 1rem;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
}
.mdscss h1 {
  font-size: 3.375em;
  font-weight: bold;
}
.mdscss h2 {
  font-size: 2.25em;
  font-weight: bold;
}
.mdscss h3 {
  font-size: 1.5em;
  font-weight: bold;
}
.mdscss h4 {
  font-size: 1rem;
  font-weight: bold;
}
.mdscss strong {
  font-weight: bold;
}
.mdscss em {
  font-style: italic;
}
.mdscss small {
  font-size: 0.667em;
}
.mdscss code {
  font-family: Consolas, monaco, monospace;
}
.mdscss li {
  line-height: 1.5em;
}
.mdscss p {
  line-height: 1.5em;
}
.mdscss blockquote {
  margin-left: 0;
  padding-left: 0.5rem;
  border-left: 0.5rem solid #ddd;
}
.mdscss pre {
  background: #f8f8f8;
  padding: 1em;
}
.mdscss * + * {
  margin-top: 1.5rem;
}
.mdscss li + li {
  margin-top: 0;
}
</style>
