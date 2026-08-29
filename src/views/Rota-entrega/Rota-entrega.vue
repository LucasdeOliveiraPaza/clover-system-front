<template>
  <div class="botao-finalizar" v-if="!dialogFinalizarEntrega">
    <Button
      label="Finalizar Entrega"
      icon="pi pi-envelope"
      @click="dialogFinalizarEntrega = true"
    />
  </div>

  <Dialog
    modal
    v-model:visible="dialogFinalizarEntrega"
    header="Finalizar Entregar"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <div class="dialog-conteudo">
      <div class="secao-assinatura">
        <h3>Assinatura</h3>
        <div class="canvas-container">
          <canvas ref="canvasRef" class="canvas-assinatura"></canvas>
        </div>
        <div class="botoes-acoes">
          <Button
            label="Limpar"
            icon="pi pi-trash"
            severity="secondary"
            size="small"
            @click="limparAssinatura"
          />
        </div>
      </div>

      <div class="secao-foto">
        <h3>Foto da Entrega</h3>
        <FileUpload
          mode="basic"
          name="demo[]"
          accept="image/*"
          :maxFileSize="5000000"
          customUpload
          @select="onFotoSelecionada"
          chooseLabel="Selecionar Imagem"
          severity="info"
        >
        </FileUpload>
      </div>
    </div>

    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" text @click="fecharDialog" />
      <Button
        label="Salvar Dados"
        icon="pi pi-check"
        @click="salvarDados"
        :disabled="!fotoBase64"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import SignaturePad from 'signature_pad'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'
import { navegar } from '@/globals/globals.ts'

const nav = navegar()
const dialogFinalizarEntrega = ref(false)

const canvasRef = ref(null)
let signaturePad = null

const fotoBase64 = ref(null)

onUnmounted(() => {
  window.removeEventListener('resize', ajustarTamanhoCanvas)
})

watch(dialogFinalizarEntrega, async (novoValor) => {
  if (novoValor) {
    await nextTick()
    inicializarSignaturePad()
  } else {
    destruirSignaturePad()
  }
})

const inicializarSignaturePad = () => {
  if (canvasRef.value) {
    signaturePad = new SignaturePad(canvasRef.value, {
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: 'rgb(0, 0, 0)',
    })
    ajustarTamanhoCanvas()
    window.addEventListener('resize', ajustarTamanhoCanvas)
  }
}

const destruirSignaturePad = () => {
  if (signaturePad) {
    signaturePad.off()
    signaturePad = null
  }
  fotoBase64.value = null
  window.removeEventListener('resize', ajustarTamanhoCanvas)
}

const ajustarTamanhoCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  canvas.width = canvas.offsetWidth * ratio
  canvas.height = canvas.offsetHeight * ratio
  canvas.getContext('2d').scale(ratio, ratio)

  signaturePad.clear()
}

const limparAssinatura = () => {
  if (signaturePad) signaturePad.clear()
}

const onFotoSelecionada = (event) => {
  const file = event.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    fotoBase64.value = reader.result
  }
}

const fecharDialog = () => {
  dialogFinalizarEntrega.value = false
  nav.navegarPara('/entrega-lista')
}

const salvarDados = () => {
  if (signaturePad.isEmpty()) {
    alert('Por favor, faça a sua assinatura.')
    return
  }

  const assinaturaBase64 = signaturePad.toDataURL('image/png')

  const body = {
    assinatura: assinaturaBase64,
    foto: fotoBase64.value,
  }

  console.log(body)

  fecharDialog()
}
</script>

<style scoped>
.botao-finalizar {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;
}

.dialog-conteudo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.canvas-container {
  border: 2px dashed #ccc;
  border-radius: 6px;
  background-color: #fafafa;
  overflow: hidden;
  touch-action: none;
}

.canvas-assinatura {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
}

.botoes-acoes {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}

.secao-foto {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
