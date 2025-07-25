<script lang="ts" setup>
import formJson from './capture.vform.json'
import { adminApi } from 'api'
import { ElMessage } from 'element-plus'
const { t } = useI18n()
const props = defineProps<{
  id: string
  settings: any
  storageId: string
}>()
const emits = defineEmits(['update'])
const loading = ref(false)
const FormRendererRef = ref()
async function handleSave() {
  try {
    const data = await FormRendererRef.value.getFormData()
    loading.value = true
    const params = {
      useDocumentType: data.useDocumentType,
    }
    if (data.useDocumentType) {
      params.documentType = data.documentType
      params.needConfirm = data.needConfirm
      params.confirmUser = data.confirmUser.filter((item: any) => !item.includes('group&&&&'))
      params.confirmGroup = data.confirmUser.filter((item: any) => item.includes('group&&&&')).map((item: any) => item.replace('group&&&&', ''))
    }
    await adminApi.api.patchExternalstorageIdProfilesProfileidCapture(props.storageId, props.id, params)
    ElMessage.success(t('dpMsg_success'))
    emits('update')
  } catch (error: any) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
watch(() => props.settings, (newVal) => {
  if (newVal) {
    const data = {
      useDocumentType: newVal.useDocumentType,
    }
    if (newVal.useDocumentType) {
      data.needConfirm = newVal.needConfirm
      data.documentType = newVal.documentType
      let confirmUser = []
      let confirmGroup = []
      if (newVal.confirmUser) {
        confirmUser = newVal.confirmUser
      }
      if (newVal.confirmGroup) {
        confirmGroup = newVal.confirmGroup.map((item: any) => 'group&&&&' + item)
      }
      data.confirmUser = [...confirmUser, ...confirmGroup]
    }
    FormRendererRef.value.vFormRenderRef.setFormData(data)
  }
})
</script>
<template>
  <div class="container">
    <FormRenderer ref="FormRendererRef" :form-json="formJson"> </FormRenderer>
    <div style="width: 100%; text-align: right">
      <el-button :loading="loading" type="primary" @click="handleSave">{{ $t('button.save') }}</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: auto;
  padding: var(--app-space-s);
}
</style>
