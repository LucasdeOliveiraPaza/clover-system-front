<template>
  <div class="cadastro-container">
    <form @submit.prevent="clicouSalvar" class="formulario-container">
      <Panel header="Informações do Usuário">
        <div class="grid">
          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="nome" class="font-semibold text-sm">Nome</label>
            <InputText id="nome" v-model="form.nome" placeholder="Digite o nome" fluid />
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="login" class="font-semibold text-sm">Login</label>
            <InputText id="login" v-model="form.login" fluid />
          </div>

          <div class="col-12">
            <div class="flex flex-wrap gap-3">
              <div class="flex items-center gap-2">
                <label>Tipo Usuário:</label>
              </div>

              <div class="flex items-center gap-2">
                <RadioButton v-model="form.tipo" inputId="tipoE" value="E" />
                <label for="tipoE">Entregador</label>
              </div>

              <div class="flex items-center gap-2">
                <RadioButton v-model="form.tipo" inputId="tipoG" value="G" />
                <label for="tipoG">Gerente</label>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <div class="botoes-rodape full-width">
        <div class="botoes-acoes" >
          <Button label="Alterar Senha" icon="pi pi-key" outlined v-if="editando" @click="abrirAlterarSenha()" />
        </div>

        <div class="botoes-acoes">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            outlined
            @click="fecharModal()"
          />

          <Button label="Salvar" icon="pi pi-check" type="submit" />
        </div>
      </div>
    </form>
  </div>

  <Dialog
    v-model:visible="dialogSenha"
    modal
    header="Alterar Senha"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-column">
      <label for="senha" class="font-semibold text-sm">Senha</label>
      <InputText id="senha" v-model="senha" fluid type="password" />
    </div>

    <div class="full-width">
      <div class="botoes-acoes" >
        <Button label="Alterar" icon="pi pi-check" :disabled="senha == ''" @click="alterarSenha()" />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import api from '@/globals/api'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import Dialog from 'primevue/dialog'

const dialogRef = inject('dialogRef')

const form = ref({
  id: 0,
  nome: '',
  login: '',
  tipo: 'E',
})

const senha = ref('')
const dialogSenha = ref(false)
const editando = ref(false)

onMounted(() => {
  const dados = dialogRef.value.data

  if (dados.id_usuario) {
    editando.value = true
    form.value.id = dados.id_usuario
    form.value.nome = dados.nome
    form.value.login = dados.login
    form.value.tipo = dados.tipo
  }
})

const clicouSalvar = () => {
  if (editando.value) {
    atualizarCadastro()
  } else {
    abrirAlterarSenha()
  }
}

const salvarCadastro = async () => {
  const body = {
    nome: form.value.nome,
    login: form.value.login,
    tipo: form.value.tipo,
    senha: senha.value
  }

  try {
    console.log(body)
    await api.post('/api/usuario', body)
  } catch (error) {
    alert('Erro na requisição')
  } finally {
    dialogRef.value.close()
  }
}

const alterarSenha = async () => {
  dialogSenha.value = false

  if (editando.value) {
    await api.put(`/api/senha_usuario/${form.value.id}`, {senha: senha.value})
  } else {
    salvarCadastro()
  }
}

const atualizarCadastro = async () => {
  try {
    await api.put(`/api/usuario/${form.value.id}`, form.value)
  } catch (error) {
    alert('Erro na requisição')
  } finally {
    dialogRef.value.close()
  }
}

const abrirAlterarSenha = () => {
  senha.value = ''
  dialogSenha.value = true
}

const fecharModal = () => {
  dialogRef.value.close()
}
</script>

<style scoped>
.cadastro-container {
  padding: 0.5rem;
}

.botoes-rodape {
  display: flex;
  justify-content: space-between;
}

.botoes-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
