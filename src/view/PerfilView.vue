<template>
  <main class="min-h-screen bg-[#7fdfd7] w-full flex flex-col p-[2rem] gap-[1rem]">
    <router-link to="/" class="px-6 py-3 rounded-xl font-semibold text-lime-300 bg-[#00393d] border border-lime-400/40
   hover:bg-slate-800
   hover:border-lime-300
    shadow-[0_0_15px_rgba(163,230,53,0.3)]
    transition-all duration-300 font-['Bebas_Neue'] tracking-widest">Ir a inicio</router-link>
    <div class="flex gap-[1rem] items-end ">
      <h1 class="text-4xl md:text-5xl font-extrabold text-[#00684eae] drop-shadow-[0_0_25px_rgba(163,230,53,0.5)] ">¡Bienvinido de nuevo!</h1>
      <h2 class="text-3xl font-semibold text-[#00615f] ">tu collección</h2>
    </div>
    <div class="flex flex-row gap-1.5 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5" ><path d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" fill="currentColor"/></svg>
      <p class="text-xl font-semibold text-[#003d3c] ">{{ usuario?.email }}</p>
    </div>


    <button @click="logoutUser" class="rounded-md border border-slate-300 py-2 px-4 text-start text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer w-[200px]" >Log out</button>
    <p v-if="!isVerified">
      Email no está verificado. Verificalo en tu email. Nuestro mensaje puede estar en Spam.
    </p>

    <div v-if="favorites.length" class="flex w-full flex-wrap gap-[1rem]">

      <PertsonajeCard
        v-for="item in favoritos_details"
        :key="item.id"
        :name="item.name"
        :img="item.image"
        :sex="item.gender"
        :state="item.status"
        :id="item.id"
        label="Borrar desde favoritos"
        @action-onclick="borrarFavoritos"
      />
    </div>
    <div v-if="!favorites.length" class="flex flex-col gap-8">
      <p class="text-xl font-semibold text-[#000000] font-['Shadows_Into_Light'] tracking-widest" >
      No tienes personajes favoritos aún.
      </p>
      <img src="/public/undraw_stars_5pgw.svg" alt="space" class="h-48 w-96">

    </div >

  </main>
</template>

<script setup>
import PertsonajeCard from '@/components/PertsonajeCard.vue'
import { usuario, logout } from '@/servicios/autenticacion.js'
import { ref, onMounted, computed, watch } from 'vue'
import { obtenerPerfilUsuario, guardarPerfilUsuario } from '@/servicios/perfilUsuario'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const favorites = ref([])
let personajes = ref([])

const isVerified = computed(() => usuario.value?.emailVerified)

//firebase in function guardarPerfilUsuario expects {} !
const data = ref({
  favorites: []
})

const getPersonajes = async () => {
  const resultado = await axios.get('https://rickandmortyapi.com/api/character')

  personajes.value = resultado.data.results
}

const borrarFavoritos = async(personaje) => {

  favorites.value = favorites.value.filter(id => id !== personaje.id)
  data.value.favorites = favorites.value

  const resultado = await guardarPerfilUsuario(usuario.value.uid, data.value)
  if (resultado.ok) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Favoritos ha actualizado con exito',
      showConfirmButton: false,
      timer: 1500,
    })
  }


}


// always async as it is for firebase
const logoutUser = async () => {
  const resultado = await logout()
  if (resultado.ok) {
    router.push('/')
  }
}

const getFavorites = async (userID) => {
  try{
    const resultado = await obtenerPerfilUsuario(userID)

    if (resultado.ok && resultado.perfil?.favorites) {
      favorites.value = resultado.perfil.favorites
    }

  } catch (error) {
    console.log(error);

  }

}

const favoritos_details = computed(() => {
  return personajes.value.filter(p =>
    favorites.value.includes(p.id)
  )
})

watch((usuario), (newUsuario) => {
  if (newUsuario?.uid) {
    getFavorites(newUsuario.uid)
  }
}, { immediate: true })

// axios request after page fully loaded
onMounted(() => {
  getPersonajes()

})


</script>

<style>

</style>
