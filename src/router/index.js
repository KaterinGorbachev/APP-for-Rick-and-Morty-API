import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/', component: ()=> import('@/view/PersonajesView.vue')},
    {path: '/login', component: ()=> import('@/view/LoginView.vue')}

  ],
})

export default router
