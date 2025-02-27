<template>
<el-dialog v-model="state.visible" :title="$t('caseManagement.addOrEditDashboard')"
  :close-on-click-modal="false" destroy-on-close	
  >
  <FormRenderer ref="FormRendererRef" :form-json="formJson" >
  </FormRenderer>
  <template #footer>
    <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
  </template>
</el-dialog>
</template>
<script lang="ts" setup>
import {ElMessage} from 'element-plus'
import formJson from './form/dashobard.vform.json'
import { adminApi } from 'api'

const emits = defineEmits([
    'refresh'
])

const props = defineProps<{
    caseDetail: any,
    caseTypeId: string,
    name: string,
    currentVersion: string,
}>()
const state = reactive<any>({
  loading: false,
  visible: false,
  setting: {},
  isEdit: false
})
const route = useRoute()
const FormRendererRef = ref()

async function handleSubmit () {
  // try {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    const params = {
      caseTypeId: props.caseDetail.id,
      label: data.label,
      userGroup: data.userGroup.join(',')
    }
    console.log("params", params)
    state.visible = false
    if(!state.isEdit) {
      await adminApi.api.postCaseDashboard(params as any)
    } else {
      await adminApi.api.putCaseDashboard({
        ...params,
        id: state.setting.id
      } as any)
    }
    emits('refresh')

  // } catch (error) {
  // } finally {
  // }
}
function handleOpen(setting: any) {
  console.log(setting);
  
  state.visible = true
  if(!!setting) {
    state.isEdit = true
    state.setting = setting
    setTimeout(async () => {
      FormRendererRef.value.vFormRenderRef.setFormData({
        label: setting.label,
        userGroup: setting.userGroup.split(',')
      })
    })
  } else {
    state.isEdit = false
    setTimeout(async () => {
      FormRendererRef.value.vFormRenderRef.setFormData({})
    })
  }
}

onMounted(async() => {
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
