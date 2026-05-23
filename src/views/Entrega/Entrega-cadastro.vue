<template>
  <div class="cadastro-container">
    <form @submit.prevent="salvarCadastro" class="formulario-container">
      <Panel header="Informações da Venda">
        <div class="grid">
          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="idVenda" class="font-semibold text-sm">ID Venda</label>
            <InputText
              id="idVenda"
              v-model="form.idVenda"
              placeholder="Digite o ID da Venda"
              fluid
            />
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="entregador" class="font-semibold text-sm">Entregador</label>
            <Select
              id="entregador"
              v-model="form.entregador"
              :options="Entregadores"
              optionLabel="label"
              optionValue="codigo"
              placeholder="Selecione um Entregador"
              fluid
            />
          </div>

          <div class="col-12 flex flex-column gap-2">
            <label for="descricao" class="font-semibold text-sm">Descrição</label>
            <Textarea id="descricao" v-model="form.descricao" rows="3" autoResize fluid />
          </div>
        </div>
      </Panel>

      <Panel header="Informações do Comprador">
        <div class="grid">
          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="nomeComprador" class="font-semibold text-sm">Nome</label>
            <InputText
              id="nomeComprador"
              v-model="form.nomeComprador"
              placeholder="Digite o Nome do Comprador"
              fluid
            />
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="contato" class="font-semibold text-sm">Contato</label>
            <InputMask
              id="contato"
              v-model="form.contato"
              mask="(99) 99999-9999"
              placeholder="Digite o Contato do Comprador"
              fluid
            />
          </div>
        </div>
      </Panel>

      <Panel header="Informações da Entrega">
        <div class="grid">
          <div class="col-12 flex gap-2 align-items-end">
            <div class="flex flex-column gap-2">
              <label for="cep" class="font-semibold text-sm">CEP</label>
              <InputMask
                mask="99999-999"
                id="cep"
                v-model="form.cep"
                placeholder="Digite o CEP"
                fluid
              />
            </div>

            <Button
              label="Buscar CEP"
              icon="pi pi-search"
              severity="secondary"
              outlined
              @click="buscarCep()"
            />
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="bairro" class="font-semibold text-sm">Bairro</label>
            <InputText id="bairro" v-model="form.bairro" placeholder="Digite o Bairro" fluid />
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="rua" class="font-semibold text-sm">Rua</label>
            <InputText id="rua" v-model="form.rua" placeholder="Digite a Rua" fluid />
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="numero" class="font-semibold text-sm">Número</label>
            <InputText id="numero" v-model="form.numero" placeholder="Digite o Número" fluid />
          </div>

          <div class="col-12 flex flex-column gap-2">
            <label for="complemento" class="font-semibold text-sm">Complemento</label>
            <Textarea id="complemento" v-model="form.complemento" rows="3" autoResize fluid />
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
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import InputMask from 'primevue/inputmask'

onMounted(() => {
  const dados = dialogRef.value.data

  console.log(dados)

  if (dados.id_entrega) {
    form.value.id = dados.id_entrega
    form.value.idVenda = dados.id_venda
    form.value.entregador = dados.entregador.value
  }
})

const dialogRef = inject('dialogRef')

const form = ref({
  id: 0,
  idVenda: '',
  entregador: null,
  descricao: '',
  nomeComprador: '',
  contato: '',
  cep: '',
  bairro: '',
  rua: '',
  numero: '',
  complemento: '',
})

const Entregadores = ref([
  { label: 'fulano', codigo: 2 },
  { label: 'deltrano', codigo: 3 },
])

const buscarCep = () => {
  console.log(form.value.cep)
}

const salvarCadastro = () => {
  console.log('Dados salvos:', form.value)

  dialogRef.value.close()
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
