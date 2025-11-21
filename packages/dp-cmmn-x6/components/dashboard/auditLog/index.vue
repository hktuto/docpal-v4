<script setup lang="ts">
import dayjs from 'dayjs'
import { clientApi } from 'api'

const platform = useAppPlatform()
const CMDProvider = inject(CaseManagementDashboardKey)
const caseId = CMDProvider?.instanceId?.value || null

const props = withDefaults(
  defineProps<{
    dates?: any
    setting?: any
    hideSetting?: boolean
  }>(),
  {
    setting: {
      layout: [],
      defaultValue: {},
      label: {}
    },
    hideSetting: false
  }
)

const { settingRef, cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: async (setting: any) => {
    await queryLog()
  }
})
const routerProvider = inject(MenuRouterKey)
const emits = defineEmits(['delete'])

async function handleDelete() {
  emits('delete')
}

const { tableConfig, tableEvent, tableRef, query, reload, cleanSelectedRows } = useVxeTable({
  id: `dashboardAuditLogTable${caseId}`,
  refresh: false,
  virtualScroll: true,
  columns: [],
  zoom: false,
  saveColumnOrder: false
})

const params = ref({
  pageNum: 0,
  pageSize: 10000,
  userId: '',
  stream: "workflow",
  request: {
    uniqueIdentifier: ''
  },
  startTime: '',
  endTime: dayjs().format('YYYY-MM-DDTHH:mm:ss')
})

async function queryLog() {
  // if (platform.value === 'admin') {
  //   return
  // }

  await clientApi.api.postAuditLogWorkflowPage(params.value)
}

async function handleRefreshSetting(data: any) {
  console.log(22,data)
  if (data.startDate != '') {
    params.value.startTime = data.startDate
  }
  params.value.endTime = data.endDate == '' ? dayjs().format('YYYY-MM-DDTHH:mm:ss') : dayjs(data.endDate).format('YYYY-MM-DDTHH:mm:ss')

  params.value.request.uniqueIdentifier = data.uniqueIdentifier

  tableConfig.columns = data.columns.map((item: any) => {
    return {
      field: item.id,
      title: item.label || item.id,
      width: item.width
    }
  })
  await queryLog()
}

async function init() {
  console.log(22, props.setting)
}

onMounted(async () => {
  await init()
})

</script>

<template>
  <DashboardCard
    v-loading="loading"
    class="o-auto dp-dashboard--card__padding dp-dashboard--card__scroll"
    ref="cardRef"
    :hideSetting="hideSetting"
    :title="$t('Audit Log')"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent" />

    <DashboardAuditLogSetting v-if="!hideSetting" ref="settingRef" @refresh="handleRefreshSetting" />
  </DashboardCard>
</template>

<style scoped lang="scss">

</style>
