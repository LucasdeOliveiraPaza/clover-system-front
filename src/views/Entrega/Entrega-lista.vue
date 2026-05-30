<template>
  <div class="cabecalho">Entregas</div>
  <div class="container">
    <div class="botoes-cabecalho" v-if="usuarioGerente">
      <Button label="Novo Registro" raised icon="pi pi-plus" @click="abrirCadastroEntrega()" />
      <Button
        label="Cadastro de Usuários"
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

          <div class="col-12 md:col-2 flex flex-column gap-2" v-if="usuarioGerente">
            <label name="status" class="font-medium text-sm">Status</label>
            <InputText id="status" class="w-full" />
          </div>

          <div class="col-12 md:col-2 flex flex-column gap-2" v-if="usuarioGerente">
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
      <Column v-if="usuarioGerente" field="status" header="Status" />
      <Column v-if="usuarioGerente" field="entregador.label" header="Entregador" />
      <Column field="destinatario" header="Destinatário" />
      <Column v-if="usuarioGerente" field="contato" header="Contato Destinatário" />
      <Column header="Ações">
        <template #body="entrega">
          <div class="botoes-tabela" v-if="usuarioGerente">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              raised
              severity="warning"
              v-tooltip.top="'Editar'"
              @click="abrirCadastroEntrega(entrega.data)"
            />
          </div>

          <div class="botoes-tabela" v-else>
            <Button
              icon="pi pi-arrow-right"
              outlined
              rounded
              raised
              severity="warning"
              v-tooltip.top="'Iniciar Entrega'"
              @click="iniciarEntrega()"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { useDialog } from 'primevue/usedialog'
import { defineAsyncComponent } from 'vue'
import { usarUsuarioGlobal } from '@/globals/globals.ts'

const EntregaCadastro = defineAsyncComponent(() => import('./Entrega-cadastro.vue'))
const dialog = useDialog()
const router = useRouter()
const usuarioGlobal = usarUsuarioGlobal()
const entregas = ref([])
const usuarioGerente = ref(false)

onMounted(() => {
  listar()
  usuarioGerente.value = usuarioGlobal.getUsuario().gerente
})

const navegarPara = () => {
  router.push('/usuario-lista')
}

const listar = () => {
  entregas.value = [
    {
      id_entrega: 1,
      id_venda: 1,
      status: 'Pendente',
      entregador: { label: 'fulano', value: 2 },
      destinatario: 'cliente1',
      contato: '(99)99999-9999',
    },
    {
      id_entrega: 2,
      id_venda: 10,
      status: 'Pendente',
      entregador: { label: 'deltrano', value: 3 },
      destinatario: 'cliente2',
      contato: '(99)98742-9999',
    },
    {
      id_entrega: 3,
      id_venda: 12,
      status: 'Em Trânsito',
      entregador: { label: 'fulano', value: 2 },
      destinatario: 'cliente3',
      contato: '(99)99999-9010',
    },
  ]
}

const limparFiltros = () => {
  listar()
}

const abrirCadastroEntrega = (entrega = []) => {
  dialog.open(EntregaCadastro, {
    props: {
      header: 'Cadastro de Usuário',
      style: {
        width: '50vw',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      modal: true,
    },
    data: entrega,
    onClose: () => {
      listar()
    },
  })
}

const iniciarEntrega = () => {
  router.push('/usuario-lista')
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
