<template>
<el-card class="o-auto">
  <h3>{{ $t('dashboard.cmmnWorkflowPage') }}</h3>
  <div style="width:100%;height:100%;overflow:hidden;position:relative;">
    <VxeGrid v-if="CMDProvider.instanceId" ref="tableRef" v-bind="tableConfig" v-on="tableEvent" >
      <template #toolbar_buttons>
        <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"
          inputKey="q"/>
      </template>
    </VxeGrid>

<!-- 
    <Table v-loading="state.loading" :columns="tableSetting.columns" :table-data="state.tableData" :options="state.options"
      @command="handleAction"
      @row-dblclick="handleDblclick"
      @pagination-change="handlePaginationChange">
      <template #preSortButton>
         
      </template> 
    </Table> -->
  </div>
  <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/delete.svg"
    @click="handleDelete"/>
</el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
  import { adminApi, clientApi } from 'api'
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
const routerProvider = inject(MenuRouterKey)
const emits = defineEmits(['delete'])
async function handleDelete() {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    emits('delete')
}
const pageParams = {
  pageNum: 0,
  pageSize: 20,
  orderBy: 'createdDate',
  isDesc: true
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
const { t } = useI18n();

const CMDProvider = inject(CaseManagementDashboardKey);

const { tableConfig, tableEvent, tableRef, reload} = useVxeTable({
  id:'case-management-dashboard-table',
  api: (params:any ) => {
    params = {
      ...params,
      ...state.extraParams
    }
    const _instanceId = CMDProvider.instanceId?.value || null
    return adminApi.api.postCaseDashboardInstanceCaseidProcessInstancePage(_instanceId, params)
  },
  saveColumnOrder:false,
  zoom:false,
  columns: [
    {
      title: 'table_name',
      field: 'name',
    },
    {
      title: 'workflow_workflowName',
      field: 'taskInstance.processDefinitionName',
    },
    {
      title: 'common_status',
      field: 'name',
    },{
      title: 'workflow_assignee',
      field: 'assignee',
    },
    {
      title: 'workflow_createDate',
      field: 'createDate',
      formatter:({cellValue}) => {
        return formatDate(cellValue)
      }
    }
  ],
  dblClickAction: ({ row, column, event }) => {
    console.log("row", row)
    handleDblclick(row)
  }
})
// #region module: 

function handleFilterFormChange(formModel) {
  state.extraParams = formModel
  reload()
}
 
  async function handleDblclick(row) {
    try {
      state.loading = true
      console.log("row", row)
      const newItem = routeWorkflowDetail({
        id: row.id,
        name: row.name
      })
      routerProvider?.navigateTo(newItem)
      // router.push(`/caseManage/dashboard?id=${row.id}&instanceId=${instance.businessKey}&caseId=${route.params.id}`)
    } catch (error) {
    } finally {
      setTimeout(() => {
        state.loading = false
      }, 300)
    }
  }
  
// #endregion
// #region module:  
  const ResponsiveFilterRef = ref()
  async function initCondition () {
    const _instanceId = CMDProvider.instanceId?.value || null
    if(!_instanceId) return
    try {
      const data = await clientApi.api.getCaseDashboardInstanceCaseidProcessInstancePageConditions(_instanceId)
      ResponsiveFilterRef.value.init(data)
    } catch (error) {
    }
  }
// #endregion

onMounted(() => {
  initCondition()
})
</script>
<style lang="scss" scoped>
.el-card{
  height: 100%;
  position: relative;
  overflow: hidden;
  :deep(.el-card__body){
    height:100%;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

</style>
