<template>
  <DashboardCard
    ref="cardRef"
    :class="{ 'dashboard-item-drillDown': state.showDrillDown }"
    :title="$t('dashboard.azure.ocrProcessPage') + '(' + $t(`azureDashboard.${setting.dataType}`) + ')'"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
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
const state = reactive({
  dashboardParams: {
    startDate: '',
    endDate: '',
    creator: ''
  },
  showDrillDown: false
})
// #region module: handleDrillDown
const tableRef = ref()
function handleDrillDown(params) {
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
const settingRef = ref()

function handleDelete() {
  emits('delete')
}
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}

const chartRef = ref()
function resize() {
  if (chartRef.value) chartRef.value.resize()
}
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
  .dashboard-item-drillDown--table {
    margin: 0 var(--app-space-xs);
    height: 500px;
    overflow: hidden;
    display: grid;
    grid-template-rows: min-content 1fr;
  }
}
// .el-card {
//   container-type: inline-size;
//   container-name: container;
// }
// @container container(min-width: 700px) {
//   .el-card__body {
//     display: grid;
//     grid-template-rows: min-content 1fr;
//   }
// }
</style>
