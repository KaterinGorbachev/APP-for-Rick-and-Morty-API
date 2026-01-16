<template>
  <main class="bg-[#b0bbe7] w-full flex flex-col p-[2rem] gap-[1rem]">
    <router-link to="/" class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Ir a inicio</router-link>
    <h1 class="text-3xl font-bold underline">¡Bienvinido de nuevo!</h1>
    <p>{{ usuario?.email }}</p>
    <button @click="logoutUser" class="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer" >Log out</button>
    <p v-if="!usuario?.emailVerified">
      Email no está verificado. Verificalo en tu email. Nuestro mensaje puede estar en Spam.
    </p>
    <div v-if="favoritos" class="flex w-full flex-wrap gap-[1rem]">
      <PertsonajeCard
        v-for="item in favoritos_details"
        :key="item.id"
        :name="item.name"
        :img="item.image"
        :sex="item.gender"
        :state="item.status"
        :id="item.id"
        label="✨"
      />
    </div>
    <div></div>
  </main>
</template>

<script setup>
import PertsonajeCard from '@/components/PertsonajeCard.vue'
import { obtenerUsuario, logout } from '@/servicios/autenticacion.js'
import { ref, onMounted } from 'vue'
import { obtenerPerfilUsuario } from '@/servicios/perfilUsuario'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref(null)
const favoritos = ref([])
let personajes = ref([])
let favoritos_details = ref([])

const getPersonajes = async () => {
  const resultado = await axios.get('https://rickandmortyapi.com/api/character')
  console.log(resultado.data.results)
  personajes.value = resultado.data.results
}

const logoutUser = () => {
  const resultado = logout()
  if (resultado.ok) {
    router.push('/')
  }
}

getPersonajes()

onMounted(() => {
  setTimeout(async () => {
    usuario.value = obtenerUsuario()
    const resultado = await obtenerPerfilUsuario(usuario.value.uid)
    console.log(resultado)
    if (resultado.ok) {
      favoritos.value = resultado.perfil.favorites
      //console.log(favoritos.value);
      favoritos.value.forEach((id) => {
        personajes.value.find((personaje) => {
          if (personaje.id == id) {
            favoritos_details.value.push({
              id: personaje.id,
              name: personaje.name,
              image: personaje.image,
              gender: personaje.gender,
              status: personaje.status,
            })
          }
        })
      })
    }
  }, 500)
})
</script>

<style>
@import 'tailwindcss';
</style>
