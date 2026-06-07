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
        <div class="botoes-acoes">
          <Button label="Alterar Senha" icon="pi pi-key" outlined @click="gerarSenhaTemporaria()" />
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
    v-model:visible="dialogSenhaTemporaria"
    modal
    header="Senha Temporária"
    :style="{ width: '25rem' }"
  >
    <label
      >Senha temporária do usuário:
      <span style="font-weight: bold">{{ senhaTemporaria }}</span></label
    >
  </Dialog>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import Dialog from 'primevue/dialog'

const dialogRef = inject('dialogRef')

const form = ref({
  id: 0,
  nome: '',
  email: '',
  tipo: 'E',
})

const senhaTemporaria = ref('')
const dialogSenhaTemporaria = ref(false)

onMounted(() => {
  const dados = dialogRef.value.data

  if (dados.id_usuario) {
    form.value.id = dados.id_usuario
    form.value.nome = dados.nome
    form.value.email = dados.email
    form.value.tipo = dados.tipo
  }
})

const salvarCadastro = () => {
  console.log('Dados salvos:', form.value)

  dialogRef.value.close()
}

const gerarSenhaTemporaria = () => {
  senhaTemporaria.value = '123456w'
  dialogSenhaTemporaria.value = true
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
