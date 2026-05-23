<template>
  <div class="cabecalho">Entregas</div>
  <div class="container">
    <div class="botoes-cabecalho">
      <Button label="Novo Registro" raised icon="pi pi-plus" @click="dialogCadastro = true" />
      <Button
        label="Ir para Outra Página"
        icon="pi pi-arrow-right"
        severity="secondary"
        raised
        @click="navegarPara"
      />
    </div>

    <DataTable :value="entregas" responsiveLayout="scroll">
      <template #header>
        <div class="grid align-items-end gap-3">
          <div class="col-12 md:col-2 flex flex-column gap-2">
            <label name="id_entrega" class="font-medium text-sm">ID Entrega</label>
            <InputText id="id_entrega" class="w-full" />
          </div>

          <div class="col-12 md:col-2 flex flex-column gap-2">
            <label name="idVenda" class="font-medium text-sm">ID Venda</label>
            <InputText id="idVenda" class="w-full" />
          </div>

          <div class="col-12 md:col-2 flex flex-column gap-2">
            <label name="status" class="font-medium text-sm">Status</label>
            <InputText id="status" class="w-full" />
          </div>

          <div class="col-12 md:col-2 flex flex-column gap-2">
            <label name="entregador" class="font-medium text-sm">Entregador</label>
            <InputText id="entregador" class="w-full" />
          </div>

          <div class="col-12 md:col-2 flex flex-column gap-2">
            <label name="destinatario" class="font-medium text-sm">Destinatário</label>
            <InputText id="destinatario" class="w-full" />
          </div>

          <div class="col-12 md:col-1 flex gap-2">
            <Button
              icon="pi pi-search"
              variant="outlined"
              v-tooltip.top="'Filtrar'"
              @click="listar()"
              raised
            />

            <Button
              icon="pi pi-sync"
              variant="outlined"
              v-tooltip.top="'Recarregar'"
              severity="secondary"
              @click="limparFiltros()"
              raised
            />
          </div>
        </div>
      </template>

      <Column field="id_entrega" header="ID Entrega" />
      <Column field="id_venda" header="ID Venda" />
      <Column field="status" header="Status" />
      <Column field="entregador" header="Entregador" />
      <Column field="destinatario" header="Destinatário" />
      <Column field="contato" header="Contato Destinatário" />
      <Column header="Ações">
        <template #body="entrega">
          <div class="botoes-tabela">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              raised
              severity="warning"
              v-tooltip.top="'Editar'"
              @click="editarEntrega(entrega.data)"
            />
            <Button
              icon="pi pi-link"
              outlined
              rounded
              raised
              severity="info"
              v-tooltip.top="'Relacionar Entregador'"
              @click="relacionarEntregador(entrega.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="dialogCadastro"
      modal
      header="Cadastro Entrega"
      :style="{ width: '50vw' }"
    >
      <EntregaCadastro />
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import EntregaCadastro from './Entrega-cadastro.vue'

onMounted(() => {
  listar()
})

const router = useRouter()
const dialogCadastro = ref(false)
const entregas = ref([])

const navegarPara = () => {
  router.push('/usuario-lista')
}

const listar = () => {
  entregas.value = [
    {
      id_entrega: 1,
      id_venda: 1,
      status: 'Pendente',
      entregador: 'fulano',
      destinatario: 'cliente1',
      contato: '(99)99999-9999',
    },
    {
      id_entrega: 2,
      id_venda: 10,
      status: 'Pendente',
      entregador: 'deltrano',
      destinatario: 'cliente2',
      contato: '(99)98742-9999',
    },
    {
      id_entrega: 3,
      id_venda: 12,
      status: 'Em Trânsito',
      entregador: 'fulano',
      destinatario: 'cliente3',
      contato: '(99)99999-9010',
    },
  ]
}

const limparFiltros = () => {
  listar()
}

const editarEntrega = (item) => {
  console.log('Editar item:', item)
}

const relacionarEntregador = (item) => {
  console.log('Relacionar item:', item)
}
</script>

<style scoped>
.container {
  padding: 1.5rem;
  font-family: var(--font-family);
}

.cabecalho {
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  padding: 1rem;
  background-color: var(--p-primary-color);
  font-family: var(--font-family);
  font-size: 1.5em;
  font-weight: 600;
}

.botoes-cabecalho {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.cabecalho-tabela {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.botoes-tabela {
  display: flex;
  gap: 0.5rem;
}
</style>
