<script lang="ts" setup>
const auditProvider = inject(AuditProviderKey)
if (!auditProvider) {
  throw new Error('AuditProviderKey not found')
}
let extraParams: any = {}
const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
  id: 'auditListTableSetting',
  api: (pageParams: any) => auditProvider?.getListApi({ ...pageParams, ...extraParams }),
  columns: [
    {
      field: 'principalName',
      title: 'User',
      fixed: 'left'
    },
    {
      field: 'currentPath',
      title: 'table_path',
      slots: {
        default: 'currentPath'
      }
    },
    { field: 'eventCategory', title: 'category' },
    { field: 'label', title: 'log_auditEvent' },
    {
      field: 'eventDate', title: 'log_auditFilterDate',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    }
  ]
})

defineExpose({ reload, query })
const ResponsiveFilterRef = ref()

function getFilter() {
  const data = [
    {
      key: 'orderBy',
      label: 'tableHeader.sortBy',
      type: 'string',
      isMultiple: false,
      options: [
        // { label: 'category', value: 'eventCategory' },
        { label: 'log_auditFilterDate', value: 'eventDate' },
        // { label: 'log_auditEvent', value: 'label' },
        // { label: 'table_path', value: 'currentPath' },
        { label: 'User', value: 'principalName' },
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

function handleFilterFormChange(formModel: any) {
  if (!formModel.isDesc) formModel.isDesc = true
  if (!!formModel.isDesc) formModel.isDesc = formModel.isDesc !== 'false'
  extraParams = formModel
  reload()
}

onMounted(() => {
  getFilter()
})
</script>


<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <ResponsiveFilter
        ref="ResponsiveFilterRef"
        @form-change="handleFilterFormChange"
      />
      <slot name="toolbar_buttons" />
    </template>
    <template #currentPath="{row}">
      <span v-if="row.currentPath" class="pathButton"
            @click="auditProvider.goClientPath(row.currentPath)">{{ row.logicalPath }}</span>
    </template>
  </VxeGrid>
</template>