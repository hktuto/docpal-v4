<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="policyName"
          @form-change="handleFilterFormChange"
        />
        <el-button type="primary" @click="handleAdd">{{$t('button.add')}}</el-button>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 'A'" type="success">{{ $t("actions.activated") }}</el-tag>
        <el-tag v-else type="danger">{{ $t("actions.inactived") }}</el-tag>
      </template>
    </VxeGrid>
    <HoldDialog ref="HoldDialogRef" @update="query" />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from "api";
import dayjs from "dayjs";
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
  id: "a-hold",
  api: (pageParams: any) =>
    adminApi.api.postPolicyHoldsPage({ ...pageParams, ...extraParams }),
  columns: [
    { field: "policyName", title: "tableHeader_name", fixed: "left" },
    { field: "createdBy", title: "role.creator" },
    {
      field: "createdDate",
      title: "workflow_createDate",
      formatter({ cellValue }: any) {
        const format = userDisplayTimeSetting();
        return dayjs(cellValue).format(format);
      },
    },
    {
      field: "active",
      title: "user_active",
      slots: {
        default: "status",
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
        code: "hold_delete",
        name: t('common_delete'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          deleteItem(row.id);
        },
      },
      {
        code: "hold_active",
        name: t('actions.active'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleActive(row, 'A');
        },
      },
      {
        code: "hold_inactive",
        name: t('actions.inactive'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleActive(row, 'D');
        },
      }
    ],
  ],
  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
  permissionMethod: (args:PermissionMethodParams) => {
    switch (args.code) {
      case 'hold_active':
        return {
          visible: args.row.status === 'D',
          disabled: false
        }
        break;
      case 'hold_inactive':
        return {
          visible: args.row.status === 'A',
          disabled: false
        }
        break;
      default:
        return {
          visible:true,
          disabled: false
        }
    }
  }
});
const HoldDialogRef = ref()
function handleDblclick(row) {
  HoldDialogRef.value.handleOpen({
    ...row,
    isEdit: true
  })
}
async function handleActive(row: any, isActive: 'A' | 'D') {
  try {
    const result = await adminApi.api.patchPolicyHoldsIdStatusStatus(row.id, isActive).then(res => res.data)
    if (!!result) {
      row.status = isActive;
      ElMessage.success(t('dpMsg_success'))
    }
  } catch (error) {
    
  }
}
async function deleteItem(id: string) {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if(action !== 'confirm') return
  await adminApi.api.deletePolicyHoldsId(id)
  query()
}
async function handleCreate() {
  DialogRef.value.handleOpen();
}
function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload();
}
function handleAdd () {
  HoldDialogRef.value.handleOpen()
}
const ResponsiveFilterRef = ref()
async function getFilter() {
  const data = [
    { key: "status", label: "user_active", type: "string", isMultiple: false,
      options: [
        { label: "noActive", value: "D" },
        { label: "isActive", value: "A" }
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
  width: fit-content;
  :deep .el-input {
    width: 200px;
  }
}
</style>
