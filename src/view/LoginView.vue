<template>
  <main class="bg-[#00272d] w-full p-[2rem] h-screen">
    <div v-if="user_chose_login">
      <div class="flex flex-row justify-between w-full">
        <h1 class="text-4xl md:text-5xl font-extrabold text-lime-400 drop-shadow-[0_0_25px_rgba(163,230,53,0.5)]">Inicia sessión</h1>
        <router-link to="/" class="px-6 py-3 rounded-xl font-semibold text-lime-300
         bg-[#00393d] border border-lime-400/40
         hover:bg-slate-800
         hover:border-lime-300
         shadow-[0_0_15px_rgba(163,230,53,0.3)]
         transition-all duration-300">Ir a inicio</router-link>
      </div>
      <form @submit.prevent="loginUser" class="flex flex-col gap-6 pt-5">
        <div class="w-full max-w-sm min-w-[200px]">
          <input
            type="email"
            name=""
            id=""
            placeholder="Introduce tu email"
            required
            v-model="email"
            class="w-full px-4 py-3 rounded-xl
         bg-slate-900 text-lime-300 placeholder-slate-500
         border border-lime-400/40
         focus:outline-none
         focus:border-lime-400
         focus:ring-2 focus:ring-lime-400/50
         shadow-[0_0_10px_rgba(163,230,53,0.3)]
         transition-all"
          />
        </div>
        <div class="w-full max-w-sm min-w-[200px]">
          <input
            type="text"
            placeholder="Introduce contraseña. Minimum 6 symbolos"
            required
            v-model="password"
            class="w-full px-4 py-3 rounded-xl
         bg-slate-900 text-lime-300 placeholder-slate-500
         border border-lime-400/40
         focus:outline-none
         focus:border-lime-400
         focus:ring-2 focus:ring-lime-400/50
         shadow-[0_0_10px_rgba(163,230,53,0.3)]
         transition-all"
          />
        </div>

        <p v-if="error" class="text-slate-400 text-sm italic">{{ error }}</p>
        <p v-if="success" class="text-slate-400 text-sm italic">{{ success }}</p>

        <button type="submit" class="px-6 py-3 rounded-xl font-semibold text-black
         bg-lime-400
         hover:bg-lime-300
         active:bg-lime-500
         shadow-[0_0_20px_rgba(163,230,53,0.7)]
         hover:shadow-[0_0_30px_rgba(163,230,53,0.9)]
         transition-all duration-300 cursor-pointer w-[200px]">Iniciar sessión</button>
      </form>
      <div class="flex flex-col p-1 gap-[0.5rem]">
        <p class="text-xl font-semibold
         text-cyan-300
         drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] pt-6">Si no tienes una cuenta</p>
        <button type="button" @click="goRegister" class="px-6 py-3 rounded-xl font-semibold text-lime-300
         bg-slate-900 border border-lime-400/40
         hover:bg-slate-800
         hover:border-lime-300
         shadow-[0_0_15px_rgba(163,230,53,0.3)]
         transition-all duration-300 w-[200px] cursor-pointer">Ir a register</button>
      </div>
    </div>
        <div v-else>
        <div class="flex flex-row justify-between w-full">
          <div class="flex flex-col gap-4">
            <h1 class="text-4xl md:text-5xl font-extrabold text-lime-400 drop-shadow-[0_0_25px_rgba(163,230,53,0.5)]">Registrate</h1>
            <p class="text-slate-300 leading-relaxed font-['Shadows_Into_Light'] tracking-widest">Despues de registrarte verifica el email en tu correo electronico para crear tu colleción de personajes. Nuestro mensaje puede estar en el spam.</p>

          </div>
          <router-link to="/" class="px-6 py-3 rounded-xl font-semibold text-lime-300
         bg-[#00393d] border border-lime-400/40
         hover:bg-slate-800
         hover:border-lime-300
         shadow-[0_0_15px_rgba(163,230,53,0.3)]
         transition-all duration-300">Ir a inicio</router-link>

        </div>
        <form @submit.prevent="registerUser" class="flex flex-col gap-6 pt-5">
          <div class="w-full max-w-sm min-w-[200px]">
            <input
              type="email"
              name=""
              id=""
              placeholder="Introduce tu email"
              required
              v-model="email"
              class="w-full px-4 py-3 rounded-xl
          bg-slate-900 text-lime-300 placeholder-slate-500
          border border-lime-400/40
          focus:outline-none
          focus:border-lime-400
          focus:ring-2 focus:ring-lime-400/50
          shadow-[0_0_10px_rgba(163,230,53,0.3)]
          transition-all"
            />
          </div>
          <div class="w-full max-w-sm min-w-[200px]">
            <input
              type="text"
              placeholder="Introduce contraseña. Minimum 6 symbolos"
              required
              v-model="password"
              class="w-full px-4 py-3 rounded-xl
          bg-slate-900 text-lime-300 placeholder-slate-500
          border border-lime-400/40
          focus:outline-none
          focus:border-lime-400
          focus:ring-2 focus:ring-lime-400/50
          shadow-[0_0_10px_rgba(163,230,53,0.3)]
          transition-all"
            />
          </div>

          <p v-if="error" class="text-slate-400 text-sm italic">{{ error }}</p>
          <p v-if="success" class="text-slate-400 text-sm italic">{{ success }}</p>

          <button type="submit" class="px-6 py-3 rounded-xl font-semibold text-black
          bg-lime-400
          hover:bg-lime-300
          active:bg-lime-500
          shadow-[0_0_20px_rgba(163,230,53,0.7)]
          hover:shadow-[0_0_30px_rgba(163,230,53,0.9)]
          transition-all duration-300 cursor-pointer w-[200px]">Registrar</button>
        </form>
        <div class="flex flex-col p-1 gap-[0.5rem]">
          <p class="text-xl font-semibold
          text-cyan-300
          drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] pt-6">Si tienes una cuenta</p>
          <button type="button" @click="goRegister" class="px-6 py-3 rounded-xl font-semibold text-lime-300
          bg-slate-900 border border-lime-400/40
          hover:bg-slate-800
          hover:border-lime-300
          shadow-[0_0_15px_rgba(163,230,53,0.3)]
          transition-all duration-300 w-[200px] cursor-pointer">Inicia sessión</button>
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
  error.value = ''
  success.value = ''
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
