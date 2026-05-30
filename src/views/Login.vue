<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Clover System</h2>

      <div class="field">
        <label for="login">Login</label>
        <InputText id="login" v-model="login" placeholder="Digite seu Login" />
      </div>

      <div class="field">
        <label for="password">Senha</label>
        <InputText id="password" type="password" v-model="senha" placeholder="Digite sua senha" />
      </div>

      <Button label="Entrar" icon="pi pi-sign-in" @click="realizarLogin" class="w-full" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { usarUsuarioGlobal } from '@/globals/globals'

const router = useRouter()
const usuarioGlobal = usarUsuarioGlobal()
const login = ref('')
const senha = ref('')
const usuarios = ref([
  { login: 'gerente', senha: 123, codUsuario: 1, gerente: true },
  { login: 'entregador', senha: 321, codUsuario: 2, gerente: false },
])

const realizarLogin = () => {
  if (login.value && senha.value) {
    validarSenha()
  } else {
    alert('Por favor, preencha os campos!')
  }
}

const validarSenha = () => {
  const usu = usuarios.value.find((u) => u.login == login.value)

  if (!usu) {
    alert('Usuário não encontrado')
    return
  }

  if (usu.senha != senha.value) {
    alert('Senha Inválida')
    return
  }

  usuarioGlobal.setUsuario(usu.codUsuario, usu.gerente)
  router.push('/entrega-lista')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f1f5f9;
  font-family: Arial, sans-serif;
}
.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
h2 {
  margin-bottom: 2rem;
  color: #334155;
  text-align: center;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.field label {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: bold;
}
.w-full {
  width: 100%;
}
</style>
