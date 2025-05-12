<template>
<el-card class="o-auto">
  <h3>{{ $t('dashboard.cmmnAction') }}</h3>
  <DashboardActionList class="dashboard-auto" :actionList="state.data" @refresh="init()" @submit="handleRefresh"/>
  <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/delete.svg"
    @click="handleDelete"/>
</el-card>
</template>
<script lang="ts" setup>
import { emitBus, EventType } from 'eventbus'

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
const refreshBus = useEventBus(EventType.CASE_NEED_REFRESH)
onActivated(() => {
  console.log(" setup listen to on action", CMDProvider.instanceId?.value)
  refreshBus.on(needRefresh)
})
onDeactivated(() => {
  refreshBus.off(needRefresh)
})
function needRefresh(detail:any) {
  const caseId = CMDProvider.instanceId?.value || null;
  console.log("listen to",{
    caseId,
    detail
  }, detail.caseId === caseId)
  if(detail.caseId === caseId) {
    console.log("success should refresh now")
    init()
  }
}
const state = reactive<any>({
  data: [],
  loading: false
})

function filterActions(action:any) {
  if(action.planItemDefinitionType === 'processtask') {
    return action.state === 'available' || action.state === 'enabled'
  }
  return action.state !== 'completed'
    
}
const userId:string = useUserId().value
async function init() {
  console.log("init")
  const id = CMDProvider.instanceId?.value || null
  // const _caseTypeId = CMDProvider.caseTypeId?.value || null
  const _caseVersionId = CMDProvider.caseVersionId?.value || null

  if(id){
    const {data: userAction} = await adminApi.api.getCaseDashboardInstanceCaseidActions(id,{userId})
    state.data = userAction?.filter(filterActions).sort((a:any,b:any) => a.name.localeCompare(b.name))
  } 
  // else if(_caseTypeId){
  //   const { data: dashboardActions } = await adminApi.api.getCaseDashboardCasetypeCasetypeidActions(_caseTypeId)
  //   state.data = dashboardActions?.filter(s => s.state !== 'completed')
  // }
  else if(_caseVersionId){
    const { data: dashboardActions } = await adminApi.api.getCaseDashboardVersionVersionidActions(_caseVersionId)
    state.data = dashboardActions?.filter(filterActions)
  }
}

function handleRefresh(){
  emits('refresh')
  init()
}

onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>


</style>
