<template>
<el-dialog v-model="state.visible" :title="$t('caseManagement.addOrEditDashboard')"
  :close-on-click-modal="false"
  >
  <FromRenderer ref="FromRendererRef" :form-json="formJson" >
  </FromRenderer>
  <template #footer>
    <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
  </template>
</el-dialog>
</template>
<script lang="ts" setup>
import {ElMessage} from 'element-plus'
import { createCaseDashboardPageApi, updateCaseDashboardApi, getJsonApi } from 'dp-api'
const emits = defineEmits([
    'refresh'
])

const props = defineProps<{
  groups:any[],
  caseInformation: []
}>()
const state = reactive({
  loading: false,
  visible: false,
  setting: {},
  isEdit: false
})
const route = useRoute()
const FromRendererRef = ref()
const formJson = getJsonApi('caseManage/dashboard.json')
async function handleSubmit () {
  // try {
    const data = await FromRendererRef.value.vFormRenderRef.getFormData()
    const params = {
      caseTypeId: route.params.id,
      label: data.label,
      userGroup: data.userGroup.join(',')
    }
    state.visible = false
    if(!state.isEdit) {
      await createCaseDashboardPageApi(params)
    } else {
      await updateCaseDashboardApi({
        ...params,
        id: state.setting.id
      })
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
      FromRendererRef.value.vFormRenderRef.setFormData({
        label: setting.label,
        userGroup: setting.userGroup.split(',')
      })
    })
  } else {
    state.isEdit = false
    setTimeout(async () => {
      FromRendererRef.value.vFormRenderRef.setFormData({})
    })
  }
}

onMounted(async() => {
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
