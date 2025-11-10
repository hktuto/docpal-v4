<template>
  <DashboardCard
    v-loading="loading"
    :title="setting.title"
    :hideSetting="hideSetting"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="handleInitCard"
  >
    <div class="chartContainer">
      <div ref="cardRef">
        <div id="myEcharts" ref="chartRef" class="echart"></div>
      </div>
      <el-button type="primary" @click="handleShowAll">{{ $t('button.showAll') }}</el-button>
    </div>
    <CaseStatisticsTableDialog :setting="setting" :dates="dates" ref="dialogRef"> </CaseStatisticsTableDialog>
    <CaseStatisticsTableDialog :setting="setting" :dates="dates" ref="groupDialogRef">
      <CaseStatisticsTableGroup :setting="setting" :dates="dates" ref="groupTableRef" />
    </CaseStatisticsTableDialog>
    <DashboardSetting ref="settingRef" :formJson="formJson" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<script lang="ts" setup>
import { restApi, PostgREST_Decorate } from 'api'
import formJson from './setting.vform.json'
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
const title = ref('dashboard.documentSize')
const total = ref(0)
const emits = defineEmits(['refreshSetting', 'delete'])
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
function handleDelete() {
  emits('delete')
}
const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '0%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '80%'],
      center: ['50%', '44%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine', testData: 'testDataSearchEngine' },
        { value: 735, name: 'Direct', testData: 'testDataDirect' },
        { value: 580, name: 'Email', testData: 'testDataEmail' },
        { value: 484, name: 'Union Ads', testData: 'testDataUnionAds' },
        { value: 300, name: 'Video Ads', testData: 'testDataVideoAds' }
      ]
    }
  ]
}
const { cardRef, chartRef, settingRef, resize, handleInitCard, loading } = useDashboardCard({
  props,

  getOptions: async (chartSetting) => {
    return option
  },
  clickAction: (params: any) => {
    console.log('props', props.setting)
    console.log('params', params)
    if (props.setting.groupField) {
      groupDialogRef.value.handleOpen()
    } else {
      dialogRef.value.handleOpen()
    }
  }
})

const dialogRef = ref()
const groupDialogRef = ref()
function handleDrillDown() {
  dialogRef.value.handleOpen()
}
// #endregion

// #endregion
defineExpose({ resize })
</script>

<style lang="scss" scoped>
.chartContainer {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr min-content;
  padding: 0 var(--app-space-s) var(--app-space-s);
  overflow: hidden;
}
</style>
