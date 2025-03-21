<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <el-button id="ActiveWorkflowManagement__Delete" v-show="state.selectedRows.length > 0" type="danger"
                   @click="handleDeleteSelected()">
          {{ $t("common_delete") }}
        </el-button>
      </template>
    </VxeGrid>
    <WorkflowReallocateDialog ref="ReallocateDialogRef" @success="query({})"></WorkflowReallocateDialog>
  </div>
</template>
<script lang="ts" setup>
import {ElMessage, ElMessageBox} from 'element-plus'
import {adminApi} from "api";

const {t} = useI18n()
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
  id: "a-workflow-manage",
  api: async (pageParams: any) => {
    state.selectedRows = []
    return await adminApi.api.postWorkflowTasksUser({...pageParams}, extraParams);
  },
  columns: [
    {field: "taskInstance.businessKey", title: "workflow_ManageName", fixed: "left", type: "checkbox"},
    {field: "taskInstance.processDefinitionName", title: "workflow_workflow"},
    {field: "taskInstance.startUserId", title: "workflow_ManageInitiator"},
    {field: "assignee", title: "workflow_assignee"},
    // { field: "taskInstance.startUserId", title: "role.creator" },
    {
      field: "createDate",
      title: "workflow_ManageStartDate",
      formatter({cellValue}: any) {
        return formatDate(cellValue)
      }
    },
    {
      field: "dueDate",
      title: "workflow_dueDate",
      formatter({cellValue}: any) {
        return formatDate(cellValue)
      }
    }
  ],
  bodyActions: [
    [
      {
        code: 'reallocation',
        name: 'workflow_ManageReallocateTask',
        visible: true,
        disabled: false,
        action: ({row}: any) => {
          handleReallocate(row)
        }
      },
      {
        code: 'delete',
        name: 'workflow_ManageDeleteTask',
        visible: true,
        disabled: false,
        action: ({row}: any) => {
          handleDelete(row)
        }
      }
    ]
  ],
  selectChangeHander: (selectedRows: any[]) => {
    state.selectedRows = [...selectedRows];
  },
  dblClickAction: ({row, column, event}: any) => {
    handleReallocate(row)
  }
  // saveColumnOrder: false,
});

async function handleDelete(row: any) {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if (action !== 'confirm') return
  await adminApi.api.deleteWorkflowProcess({processInstanceId: row.instanceId})
  ElMessage.success(t('workflow_ManageDeleteWorkflowSuccessMsg'))
  query({})
}

async function handleDeleteSelected() {
  const action = await ElMessageBox.confirm(`${t('workflow_ManageDeleteWorkflowMsg')}`,
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: t('common_confirmDelete'),
    })
  if (action !== 'confirm') return
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

function handleReallocate(row: any) {
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
