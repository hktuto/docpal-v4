<template>
<el-card class="o-auto">
  <h3>{{ $t('dashboard.cmmnWorkflowPage') }}</h3>
  <div>
    <Table v-loading="state.loading" :columns="tableSetting.columns" :table-data="state.tableData" :options="state.options"
      @command="handleAction"
      @row-dblclick="handleDblclick"
      @pagination-change="handlePaginationChange">
      <template #preSortButton>
          <!-- {{ $t('msg.confirmWhetherToDeactivate') }} -->
          <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"
              inputKey="q"/>
      </template> 
    </Table>
  </div>
  <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/delete.svg"
    @click="handleDelete"/>
</el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { getCDInstancePageApi, 
  getCDInstancePageConditionsApi, datesFormat } from 'dp-api'
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
const emits = defineEmits(['delete'])
async function handleDelete() {
    const action = await ElMessageBox.confirm(`${$i18n.t('msg_confirmWhetherToDelete')}`)
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
const route = useRoute()
const router = useRouter()
// #region module: 
  const tableSetting = {
    columns: [
      { id:1, label: 'table_name', prop: 'name', defaultColumn: true },
      { id:2, label: 'workflow_workflow', prop: 'taskInstance.processDefinitionName', class: 'tag' },
      { id:3, label: 'common_status', prop: 'name', class: 'danger-tag round', showOverflowTooltip: true },
      { id:4, label: 'workflow_assignee', prop: 'assignee' },
      { id:5, label: 'workflow_createDate', prop: 'createDate', 
          formatList: [ datesFormat('createDate') ]  
      },
      { id:6, label: 'workflow_dueDate', prop: 'dueDate', 
          formatList: [ datesFormat('dueDate') ]  
      }
    ],
    events: ['delete'],
    slots: [
    ],
    options: { pageSize: 20 }
  }
  function handlePaginationChange (page: number, pageSize?: number) {
    pageParams.pageNum = (Number(page) - 1) || 0
    pageParams.pageSize = Number(pageSize) || pageParams.pageSize
    getList(pageParams)
  }
  async function getList (param) {
    try {
      state.loading = true
      const instanceId = route.query.instanceId
      if(!instanceId) {
        state.tableData = []
        state.options.paginationConfig.total = 0
        state.options.paginationConfig.pageSize = 20
        state.options.paginationConfig.currentPage = 1
        return
      }
      const res = await getCDInstancePageApi(instanceId, { ...param, ...state.extraParams })
      state.tableData = res.entryList
      state.options.paginationConfig.total = res.totalSize
      state.options.paginationConfig.pageSize = param.pageSize
      state.options.paginationConfig.currentPage = param.pageNum + 1
    } catch (error) {

    }
    finally {
      state.loading = false
    }
  }

  function handleAction (command:string, row: any, rowIndex: number) {
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
// #region module:  
  const ResponsiveFilterRef = ref()
  async function initCondition () {
    const instanceId = route.query.instanceId
    if(!instanceId) return
    try {
      const data = await getCDInstancePageConditionsApi(instanceId)
      ResponsiveFilterRef.value.init(data)
    } catch (error) {
    }
  }
// #endregion

onMounted(() => {
  handlePaginationChange(1)
  initCondition()
})
</script>
<style lang="scss" scoped>
</style>
