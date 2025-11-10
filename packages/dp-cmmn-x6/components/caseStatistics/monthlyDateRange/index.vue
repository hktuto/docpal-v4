<template>
  <DashboardCard
    v-loading="loading"
    ref="cardRef"
    :title="setting.title"
    :hideSetting="hideSetting"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="handleInitCard"
  >
    <div id="myEcharts" ref="chartRef" class="echart"></div>
    <CaseStatisticsTableDialog :setting="setting" :dates="tableDates" ref="dialogRef"> </CaseStatisticsTableDialog>

    <DashboardSetting ref="settingRef" :formJson="formJson" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<script lang="ts" setup>
import { restApi, PostgREST_Decorate } from 'api'
import formJson from './setting.vform.json'
import dayjs from 'dayjs'
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
const tableDates = ref([])
const emits = defineEmits(['refreshSetting', 'delete'])
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
function handleDelete() {
  emits('delete')
}
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  grid: {
    left: '10%', // 调整整个图表左侧的留白，增加偏移
    right: '0%',
    bottom: '10%',
    top: '10%'
  },
  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Number of Cases',
      nameRotate: 90,
      nameLocation: 'middle',
      axisLabel: {
        formatter: '{value}',
        margin: -8
      },
    }
  ],
  series: [
    {
      name: 'Number of Cases',
      type: 'bar',
      center: ['30%', '60%'],
      tooltip: {
        valueFormatter: function (value) {
          return value
        }
      },
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    }
  ]
}
const dialogRef = ref()

const { cardRef, chartRef, settingRef, resize, handleInitCard, loading } = useDashboardCard({
  props,

  getOptions: async (chartSetting) => {
    if (props.setting.yAxisTitle) {
      option.yAxis[0].name = props.setting.yAxisTitle
      if (props.setting.yAxisUnit) {
        // option.yAxis[1].axisLabel.formatter = '{value} ' + props.setting.averageUnit
        option.series[0].tooltip.valueFormatter = function (value) {
          return value + ' ' + props.setting.yAxisUnit
        }
      }
    }
    return option
  },
  clickAction: (params: any) => {
    let dates: any
    if (!props.dates) {
      dates = [dayjs(new Date()).format('YYYY-MM-DD'), dayjs(new Date()).format('YYYY-MM-DD')]
    } else {
      console.log('props.datesJSON', props.dates)
      dates = JSON.parse(JSON.stringify(props.dates))
    }
    const year = dayjs(dates[0]).year()
    const month = params.dataIndex + 1
    const startDate = dayjs(`${year}-${month}-01`).format('YYYY-MM-DD 00:00:00')
    const endDate = dayjs(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DD 23:59:59')
    tableDates.value = [startDate, endDate]
    dialogRef.value.handleOpen()
  }
})

// #endregion

// #endregion
defineExpose({ resize })
</script>

<style lang="scss" scoped></style>
