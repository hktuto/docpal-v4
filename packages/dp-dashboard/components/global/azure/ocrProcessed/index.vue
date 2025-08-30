<template>
  <DashboardCard
    ref="cardRef" v-loading="loading"
    :class="{ 'dashboard-item-drillDown': state.showDrillDown }"
    :title="$t('dashboard.azure.ocrProcessPage') + '(' + $t(`azureDashboard.${setting.dataType}`) + ')'"
    :setting="setting"
    :hideSetting="hideSetting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <AzureOcrProcessedChart ref="chartRef" :setting="setting" :dates="dates" @drillDown="handleDrillDown" />
    <div v-if="state.showDrillDown" class="dashboard-item-drillDown--table">
      <h3 class="flex-x-start">
        {{ state.dashboardParams.workflow || state.dashboardParams.scanType }} ({{ formatDate(state.dashboardParams.startDate, 'YYYY-MM') }})
        <SvgIcon class="el-icon--right" src="/icons/close.svg" @click="closeDrillDown" />
      </h3>
      <AzureOcrProcessHistoryTable ref="tableRef" />
    </div>
    <DashboardSetting ref="settingRef" :formJson="formJson" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<script lang="ts" setup>
import formJson from '../ocrProcessed.vform.json'
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
const emits = defineEmits(['refreshSetting', 'delete'])
const state = reactive<any>({
  dashboardParams: {
    startDate: '',
    endDate: '',
    creator: ''
  },
  showDrillDown: false
})
// #region module: handleDrillDown
const tableRef = ref()
function handleDrillDown(params: any) {
  state.showDrillDown = true
  state.dashboardParams = params
  setTimeout(() => {
    // tableRef.value.getData(params)
    chartRef.value.resize()
  })
}
function closeDrillDown() {
  state.showDrillDown = false
  chartRef.value.setHighlight()
  setTimeout(() => {
    chartRef.value.resize()
  })
}
// #endregion

// #region module: setting
function handleDelete() {
  emits('delete')
}
function handleRefresh(chartSetting: any) {
  emits('refreshSetting', chartSetting)
}
const { chartRef, settingRef, cardRef, resize, refresh, loading } = useDashboardCard({
  props,
  resizeAction:() => {
    if (chartRef.value) chartRef.value.resize()
  },
  handleRefreshAction: (setting: any) => {
    if (chartRef.value) chartRef.value.refresh(setting)
  },
  handleInitCardAction: (setting: any) => {
  },
})
// #endregion

defineExpose({
  resize
})
</script>

<style lang="scss" scoped>
.dashboard-item-drillDown :deep(.el-card__body) {
  
  overflow-y: auto;
  overflow-x: hidden;
  .dashboard-item {
    height: 300px;
  }
}
.dashboard-item-drillDown--table {
  margin: 0 var(--app-space-xs);
  height: 500px;
  overflow: hidden;
  display: grid;
  grid-template-rows: min-content 1fr;
  container: table-container / size;
}

</style>
