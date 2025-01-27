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
import formJson from "./complete.vform.json";
import { clientApi } from "api";
import dayjs from "dayjs";
import { routeWorkflowDetail } from "~/utils/routerHelper";
const routerProvider = inject(MenuRouterKey);
if (!routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
const { t } = useI18n();
// @ts-ignore
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
  id: "complete_task",
  api: (pageParams: any) =>
    clientApi.api.postWorkflowHistoryProcessWithoutVariables({
      ...pageParams,
      ...extraParams,
      completed: true,
      userId,
    }),
  columns: [
    { field: "businessKey", title: "table_name", fixed: "left" },
    { field: "processDefinitionName", title: "workflow_workflow" },

    {
      field: "startTime",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        // @ts-ignore
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "completeDate",
      title: "table_completeDate",
      formatter({ cellValue }: any) {
        // @ts-ignore
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    { field: "duration", title: "table_duration" ,
      formatter({ cellValue, row }: any) {
        return dayjs(row.completeDate).diff(row.startTime, 'day') + t('common_days')
      }
    }
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
});
function handleDblclick(row: any) {
  console.log(row, 'completeTask')
  // router.push(`/easyFormManage/${row.id}`);
  routerProvider?.navigateTo(routeWorkflowDetail({...row, name: row.businessKey,
    workflowType: 'completeTask' }), false);
}

async function claimTask(row: any) {
  await clientApi.api.postWorkflowTaskClaim({
    taskId: row.id,
    userId,
  });
  query({});
}


function getDownloadParams() {
  return {
    completed: true,
    userId,
    ...deepCopy(extraParams),
  };
}
function handleFormChange(data: any) {
  const params = Object.keys(data.formModel).reduce((prev: any, key: string) => {
    if (data.formModel[key] && data.formModel[key].length > 0)
      prev[key] = data.formModel[key];
    return prev;
  }, {});
  extraParams = params;
  reload();
}
defineExpose({ getDownloadParams });
</script>
<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}
</style>
