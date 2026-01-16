import { auth } from '@/firebase/firebase_config.js'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from 'firebase/auth'
import { ref } from 'vue'

// variable global del usuario
export let usuario = ref(null)

// escuchar los cambios de la authenticacion: logeado | nologeado
onAuthStateChanged(auth, (userFirebase) => {
  usuario.value = userFirebase
  console.log('Auth: usuario detectado: - ', userFirebase?.email || 'Ninguno')
})

// registrar usuario
export const registrar = async (email, password) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
    console.log('Usuario creado correctamente ☑️')

    return {
      ok: true,
      mensaje: 'Usuario creado correctamente ☑️',
      usuario: userCredentials,
    }
  } catch (error) {
    console.log('Ha habido un problema ❌', error)

    return {
      ok: false,
      error: 'Ha habido un problema ❌',
    }
  }
}

// iniciar sesion
export const login = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log('Sesión iniciada ☑️', email)

    return {
      ok: true,
      mensaje: 'Sesión iniciada correctamente ☑️',
      usuario: userCredentials,
    }
  } catch (error) {
    console.log('Ha habido un problema ❌', error)

    return {
      ok: false,
      error: 'Ha habido un problema ❌',
    }
  }
}

// log out
export const logout = async () => {
  try {
    await signOut(auth)
    console.log('Sesión cerrada correctamente ☑️')

    return {
      ok: true,
    }
  } catch (error) {
    console.log('Ha habido un problema ❌', error)

    return {
      ok: false,
      error: error.message,
    }
  }
}

// sirve para protejer la ruta dashboard
export const estaAutenticado = () => {
  return usuario.value !== null
}

// obtener usuario, si existe
export const obtenerUsuario = () => {
  return usuario.value
}

// enviar email with verificacion
export const enviarEmailVerificacion = async (usuarioActual = null) => {
  try {
    const usuario = usuarioActual || auth.currentUser
    if (usuario.emailVerified) {
      console.log('☑️ Email ya verificado')
      return {
        ok: true,
        mensaje: '☑️ Email ya verificado',
      }
    } else {
      await sendEmailVerification(usuario, { url: window.location.origin + '/perfil' })
      return {
        ok: true,
        mensaje: 'Email de verificación enviado',
      }
    }
  } catch (error) {
    console.log('Ha habido un problema ❌', error)

    return {
      ok: false,
      error: error.message,
      mensaje: 'Ha habido un problema ❌',
    }
  }
}
