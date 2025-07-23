<script lang="ts" setup>
import formJson from './capture.vform.json'
import { adminApi } from 'api'
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
    const result = await adminApi.api.patchExternalstorageIdProfilesProfileidCapture(props.storageId, props.id, data)
    emits('update')
  } catch (error: any) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
watch(() => props.settings, (newVal) => {
  if (newVal) {
    FormRendererRef.value.vFormRenderRef.setFormData(newVal)
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
