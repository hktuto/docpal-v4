<template>
<div class="pageContainer--padding tableContainer">
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange" inputKey="name" inputPlaceHolder="documentType_filter" />
      <el-button id="DocumentType__CreateNewDocumentType" type="primary" @click="handleCreate">
          {{ $t('metadata.new') }}
        </el-button>
        <el-button id="DocumentType__CreateNewDocumentType" type="primary" @click="handleExport">
          {{ $t('metadata.export') }}
        </el-button>
    </template>
    <template #display="{ row }">
        <el-switch v-model="row.active" />
    </template>
  </VxeGrid>
  <MetadataDialogNew ref="metadataDialogNewRef" />
</div>
</template>


<script lang="ts" setup>
import { adminApi } from 'api'
const ResponsiveFilterRef = ref()

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey is not provided')
}
let extraParams: any = {}
const { tableConfig, tableEvent, tableRef, query, reload } = useVxeTable({
  id: 'metadataList',
  api: async(params:any) => {
    return await adminApi.api.postDocpaltypeSettingsMetadataV2Query({
      ...params,
      ...extraParams
    })
  },
  columns:[
    {
      field: 'name',
      title: 'table_name',
      fixed: 'left'
    },
    {
      field: 'display',
      title: 'docType_displayMeta',
      slots: {
        default: 'display'
      }
    },
    {
      field:'lastModifiedDate',
      title: 'table_last_update',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    }
  ],
  bodyActions:[
    [

    ]
  ]
})

const metadataDialogNewRef = ref()

const handleFilterFormChange = (formModel: any) => {
  console.log(formModel)
}

const handleCreate = () => {
  metadataDialogNewRef.value.open()
}

const handleExport = () => {
  console.log('export')
}
</script>

<style lang="scss" scoped>
.pageContainer{
  :deep(.vxe-table--render-default .vxe-header-wrapper){
    background-color: var(--app-color-bg-secondary);
  }
}

</style>
