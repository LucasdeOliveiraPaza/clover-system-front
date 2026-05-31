<template>
  <div class="cadastro-container">
    <form @submit.prevent="salvarCadastro" class="formulario-container">
      <Panel header="Informações do Usuário">
        <div class="grid">
          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="nome" class="font-semibold text-sm">Nome</label>
            <InputText id="nome" v-model="form.nome" placeholder="Digite o nome" fluid />
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="email" class="font-semibold text-sm">E-mail</label>
            <InputText id="email" v-model="form.email" placeholder="Digite o e-mail" fluid />
          </div>
        </div>
      </Panel>

      <div class="botoes-acoes full-width">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          outlined
          @click="fecharModal()"
        />

        <Button label="Salvar" icon="pi pi-check" type="submit" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const dialogRef = inject('dialogRef')

const form = ref({
  id: 0,
  nome: '',
  email: '',
})

onMounted(() => {
  const dados = dialogRef.value.data

  if (dados.id_usuario) {
    form.value.id = dados.id_usuario
    form.value.nome = dados.nome
    form.value.email = dados.email
  }
})

const salvarCadastro = () => {
  const usuarioSalvo = {
    id_usuario: form.value.id,
    nome: form.value.nome,
    email: form.value.email,
  }

  dialogRef.value.close(usuarioSalvo)
}
const fecharModal = () => {
  dialogRef.value.close()
}
</script>

<style scoped>
.cadastro-container {
  padding: 0.5rem;
}

.formulario-container {
  display: inline-flex;
  flex-direction: column;
  gap: 1.5rem;
}

.botoes-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  grid-column: span 2;
}
</style>
