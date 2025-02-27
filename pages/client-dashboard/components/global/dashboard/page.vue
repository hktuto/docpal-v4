<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"
          inputKey="name"/>
      </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { publicApi } from "api";
import dayjs from "dayjs";
const routerProvider = inject(MenuRouterKey);

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
  id: "c-dashboard",
  api: (pageParams: any) => publicApi.api.postUserDashboardPage({  ...pageParams, ...extraParams }),
  columns: [
    { field: "name", title: "tableHeader_name", fixed: "left" },
    {
      field: "createdDate",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
  ],
  bodyActions: [
    [
      {
        code: "preview",
        name: t("common_preview"),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row);
        },
      },
    ],
  ],
  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
});

function handleDblclick (row: any) {
  routerProvider?.navigateTo(routeDashboardDetailPage(row));
}

function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload()
}
</script>
<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}
</style>
