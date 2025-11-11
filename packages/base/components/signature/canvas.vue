<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const emit = defineEmits(['submit'])

const opened = ref(false)
const isDrawing = ref(false)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasContainerRef = ref<HTMLDivElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const lastPoint = ref<{ x: number; y: number } | null>(null)
const hasSignature = ref(false)

function open() {
  opened.value = true
}

function close() {
  opened.value = false
}

function initializeCanvas() {
  const canvas = canvasRef.value
  const container = canvasContainerRef.value

  if (!canvas || !container) {
    return
  }

  const dpr = window.devicePixelRatio || 1
  const { width, height } = container.getBoundingClientRect()
  const adjustedWidth = width || 800
  const adjustedHeight = height || (adjustedWidth * 9) / 16

  canvas.width = adjustedWidth * dpr
  canvas.height = adjustedHeight * dpr
  canvas.style.width = `${adjustedWidth}px`
  canvas.style.height = `${adjustedHeight}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  ctx.scale(dpr, dpr)
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.lineWidth = 2
  ctx.strokeStyle = '#1f2937'
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, adjustedWidth, adjustedHeight)

  context.value = ctx
  hasSignature.value = false
}

function getCanvasCoordinates(event: PointerEvent) {
  const canvas = canvasRef.value
  if (!canvas) {
    return null
  }

  const rect = canvas.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

function drawLine(from: { x: number; y: number }, to: { x: number; y: number }) {
  const ctx = context.value
  if (!ctx) {
    return
  }

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
}

function handlePointerDown(event: PointerEvent) {
  event.preventDefault()
  const coordinates = getCanvasCoordinates(event)
  if (!coordinates) {
    return
  }

  isDrawing.value = true
  lastPoint.value = coordinates
  hasSignature.value = true

  const canvas = canvasRef.value
  if (canvas) {
    canvas.setPointerCapture(event.pointerId)
  }
}

function handlePointerMove(event: PointerEvent) {
  if (!isDrawing.value) {
    return
  }

  event.preventDefault()

  if (!isDrawing.value || !lastPoint.value) {
    return
  }

  const newPoint = getCanvasCoordinates(event)
  if (!newPoint) {
    return
  }

  drawLine(lastPoint.value, newPoint)
  lastPoint.value = newPoint
}

function endDrawing(event: PointerEvent) {
  event.preventDefault()

  if (!isDrawing.value) {
    return
  }

  isDrawing.value = false
  lastPoint.value = null

  const canvas = canvasRef.value
  if (canvas) {
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId)
    }
  }
}

function handleSubmit() {
  const canvas = canvasRef.value
  if (!canvas || !hasSignature.value) {
    return
  }

  const targetWidth = 300
  const targetHeight = Math.round((targetWidth * 9) / 16)
  const exportCanvas = document.createElement('canvas')
  exportCanvas.width = targetWidth
  exportCanvas.height = targetHeight

  const exportContext = exportCanvas.getContext('2d')
  if (!exportContext) {
    return
  }

  exportContext.fillStyle = '#ffffff'
  exportContext.fillRect(0, 0, targetWidth, targetHeight)
  exportContext.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, targetWidth, targetHeight)

  const dataUrl = exportCanvas.toDataURL('image/png')
  emit('submit', dataUrl)
  close()
}

function handleClear() {
  const ctx = context.value
  const canvas = canvasRef.value
  if (!ctx || !canvas) {
    return
  }

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = '#1f2937'
  hasSignature.value = false
}



defineExpose({
  open,
  close
})

watch(opened, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      initializeCanvas()
    })
    return
  }

  handleClear()
})

onBeforeUnmount(() => {
  context.value = null
})
</script>
<template>
  <el-dialog
    v-model="opened"
    width="640px"
    align-center
    append-to-body
    destroy-on-close
  >
    <template #header>
      <div class="dialog-header">
        <h3 class="dialog-title">Signature</h3>
      </div>
    </template>

    <div class="signature-wrapper">
      <div ref="canvasContainerRef" class="canvas-container">
        <canvas
          ref="canvasRef"
          class="signature-canvas"
          role="img"
          aria-label="Signature canvas"
          tabindex="0"
          @pointerdown="handlePointerDown"
          @pointermove="handlePointerMove"
          @pointerup="endDrawing"
          @pointercancel="endDrawing"
          @pointerleave="endDrawing"
        />
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button
          class="footer-button"
          aria-label="Clear signature canvas"
          @click="handleClear"
          @keydown.enter="handleClear"
        >
          Clear
        </el-button>
        <el-button
          class="footer-button"
          type="primary"
          :disabled="!hasSignature"
          aria-label="Submit signature"
          @click="handleSubmit"
          @keydown.enter="handleSubmit"
        >
          Submit
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss">
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dialog-title {
  margin: 0;
  font-weight: 600;
  font-size: 18px;
  color: #1f2937;
}

.signature-wrapper {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}

.canvas-container {
  width: 100%;
  max-width: 560px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background-color: #ffffff;
  box-shadow: inset 0 1px 2px rgba(31, 41, 55, 0.08);
}

.signature-canvas {
  width: 100%;
  height: 100%;
  cursor: crosshair;
  touch-action: none;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.footer-button {
  min-width: 100px;
}
</style>
