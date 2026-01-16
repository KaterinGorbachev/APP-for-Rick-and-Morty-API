import { db } from '@/firebase/firebase_config.js'
import {
  // referencia al documento (registro) dentro de la tabla
  doc,
  // insert en la tabla
  setDoc,
  // get
  getDoc,
  updateDoc,
} from 'firebase/firestore'

// crear o actualizar perfil de usuario
// se crea ususario por autentificar y aqui solo cambias datos de ususario: nombre y td
export const guardarPerfilUsuario = async (usuarioID, datosPerfil) => {
  try {
    //'usuarios' - nombre de la tabla, usuarioID
    const docRef = doc(db, 'favoritos_personajes', usuarioID)

    // una copia de objeto datosPerfil
    // const perfilCompleto = {
    //   ...datosPerfil,
    // }

    await setDoc(docRef, datosPerfil)
    return {
      ok: true,
      mensaje: 'Favoritos de usuario actualizado correctamente ☑️',
    }
  } catch (error) {
    console.log('Ha habido un problema ❌', error)
    return {
      ok: false,
      mensaje: error.message,
    }
  }
}

//obtener perfil de usuario
export const obtenerPerfilUsuario = async (usuarioID) => {
  try {
    // de que tabla vas a buscar
    const docRef = doc(db, 'favoritos_personajes', usuarioID)

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return {
        ok: true,
        mensaje: 'Favoritos de usuario obtenido correctamente ☑️',
        perfil: { id: docSnap.id, ...docSnap.data() },
      }
    }
  } catch (error) {
    console.log('Ha habido un problema ❌', error)
    return {
      ok: false,
      mensaje: error.message,
    }
  }
}
