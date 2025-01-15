<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="name"
        />
        <el-button type="primary" @click="handleCreate()">{{ $t('docType.new') }}</el-button>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.enable" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="info">{{ $t("actions.inactived") }}</el-tag>
      </template>
    </VxeGrid>
    <SmartFolderInfoDialog ref="SmartFolderInfoDialogRef" @refresh="query()"/>
  </div>
</template> 
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { adminApi } from "api";
import { routeSmartFolderDetail } from '~/utils/routerHelper';
const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
if( !routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
let extraParams: any = {};
const state = reactive<any>({});
const { tableConfig, tableEvent, tableRef, query, reload } = useVxeTable({
  id: "userTableSetting",
  api: async (pageParams: any) => {
    return await adminApi.api.postNuxeoSfolderPage({
      ...pageParams,
      ...extraParams,
    });
  },
  columns: [
    { field: "name", title: "tableHeader_name", fixed: "left" },
    { field: "userGroups", title: "tableHeader_access" }
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
        code: "info",
        name: "common_info",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleCreate(row)
        },
      },
      {
        code: "delete",
        name: "common_delete",
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDelete(row.id)
        },
      },
    ],
  ],

  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
});
function handleDblclick (row) {
  routerProvider?.navigateTo(routeSmartFolderDetail(row), false)
}
const SmartFolderInfoDialogRef = ref()
function handleCreate (setting?: any) {
    SmartFolderInfoDialogRef.value.handleOpen(setting)
}
async function handleDelete(id: string) {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if(action !== 'confirm') return
  await adminApi.api.deleteNuxeoSfolderId(id)
  query()
}
function handleFilterFormChange(formModel: any) {
  extraParams = formModel
  reload();
}
const ResponsiveFilterRef = ref();
async function getFilter() {
  const filters = await adminApi.api.getNuxeoSfolderPageConditions().then((res) => {
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
