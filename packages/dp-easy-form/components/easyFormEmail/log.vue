<template>
  <div>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="q"
        />
      </template>
      <template #relatedWorkflow="{ row }">
        <el-tag
          v-for="(item, index) in row.relatedWorkflows"
          :key="item.actionId + index"
          @click="handleOpenWorkflow(item)"
          >{{ item.actionName }}</el-tag
        >
        <!-- <el-tag @click="handleOpenWorkflow()">bjnh</el-tag
        > -->
      </template>
      <template #relatedCase="{ row }">
        <el-tag
          v-for="(item, index) in row.relateCases"
          :key="item.actionId + index"
          @click="handleOpenCase(item)"
          >{{ item.actionName }}</el-tag
        >
      </template>
    </VxeGrid>

    <EasyFormEmailDialog ref="DialogRef" />
    <EasyFormEmailDialogReadonly ref="DialogReadonlyRef" />
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox, ElNotification } from "element-plus";
import { clientApi } from "api";
const routerProvider = inject(MenuRouterKey);
if (!routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
const props = defineProps(["easyFormId"]);
const extraParams = {
  orderBy: "email",
  isDesc: true,
};
let filterParams = {};
const { t } = useI18n();
const {
  tableConfig,
  tableEvent,
  tableRef,
  reload,
  query,
  cleanSelectedRows,
} = useVxeTable({
  id: "clientTrashList",
  api: async (pageParams: any) => {
    pageParams.easyFormId = props.easyFormId;
    if (!pageParams.easyFormId)
      return {
        data: {
          entryList: [],
          totalSize: 0,
        },
      };
    return clientApi.api.postFormDesignPageEmailLog({
      ...pageParams,
      ...extraParams,
      ...filterParams,
    });
  },
  columns: [
    { field: "email", title: "user_email" },
    { field: "subject", title: "tableHeader_subject" },
    { field: "createdBy", title: "tableHeader.sentBy" },
    {
      field: "status",
      title: "common_status",
      type: "html",
      sortable: true,
      formatter: ({ cellValue }) => {
        return cellValue ? `<div class="${cellValue} tag">${cellValue}</div>` : "";
      },
    },
    {
      field: "sentDate",
      title: "tableHeader.sentDate",
      formatter({ cellValue }: any) {
        return formatDate(cellValue);
      },
    },
    {
      title: "tableHeader.relatedWorkflow",
      slots: {
        default: "relatedWorkflow",
      },
    },
    {
      title: "tableHeader.relatedCase",
      slots: {
        default: "relatedCase",
      },
    },
  ],
  bodyActions: [
    [
      {
        code: "viewDetails",
        name: t("actions.viewDetails"),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleViewEmail(row);
        },
      },
      {
        code: "sendEmail",
        name: t("actions.sendEmail"),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleSend(row);
        },
      },
    ],
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleViewEmail(row);
  },
});

const ResponsiveFilterRef = ref();
async function initCondition() {
  const data = [
    {
      key: "status",
      label: t("common_status"),
      type: "String",
      isMultiple: false,
      options: [
        { label: "Send", value: "Send" },
        { label: "Fail", value: "Fail" },
        { label: "Pending", value: "Pending" },
      ],
    },
    {
      key: "orderBy",
      label: "tableHeader.sortBy",
      type: "String",
      isMultiple: false,
      options: [
        { label: "user_email", value: "email" },
        { label: "tableHeader_subject", value: "subject" },
        { label: "tableHeader.sentBy", value: "createdBy" },
        { label: "common_status", value: "status" },
        { label: "tableHeader.sentDate", value: "sentDate" },
      ],
    },
    {
      key: "isDesc",
      label: "tableHeader.sortOrder",
      type: "string",
      isMultiple: false,
      options: [
        { label: "tableHeader.desc", value: false },
        { label: "tableHeader.asc", value: true },
      ],
    },
  ];
  ResponsiveFilterRef.value.init(data);
}
function handleFilterFormChange(formModel) {
  if (!formModel.isDesc) formModel.isDesc = true;
  if (!!formModel.isDesc) formModel.isDesc = formModel.isDesc === "false" ? false : true;
  filterParams = formModel;
  reload();
}
// #region module:
const DialogReadonlyRef = ref();
const DialogRef = ref();
function handleSend(row) {
  DialogRef.value.handleOpen(props.easyFormId, row.email);
}
function handleViewEmail(row) {
  DialogReadonlyRef.value.handleOpen(row);
}
async function handleOpenWorkflow(row: any = {}) {
  // row.processInstanceId = "b2ae2c95-0078-11f0-a987-56bed584d4f1"
  if (!row.processInstanceId) return;
  const newItem = await getWorkflowRoute(row.processInstanceId);
  if (!!newItem) routerProvider?.navigateTo(newItem);
}
function handleOpenCase(row: any = {}) {
  if (!row.case_id && !row.caseDefinitionVersionId) return;
  // row.case_id = "single-case-000017";
  // row.caseDefinitionVersionId = "23:73a7cf5a-643f-4adf-bc3e-1c638b501589";
  row.instanceId = row.case_id
  row.versionId = row.caseDefinitionVersionId
  row.id = row.instanceId;
  row.case_id = row.instanceId
  routerProvider?.navigateTo(caseManageDashboardPage(row));
}
// #endregion
onMounted(() => {
  initCondition();
});
defineExpose({ reload });
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  width: 200px;
}
.vxe-grid {
  :deep(.tag) {
    display: inline-block;
    padding-inline: var(--app-space-xs);
    &.Fail {
      background: var(--app-error-color);
      color: #fff;
    }
    &.Sent {
      background: var(--app-success-color);
      color: #fff;
    }
    &.Pending {
      background: var(--app-info-color);
      color: #fff;
    }
  }
}
</style>
