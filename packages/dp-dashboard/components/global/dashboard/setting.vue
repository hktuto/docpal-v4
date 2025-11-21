<template>
  <el-dialog
    v-model="state.visible"
    :title="title ? title : $t('dashboard.setting')"
    :class="{'scroll-dialog': true, 'big': big}"
    append-to-body
    :close-on-click-modal="false"
    @close="state.visible = false"
  >
    <slot></slot>
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <div class="footer-grid">
        <el-button id="" type="danger" @click="handleDelete">
          {{ $t('common_delete') }}
        </el-button>
        <el-button id="" type="primary" :loading="state.loading" @click="handleSubmit">
          {{ $t('common_submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'

const props = defineProps(['formJson', 'title', 'after-open', 'big'])
const emits = defineEmits(['refresh', 'delete'])
const state = reactive({
  loading: false,
  visible: false,
  setting: {}
})
const FormRendererRef = ref()

async function handleSubmit() {
  try {
    state.loading = true
    const data = await FormRendererRef.value.getFormData()
    emits('refresh', data)
    state.visible = false
  } catch (error) {
  } finally {
    state.loading = false
  }
}

function handleOpen(setting) {
  state.visible = true
  setTimeout(async () => {
    state.setting = setting
    await FormRendererRef.value.vFormRenderRef.setFormData(setting)
    state.loading = false
    if (props.afterOpen) {
      props.afterOpen(FormRendererRef.value)
    }
  })
}

async function handleDelete() {
  const action = await ElMessageBox.confirm(`${$i18n.t('msg_confirmWhetherToDelete')}`).catch((action) => action)
  if (action !== 'confirm') return
  emits('delete')
  state.visible = false
}

defineExpose({ handleOpen, FormRendererRef })
</script>
<style lang="scss" scoped></style>
