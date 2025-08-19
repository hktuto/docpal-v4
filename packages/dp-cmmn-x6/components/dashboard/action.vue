<template>
  <DashboardCard
    v-loading="loading"
    class="o-auto dp-dashboard--card__padding dp-dashboard--card__scroll"
    ref="cardRef"
    :hideSetting="hideSetting"
    :title="$t('dashboard.cmmnAction')"
    :setting="setting"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <DashboardActionList class="dashboard-auto" :actionList="state.data" @refresh="init()" @submit="handleRefresh" />
  </DashboardCard>
</template>
<script lang="ts" setup>
import { emitBus, EventType } from 'eventbus'
import { adminApi , clientApi} from 'api'
const props = withDefaults(
  defineProps<{
    dates?: any
    setting?: any
    hideSetting?: boolean
  }>(),
  {
    setting: {},
    hideSetting: false
  }
)
const { t } = useI18n()
const CMDProvider = inject(CaseManagementDashboardKey)
const emits = defineEmits(['delete', 'refresh'])
async function handleDelete() {
  emits('delete')
}
const refreshBus = useEventBus(EventType.CASE_NEED_REFRESH)

function needRefresh(detail: any) {
  const caseId = CMDProvider?.instanceId?.value || null
  if (detail.caseId === caseId) {
    init()
  }
}
const state = reactive<any>({
  data: [],
  loading: false
})

function filterActions(action: any) {
  if (action.planItemDefinitionType === 'processtask') {
    return action.state === 'available' || action.state === 'enabled'
  }
  return action.state !== 'completed'
}
const userId: string = useUserId().value
async function init() {
  const id = CMDProvider?.instanceId?.value || null
  // const _caseTypeId = CMDProvider.caseTypeId?.value || null
  const _caseVersionId = CMDProvider?.caseVersionId?.value || null
  const appPlatform = useAppPlatform()
  if (id) {
    const { data: userAction } = appPlatform.value === 'admin' ? await adminApi.api.getCaseDashboardInstanceCaseidActions(id, { userId }) : await clientApi.api.getCaseDashboardInstanceCaseidActions(id, { userId })
    state.data = userAction?.filter(filterActions).sort((a: any, b: any) => a.name.localeCompare(b.name))
  }
  // else if(_caseTypeId){
  //   const { data: dashboardActions } = await adminApi.api.getCaseDashboardCasetypeCasetypeidActions(_caseTypeId)
  //   state.data = dashboardActions?.filter(s => s.state !== 'completed')
  // }
  else if (_caseVersionId) {
    const { data: dashboardActions } = await adminApi.api.getCaseDashboardVersionVersionidActions(_caseVersionId)
    state.data = dashboardActions?.filter(filterActions)
  }
}
const { cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: async (setting: any) => {
    await init()
  }
})
function handleRefresh() {
  emits('refresh')
  init()
}
onMounted(() => {
  refreshBus.on(needRefresh)
})
onDeactivated(() => {
  refreshBus.off(needRefresh)
})
onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped></style>
