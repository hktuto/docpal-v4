<template>
<el-dialog v-model="state.visible" :title="$t('caseManagement.add')"
  :close-on-click-modal="false"
  >
  <FormRenderer ref="FormRendererRef" :form-json="formJson" />
  <template #footer>
    <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
  </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { adminApi } from 'api'
const emits = defineEmits([
    'refresh'
])

const state = reactive({
  loading: false,
  visible: false,
})
const FormRendererRef = ref()
import formJson from './new.vform.json'
async function handleSubmit () {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData()
  state.loading = true
  try {
    state.visible = false
    await adminApi.api.postCaseTypes(data)
    FormRendererRef.value.vFormRenderRef.resetForm()
    emits('refresh')
  } catch (error) {
  }
  state.loading = false
}
function handleOpen() {
  state.visible = true
}
onMounted(async() => {
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
  