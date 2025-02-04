<template>
  <el-card class="viewer">
    <template #header>
      <div class="card-header">
        <span>Case Dasboard View</span>
      </div>
    </template>
    <div style="height: 100%">
      <Table v-loading="state.loading" :columns="tableSetting.columns" :table-data="state.tableData" :options="state.options"
        @command="handleAction"
        @row-dblclick="handleDblclick"
        @pagination-change="handlePaginationChange">
        <template #preSortButton>
            <!-- {{ $t('msg.confirmWhetherToDeactivate') }} -->
            <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"
                inputKey="q"/>
        </template>  
        <template #suffixSortButton>
            <el-button type="primary" @click="handleAdd()">{{$t('button.add')}}</el-button>
        </template>
        <template #publishStatus="{ row }">
            {{ row.status === 'A' ? 
                $t('actions.activated') : 
                $t('actions.inactived') }}
        </template>
        <template #dpTable_actions="{ row }">
            <el-dropdown>
                <SvgIcon src="/icons/dots.svg"></SvgIcon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-loading="state.loading" @click="handleAdd(row)">{{$t('workflowEditor.editInfo')}}</el-dropdown-item>
                        <el-dropdown-item v-loading="state.loading" @click="handleDblclick(row)">{{$t('caseManage.editLayout')}}</el-dropdown-item>
                        <el-dropdown-item v-loading="state.loading" @click="handleDelete(row)">{{$t('common_delete')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>
      </Table>
      <CaseManageDetailDashboardDialog ref="dialogRef" 
        @refresh="handlePaginationChange(1)"/>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import {adminApi} from 'api'

import dayjs from "dayjs";
const props = defineProps(['caseDetail'])
const router = useRouter()
const route = useRoute()
const pageParams = {
  pageNum: 0,
  pageSize: 20,
  orderBy: 'createdDate',
  isDesc: true,
  caseTypeId: route.params.id
}
const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
  id: 'case-dashboard-table',
    api: async(params:any) => {
      if(!params.orderBy) {
          params.orderBy = 'createdDate';
          params.isDesc = false
      }
      return await adminApi.api.postCaseDashboardPage(params)
    },
    remoteSort: true,
    defaultSort:[{
        field: 'createdDate',
        order: 'desc',
    }],
  columns: [
      {
          field:'label',
          title: "table_name",
          fixed: 'left',
      },
      {
          field: 'createdDate',
          title: "workflow_createDate",
          sortable:true,
          formatter ({ cellValue }:any) {
              const format = userDisplayTimeSetting()
              return dayjs(cellValue).format(format)
          }
      },
      {
          field: "modifiedDate",
          title: "table_modifiedDate",
          formatter ({ cellValue }:any) {
              const format = userDisplayTimeSetting()
              return dayjs(cellValue).format(format)
          }
      },
      {
          field: "publishStatus",
          title: "caseManagement.userGroup",
      },
      {
          field: "publishStatus",
          title : "dpTable_status"
      }
  ],
    bodyActions:[
        [
            {
                code: "edit",
                name: "workflowEditor.editInfo",
                action:({row}) => {

                }
            }
        ]
    ]
})
const tableSetting = {
  columns: [
    { id: '1', label: 'table_name', prop: 'label', defaultColumn: true },
    { id: '2', label: 'workflow_createDate', prop: 'createdDate', width: 200,
        formatList: [ datesFormat('createdDate') ]  
    },
    { id: '3', label: 'table_modifiedDate', prop: 'modifiedDate', width: 200,
        formatList: [ datesFormat('modifiedDate') ]      
    },
    { id: '4', label: 'caseManagement.userGroup', prop: 'userGroup'  },
    { id: '5', label: 'dpTable_status', prop: 'publishStatus', slot: 'publishStatus', width: 120 },
    { id: '6', type: "", label: "dpTable_actions", slot: 'dpTable_actions', width: 80 }
  ],
  events: ['delete'],
  slots: [
  ],
  options: { pageSize: 20 }
}
const state = reactive<State>({
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
async function getList (param) {
  state.loading = true
  try {
    const { data } = await adminApi.api.getCaseDashboardPage({ 
      ...param, 
      ...state.extraParams
     })
    state.tableData = res.entryList
    state.options.paginationConfig.total = res.totalSize
    state.options.paginationConfig.pageSize = param.pageSize
    state.options.paginationConfig.currentPage = param.pageNum + 1
  } catch (error) {

  }
  state.loading = false
}
function handlePaginationChange (page: number, pageSize?: number) {
  pageParams.pageNum = (Number(page) - 1) || 0
  pageParams.pageSize = Number(pageSize) || pageParams.pageSize
  getList(pageParams)
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
    // const instance = await getCDInstanceApi(props.caseDetail.caseDefinitionKey)
    router.push(`/caseManage/dashboard?id=${row.id}&caseId=${route.params.id}`)
  } catch (error) {
    
  } finally {
    setTimeout(() => {
      state.loading = false
    }, 300)
  }
}
async function handleDelete(row) {
  const action = await ElMessageBox.confirm(`${$i18n.t('msg_confirmWhetherToDelete')}`)
  if(action !== 'confirm') return
  try {
    state.loading = true
    await adminApi.api.deleteCaseDashboardId(row.id)
    // await deleteCaseDashboardApi(row.id)
    handlePaginationChange(1)
  } catch (error) {
    state.loading = false
  }
}
const dialogRef = ref()
function handleAdd (setting: any = null) {
  dialogRef.value.handleOpen(setting)
}
function handleFilterFormChange(formModel) {
  state.extraParams = formModel
  handlePaginationChange(1)
}
onMounted(() => {
  handlePaginationChange(1)
})
</script>
<style lang="scss" scoped>
:deep .el-card__body {
  height: 70vh;
}
.responsive-container {
  margin-bottom: 10px;
}
</style>
