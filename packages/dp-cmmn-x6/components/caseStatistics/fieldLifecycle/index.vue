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

    <DashboardSetting
      v-if="!hideSetting"
      ref="settingRef"
      :after-open="handleAfterOpen"
      :title="title"
      :formJson="formJson"
      @delete="handleDelete"
      @refresh="handleRefresh"
    />
  </DashboardCard>
</template>

<script lang="ts" setup>
import { clientApi } from 'api'
import formJson from './setting.vform.json'
import dayjs from 'dayjs'
const props = withDefaults(
  defineProps<{
    dates?: any
    setting?: any
    hideSetting?: boolean
    type?: string
  }>(),
  {
    setting: {},
    hideSetting: false
  }
)
const userId: string = useUserId().value
const CMDProvider = inject(CaseManagementDashboardKey)
const caseInstanceId = CMDProvider?.instanceId?.value || null
const { t } = useI18n()
const title = $t('dashboard.cmmnCaseFieldLifecycle')
const total = ref(0)
const tableDates = ref([])
const emits = defineEmits(['refreshSetting', 'delete'])
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
function handleDelete() {
  emits('delete')
}
const seriesConfig = {
  type: 'bar',
  itemStyle: {},
  tooltip: {
    valueFormatter: function (value) {
      return value
    }
  }
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
      data: [],
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
      minInterval: 1,
      axisLabel: {
        formatter: '{value}',
        margin: -8
      }
    }
  ],
  series: []
}
const dialogRef = ref()

const { cardRef, chartRef, settingRef, resize, handleInitCard, loading } = useDashboardCard({
  props,

  getOptions: async (chartSetting) => {
    if (!chartSetting.tableName) {
      return option
    }
    option.series = []
    option.legend = {
      data: [],
      bottom: '0%'
    }
    const rpcParams = {
      _table_name: chartSetting.tableName,
      _create_date_column: 'created_date',
      _target_date_column: chartSetting.dateField,
      _status_column: chartSetting.filterKey,
      _status_list: chartSetting.filterList.map((item) => item.filterValue),
      _filters: {}
    }
    if (chartSetting.relatedField && caseInstanceId) {
      rpcParams._filters[chartSetting.relatedField] = caseInstanceId
    }
    if(chartSetting.currentUserField ) {
      rpcParams._filters[chartSetting.currentUserField] = userId
    }
    if (Object.keys(rpcParams._filters).length === 0) {
      delete rpcParams._filters
    }
    const response = await clientApi.api.postPostgrestRpcFunc('case_status_lifecycle_stats', rpcParams)
    getData(response.data)
    return option
  },
  clickAction: (params: any) => {
    const daysRange = params.name.split('-')
    const startDate = daysRange[1] ? dayjs(new Date()).subtract(daysRange[1], 'day').format('YYYY-MM-DD 00:00:00') : ''
    const endDate = dayjs(new Date()).subtract(daysRange[0], 'day').format('YYYY-MM-DD 23:59:59')

    const sortBy = props.setting.sortBy || 'created_date'
    const sortOrder = props.setting.sortOrder || 'desc'
    const sqlParams = [
      {
        key: `${props.setting.dateField}`,
        type: 'lte',
        value: `${endDate}`
      },
      {
        key: `${props.setting.filterKey}`,
        type: 'eq',
        value: `${params.seriesName}`
      },
      {
        type: 'order',
        value: `${sortBy}.${sortOrder}`
      }
    ]
    if (startDate) {
      sqlParams.push({
        key: `${props.setting.dateField}`,
        type: 'gte',
        value: `${startDate}`
      })
    }
    if (props.setting.relatedField && caseInstanceId) {
      sqlParams.push({
        key: props.setting.relatedField,
        type: 'eq',
        value: caseInstanceId
      })
    }
    if (props.setting.currentUserField) {
      sqlParams.push({
        key: props.setting.currentUserField,
        type: 'eq',
        value: userId
      })
    }
    dialogRef.value.handleOpen(sqlParams)
  }
})
function handleAfterOpen(formRendererRef: any) {
  if (props.type === 'caseManagement') {
    displaySettingFields(['relatedField'], formRendererRef)
  }
}
// #endregion
function getData(data: any) {
  option.xAxis[0].data = data.map((item) => item.day_range.replace('天', ''))
  data.forEach((item) => {
    Object.keys(item.status_counts).forEach((status) => {
      const sIndex = option.series.findIndex((s) => s.name === status)
      if (sIndex === -1) {
        option.series.push({
          ...seriesConfig,
          name: status,
          data: [item.status_counts[status]]
        })
        option.legend.data.push(status)
      } else {
        option.series[sIndex].data.push(item.status_counts[status])
      }
    })
  })
}
// #endregion
defineExpose({ resize })
</script>

<style lang="scss" scoped></style>
