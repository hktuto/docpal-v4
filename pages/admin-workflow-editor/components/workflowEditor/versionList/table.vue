<script lang="ts" setup>
import dayjs from 'dayjs'
import type { VxeGrid } from 'vxe-table'

const ResponsiveFilterRef = ref()
const listProvider = inject(WorkflowEditorVersionListProviderKey)
if (!listProvider) {
  throw new Error('WorkflowEditorVersionListProviderKey not found')
}
let extraParams: any = {}
const { draftId } = defineProps<{
  draftId: string
}>()

const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
  id: 'workflowEditorVersionTableSetting',
  api: (pageParams: any) => listProvider.getListApi({ ...pageParams, ...extraParams, draftId }),
  remoteSort: true,
  defaultSort: [
    {
      field: 'createdDate',
      order: 'desc'
    }
  ],
  columns: [
    {
      field: 'versionNumber',
      title: 'workflow_editorVersion',
      minWidth: 60,
      fixed: 'left'
    },
    {
      field: 'isProduction',
      title: 'workflow_editorProduction',
      minWidth: 60,
      formatter({ cellValue }: any) {
        return cellValue === 'A' ? 'Production' : '--'
      }
    },
    {
      field: 'modifiedDate',
      title: 'workflow_editorLastDate',
      minWidth: 120,
      formatter({ cellValue }: any) {
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm')
      }
    },
    {
      field: 'createdBy',
      title: 'workflow_editorCreatedBy',
      minWidth: 120
    },
    {
      field: 'modifiedBy',
      title: 'workflow_editorLastModified',
      minWidth: 120
    }
  ],
  dblClickAction: ({ row, column, event }: any) => {
    listProvider.editHandler(row)
  },
  bodyActions: [
    [
      {
        code: 'view',
        name: 'View',
        action: ({ row }: any) => {
          listProvider.editHandler(row)
        }
      },
      {
        code: 'edit',
        name: 'Edit',
        action: ({ row }: any) => {
          listProvider.editHandler(row)
        }
      },
      {
        code: 'edit_new_tab',
        name: 'Edit in new tab',
        action: ({ row }: any) => {
          listProvider.editHandler(row, true)
        }
      },
      {
        code: 'promote_to_production', name: 'Promote to Production',
        action: ({ row }: any) => {
          listProvider.promoteToProductionHandler(row)
        }
      },
      {
        code: 'save_as_new_version', name: 'Save as new version',
        action: ({ row }: any) => {
          listProvider.saveAsNewVersionHandler(row)
        }
      }
    ]
  ],
  permissionMethod: (args: PermissionMethodParams) => {
    if (!args.row) {
      return { visible: false, disabled: false }
    }
    return listProvider.actionPermission(args)
  }
})

function handleFilterFormChange(formModel: any) {
  if (!formModel.isDesc) formModel.isDesc = true
  if (!!formModel.isDesc) formModel.isDesc = formModel.isDesc !== 'false'
  extraParams = formModel
  reload()
}

function getFilter() {
  const data = [
    {
      key: 'orderBy',
      label: 'tableHeader.sortBy',
      type: 'string',
      isMultiple: false,
      options: [
        { label: 'workflow_editorCreatedBy', value: 'createdBy' },
        { label: 'workflow_editorLastModified', value: 'modifiedBy' },
        { label: 'workflow_editorLastDate', value: 'modifiedDate' },
        { label: 'workflow_editorVersion', value: 'createdDate' },
      ]
    },
    {
      key: 'isDesc',
      label: 'tableHeader.sortOrder',
      type: 'string',
      isMultiple: false,
      options: [
        { label: 'tableHeader.asc', value: false },
        { label: 'tableHeader.desc', value: true }
      ]
    }
  ]
  ResponsiveFilterRef.value.init(data)
}

onMounted(() => {
  getFilter()
})

defineExpose({
  reload
})

</script>

<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <div class="actions">
        <slot name="toolbar_buttons" />
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
        />
      </div>
    </template>
  </VxeGrid>
</template>

<style lang="scss" scoped>
.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
