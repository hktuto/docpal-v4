<template>
  <el-dialog v-model="state.visible" :title="$t('docType.new')"
             class="scroll-dialog"
             append-to-body
             :close-on-click-modal="false"
             destroy-on-close
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson"></FormRenderer>
    <template #footer>
      <div class="footer-grid">
        <el-button id="DocumentType__CreateNewDocumentType__Submit" type="primary" :loading="state.loading"
                   @click="handleSubmit">
          {{ $t('common_submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import formJson from './new.vform.json'
import { adminApi } from 'api'
import { ElMessage } from 'element-plus'
const emits = defineEmits([
  'refresh'
])
const state = reactive({
  loading: false,
  visible: false,
  setting: {}
})

const FormRendererRef = ref()
const { t } = useI18n()

async function handleSubmit() {
  try {
    const data = await FormRendererRef.value.getFormData()
    state.loading = true
    const result = await adminApi.api.postDocpaltypeSettings(data)
    ElMessage.success(t('tip_createdSuccessMsg', {
      modelName: t('docType_documentType'),
      name: data.name
    }))
    state.visible = false
    emits('refresh')
  } catch (error) {
    console.log('error', error)
  } finally {
    state.loading = false
  }
}

function handleOpen() {
  state.visible = true
  setTimeout(async () => {
    FormRendererRef.value.vFormRenderRef.resetForm()
    state.loading = false
  })
}

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
    