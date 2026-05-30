import { ref } from 'vue'

const usuario = ref({
  codUsuario: 0,
  gerente: false,
})

export function usarUsuarioGlobal() {
  function setUsuario(codigo: number, gerente: boolean) {
    usuario.value.codUsuario = codigo
    usuario.value.gerente = gerente
  }

  function getUsuario() {
    return usuario.value
  }

  return {
    getUsuario,
    setUsuario,
  }
}
