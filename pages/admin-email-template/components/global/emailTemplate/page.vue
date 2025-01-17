<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="name"
          @form-change="handleFilterFormChange"
        />
        <div>
          <el-button type="info" @click="handleEditEmailLayout">{{$t('button.editEmailLayout')}}</el-button>
          <el-button type="primary" @click="handleAdd">{{$t('button.add')}}</el-button>
        </div>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.enable" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="danger">{{ $t("actions.inactived") }}</el-tag>
      </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { adminApi } from "api";
import dayjs from "dayjs";
import { routeEmailTemplateDetail, routeLayoutTemplatePage } from '~/utils/routerHelper';
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
    adminApi.api.postTemplateEmailTemplatePage({ ...pageParams, ...extraParams }),
  columns: [
    { field: "label", title: "tableHeader_name", fixed: "left" },
    { field: "subject", title: "tableHeader_subject" },
    { field: "id", title: "ID",  },
    { field: "emailLayoutName", title: "emailTemplate.layout",  },
    { field: "createdBy", title: "role.creator",  },
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
function handleDblclick(row) {
  // router.push(`/easyFormManage/${row.id}`);
  routerProvider?.navigateTo(routeEmailTemplateDetail(row), false)
}
function handleAdd () {
  routerProvider?.navigateTo(routeEmailTemplateDetail({
    label: 'new',
    id: 'new'
  }), false)
}
async function handleDeleteTemplate(id: string) {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    await adminApi.api.deleteTemplateEmailTemplateId(id)
    query({})
}
function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload();
}
const ResponsiveFilterRef = ref()
async function getFilter() {
  const layouts = await adminApi.api.getTemplateEmailLayoutAll().then(res => res.data)
  const filters = [
    { key: "emailLayoutIds", label: "emailTemplate.layout", type: "string", 
        options: layouts?.map(item => ({
          value: item.id,
          label: item.name
        })) }
  ]
  ResponsiveFilterRef.value.init(filters)
}

function handleEditEmailLayout() {
  routerProvider?.navigateTo(routeLayoutTemplatePage(), false)
}
onMounted(() => {
  getFilter()
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
