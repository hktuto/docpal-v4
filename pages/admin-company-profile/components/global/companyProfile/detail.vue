<script lang="ts" setup>
import { onMounted } from 'vue'
import formJson from '../../companyProfile/newDialog.vform.json'
import { adminApi } from 'api'
const props = defineProps<{
  id: string
}>()
const loading = ref(false)
const FormRendererRef = ref()
async function handleSave() {
  try {
    const data = await FormRendererRef.value.getFormData()
    data.status = data.status ? 'A' : 'D'
    loading.value = true
    const result = await adminApi.api.putCompanyprofilesCompanyid(props.id, data)
  } catch (error: any) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
async function init() {
  try {
    loading.value = true
    const data: any = await adminApi.api.getCompanyprofilesCompanyid(props.id).then((res) => res.data)
    setTimeout(() => {
      FormRendererRef.value.vFormRenderRef.setFormData({ ...data, status: data.status === 'A' ? true : false })
    })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  init()
})
</script>
<template>
  <div class="container">{{ $t('companyProfile.name') }}
    <FormRenderer ref="FormRendererRef" :form-json="formJson"> </FormRenderer>
    <div style="width: 100%; text-align: right">
      <el-button :loading="loading" type="primary" @click="handleSave">{{ $t('button.save') }}</el-button>
    </div>
    <el-divider />
    <CompanyProfileChopsTable style="height: 60vh" v-bind="props" />
  </div>
</template>
<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: auto;
  padding: var(--app-space-s);
}
</style>
