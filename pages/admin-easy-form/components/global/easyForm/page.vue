<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="name"
          @form-change="handleFilterFormChange"
        />
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.enable" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="danger">{{ $t("actions.inactived") }}</el-tag>
      </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { adminApi } from "api";
import dayjs from "dayjs";
import { routeEasyFormDetail } from '~/util/routerHelper';
const routerProvider = inject(MenuRouterKey)
if( !routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
const { t } = useI18n()
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
    adminApi.api.postFormDesignPage({ ...pageParams, ...extraParams }),
  columns: [
    { field: "name", title: "easyForm.name", fixed: "left", type: "checkbox" },
    {
      field: "createDate",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "modifiedDate",
      title: "table_modifiedDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "status",
      title: "common_status",
      slots: {
        default: "status",
      },
    },
    { field: "processDefinitionKey", title: "easyForm.submitWorkflow" },
  ],
  bodyActions: [
    [
      {
        code: "edit_easyForm",
        name: t('common_edit'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row)
        },
      },
      {
        code: "active_easyForm",
        name: t('actions.active'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleActive(row, true);
        },
      },
      {
        code: "inactive_easyForm",
        name: t('actions.inactive'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleActive(row, false);
        },
      }
    ],
  ],
});
function handleDblclick(row) {
  // router.push(`/easyFormManage/${row.id}`);
  routerProvider?.navigateTo(routeEasyFormDetail(row), false)
}
async function handleActive(row: any, isActive: boolean) {
  try {
    const type = isActive ? 'patchFormDesignEnableId' : 'patchFormDesignDisableId'
    const result = await adminApi.api[type](row.id).then(res => res.data)
    if (!!result) {
      row.enable = isActive;
    }
  } catch (error) {
    
  }
}

function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload();
}

</script>
<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}
</style>
