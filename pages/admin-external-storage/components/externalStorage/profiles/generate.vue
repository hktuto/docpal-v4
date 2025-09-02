<script lang="ts" setup>
import formJson from './generate.vform.json'
import { adminApi } from 'api'
import { ElMessage } from 'element-plus'
const { t } = useI18n()
const props = defineProps<{
  id: string
  storageId: string
  settings: any
}>()
const loading = ref(false)
const emits = defineEmits(['update'])
const FormRendererRef = ref()
async function handleSave() {
  try {
    const data = await FormRendererRef.value.getFormData()
    loading.value = true
    const params = {
      name: data.name,
      status: data.status ? 'A' : 'D',
      batch_id_setting: {
        prefix: data.prefix,
        digit: data.digit,
        start_number: Number(data.start_number),
      }
    }
    await adminApi.api.patchExternalstorageIdProfilesProfileidGeneral(props.storageId, props.id, params)
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
      name: newVal.name,
      status: newVal.status === 'A' ? true : false,
      prefix: newVal.batch_id_setting?.prefix,
      digit: newVal.batch_id_setting?.digit,
      start_number: String(newVal.batch_id_setting?.start_number),
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
