<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="name"
        />
        <el-button type="primary" @click="handleCreate">{{ $t('docType.new') }}</el-button>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.enable" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="info">{{ $t("actions.inactive") }}</el-tag>
      </template>
    </VxeGrid>
    
    <DocTypeDialogNew ref="DocTypeDialogNewRef" @refresh="query({})"/>
    <DocTypeDialogDuplicate ref="DocTypeDialogDuplicateRef" @refresh="query({})"/>
  </div>
</template> 
<script lang="ts" setup>
import { adminApi } from "api";
import { routeDocDetail } from '~/utils/routerHelper';
const routerProvider = inject(MenuRouterKey)
if( !routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
let extraParams: any = {};
const state = reactive<any>({});
const { tableConfig, tableEvent, tableRef, query, reload } = useVxeTable({
  id: "docTypeManage",
  api: async (pageParams: any) => {
    return await adminApi.api.postDocpaltypeSettingsPage({
      ...pageParams,
      ...extraParams,
    });
  },
  columns: [
    { field: "name", title: "search.type", fixed: "left" },
    {
      field: "category",
      title: "docType.category",
    },
    { field: "dataType", title: "docType.type" },
    {
      field: "status",
      title: "common_status",
      slots: {
        default: "status",
      },
    },
    { field: "modifiedDate", title: "table_last_update",
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      } 
    },

  ],
  bodyActions: [
    [
      {
        code: "edit",
        name: "common_edit",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row)
        },
      },
      {
        code: "duplicate",
        name: "actions.duplicate",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDuplicate(row)
        },
      },
      {
        code: "active",
        name: "actions.active",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleActive(row, true)
        },
      },
      {
        code: "inactive",
        name: "actions.inactive",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleActive(row, false)
        },
      },
    ],
  ],
  permissionMethod: (args: PermissionMethodParams) => {
    switch (args.code) {
      case "active":
        return {
          visible: !args.row.enable,
          disabled: false,
        };
      case "inactive":
        return {
          visible: args.row.enable,
          disabled: false,
        };
      default:
        return {
          visible: true,
          disabled: false,
        }
    }
  },
  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
});
function handleDblclick (row) {
  routerProvider?.navigateTo(routeDocDetail(row), false)
}
const DocTypeDialogDuplicateRef = ref()
const DocTypeDialogNewRef = ref()
function handleDuplicate(row: any) {
  DocTypeDialogDuplicateRef.value.handleOpen(row)
}
async function handleActive(row: any, isActive: boolean) {
  const result = await adminApi.api.patchDocpaltypeSettingsActive({
    name: row.name,
    enable: isActive
  }).then(res => res.data)  
  if(!!result) {
    row.enable = isActive
  }
}
async function handleCreate () {
  DocTypeDialogNewRef.value.handleOpen()
}
function handleFilterFormChange(formModel: any) {
  extraParams = formModel
  reload();
}
const ResponsiveFilterRef = ref();
async function getFilter() {
  const filters = await adminApi.api.getDocpaltypeSettingsPageConditions().then((res) => {
    return res.data;
  });
  ResponsiveFilterRef.value.init(filters)
}
onMounted(() => {
  getFilter();
});
</script>
<style lang="scss" scoped>
:deep .vxe-buttons--wrapper {
  display: flex;
  justify-content: space-between;
}
.responsive-container {
  width: 70%;
  :deep .el-input {
    width: 200px;
  }
}
</style>
