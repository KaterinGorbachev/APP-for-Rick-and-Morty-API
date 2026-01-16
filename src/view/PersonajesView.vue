<template>
  <main class="bg-[#00272d] w-full p-[2rem]">
    <div class="flex flex-row w-full justify-between pb-[3rem]">
      <div class="flex flex-col content-center justify-center gap-4">
        <div class="flex flex-row items-end justify-between flex-wrap gap-[1rem]">
          <h1 class="text-4xl md:text-5xl font-extrabold text-lime-400 drop-shadow-[0_0_25px_rgba(163,230,53,0.5)] ">Rick and Morty</h1>
          <h2 class="text-xl font-semibold text-cyan-300 font-['Bebas_Neue'] tracking-widest">personajes</h2>
        </div>
        <p class="text-slate-300 leading-relaxed font-['Shadows_Into_Light'] tracking-widest">Registrate o inicia sessión para crear tu collección de personajes favoritos.</p>
      </div>
      <router-link to="/perfil" v-if="usuario" class="px-6 py-3 rounded-xl font-semibold text-lime-300
         bg-[#00393d] border border-lime-400/40
         hover:bg-slate-800
         hover:border-lime-300
         shadow-[0_0_15px_rgba(163,230,53,0.3)]
         transition-all duration-300 font-['Bebas_Neue'] tracking-widest">Mi perfil</router-link>
      <router-link to="/login" v-else class="px-6 py-3 rounded-xl font-semibold text-lime-300
         bg-[#00393d] border border-lime-400/40
         hover:bg-slate-800
         hover:border-lime-300
         shadow-[0_0_15px_rgba(163,230,53,0.3)]
         transition-all duration-300
         font-['Bebas_Neue'] tracking-widest">Iniciar session</router-link>
    </div>
    <section class="flex w-full flex-wrap gap-[1rem]">
      <PertsonajeCard
        v-for="item in personajes"
        :key="item.id"
        :name="item.name"
        :img="item.image"
        :sex="item.gender"
        :state="item.status"
        :id="item.id"
        label="Añadir a favoritos"
        @action-onclick="addFavorites"
      />
    </section>
  </main>
</template>

<script setup>
import PertsonajeCard from '@/components/PertsonajeCard.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

import { ref, onMounted, computed, watch } from 'vue'
import { usuario } from '@/servicios/autenticacion.js'
import { guardarPerfilUsuario, obtenerPerfilUsuario } from '@/servicios/perfilUsuario.js'
import { useRouter } from 'vue-router'

let router = useRouter()

let personajes = ref([])
let favorites = ref([])

const isAuthenticated = computed(() => !!usuario.value)
const isVerified = computed(() => usuario.value?.emailVerified)

//firebase in function guardarPerfilUsuario expects {} !
const data = ref({
  favorites: []
})


const getPersonajes = async () => {
  const resultado = await axios.get('https://rickandmortyapi.com/api/character')

  personajes.value = resultado.data.results
}


// get favorites from firebase
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


const addFavorites = async (personaje) => {

  // check if the user logged in
  if (!isAuthenticated.value) {
    await Swal.fire({
      icon: 'error',
      title: 'Debes iniciar sesión',
    })
    return router.push('/login')
  }

  // check if the users email verified
  if (!isVerified.value) {
    return Swal.fire('Verifica tu email para añadir favoritos')
  }

  // check if pers was added to favorites
  const alreadyFavorite = favorites.value.includes(personaje.id)
  if (alreadyFavorite) {
    return Swal.fire({
      icon: 'error',
      title: 'Ya está en la colección',
    })
  }

  favorites.value.push(personaje.id)
  data.value.favorites = favorites.value

  const resultado = await guardarPerfilUsuario(usuario.value.uid, data.value)

  if (resultado.ok) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: resultado.mensaje,
      showConfirmButton: false,
      timer: 1500,
    })
  }
}

// check for usuario changings with watch not settimeout -> no time race
watch(usuario, (newUsuario) => {
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
@import 'tailwindcss';
</style>
