<template>
  <DashboardCard
    v-loading="loading"
    ref="cardRef"
    :hideSetting="hideSetting"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="handleInitCard"
  >
    <div class="quantity-container" @click="handleDrillDown">
      <div class="quantity-title">{{ setting.title }}</div>
      <div class="quantity-total">{{ setting.prefix }}{{ handleCompute(total) }}</div>
    </div>
    <!-- <div id="myEcharts" ref="chartRef" class="echart"></div> -->
    <CaseStatisticsTableDialog :setting="setting" :dates="dates" ref="dialogRef" />
    <DashboardSetting v-if="!hideSetting" ref="settingRef" :title="title" :formJson="formJson" @delete="handleDelete" @refresh="handleRefresh" />
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

const CMDProvider = inject(CaseManagementDashboardKey)
const caseInstanceId = CMDProvider?.instanceId?.value || null
const { t } = useI18n()
const title = $t('dashboard.cmmnCaseFieldNum')
const total = ref(0)
const emits = defineEmits(['refreshSetting', 'delete'])
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
function handleDelete() {
  emits('delete')
}
const { cardRef, settingRef, resize, handleInitCard, loading } = useDashboardCard({
  props,

  getOptions: async (chartSetting) => {
    // TODO: 需要filter company_id
    const sqlParams = [
      {
        key: 'created_date',
        type: 'gte',
        value: props.dates[0]
      },
      {
        key: 'created_date',
        type: 'lte',
        value: props.dates[1]
      },
      {
        type: 'select',
        value: `${chartSetting.filterKey}.count()`
      },
      {
        key: `${chartSetting.filterKey}`,
        type: 'eq',
        value: `${chartSetting.filterValue}`
      }
    ]
    if (chartSetting.relatedField && caseInstanceId) {
      sqlParams.push({
        key: chartSetting.relatedField,
        type: 'eq',
        value: caseInstanceId
      })
    }
    const sql = PostgREST_Decorate(sqlParams)
    const response = await clientApi.api.getPostgrestTable(`${chartSetting.tableName}?${sql}`)
    const data = response.data[0]
    total.value = data.count
    return {
      total: total.value
    }
  }
})

const dialogRef = ref()
function handleDrillDown() {
  const sortBy = props.setting.sortBy || 'created_date'
  const sortOrder = props.setting.sortOrder || 'desc'
  const sqlParams = [
    {
      key: 'created_date',
      type: 'gte',
      value: props.dates[0]
    },
    {
      key: 'created_date',
      type: 'lte',
      value: props.dates[1]
    },
    // {
    //   type: 'select',
    //   value: `${chartSetting.filterKey}.count()`
    // },
    {
      key: `${props.setting.filterKey}`,
      type: 'eq',
      value: `${props.setting.filterValue}`
    },
    {
      type: 'order',
      value: `${sortBy}.${sortOrder}`
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
function handleCompute(value: number) {
  try {
    if (props.setting.displayMethod === 'FinancialComputing') {
      return FinancialComputing(value)
    } else if (props.setting.displayMethod === 'fileSize') {
      return fileSize(value)
    }
  } catch (error) {
    return value
  }
  return value
}
defineExpose({ resize })
</script>

<style lang="scss" scoped>
.quantity-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-bottom: 2rem;
  .quantity-title {
    font-size: var(--app-font-size-xl);
    font-weight: bold;
  }
  .quantity-total {
    padding-top: var(--app-space-s);
    font-size: var(--app-font-size-xl);
    font-weight: bolder;
    color: var(--app-primary-color);
  }
}
</style>
