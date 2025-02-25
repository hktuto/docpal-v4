<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <el-button v-show="state.selectedRows.length > 0" type="danger" @click="handleDeleteSelected()">{{
              $t("deleteSelected")
          }}
        </el-button>
      </template>
    </VxeGrid>
    <WorkflowReallocateDialog ref="ReallocateDialogRef" @success="query({})"></WorkflowReallocateDialog>
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { adminApi } from "api";
import dayjs from "dayjs";

const { t } = useI18n()
let extraParams: any = {};
const state = reactive<any>({
  selectedRows: []
})
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "userTableSetting",
  api: async (pageParams: any) => {
    return await adminApi.api.postWorkflowTasksUser({ ...pageParams }, extraParams);
  },
  columns: [
    { field: "taskInstance.businessKey", title: "table_name", fixed: "left", type: "checkbox" }, 
    { field: "taskInstance.processDefinitionName", title: "workflow_workflow" }, 
    { field: "taskInstance.startUserId", title: "role.creator" }, 
    { field: "assignee", title: "workflow_assignee" }, 
    { field: "taskInstance.startUserId", title: "role.creator" }, 
    {
      field: "createDate",
      title: "dpTable_createdDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      }
    },
    {
      field: "dueDate",
      title: "workflow_dueDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      }
    }
  ],
  bodyActions:[
    [
      {
        code:'reallocation',
        name:'common_reallocation',
        visible: true,
        disabled: false,
        action: ({row}:any) => {
          handleReallocate(row)
        }
      },
      {
        code:'delete',
        name:'common_delete',
        visible: true,
        disabled: false,
        action: ({row}:any) => {
            handleDelete(row)
        }
      }
    ]
  ],
  selectChangeHander: (selectedRows: any[]) => {
    state.selectedRows = [...selectedRows];
  },
  dblClickAction: ({ row, column, event }:any) => {
    handleReallocate(row) 
  }
  // saveColumnOrder: false,
});

async function handleDelete(row: any) {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if(action !== 'confirm') return
  await adminApi.api.deleteWorkflowProcess({processInstanceId: row.instanceId})
  query({})
}
async function handleDeleteSelected() {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if(action !== 'confirm') return
  try {
    state.loading = true
    const pList: any = []
    state.selectedRows.forEach((s: any) => pList.push(adminApi.api.deleteWorkflowProcess({processInstanceId: s.instanceId}).then(res => res.data)))

    await Promise.all(pList)
    query({})
  } catch (error) {

  } finally {
    state.selectedRows = []
    state.loading = false
  }
}
const ReallocateDialogRef = ref()
function handleReallocate (row: any) {
  ReallocateDialogRef.value.handleOpen(row)
}
</script>
<style lang="scss" scoped>
:deep .vxe-buttons--wrapper {
  display: flex;
  justify-content: space-between;
}
.responsive-container {
  width: 50%;
  :deep .el-input {
    width: 200px;
  }
}
</style>
