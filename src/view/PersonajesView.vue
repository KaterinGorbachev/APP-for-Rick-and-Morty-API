<template>
  <main>
    <div>
      <h1>Rick and Morty</h1>
      <h2>personajes</h2>

    </div>
    <section>
      <PertsonajeCard v-for="item in personajes" :key="item.id"
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
  import PertsonajeCard from '@/components/PertsonajeCard.vue';
  import axios from 'axios';

  import { ref } from 'vue';
  import { usuario } from '@/servicios/autenticacion.js';

  let personajes = ref([])
  let favorites = ref([])

  const getPersonajes = async ()=> {
    const resultado = await axios.get('https://rickandmortyapi.com/api/character')
    console.log(resultado.data.results);
    personajes.value = resultado.data.results

  }

  const addFavorites = (props)=> {
    console.log(usuario.value);
    console.log(props);
    favorites.value.push(props.id)
    console.log(favorites);



    if(usuario.value.emailVerified){

      favorites.value.push(props.id)


    }


  }

  getPersonajes()

</script>

<style>
  @import "tailwindcss";

</style>
