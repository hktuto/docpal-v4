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
      <el-button type="primary" @click="handleShowAll()">{{ $t('button.showAll') }}</el-button>
    </div>
    <CaseStatisticsTableDialog :setting="setting" :dates="dates" ref="dialogRef"> </CaseStatisticsTableDialog>
    <DashboardSetting v-if="!hideSetting" ref="settingRef" :formJson="formJson" :title="title" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<script lang="ts" setup>
import { clientApi, PostgREST_Decorate } from 'api'
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
const title = $t('dashboard.cmmnCaseGroupFieldNum')
const total = ref(0)
const tabProvider = inject(TabManagerKey)
const emits = defineEmits(['refreshSetting', 'delete'])
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
function handleDelete() {
  emits('delete')
}
const option = {
  tooltip: {
    trigger: 'item',
    position: function (pos, params, dom, rect, size) {
      // 自定义 tooltip 的位置,在鼠标下方，如果鼠标在底部，则放在鼠标上方，如果鼠标在偏右，则放在鼠标左侧，如果鼠标在偏左，则放在鼠标右侧
      if (pos[1] > size.viewSize[1] / 2) {
        return {
          top: 10
        }
      } else {
        return {
          bottom: 10
        }
      }
    }
  },
  legend: {
    bottom: '0%',
    left: 'center'
  },
  series: [
    {
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
      data: []
    }
  ]
}
const { cardRef, chartRef, settingRef, resize, handleInitCard, loading } = useDashboardCard({
  props,

  getOptions: async (chartSetting) => {
    option.series[0].data = []
    const data = option.series[0].data
    const rpcParams = {
      _table_name: chartSetting.tableName,
      _date_column: 'created_date',
      _schema_name: 'app10',
      _top_n: 5,
      _group_column: chartSetting.groupField,
      _tcv_column: chartSetting.sortBy,
      _start_date: '2024-10-27 00:44:40',
      _end_date: '2026-11-03 17:12:00',
      _filters: {}
    }
    if (chartSetting.filterKey && chartSetting.filterValue) {
      rpcParams._filters[chartSetting.filterKey] = chartSetting.filterValue
    }
    if (Object.keys(rpcParams._filters).length === 0) {
      delete rpcParams._filters
    }
    const response = await clientApi.api.postPostgrestRpcFunc('top_group_column_with_total', rpcParams)
    response.data.forEach((item) => {
      data.push({
        value: item.total_tcv,
        name: !item.group_value ? '-' : item.group_value
      })
    })
    console.log(data)
    return option
  },
  clickAction: (params: any) => {
    console.log(params)
    handleShowAll(params.name)
  }
})

const dialogRef = ref()
const groupDialogRef = ref()
function handleShowAll(groupField: string = '') {
  const sqlParams = [
    {
      key: 'created_date',
      type: 'gt',
      value: '2024-10-27 00:44:40'
    },
    {
      key: 'created_date',
      type: 'lt',
      value: '2026-11-03 17:12:00'
    },
    // {
    //   type: 'select',
    //   value: `${chartSetting.filterKey}.count()`
    // },
    {
      type: 'order',
      value: `${props.setting.sortBy}.desc`
    }
  ]
  if (props.setting.filterKey && props.setting.filterValue) {
    if (Array.isArray(props.setting.filterValue)) {
      sqlParams.push({
        key: `${props.setting.filterKey}`,
        type: 'in',
        value: props.setting.filterValue
      })
    } else {
      sqlParams.push({
        key: `${props.setting.filterKey}`,
        type: 'eq',
        value: `${props.setting.filterValue}`
      })
    }
  }
  if (groupField) {
    if (groupField !== '-') {
      sqlParams.push({
        key: `${props.setting.groupField}`,
        type: 'eq',
        value: `${groupField}`
      })
    } else {
      sqlParams.push({
        key: `${props.setting.groupField}`,
        type: 'isNull'
      })
    }
  }
  dialogRef.value.handleOpen(sqlParams)
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
