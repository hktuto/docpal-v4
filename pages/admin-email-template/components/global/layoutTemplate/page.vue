<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="name"
          @form-change="handleFilterFormChange"
        />
        <el-button type="primary" @click="handleAdd">{{$t('button.add')}}</el-button>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.enable" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="danger">{{ $t("actions.inactived") }}</el-tag>
      </template>
    </VxeGrid>
    <EmailLayoutDialog ref="EmailLayoutDialogRef" @refresh="query({})"></EmailLayoutDialog>
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { adminApi } from "api";
import dayjs from "dayjs";
import { routeEmailTemplateDetail } from '~/utils/routerHelper';
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
  id: "a-email-layout-template",
  api: (pageParams: any) =>
    adminApi.api.postTemplateEmailLayoutPage({ ...pageParams, ...extraParams }),
  columns: [
    { field: "name", title: "tableHeader_name", fixed: "left" },
    { field: "createdBy", title: "role.creator" },
    {
      field: "createDate",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    }
  ],
  bodyActions: [
    [
      {
        code: "edit",
        name: t('common_edit'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row)
        },
      },
      {
        code: "delete",
        name: t('common_delete'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDeleteTemplate(row.id);
        },
      }
    ],
  ],
});
const EmailLayoutDialogRef = ref()
function handleDblclick(row) {
  // router.push(`/easyFormManage/${row.id}`);
  EmailLayoutDialogRef.value.handleOpen(row)
}
function handleAdd () {
  EmailLayoutDialogRef.value.handleOpen()
}
async function handleDeleteTemplate(id: string) {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    await adminApi.api.deleteTemplateEmailLayoutId(id)
    query({})
}
function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload();
}
onMounted(() => {
})
</script>
<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}
.responsive-container {
  overflow: hidden;
  width: 70%;
}
:deep .vxe-buttons--wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
