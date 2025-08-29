<script lang="ts" setup>
const listProvider = inject(InternalShareProviderKey)
if (!listProvider) {
  throw new Error('InternalShareListProviderKey not found')
}

const { pageNum, pageSize, orderBy, isDesc, filters } = defineProps<{
  pageNum?: number
  pageSize?: number
  orderBy?: string
  isDesc?: boolean
  filters?: any
}>()

const { tableRef, tableConfig, tableEvent, reload } = useVxeTable({
  id: 'adminInternalShareList',
  api: listProvider.getListApi,
  remoteSort: true,
  defaultSort: [
    {
      field: 'createdDate',
      order: 'desc'
    }
  ],
  columns: [
    {
      title: 'tableHeader.fileOrFolderName',
      fixed: 'left',
      slots: {
        default: 'docIcon'
      }
    },
    {
      title: 'tableHeader_shareBy',
      field: 'shareByUserId'
    },
    {
      title: 'document_path',
      field: 'path'
    },
    {
      title: 'tableHeader_shareTo',
      field: 'shareToUserIds',
      formatter: ({ cellValue }) => {
        // const displayValue = cellValue.sort()
        try {
          const displayValue = JSON.parse(cellValue).sort()
          return displayValue.join(', ')
        } catch (error) {
          return cellValue
        }
      }
    },
    {
      field: 'createdDate',
      title: 'workflow_createDate',
      formatter({ cellValue }) {
        return formatDate(cellValue)
      }
    }
  ],
  bodyActions: [
    // [
    //   {
    //     name: 'common_delete',
    //     action: ({ row }) => listProvider.deleteAction(row)
    //   }
    // ]
  ],
  permissionMethod: listProvider?.actionPermission
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
    <template #docIcon="{ row, index }">
      <div class="nameItem">
        <BrowseItemIcon v-if="!!row" :type="row.isFolder !== 'false' ? 'folder' : 'file'" :fileName="row.documentName || row.documentNames" />
        <div class="label">{{ row.documentName || row.documentNames }}</div>
      </div>
    </template>
  </VxeGrid>
</template>

<style lang="scss" scoped>
.nameItem {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: var(--app-space-xs);
}
</style>
