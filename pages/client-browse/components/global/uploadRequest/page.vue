<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons> </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { clientApi } from "api";

import { createUploadRequestDetailParams, createBrowseListPageParams } from "../../../utils/browseMenuHelper";
import { MenuRouterKey } from "#imports";
const routerProvider = inject(MenuRouterKey);
let extraParams = {};
const { t } = useI18n();
const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
  id: "clientUploadRequestList",
  api: async (pageParams: any) => {
    const _pageParams = {
      ...pageParams,
      pageIndex: pageParams.pageNum,
      pageSize: pageParams.pageSize,
    };
    delete pageParams.pageNum;
    const { data } = await clientApi.api.getNuxeoFilerequest({
      ..._pageParams,
      ...extraParams,
    });
    return {
      data: {
        entryList: data?.requests,
        totalSize: data?.total,
      },
    };
  },
  columns: [
    { field: "email", title: "user_email" },
    { field: "logicalPath", title: "document_path" },
    { field: "message", title: "dpTable_message" },
    {
      field: "status",
      title: "document_uploadStatus",
      formatter({ cellValue }: any) {
        if(cellValue === 'completed') return t(`pending_${cellValue}`);
        return t(cellValue);
      },
    },
    {
      field: "createdDate",
      title: "document_uploadDate",
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      },
    },
  ],
  bodyActions: [
    [
      {
        code: "preview",
        name: "common_preview",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row);
        },
      },
      {
        code: "toFolder",
        name: "document_view",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          toFolder(row)
        },
      },
    ],
  ],
  permissionMethod: (args: PermissionMethodParams) => {
    // options 是 menuConfig 中的 body 配置
    switch (args.code) {
      case "preview":
        return {
          visible: args.row.status === "pending_approval",
          disabled: false,
        };

      // case "toFolder":
      //   return {
      //     visible: args.row.status === "completed",
      //     disabled: false,
      //   };
    }
    return {
      visible: true,
      disabled: false,
    };
  },
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row);
  },
  optionalConfig: {
    cellClassName({ row, column }) {
      if (row.status === 'completed') return 'completed-row'
      else if (row.status !== "pending_approval")  return "disabled-row";
      return null;
    },
  },
});

function handleDblclick(row: any) {
  if (row.status !== "pending_approval") return;
  routerProvider?.navigateTo(
    createUploadRequestDetailParams({ ...row, paramKey: "taskId" }),
    false
  );
}
function toFolder(row: any) {
  routerProvider?.navigateTo(
    createBrowseListPageParams({ idOrPath: row.documentId }),
    false
  );
}
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  width: 200px;
}
:deep(.disabled-row) {
  background-color: var(--app-grey-800);
  // color: var(--app-grey-900)
}

:deep(.completed-row) {
  background-color: var(--app-grey-850);
  // color: var(--app-grey-900)
}
</style>
