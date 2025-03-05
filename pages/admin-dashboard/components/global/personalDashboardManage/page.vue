<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="name"
          @form-change="handleFilterFormChange"
        />
        <el-button type="primary" @click="handleCreate">{{$t('button.add')}}</el-button>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 'A'" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="danger">{{ $t("actions.inactive") }}</el-tag>
      </template>
    </VxeGrid>
    <PersonalDashboardDialog ref="DashboardDialogRef" @refresh="query({})" @add="handleDblclick"/>
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { adminApi } from "api";
import { routePersonalDashboardDetail } from '~/utils/routerHelper';
const routerProvider = inject(MenuRouterKey)
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
  id: "personalDashboardManage",
  api: (pageParams: any) =>
  adminApi.api.postPersonalDashboard({ ...pageParams, ...extraParams }),
  columns: [
    { field: "name", title: "tableHeader_name", fixed: "left" },
    { field: "groupId", title: "tableHeader_access" },
    {
      field: "createdDate",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      },
    },
  ],
  bodyActions: [
    [
      {
        code: "hold_edit",
        name: t('common_edit'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row)
        },
      },
      {
        code: "hold_config",
        name: t('common_config'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleConfig(row)
        },
      },
      {
        code: "hold_delete",
        name: t('common_delete'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          deleteItem(row.id);
        },
      },
    ],
  ],
  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
});
const DashboardDialogRef = ref()
function handleDblclick(row: any) {
  routerProvider?.navigateTo(routePersonalDashboardDetail(row), false)
}
function handleConfig(row: any) {
  DashboardDialogRef.value.handleOpen({
    ...row,
    isEdit: true
  })
}
async function deleteItem(id: any) {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if(action !== 'confirm') return
  await adminApi.api.deletePersonalDashboardId(id)
  query({})
}
async function handleCreate() {
  DashboardDialogRef.value.handleOpen();
}
function handleFilterFormChange(formModel: any) {
  if (!formModel.isDesc) formModel.isDesc = true
  if (!!formModel.isDesc) formModel.isDesc = formModel.isDesc === 'false' ? false : true
  let filterParams: any = {
    name: formModel.name === "" ? undefined : formModel.name,
    orderBy: formModel.orderBy === undefined || formModel.orderBy === "" ? "createdDate" : formModel.orderBy
  };
  filterParams.isDesc = formModel.isDesc
  extraParams = filterParams;
  reload();
}

const ResponsiveFilterRef = ref()
async function getFilter() {
  const data = [
    { key: "orderBy", label: "tableHeader.sortBy", type: "string", isMultiple: false,
      options: [
        { label: 'table_name', value: 'name' },
        { label: 'tableHeader_access', value: 'access' },
        { label: 'filePopover_fileCreatedDate', value: 'createdDate' }
      ]
    },
    { key: "isDesc", label: "tableHeader.sortOrder", type: "string", isMultiple: false,
      options: [
        { label: 'tableHeader.desc', value: false },
        { label: 'tableHeader.asc', value: true }
      ]
    }
  ]
  ResponsiveFilterRef.value.init(data)
}
onMounted(() => {
  getFilter()
})
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
