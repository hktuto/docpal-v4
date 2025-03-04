<template>
<el-card class="o-auto">
  <h3>{{ $t('dashboard.cmmnAction') }}</h3>
  <DashboardActionList class="dashboard-auto" :actionList="state.data" @refresh="init()" @submit="emits('refresh')"/>
  <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/delete.svg"
    @click="handleDelete"/>
</el-card>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import { ElMessageBox } from 'element-plus'
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
const { t } = useI18n()
const CMDProvider = inject(CaseManagementDashboardKey)
const emits = defineEmits(['delete', 'refresh'])
async function handleDelete() {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    emits('delete')
}

const state = reactive<any>({
  data: [],
  loading: false
})
const userId:string = useUserId().value
async function init() {
  
  const id = CMDProvider.instanceId?.value || null
  const _caseTypeId = CMDProvider.caseTypeId?.value || null
  console.log(_caseTypeId,id, 'getCaseDashboardInstanceCaseidActions??????' );
  if(id){
    const {data: userAction} = await adminApi.api.getCaseDashboardInstanceCaseidActions(id,{userId})
    state.data = userAction
  } 
  else if(_caseTypeId){ 
    const { data: dashboardActions } = await adminApi.api.getCaseDashboardCasetypeCasetypeidActions(_caseTypeId)
    state.data = dashboardActions
  }
}

onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>


</style>