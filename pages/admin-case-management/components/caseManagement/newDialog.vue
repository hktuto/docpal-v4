<template>
<el-dialog v-model="state.visible" :title="$t('caseManagement.add')"
  :close-on-click-modal="false"
  >
  <FromRenderer ref="FromRendererRef" :form-json="formJson" />
  <template #footer>
    <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
  </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { adminApi } from 'api'
import { getJsonApi, createCaseTypeApi } from 'dp-api'
const emits = defineEmits([
    'refresh'
])
const props = defineProps<{
  groups:any[]
}>()
const state = reactive({
  loading: false,
  visible: false,
})
const FromRendererRef = ref()
const formJson = getJsonApi('caseManage/new.json')
async function handleSubmit () {
  const data = await FromRendererRef.value.vFormRenderRef.getFormData()
  state.loading = true
  try {
    state.visible = false
    await adminApi.caseTypeController.postTypes(data)
    FromRendererRef.value.vFormRenderRef.resetForm()
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
  