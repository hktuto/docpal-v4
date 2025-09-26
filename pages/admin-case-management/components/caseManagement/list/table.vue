<script lang="ts" setup>
import type { VxeGridInstance, VxeGridListeners } from 'vxe-table'

const listProvider = inject(CaseManagementListProviderKey)
if (!listProvider) {
  throw new Error('CaseManagementListProviderKey not found')
}
const { t } = useI18n()

const { pageNum, pageSize, orderBy, isDesc, filters } = defineProps<{
  pageNum?: number,
  pageSize?: number,
  orderBy?: string,
  isDesc?: boolean,
  filters?: any
}>()

const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
  id: 'adminCaseManagementList',
  api: (pageParams: any) => listProvider?.getListApi(pageParams),
  remoteSort: true,
  defaultSort: orderBy ? [{ field: orderBy, order: isDesc ? 'desc' : 'asc' }] : [{
    field: 'modifiedDate',
    order: 'desc'
  }],
  columns: [
    {
      field: 'name',
      title: 'caseManagement_name',
      fixed: 'left'
    },
    {
      field: 'productionVersion',
      title: 'dpTable.productionVersion'
    },
    {
      field: 'latestVersion',
      title: 'dpTable.latestVersion'
    },
    {
      field: 'createdDate',
      title: 'workflow_createDate',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
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
      field: 'caseIdPrefix',
      title: 'caseManagement.prefix'
    },
    {
      field: 'caseIdDigit',
      title: 'caseManagement.digit'
    },
    // TODO 版本管理添加后，active/inactive 失效
    // {
    //   field: 'enable',
    //   title: 'dpTable_status',
    //   sortable: true,
    //   formatter: ({ cellValue }: any) => {
    //     return cellValue ? t('actions.active') : t('actions.inactive')
    //   }
    // }
  ],
  bodyActions: [
    [
      {
        code: 'edit_latest_version',
        name: 'caseManagement_editLatest',
        action: ({ row }) => listProvider.openLatestVersion(row)
      },
      {
        code: 'edit_production_version',
        name: 'caseManagement_editProduction',
        action: ({ row }) => listProvider.openProductionVersion(row)
      }, {
      code: 'list_version',
      name: 'caseManagement_viewVersionHistory',
      action: ({ row }) => listProvider.openVersion(row)
    },
      // {
      //     code:'save_as',
      //     name:"caseManagement_saveCaseTemplate",
      //     action: ({row}) => listProvider.saveAsNewCase(row)
      // }
    ]
  ],
  permissionMethod: (args: PermissionMethodParams) => {
    if (!args.row) {
      return { visible: false, disabled: false }
    }
    return  listProvider.actionPermission
  },
  dblClickAction: ({ row, column, event }: any) => {
    listProvider.openLatestVersion(row)
  },
  optionalConfig: {
    rowConfig: {
      height: 60,
      isCurrent: true,
      isHover: true
    }
  }
})


defineExpose({ reload })
</script>


<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <slot name="toolbar_buttons" />
    </template>
    <template #status="{ row }">
      <el-tag v-if="row.enable" type="success">{{ $t('actions.active') }}</el-tag>
      <el-tag v-else type="danger">{{ $t('Deactivated') }}</el-tag>
    </template>
  </VxeGrid>
</template>
