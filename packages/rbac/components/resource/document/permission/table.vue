<script lang="ts" setup>
import { adminApi } from 'api'
const props = defineProps<{
  document: any
}>()

const { document } = toRefs(props)

const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
  id: 'rbac-resource-document-permission-table',
  virtualScroll: true,
  api: async (pageParams: any) => {
    // const data = await getChildApi(id.value || 'root')
    return await adminApi.api.getAclResourcePermissionsResourceResourceid(document.value.id).then((res) => res.data)
  },
  columns: [
    {
      field: 'targetName',
      title: 'rbac.permission.targetName',
      type: 'html',
      formatter: ({ cellValue, row }: any) => {
        const icon = row.targetType === 1 ? '/icons/menu/user.svg' : row.targetType === 2 ? '/icons/menu/role.svg' : '/icons/menu/group.svg'
        return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue}</span> `
      }
    },
    {
      field: 'permissionLevel',
      title: 'rbac.permission.permissionLevel',
      formatter: ({ cellValue }) => {
        switch (cellValue) {
          case 1:
            return 'Read'
          case 2:
            return 'ReadWrite'
          case 3:
            return 'Manage'
          default:
            return 'Custom'
        }
      }
    },
    {
      field: 'isInherit',
      title: 'rbac.permission.isInherit',
      type: 'html',
      width: 80,
      align: 'center',
      formatter: ({ cellValue, row }: any) => {
        let icon = row.isInherit ? '/icons/check.svg' : '/icons/close.svg'
        return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> </span> `
      }
    },
    { field: 'inheritFrom', title: 'rbac.permission.inheritFrom' }
  ],
  bodyActions: [
    [
      {
        code: 'edit',
        name: 'common_edit',
        action: ({ row }: any) => {
          handleDblClick(row)
        }
      },
      {
        code: 'common_delete',
        name: 'common_delete',
        action: ({ row }: any) => {
          handleRemove(row)
        }
      }
    ]
  ],
  permissionMethod: ({ options, code, column, row, rowIndex }: any) => {
    console.log(row, code)
    if (!row)
      return {
        visible: false,
        disabled: false
      }
    if (code === 'common_delete') {
      return {
        visible: !row.isInherit,
        disabled: false
      }
    }
    return {
      visible: true,
      disabled: false
    }
  }
})
const userSetDialogRef = ref()
function handleAddSet() {
  userSetDialogRef.value?.open(null, document.value.id)
}

const detailDialogRef = ref()
function handleDblClick(row: any) {
  // check if row is user set
  if (row.targetType === 5) {
    userSetDialogRef.value?.open(row, document.value.id)
    return
  } else {
    detailDialogRef.value?.open(row, document.value.id)
  }
}
function handleAdd() {
  detailDialogRef.value?.open(null, document.value.id)
}
async function handleRemove(row) {
  console.log(row)
  await adminApi.api.deleteAclResourcePermissionsId(row.id)
  reload()
}
watch(
  document,
  async () => {
    reload()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <div class="actions">
        <el-button type="primary" @click="handleAdd">Add Permission</el-button>
        <el-button type="primary" @click="handleAddSet">Add User Set</el-button>
      </div>
    </template>
  </VxeGrid>
  <ResourceDocumentPermissionDetailDialog ref="detailDialogRef" :filterList="tableRef?.getTableData().tableData" @success="reload" />
  <ResourceDocumentUserSetDialog ref="userSetDialogRef" :filterList="tableRef?.getTableData().tableData" @success="reload" />
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  justify-content: flex-flex;
  gap: var(--app-space-s);
}
:deep(.browseNameCell) {
  display: flex;
  align-items: center;
  gap: var(--app-space-s);
  cursor: pointer;
}
:deep(.browseFileIcon) {
  width: calc(var(--app-space-m) * 1.5);
  height: calc(var(--app-space-m) * 1.5);
}
</style>
