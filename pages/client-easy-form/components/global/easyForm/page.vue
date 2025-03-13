<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="name"
          @form-change="handleFilterFormChange"
          inputPlaceHolder="easyForm_filter"
        />
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.enable" type="success">{{ $t("actions.active") }}</el-tag>
        <el-tag v-else type="danger">{{ $t("Deactivated") }}</el-tag>
      </template>
    </VxeGrid>
    
    <EasyFormEmailDialog ref="DialogRef" :detail="detail"/>  </div>
</template>
<script lang="ts" setup>
import { clientApi } from "api";
import { routeEasyFormDetail } from "~/util/easyFormRouterHelper";
const routerProvider = inject(MenuRouterKey);
if (!routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
const { t } = useI18n();
let extraParams: any = {};
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "a-easyForm",
  api: (pageParams: any) =>
    clientApi.api.postFormDesignPage({ ...pageParams, ...extraParams }),
  columns: [
    { field: "name", title: "easyForm.name", fixed: "left", type: "checkbox" },
    {
      field: "createdDate",
      title: "easyForm_creationDate",
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      },
    },
    {
      field: "modifiedDate",
      title: "table_modifiedDate",
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      },
    },
    {
      field: "status",
      title: "easyForm_status",
      slots: {
        default: "status",
      },
    },
    { field: "processDefinitionKey", title: "easyForm.submitWorkflow" },
  ],
  bodyActions: [
    [
      {
        code: "viewDetails",
        name: t("actions.viewDetails"),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row);
        },
      },
      {
        code: "sendEmail",
        name: t("actions.sendEmail"),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleSend(row, false);
        },
      },
    ],
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
});
function handleDblclick(row: any) {
  // router.push(`/easyFormManage/${row.id}`);
  routerProvider?.navigateTo(routeEasyFormDetail(row), false);
}

function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload();
}
const DialogRef = ref();
async function handleSend() {
  DialogRef.value.handleOpen();
}
</script>
<style lang="scss" scoped>
:deep .vxe-buttons--wrapper {
  display: flex;
  justify-content: space-between;
  .responsive-container {
    width: 15%;
    :deep .el-input {
      width: 200px;
    }
  }
}
</style>
