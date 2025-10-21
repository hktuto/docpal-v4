<template>
  <DashboardCard
    v-loading="loading"
    class="o-auto dp-dashboard--card__padding dp-dashboard--card__scroll"
    ref="cardRef"
    :hideSetting="hideSetting"
    :title="$t('dashboard.cmmnTaskPage')"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <div>
      <Table
        v-loading="state.loading"
        :columns="tableSetting.columns"
        :table-data="state.tableData"
        :options="state.options"
        @command="handleAction"
        @row-dblclick="handleDblclick"
        @pagination-change="handlePaginationChange"
      >
        <template #preSortButton>
          <!-- {{ $t('msg.confirmWhetherToDeactivate') }} -->
          <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange" inputKey="q" />
        </template>
      </Table>
    </div>
  </DashboardCard>
</template>
<script lang="ts" setup>
import { globalApi } from 'api'
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
const emits = defineEmits(['delete'])
async function handleDelete() {
  emits('delete')
}
const pageParams = {
  pageNum: 0,
  pageSize: 20,
  orderBy: 'createdDate',
  isDesc: true,
  category: 'Personal'
}
const state = reactive<any>({
  loading: false,
  tableData: [],
  options: {
    showPagination: true,
    paginationConfig: {
      total: 0,
      currentPage: 1,
      pageSize: pageParams.pageSize
    },
    rowKey: 'id'
  },
  extraParams: {}
})
const { t } = useI18n()

const CMDProvider = inject(CaseManagementDashboardKey)
// #region module:
const tableSetting = {
  columns: [
    { id: '1', label: 'table_name', prop: 'name', defaultColumn: true },
    { id: '2', label: 'workflow_workflowName', prop: 'taskInstance.processDefinitionName' }
  ],
  events: ['delete'],
  slots: [],
  options: { pageSize: 20 }
}
function handlePaginationChange(page: number, pageSize?: number) {
  pageParams.pageNum = Number(page) - 1 || 0
  pageParams.pageSize = Number(pageSize) || pageParams.pageSize
  getList(pageParams)
}
async function getList(param) {
  try {
    state.loading = true
    const _instanceId = CMDProvider.instanceId?.value || null

    if (!_instanceId) {
      state.tableData = []
      state.options.paginationConfig.total = 0
      state.options.paginationConfig.pageSize = 20
      state.options.paginationConfig.currentPage = 1
      return
    }
    const { data: res }: any = await globalApi.api.postCaseDashboardInstanceCaseidProcessInstancePage(_instanceId, { ...param, ...state.extraParams })
    state.tableData = res.entryList
    state.options.paginationConfig.total = res.totalSize
    state.options.paginationConfig.pageSize = param.pageSize
    state.options.paginationConfig.currentPage = param.pageNum + 1
  } catch (error) {
  } finally {
    state.loading = false
  }
}

function handleAction(command: string, row: any, rowIndex: number) {
  switch (command) {
    case 'edit':
      handleDblclick(row)
      break
  }
}
async function handleDblclick(row) {
  try {
    state.loading = true
    // router.push(`/caseManage/dashboard?id=${row.id}&instanceId=${instance.businessKey}&caseId=${route.params.id}`)
  } catch (error) {
  } finally {
    setTimeout(() => {
      state.loading = false
    }, 300)
  }
}
function handleFilterFormChange(formModel) {
  state.extraParams = formModel
  handlePaginationChange(1)
}
// #endregion
const { cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: async (setting: any) => {
    handlePaginationChange(1)
  }
})
onMounted(() => {
  handlePaginationChange(1)
})
</script>
<style lang="scss" scoped></style>
