<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="activeNote"
      class="h-full | flex flex-col"
    >
      <div class="flex-1 | md:flex">
        <section class="flex-1">
          <!-- Esto lo hacemos siguiendo esto: https://vuejs.org/guide/components/events.html#usage-with-v-model -->
          <ActiveNoteMD
            v-model:body="activeNote.body"
            @update:body="updateNote"
            @blur-note="blurNote"
            class="min-h-1/4 w-full h-full p-3 | bg-gray-100 | rounded-md md:(rounded-none rounded-l-md)"
          />
        </section>
        <ActiveNoteHTML
          :body="activeNote.body"
          class="min-h-1/4 p-3 | bg-gray-800 text-white | flex-1 | rounded-md md:(rounded-none rounded-r-md)"
        />
      </div>
      <!-- Note Info and actions -->
      <section class="mt-3 mr-3 | flex flex-col md:flex-row justify-between items-center">
        <div class="text-xs mb-3 sm:mb-0">
          Created on {{ noteDate }}, contains {{ noteLength }} words
        </div>
        <div>
          <a
            @click="deleteNote"
            href="#"
            class="py-1 px-3 mr-3 | text-red-700 rounded-md"
            >Delete note</a
          >
          <a
            @click="closeNote"
            href="#"
            class="py-1 px-3 | bg-gray-200 rounded-md"
            >Close note</a
          >
        </div>
      </section>
    </div>
    <div
      v-else
      class="h-full | md:flex justify-center items-center"
    >
      Please select a note to start editing o &nbsp;<a
        @click="createNote"
        href="#"
        class="underline font-bold"
      >
        create a note</a
      >
      &nbsp;📝
    </div>
  </transition>
</template>

<script>
  import { computed } from 'vue'
  import debounce from 'lodash/debounce'
  import NoteStore from '@/stores/notes'
  import ActiveNoteHTML from './ActiveNoteHTML.vue'
  import ActiveNoteMD from './ActiveNoteMD.vue'

  export default {
    name: 'ActiveNote',

    components: {
      ActiveNoteHTML,
      ActiveNoteMD,
    },

    setup() {
      const noteStore = NoteStore()

      const activeNote = computed(() =>
        noteStore.activeNote ? noteStore.getNoteById(noteStore.activeNote) : null
      )

      // Al usar debounce lo que hacemos es que n o se actualice cada cierto tiempo, si no cada x ms una ves dejemos de escribir, de esta manera no sobrecargamos...
      const updateNote = debounce(
        (value) =>
          noteStore.updateNote({
            id: activeNote.value.id,
            body: value,
          }),
        500
      )

      // puedo tocar el estado directamente, pero para eso hemos hecho esta función...
      const closeNote = () => noteStore.setActiveNote()

      const createNote = async () => await noteStore.createNote()

      // const deleteNote = () => noteStore.deleteNote()
      const deleteNote = () => noteStore.setDeleting(true)

      const blurNote = (value) => !value.length && deleteNote()

      return {
        // Podríamos devolver activeNote directamente pero luego habrá consultas remotas...
        activeNote,
        updateNote,
        closeNote,
        createNote,
        deleteNote,
        blurNote,
        // el id es el instante de creación...
        noteDate: computed(() => new Date(activeNote.value.createdAt).toLocaleString()),
        // https://regex101.com/
        // Vamos a dividir (crear un array) por elementos que no sea palabras o numeros
        noteLength: computed(() => activeNote.value.body.split(/\W+/).length),
      }
    },
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
