<template>
  <div class="cabecalho">Usuários</div>

  <div class="container">
    <div class="botoes-cabecalho">
      <Button label="Novo Usuário" raised icon="pi pi-plus" @click="abrirCadastroUsuario()" />
    </div>

    <DataTable :value="usuarios" responsiveLayout="scroll">
      <template #header>
        <div class="grid align-items-end gap-3">
          <div class="col-12 md:col-3 flex flex-column gap-2">
            <label for="idUsuario" class="font-medium text-sm">ID Usuário</label>
            <InputText id="idUsuario" class="w-full" />
          </div>

          <div class="col-12 md:col-3 flex flex-column gap-2">
            <label for="nome" class="font-medium text-sm">Nome</label>
            <InputText id="nome" class="w-full" />
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

      <Column field="id_usuario" header="ID Usuário" />
      <Column field="nome" header="Nome Usuário" />

      <Column header="Ações">
        <template #body="usuario">
          <div class="botoes-tabela">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              raised
              severity="warning"
              v-tooltip.top="'Editar'"
              @click="abrirCadastroUsuario(usuario.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted, ref, defineAsyncComponent } from 'vue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { useDialog } from 'primevue/usedialog'

const UsuarioCadastro = defineAsyncComponent(() => import('./Usuario-cadastro.vue'))

const dialog = useDialog()
const usuarios = ref([])

onMounted(() => {
  listar()
})

const listar = () => {
  usuarios.value = [
    {
      id_usuario: 1,
      nome: 'Lucas',
      email: 'lucas@email.com',
      tipo: 'G',
    },
    {
      id_usuario: 2,
      nome: 'João',
      email: 'joao@email.com',
      tipo: 'E',
    },
    {
      id_usuario: 3,
      nome: 'Maria',
      email: 'maria@email.com',
      tipo: 'E',
    },
  ]
}

const limparFiltros = () => {
  listar()
}
const abrirCadastroUsuario = (usuario = {}) => {
  dialog.open(UsuarioCadastro, {
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
    data: usuario,
    onClose: () => {
      listar()
    },
  })
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

.botoes-tabela {
  display: flex;
  gap: 0.5rem;
}
</style>
