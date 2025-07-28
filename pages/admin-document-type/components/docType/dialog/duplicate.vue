<template>
  <el-dialog v-model="state.visible" :title="$t('docType.duplicate')"
             class="scroll-dialog"
             append-to-body
             :close-on-click-modal="false"
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson">

    </FormRenderer>
    <template #footer>
      <div class="footer-grid">
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">
          {{ $t('common_submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import { ElMessage } from 'element-plus'
import formJson from './duplicate.vform.json'
const emits = defineEmits([
  'refresh', 'delete'
])
const { t } = useI18n()
const state = reactive({
  loading: false,
  visible: false,
  setting: {} as any
})
const FormRendererRef = ref()

async function handleSubmit() {
  try {
    const data = await FormRendererRef.value.getFormData()
    state.loading = true
    console.log(data, state.setting)
    const newType = {
      status: "D",
      name: data.fromName,
      category: state.setting.category,
      isFolder: state.setting.isFolder === 'false' ? false : true,
    }
    // TODO : handle duplicate metadata
    throw Error("demo")
    // await adminApi.api.postDocpaltypeSettingsCopyName(data.fromName, { ...data })
    // ElMessage.success(t('documentType_duplicateSuccessMsg'))
    // emits('refresh')
    // state.visible = false
  } catch (error) {
  } finally {
    state.loading = false
  }
}

function handleOpen(setting) {
  state.visible = true

  setTimeout(async () => {
    state.setting = setting
    await FormRendererRef.value.vFormRenderRef.setFormData({
      fromName: setting.name,
      category: setting.category,
      dataType: setting.dataType
    })
    state.loading = false
  })
}

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
    