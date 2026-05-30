import { createRouter, createWebHistory } from 'vue-router'
import { usarUsuarioGlobal } from '@/globals/globals.ts'
import Login from '../views/Login.vue'
import EntregaLista from '../views/Entrega/Entrega-lista.vue'
import UsuarioLista from '@/views/Usuario/Usuario-lista.vue'
import RotaEntrega from '@/views/Rota-entrega/Rota-entrega.vue'

const usuarioGlobal = usarUsuarioGlobal()

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
    meta: { autenticar: false },
  },
  {
    path: '/entrega-lista',
    component: EntregaLista,
    meta: { autenticar: true },
  },
  {
    path: '/usuario-lista',
    component: UsuarioLista,
    meta: { autenticar: true },
  },
  {
    path: '/rota-entrega',
    component: RotaEntrega,
    meta: { autenticar: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to) => {
  const exigeAutenticacao = to.matched.some((record) => record.meta.autenticar)

  if (exigeAutenticacao && !usuarioGlobal.getUsuario().codUsuario) {
    return '/login'
  }

  return true
})

export default router
