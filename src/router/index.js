import { createRouter, createWebHistory } from 'vue-router'
import { estaAutenticado, usuario } from '@/servicios/autenticacion.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/view/PersonajesView.vue') },
    { path: '/login', component: () => import('@/view/LoginView.vue') },
    {
      path: '/perfil',
      component: () => import('@/view/PerfilView.vue'),
      
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (usuario.value) {
      next() // permitimos el acceso
    } else {
      next('/login') // no existe usuario -> button Mi perfil te lleva a /login
    }
  } else {
    next() // no es una ruta protegida dejo pasar sin problema
  }
})

export default router
