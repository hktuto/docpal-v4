<script lang="ts" setup>
import { InternalShareProviderKey } from '#imports'
import { adminApi } from 'api'
import { provide } from 'vue'
import InternalShareListTable from '../../InternalShare/list/table.vue'
import { ElMessageBox } from 'element-plus'


const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey is not provided')
}

const props = defineProps<{
  pageNum: number,
  pageSize: number,
  filters?: any
}>()
const { pageNum, pageSize, filters } = toRefs(props)

const { t } = useI18n()
const filterData = ref()
const ResponsiveFilterRef = ref()
const tableRef = ref<InstanceType<typeof InternalShareListTable>>()

function handleFilterFormChange(formData: any) {
  filterData.value = formData
  tableRef.value?.reload()
}

function handleClearFilter() {
  filterData.value = {}
  tableRef.value?.reload()
}

onMounted(() => {
  ResponsiveFilterRef.value.init(
    [{
      key: 'orderBy', label: 'tableHeader.sortBy', type: 'string', isMultiple: false,
      options: [
        { label: 'tableHeader.fileOrFolderName', value: 'documentNames' },
        { label: 'tableHeader_shareBy', value: 'shareByUserId' },
        { label: 'tableHeader_shareTo', value: 'shareToUserIds' },
        { label: 'workflow_createDate', value: 'createdDate' }
      ]
    },
      {
        key: 'isDesc', label: 'tableHeader.sortOrder', type: 'string', isMultiple: false,
        options: [
          { label: 'tableHeader.asc', value: false },
          { label: 'tableHeader.desc', value: true }
        ]
      }])
  if (filters.value) {
    filterData.value = filters.value
    nextTick(() => {
      Object.keys(filters.value).forEach(key => {
        ResponsiveFilterRef.value.setValue(key, filters.value[key])
      })
      // tableRef.value?.reload()
    })
  }
})


async function deleteAction(row: any) {
  ElMessageBox.confirm(
    t('tip_deleteMsg', { modelName: t('share_internalShareLink'), name: null }),
    {
      confirmButtonText: t('common_confirmDelete')
    }
  ).then(async () => {
    // param.push(...row.detailIds.split(','))
    await adminApi.api.deleteInternalshare({ internalShareId: row.internalShareId })
    routerProvider?.message.success(t('tip_deleteSuccessMsg', { modelName: t('share_internalShareLink'), name: null }))
    tableRef.value?.reload()
  })
  return
}

provide(InternalShareProviderKey, {
  getListApi: (params: any) => {
    let filter: any = undefined
    if (filterData.value) {
      Object.keys(filterData.value).forEach(key => {
        if (filterData.value[key]) params[key] = filterData.value[key]
      })
      filter = { ...filterData.value }
    }
    console.log('filte', params)
    routerProvider?.updateProps({
      pageNum: params.pageNum + 1,
      pageSize: params.pageSize,
      filters: filter
    })
    return adminApi.api.postInternalsharePage(params)
  },
  actionPermission: (args: PermissionMethodParams) => {
    return { visible: true, disabled: false }
  },
  deleteAction
})


</script>


<template>
  <div class="pageContainer">
    <InternalShareListTable ref="tableRef">
      <template #toolbar_buttons>
        <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"
                          inputKey="documentName" @clear-filter="handleClearFilter"
                          inputPlaceHolder="share_FilterByDocumentName" />
      </template>
    </InternalShareListTable>

  </div>

</template>

<style lang="scss" scoped>
.pageContainer {
  width: 100%;
  height: 100%;
  padding: var(--app-space-s);
  overflow: hidden;
}

:deep .el-input {
  width: 200px;
}
</style>