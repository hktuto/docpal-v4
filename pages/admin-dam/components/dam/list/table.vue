<script lang="ts" setup>

const listProvider = inject(DamProviderKey)
if (!listProvider) {
  throw createError('DamProviderKey is not define')
}
const { t } = useI18n()
const { tableRef, tableConfig, tableEvent, reload } = useVxeTable({
  id: 'admin-dam-table',
  api: listProvider?.getListApi,
  virtualScroll: true,
  columns: [
    {
      title: 'DAM_fileType',
      field: 'sourceType',
      fixed: 'left',
      width: 200
    },
    {
      title: 'DAM_convertion',
      field: 'targetTypes',
      slots: {
        default: 'targetTypes'
      }
    }
  ],
  bodyActions: [
    [
      {
        code: 'edit',
        name: 'button.add',
        action: ({ row }: any) => {
          listProvider.handleDialog(row)
        }
      }
    ]
  ],
  permissionMethod: ({ row, rowIndex, code }: any) => {
    if (!row) {
      return { visible: false, disabled: false }
    }
    return {
      visible: true,
      disabled: false
    }
  },
  dblClickAction: ({ row, column, event }: any) => {
    listProvider.handleDialog(row)
  }
})

defineExpose({
  reload
})
</script>

<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <slot name="toolbar_buttons" />
    </template>
    <template #targetTypes="{ row }">
      <el-tag
        v-for="(item, index) in row.list"
        :key="index"
        closable
        size="large"
        @close="listProvider.handleDelete(item)"
        @click="listProvider.handleDialog(item)"
      >{{ item.label }} ({{ item.targetType }})
      </el-tag>
    </template>
  </VxeGrid>
</template>
<style lang="scss" scoped>
.el-tag {
  margin: var(--app-space-xs);
}
</style>
