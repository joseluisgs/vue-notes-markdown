<template>
  <div class="m-3 text-center font-bold text-teal-700 text-2xl">
    <Icon icon="logos:vue" />Vue Notes Markdown
    <Icon icon="logos:markdown" />
  </div>
  <!-- Delete note -->
  <DeleteNote v-if="noteStore.deleting" />
  <div
    v-if="noteStore.user"
    class="container | min-h-1/2 p-3 my-3 mx-auto | bg-white rounded-xl shadow-2xl | md:flex"
  >
    <!-- parte izquierda -->
    <section class="md:w-1/4 p-3 sd:mr-3 | bg-gray-100 rounded-md">
      <!-- Logout -->
      <div class="text-center mb-3">
        <div class="text-center text-emerald-700 font-semibold">
          {{ noteStore.user.displayName }}
        </div>
        👋
        <a
          @click="userLogout()"
          class="underline text-blue-900"
          href="#"
        >
          Logout</a
        >
      </div>
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
  <div
    v-else
    class="container | min-h-1/2 p-3 my-3 mx-auto | bg-white rounded-xl shadow-2xl | flex justify-center items-center"
  >
    🔐&nbsp;
    <a
      @click="userLogin()"
      class="underline"
      href="#"
      >Login</a
    >
    &nbsp;to read your notes
  </div>
  <div class="text-center text-xs">
    Created by
    <Icon
      class="text-red-600"
      icon="ant-design:heart-filled"
    />
    <a
      href="https://joseluisgs.github.io"
      target="_blank"
      >JoseluisGS</a
    >&nbsp;
    <a
      href="https://github.com/joseluisgs"
      target="_blank"
      ><Icon
        class="text-gray-600"
        icon="akar-icons:github-fill"
    /></a>
  </div>
</template>

<script>
  import NoteList from '@/components/NoteList.vue'
  import ActiveNote from '@/components/ActiveNote.vue'
  import DeleteNote from '@/components/DeleteNote.vue'
  import NoteStore from '@/stores/notes'
  import SearchNote from '@/components/SearchNote.vue'
  import { Icon } from '@iconify/vue'

  export default {
    name: 'App',
    components: {
      NoteList,
      ActiveNote,
      DeleteNote,
      SearchNote,
      Icon,
    },

    setup() {
      const noteStore = new NoteStore()

      const userLogin = async () => await noteStore.userLogin()

      const userLogout = async () => await noteStore.userLogout()

      return {
        noteStore,
        userLogin,
        userLogout,
      }
    },
  }
</script>
