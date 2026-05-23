import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import EntregaLista from '../views/Entrega/Entrega-lista.vue'
import UsuarioLista from '@/views/Usuario/Usuario-lista.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/entrega-lista',
    component: EntregaLista,
  },
  {
    path: '/usuario-lista',
    component: UsuarioLista,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
