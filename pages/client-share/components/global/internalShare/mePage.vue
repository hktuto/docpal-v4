<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons> </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 0" type="info">{{ $t("dpStatus.pending") }}</el-tag>
        <el-tag v-else-if="row.status === 1" type="primary">
          {{ $t("dpStatus.shared") }}
        </el-tag>
        <el-tag v-else-if="row.status === 2" type="danger">
          {{ $t("dpStatus.stopSharing") }}
        </el-tag>
        <el-tag v-else-if="row.status === 3" type="info">
          {{ $t("dpStatus.expired") }}
        </el-tag>
      </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { clientApi } from "api";
import dayjs from "dayjs";
import { routeShareMePageFolder } from "~/utils/routerHelper";
import { MenuRouterKey } from "#imports";

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
  id: "userTableSetting",
  api: (pageParams: any) =>
    clientApi.api.postInternalshareMe({ ...pageParams, ...extraParams }),
  columns: [
    {
      field: "documentNames",
      title: "tableHeader.fileOrFolderName",
      type: "html",
      formatter: ({ cellValue, row }: any) => {
        let icon = "/icons/doc/file.svg";
        if (row.isFolder) {
          icon = "/icons/doc/folder.svg";
        }
        return `<span class="tableRow-icon-cell"><img src="${icon}" /> ${cellValue}</span>`;
      },
    },
    { field: "path", title: "search.logicalPath" },

    { field: "createdUserId", title: "tableHeader_shareBy" },
    {
      field: "createdDate",
      title: "tableHeader_shareDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "startDate",
      title: "el.datepicker.startDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "expiredDate",
      title: "el.datepicker.endDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "permission",
      title: "dpTable_permission",
      formatter({ cellValue }: any) {
        return t(`permission.${cellValue}`);
      },
    },
    {
      field: "status",
      title: "common_status",
      slots: {
        default: "status",
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
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
});

function handleDblclick(row: any) {
  if (row.isFolder) {
    routerProvider?.navigateTo(routeShareMePageFolder(row), false);
  }
}
</script>
<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}
</style>
