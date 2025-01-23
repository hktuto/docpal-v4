<template>
  <div>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>

        <FormRenderer :form-json="formJson" @formChange="handleFormChange"/>
      </template>
      <template #assignee="{ row }">
        <el-tag v-if="row.assignee" round>{{ row.assignee || "" }}</el-tag>
        <el-button v-else type="primary" size="small" round @click="claimTask(row)">
          {{ $t("workflow_claim") }}
        </el-button>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.enable" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="danger">{{ $t("actions.inactived") }}</el-tag>
      </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import formJson from './uncomplete.vform.json'
import { clientApi } from "api";
import dayjs from "dayjs";
import { routeWorkflowDetail } from "~/utils/routerHelper";
const routerProvider = inject(MenuRouterKey);
if (!routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
const { t } = useI18n();
const userId: string = useUserId().value;
let extraParams: any = {};
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "all_task",
  api: (pageParams: any) =>
    clientApi.api.postWorkflowTasksUser({ ...pageParams, ...extraParams, candidateOrAssigned: userId }),
  columns: [
    { field: "taskInstance.businessKey", title: "table_name", fixed: "left" },
    { field: "taskInstance.processDefinitionName", title: "workflow_workflow" },

    {
      field: "name",
      title: "common_status",
      //   slots: {
      //     default: "status",
      //   },
    },
    {
      field: "assignee",
      title: "workflow_assignee",
      slots: {
        default: "assignee",
      },
    },
    { field: "taskInstance.startUserId", title: "workflow_startUser" },
    {
      field: "createDate",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "dueDate",
      title: "workflow_dueDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
});
function handleDblclick(row) {
  // router.push(`/easyFormManage/${row.id}`);
  routerProvider?.navigateTo(routeWorkflowDetail(row), false);
}

async function claimTask(row) {
  await clientApi.api.postWorkflowTaskClaim({
    taskId: row.id,
    userId,
  });
  query({});
}
function handleFormChange(data) {
  const params = Object.keys(data.formModel).reduce((prev, key) => {
    if (data.formModel[key] && data.formModel[key].length > 0)
      prev[key] = data.formModel[key];
    return prev;
  }, {});
  extraParams = params;
  reload();
}

function getDownloadParams() {
  return {
    candidateOrAssigned: userId,
    ...deepCopy(extraParams),
  };
}

defineExpose({ getDownloadParams })
</script>
<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}
</style>
