<template>
  <main class="bg-[#eeeeee] w-full h-screen">
    <div v-if="user_chose_login">
      <div>
        <h1 class="text-5xl text-[#1a0023]">Inicia sessión</h1>
      </div>
      <form @submit.prevent="loginUser" class="flex flex-col gap-2 pt-5">
        <div class="w-full max-w-sm min-w-[200px]">
          <input
            type="email"
            name=""
            id=""
            placeholder="Introduce tu email"
            required
            v-model="email"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          />
        </div>
        <div class="w-full max-w-sm min-w-[200px]">
          <input
            type="text"
            placeholder="Introduce contraseña. Minimum 6 symbolos"
            required
            v-model="password"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          />
        </div>

        <p v-if="error">{{ error }}</p>
        <p v-if="success">{{ success }}</p>

        <button type="submit" class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 w-[200px] cursor-pointer">Iniciar sessión</button>
      </form>
      <div class="flex flex-col p-1">
        <p>Si no tienes una cuenta</p>
        <button type="button" @click="goRegister" class="cursor-pointer rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-[200px]">Ir a register</button>
      </div>
    </div>
    <div v-else>
      <div>
        <h1 class="text-5xl text-[#1a0023]">Registrate</h1>
      </div>
      <form @submit.prevent="registerUser" class="flex flex-col gap-2 pt-5">
        <div class="w-full max-w-sm min-w-[200px]">
          <input
            type="email"
            name=""
            id=""
            placeholder="Introduce tu email"
            required
            v-model="email"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          />
        </div>
        <div class="w-full max-w-sm min-w-[200px]">
          <input
            type="password"
            placeholder="Introduce contraseña. Minimum 6 symbolos"
            required
            v-model="password"
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          />
        </div>

        <p v-if="error">{{ error }}</p>
        <p v-if="success">{{ success }}</p>

        <button type="submit" class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 w-[200px] cursor-pointer">Registrate</button>
      </form>
      <div>
        <p>Si tienes una cuenta</p>
        <button type="button" @click="goRegister" class="cursor-pointer rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-[200px]">Ir a login</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { registrar, login, enviarEmailVerificacion } from '@/servicios/autenticacion.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

const user_chose_login = ref(true)

const goRegister = () => {
  user_chose_login.value = !user_chose_login.value
}

const loginUser = async () => {
  error.value = ''
  success.value = ''

  const resultado = await login(email.value, password.value)
  if (resultado.ok) {
    success.value = resultado.mensaje
    email.value = ''
    password.value = ''
    router.push('/')
  } else {
    error.value = resultado.error
    return
  }
}

const registerUser = async () => {
  error.value = ''
  success.value = ''

  const resultado = await registrar(email.value, password.value)
  if (resultado.ok) {
    success.value = resultado.mensaje
    const usuario = resultado.usuario.user
    await enviarEmailVerificacion(usuario)
    email.value = ''
    password.value = ''
    router.push('/')
  } else {
    error.value = resultado.error
    return
  }
}
</script>

<style></style>
