<template>
  <main>
    <div v-if="user_chose_login">
      <div>
        <h1>Inicia sessión</h1>
      </div>
      <form @submit.prevent="loginUser" >
        <div>
          <input type="email" name="" id="" placeholder="Introduce tu email" required v-model="email">

        </div>
        <div>
          <input type="text" placeholder="Introduce contraseña. Minimum 6 symbolos" required v-model="password">
        </div>

        <p v-if="error">{{ error }}</p>
        <p v-if="success">{{ success }}</p>


        <button type="submit">Iniciar sessión</button>
      </form>
      <div>
        <p>Si no tienes una cuenta </p>
        <button type="button" @click="goRegister">Ir a register</button>
      </div>
    </div>
    <div v-else>
      <div>
        <h1>Registrate</h1>
      </div>
      <form @submit.prevent="registerUser" >
        <div>
          <input type="email" name="" id="" placeholder="Introduce tu email" required v-model="email">

        </div>
        <div>
          <input type="password" placeholder="Introduce contraseña. Minimum 6 symbolos" required v-model="password">
        </div>

        <p v-if="error">{{ error }}</p>
        <p v-if="success">{{ success }}</p>


        <button type="submit">Registrate</button>
      </form>
      <div>
        <p>Si  tienes una cuenta </p>
        <button type="button" @click="goRegister">Ir a login</button>
      </div>
    </div>

  </main>

</template>

<script setup>
  import { registrar, login, enviarEmailVerificacion } from '@/servicios/autenticacion.js';
  import { ref } from 'vue';

  const email = ref('')
  const password = ref('')
  const error = ref('')
  const success = ref('')

  const user_chose_login = ref(true)

  const goRegister = ()=> {
    user_chose_login.value = !user_chose_login.value
  }

  const loginUser = async () => {
    error.value = ''
    success.value = ''

    const resultado = await login(email.value, password.value)
    if (resultado.ok){
      success.value = resultado.mensaje
      email.value = ''
      password.value = ''

    } else {
      error.value = resultado.error
      return
    }
  }

  const registerUser = async ()=> {
    error.value = ''
    success.value = ''

    const resultado = await registrar(email.value, password.value)
    if (resultado.ok){
      success.value = resultado.mensaje
      const usuario = resultado.usuario.user
      await enviarEmailVerificacion(usuario)
      email.value = ''
      password.value = ''

    } else {
      error.value = resultado.error
      return
    }

  }

</script>

<style>

</style>
