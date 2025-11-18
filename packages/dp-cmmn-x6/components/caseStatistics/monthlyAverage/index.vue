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

    <DashboardSetting v-if="!hideSetting" ref="settingRef" :formJson="formJson" :title="title" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<script lang="ts" setup>
import { clientApi, PostgREST_Decorate } from 'api'
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
const CMDProvider = inject(CaseManagementDashboardKey)
const caseInstanceId = CMDProvider?.instanceId?.value || null
const { t } = useI18n()
const title = $t('dashboard.cmmnCaseMonthlyAverage')
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
  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  grid: {
    left: '10%', // 调整整个图表左侧的留白，增加偏移
    right: '10%',
    bottom: '15%',
    top: '10%'
  },
  yAxis: [
    {
      type: 'value',
      name: 'Number of Cases',
      nameRotate: 90,
      nameLocation: 'middle',
      axisLabel: {
        formatter: '{value}',
        margin: -8
      }
    },
    {
      type: 'value',
      name: '',
      axisLabel: {
        formatter: '{value}'
      },
      splitLine: {
        show: false // 隐藏分隔线
      }
    }
  ],
  series: [
    {
      name: 'Number of Cases',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ' + props.setting.yAxisUnit
        }
      },
      data: []
    },
    {
      name: 'Average Duration',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return FinancialComputing(Number(value))
        }
      },
      smooth: true,
      data: []
    }
  ]
}
const dialogRef = ref()

const { cardRef, chartRef, settingRef, resize, handleInitCard, loading } = useDashboardCard({
  props,
  getOptions: async (chartSetting) => {
    if (props.setting.averageTitle) {
      option.legend = {
        bottom: '5%',
        data: ['Number of Cases', props.setting.averageTitle]
      }
      option.series[1].name = props.setting.averageTitle
      if (props.setting.averageUnit) {
        option.yAxis[1].name = props.setting.averageUnit
        // option.yAxis[1].axisLabel.formatter = '{value} ' + props.setting.averageUnit
        option.series[1].tooltip.valueFormatter = function (value) {
          return FinancialComputing(Number(value)) + ' ' + props.setting.averageUnit
        }
      }
      if(props.setting.averageField) {
        option.series[1].data = await getAverageDuration(chartSetting)
      }
      // option.series[0].data = chartSetting.data.map(item => item.value)
      // option.series[1].data = chartSetting.data.map(item => item.average)
    }
    option.series[0].data = await getCaseCount(chartSetting)
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
    const sortBy = props.setting.sortBy || 'created_date'
    const sqlParams = [
      {
        key: 'created_date',
        type: 'gt',
        value: startDate
      },
      {
        key: 'created_date',
        type: 'lt',
        value: endDate
      },
      {
        type: 'order',
        value: `${sortBy}.desc`
      }
    ]
    if (props.setting.relatedField && caseInstanceId) {
      sqlParams.push({
        key: props.setting.relatedField,
        type: 'eq',
        value: caseInstanceId
      })
    }
    dialogRef.value.handleOpen(sqlParams)
  }
})
async function getCaseCount(chartSetting) {
  const rpcParams = {
    _table_name: chartSetting.tableName,
    _date_column: 'created_date', // 合同到期日期字段
    _target_year: dayjs().year()
  }
  if (chartSetting.relatedField && caseInstanceId) {
    rpcParams._filters = {
      [chartSetting.relatedField]: caseInstanceId
    }
  }
  const response = await clientApi.api.postPostgrestRpcFunc('count_by_month_generic', rpcParams).then(res => res.data)
  return response.map(item => item.count_value)
}
async function getAverageDuration(chartSetting) {
  const rpcParams = {
    _table_name: chartSetting.tableName,
    _date_column: 'created_date', // 合同到期日期字段
    _target_year: dayjs().year(),
    _value_column: chartSetting.averageField
  }
  if (chartSetting.relatedField && caseInstanceId) {
    rpcParams._filters = {
      [chartSetting.relatedField]: caseInstanceId
    }
  }
  const response = await clientApi.api.postPostgrestRpcFunc('avg_by_month_generic', rpcParams).then((res) => res.data)
  return response.map(item => item.avg_value)
}
// #endregion

// #endregion
defineExpose({ resize })
</script>

<style lang="scss" scoped></style>
