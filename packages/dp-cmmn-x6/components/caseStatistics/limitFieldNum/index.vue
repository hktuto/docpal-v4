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
    <DashboardSetting
      v-if="!hideSetting"
      ref="settingRef"
      :after-open="handleAfterOpen"
      :formJson="formJson"
      :title="title"
      @delete="handleDelete"
      @refresh="handleRefresh"
    />
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
    type?: string
  }>(),
  {
    setting: {},
    hideSetting: false
  }
)
const CMDProvider = inject(CaseManagementDashboardKey)
const caseInstanceId = CMDProvider?.instanceId?.value || null
const { t } = useI18n()
const title = $t('dashboard.cmmnCaseLimitFieldNum')
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
    if (!chartSetting.tableName) {
      return option
    }
    option.series[0].data = []
    const data = option.series[0].data
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
      {
        type: 'select',
        value: `${chartSetting.sortBy},case_id`
      },
      {
        type: 'order',
        value: `${chartSetting.sortBy}.desc`
      },
      {
        type: 'limit',
        value: 5
      },
      {
        key: `${chartSetting.sortBy}`,
        type: 'neq',
        value: 0
      }
    ]
    if (chartSetting.relatedField && caseInstanceId) {
      sqlParams.push({
        key: chartSetting.relatedField,
        type: 'eq',
        value: caseInstanceId
      })
    }
    if (chartSetting.filterKey && chartSetting.filterValue) {
      sqlParams.push({
        key: `${chartSetting.filterKey}`,
        type: 'eq',
        value: `${chartSetting.filterValue}`
      })
    }
    const sql = PostgREST_Decorate(sqlParams)
    const response = await clientApi.api.getPostgrestTable(`${chartSetting.tableName}?${sql}`)
    response.data.forEach((item) => {
      data.push({
        value: item[chartSetting.sortBy],
        name: item.case_id
      })
    })
    console.log(data)
    return option
  },
  clickAction: (params: any) => {
    notiHandleView({ content: { caseInstanceId: params.name } }, tabProvider)
  }
})

const dialogRef = ref()
const groupDialogRef = ref()
function handleShowAll() {
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
  if (props.setting.relatedField && caseInstanceId) {
    sqlParams.push({
      key: props.setting.relatedField,
      type: 'eq',
      value: caseInstanceId
    })
  }
  if (props.setting.filterKey && props.setting.filterValue) {
    sqlParams.push({
      key: `${props.setting.filterKey}`,
      type: 'eq',
      value: `${props.setting.filterValue}`
    })
  }
  if (props.setting.groupField) {
    groupDialogRef.value.handleOpen(sqlParams)
  } else {
    dialogRef.value.handleOpen(sqlParams)
  }
}
function handleAfterOpen(formRendererRef: any) {
  if (props.type === 'caseManagement') {
    displaySettingFields(['relatedField'], formRendererRef)
  }
}
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
