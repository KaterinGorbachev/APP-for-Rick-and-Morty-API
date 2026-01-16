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
  import Swal from 'sweetalert2'

  import { ref } from 'vue';
  import { usuario } from '@/servicios/autenticacion.js';
  import { guardarPerfilUsuario } from '@/servicios/perfilUsuario.js';
  import { useRouter } from 'vue-router'

  let router = useRouter()

  let personajes = ref([])
  let favorites = ref([])
  let data = {}

  const getPersonajes = async ()=> {
    const resultado = await axios.get('https://rickandmortyapi.com/api/character')
    console.log(resultado.data.results);
    personajes.value = resultado.data.results

  }

  const addFavorites = async (props)=> {
    //console.log(usuario.value);
    //console.log(props);
    //favorites.value.push(props.id)
    //data.favorites = favorites.value
    //console.log(favorites);

    //const resultado = await guardarPerfilUsuario(usuario.value.uid, data)
    //console.log(resultado.ok, resultado.mensaje);

    if (usuario.value){
      if(usuario.value.emailVerified){

        favorites.value.push(props.id)
        data.favorites = favorites.value
        const resultado = await guardarPerfilUsuario(usuario.value.uid, data)
        if(resultado.ok){

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: resultado.mensaje,
            showConfirmButton: false,
            timer: 1500
          });

        }

      } else {
        Swal.fire("Tu email no está verificado. Verifica tu email para añadir a favoritos.");
      }


    } else {
      Swal.fire({
        title: "❌",
        text: "Debes inciciar session para añadir a favoritos",
        type: "error"
      }).then(function() {
        router.push('/login');
      });
      }


  }

  getPersonajes()

</script>

<style>
  @import "tailwindcss";

</style>
