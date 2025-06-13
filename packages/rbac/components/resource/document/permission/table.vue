<script lang="ts" setup>
import { adminApi } from 'api'
const props = defineProps<{
  document: any
}>()

const { document } = toRefs(props)

const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
  id: 'rbac-resource-document-permission-table',
  api: async (pageParams: any) => {
    // const data = await getChildApi(id.value || 'root')
    return adminApi.api.getAclResourcePermissionsResourceResourceid(document.value.id).then((res) => res)
  },

  columns: [
    { field: 'targetId', title: 'rbac.permission.targetId' },
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
    { field: 'permissionIds', title: 'rbac.permission.permissionIds' }
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
    if(!row) return {
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

function handleAddSet() {

}

const detailDialogRef = ref()
function handleDblClick(row) {
  detailDialogRef.value?.open(row, document.value.id)
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
  <ResourceDocumentPermissionDetailDialog ref="detailDialogRef" @success="reload" />
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  justify-content: flex-flex;
  gap: var(--app-space-s);
}
</style>
