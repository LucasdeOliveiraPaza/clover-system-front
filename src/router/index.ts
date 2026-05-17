import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import EntregaLista from '../views/Entrega/Entrega-lista.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/entrega-lista',
    name: 'Entrega Lista',
    component: EntregaLista,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
