<template>
  <el-dialog v-model="state.visible" :title="$t('dashboard.setting')" class="scroll-dialog" append-to-body :close-on-click-modal="false" @close="handleClose">
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <div class="footer-grid">
        <el-button id="WorkPanel__title__Submit" type="primary" :loading="state.loading" @click="handleSubmit">
          {{ $t('common_submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import formJson from './titleDialog.vform.json'

const emits = defineEmits(['refresh', 'delete'])
const { t } = useI18n()

const state = reactive({
  loading: false,
  visible: false,
  setting: {}
})
const FormRendererRef = ref()

async function handleSubmit() {
  state.loading = true
  try {
    const data = await FormRendererRef.value.getFormData()
    state.setting.title = data.title
    emits('refresh')
  } catch (error) {
    state.loading = false
  }
  state.visible = false
  state.loading = false
}

function handleOpen(setting) {
  state.visible = true
  setTimeout(async () => {
    state.setting = setting
    if (!setting.title) setting.title = setting.name
    await FormRendererRef.value.vFormRenderRef.setFormData(setting)
    state.loading = false
  })
}
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped></style>
