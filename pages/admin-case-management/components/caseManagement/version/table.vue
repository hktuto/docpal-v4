<script lang="ts" setup>
import type { VxeGridInstance, VxeGridListeners } from 'vxe-table'

const listProvider = inject(CaseManagementVersionProviderKey)
if (!listProvider) {
  throw new Error('CaseManagementListProviderKey not found')
}
// const gridRef = ref<VxeGridInstance<any>>()
let extraParams: any = {}
const { pageNum, pageSize, orderBy, isDesc, filters } = defineProps<{
  pageNum?: number,
  pageSize?: number,
  orderBy?: string,
  isDesc?: boolean,
  filters?: any
}>()
const ResponsiveFilterRef = ref()

const { tableConfig, tableEvent, tableRef, reload, qyery } = useVxeTable({
  id: 'adminCaseManagementVersionList',
  api: (pageParams: any) => listProvider?.getListApi({ ...pageParams, ...extraParams }),
  remoteSort: true,
  defaultSort: orderBy ? [{ field: orderBy, order: isDesc ? 'desc' : 'asc' }] : [],
  pageSize,
  columns: [
    {
      field: 'versionNumber',
      title: 'file_versionNumber',
      fixed: 'left'
    },
    {
      field: 'production',
      title: 'tableHeader_status',
      formatter({ cellValue }: any) {
        return cellValue ? 'production' : ''
      }
    },
    {
      field: 'modifiedDate',
      title: 'table_modifiedDate',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    },
    {
      field: 'modifiedBy',
      title: 'modified_by'
    },
    {
      field: 'createdDate',
      title: 'workflow_createDate',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    },
    {
      field: 'createdBy',
      title: 'info_by'
    }
  ],
  dblClickAction: ({ row, column, event }: any) => {
    listProvider.openVersionDetail(row)
  },
  bodyActions: [
    [
      {
        code: 'dpTool_edit',
        name: 'edit',
        action: ({ row }: any) => {
          listProvider.openVersionDetail(row)
        }
      },
      {
        name: 'workflowEditor_saveAsNewVersion',
        code: 'save_as_new_version',
        action: ({ row }: any) => {
          listProvider.saveAsNewVersion(row)
        }
      },
      {
        code: 'promote_version',
        name: 'promote',
        action: ({ row }: any) => {
          listProvider.promoteVersion(row)
        }
      }
    ]
  ],
  permissionMethod: listProvider.actionPermission
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
        { label: 'info_by', value: 'createdBy' },
        { label: 'modified_by', value: 'modifiedBy' },
        { label: 'table_modifiedDate', value: 'modifiedDate' },
        { label: 'file_versionNumber', value: 'createdDate' }
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

defineExpose({ reload, qyery })
</script>

<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <div class="actions">
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
  flex-flow: row nowrap;
  align-items: center;
}
</style>
