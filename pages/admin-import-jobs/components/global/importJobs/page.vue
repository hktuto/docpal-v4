<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <div class="actions">
          <ResponsiveFilter ref="ResponsiveFilterRef" inputKey="name" @form-change="handleFilterFormChange" inputPlaceHolder="companyProfile.filterTip" />
        </div>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 'A'" type="success">{{ $t('actions.active') }}</el-tag>
        <el-tag v-else type="danger">{{ $t('Deactivated') }}</el-tag>
      </template>
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import { ElMessageBox } from 'element-plus'
import { routeImportJobsDetailPage } from '../../../util/routerHelper'
const ResponsiveFilterRef = ref()
const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey is not provided')
}
const { t } = useI18n()
let extraParams: any = {}
const { tableConfig, tableEvent, tableRef, query, reload, cleanSelectedRows } = useVxeTable({
  id: 'a-company-profile',
  api: (pageParams: any) => adminApi.api.postImportjobsPage({ ...pageParams, ...extraParams }),
  columns: [
    { field: 'profileName', title: 'importJobs.profileName', fixed: 'left' },
    { field: 'fileName', title: 'importJobs.fileName' },
    { field: 'status', title: 'common_status' },
    { field: 'queueOrder', title: 'importJobs.queueOrder' },
    { field: 'source', title: 'importJobs.source' },
    {
      field: 'createdDate',
      title: 'dpTable_createdDate',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    },
  ],
  bodyActions: [
    [
      {
        code: 'edit',
        name: t('common_edit'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row)
        }
      },
    ]
  ],
  // permissionMethod: (args: PermissionMethodParams) => {
  //   return {
  //     visible: true,
  //     disabled: false
  //   }
  // },
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row)
  }
})

function handleDblclick(row: any) {
  // router.push(`/easyFormManage/${row.id}`);
  routerProvider?.navigateTo(routeImportJobsDetailPage(row), false)
}


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
        { label: 'importJobs.profileName', value: 'profileName' },
        { label: 'dpTable_createdDate', value: 'createdDate' },
        { label: 'common_status', value: 'status' },
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
  ResponsiveFilterRef.value?.init(data)
}

onMounted(() => {
  getFilter()
})
</script>
<style lang="scss" scoped>
.actions {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-space-xs);
  align-items: center;
  justify-content: flex-start;
  --icon-size: var(--app-font-size-m);
}

:deep .el-input {
  width: 200px;
}
</style>
