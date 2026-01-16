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
        label="Añadir a favoritos"

      />

    </section>


  </main>

</template>

<script setup>
  import PertsonajeCard from '@/components/PertsonajeCard.vue';
  import axios from 'axios';

  import { ref } from 'vue';

  let personajes = ref([])

  const getPersonajes = async ()=> {
    const resultado = await axios.get('https://rickandmortyapi.com/api/character')
    console.log(resultado.data.results);
    personajes.value = resultado.data.results

  }

  getPersonajes()

</script>

<style>
  @import "tailwindcss";

</style>
