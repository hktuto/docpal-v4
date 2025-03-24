<template>
  <el-dialog v-model="state.visible" :title="$t('caseManagement_create')"
             :close-on-click-modal="false" destroy-on-close>
    <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
    <template #footer>
      <el-button id="CaseManagement__CreateNewCaseTemplate__Submit" type="primary" :loading="state.loading"
                 @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {ElMessage} from 'element-plus'
import formJson from './new.vform.json'

const {t} = useI18n()
const emits = defineEmits([
  'refresh'
])

const state = reactive({
  loading: false,
  visible: false,
})
const FormRendererRef = ref()

async function handleSubmit() {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData()
  state.loading = true
  try {
    state.visible = false
    const res = await adminApi.api.postCaseTypes(data).then(res => res.data)
    ElMessage.success(t('tip_createdSuccessMsg', {modelName: t('caseManagement_caseTemplate'), name: data.name}))
    FormRendererRef.value.vFormRenderRef.resetForm()
    emits('refresh', res)
  } catch (error) {
    console.log("error", error)
  }
  state.loading = false
}

function handleOpen() {
  state.visible = true
}

onMounted(async () => {
})
defineExpose({handleOpen})
</script>
<style lang="scss" scoped>

</style>
  