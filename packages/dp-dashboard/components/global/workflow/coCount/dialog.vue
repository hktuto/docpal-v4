<template>
  <el-dialog
    v-model="state.visible"
    :title="$t('dashboard.setting') + ' - ' + state.setting.workflow"
    class="scroll-dialog"
    append-to-body
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson">
      <template v-slot:chartIcon>
        <el-form-item label="icon">
          <SvgIconSelector v-model:src="state.icon" />
        </el-form-item>
      </template>
    </FormRenderer>
    <template #footer>
      <div class="footer-grid">
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{ $t('common_submit') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import formJson from './dialog.vform.json'
const emits = defineEmits(['refresh', 'delete'])

const { t } = useI18n()

const state = reactive({
  loading: false,
  visible: false,
  setting: {},
  icon: ''
})
const FormRendererRef = ref()
async function handleSubmit() {
  state.loading = true
  try {
    const data = await FormRendererRef.value.getFormData()
    emits('refresh', { ...data, icon: state.icon })
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
    state.icon = setting.icon
    await FormRendererRef.value.vFormRenderRef.setFormData(setting)
    state.loading = false
  })
}

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped></style>
