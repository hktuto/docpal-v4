<script setup lang="ts">
import { FullScreen } from '@element-plus/icons-vue'
import type { DialogProps, DialogEmits } from './types'

const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  title: '',
  width: '50%',
  fullscreen: false,
  top: '15vh',
  modal: true,
  modalClass: '',
  headerClass: '',
  bodyClass: '',
  footerClass: '',
  appendToBody: false,
  lockScroll: true,
  openDelay: 0,
  closeDelay: 0,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  draggable: false,
  overflow: false,
  center: false,
  alignCenter: false,
  destroyOnClose: false,
  closeIcon: '',
  zIndex: 2999,
  showFullScreen: true
})

const emit = defineEmits<DialogEmits>()

const internalFullscreen = ref(props.fullscreen)

watch(() => props.fullscreen, (newVal) => {
  internalFullscreen.value = newVal
})

function handleFullscreen() {
  internalFullscreen.value = !internalFullscreen.value
  emit('update:fullscreen', internalFullscreen.value)
}

function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}

function handleOpen() {
  emit('open')
}

function handleOpened() {
  emit('opened')
}

function handleClosed() {
  emit('closed')
}

function handleOpenAutoFocus() {
  emit('open-auto-focus')
}

function handleCloseAutoFocus() {
  emit('close-auto-focus')
}

onMounted(() => {
  if (!document.getElementById('base-dialog-global-styles')) {
    const style = document.createElement('style')
    style.id = 'base-dialog-global-styles'
    style.textContent = `
      .el-dialog .el-select-dropdown,
      .el-dialog .el-popper,
      .el-dialog .el-tooltip__popper,
      .el-dialog .el-popover {
        z-index: 3000 !important;
      }
      
      body > .el-select-dropdown,
      body > .el-popper,
      body > .el-tooltip__popper,
      body > .el-popover {
        z-index: 3000 !important;
      }
      
      .el-dialog.is-fullscreen .el-select-dropdown,
      .el-dialog.is-fullscreen .el-popper,
      .el-dialog.is-fullscreen .el-tooltip__popper,
      .el-dialog.is-fullscreen .el-popover {
        z-index: 3000 !important;
      }
      
      .dialog-select-dropdown {
        z-index: 3000 !important;
      }
      
      .el-dialog {
        z-index: 2000 !important;
      }
      
      .el-overlay {
        z-index: 1999 !important;
      }
    `
    document.head.appendChild(style)
  }
})

const dialogProps = computed(() => {
  const { fullscreen, ...rest } = props
  return {
    ...rest,
    fullscreen: internalFullscreen.value,
    // 确保 dialog 内的组件能够正确显示
    modalClass: 'base-dialog-modal'
  }
})
</script>

<template>
  <el-dialog
    v-bind="dialogProps"
    class="big"
    @close="handleClose"
    @open="handleOpen"
    @opened="handleOpened"
    @closed="handleClosed"
    @openAutoFocus="handleOpenAutoFocus"
    @closeAutoFocus="handleCloseAutoFocus"
  >
    <template #header="{ close, titleId, titleClass }">
      <slot name="header" :close="close" :title-id="titleId" :title-class="titleClass">
        <span :id="titleId" :class="titleClass">{{ props.title }}</span>
      </slot>
      <el-button
        class="dialog__fullscreen__icon"
        link
        circle
        :icon="FullScreen"
        @click="handleFullscreen"
      />
    </template>

    <slot />

    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.dialog__fullscreen__icon {
  position: absolute;
  top: 14px;
  right: 42px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: var(--el-message-close-size, 16px);
}
</style>
