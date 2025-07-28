<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="metaData"
          inputPlaceHolder="documentType_metaFilter"
        />
        <el-button id="DocumentType__DisplayMeta__AddNewDisplayMeta" type="primary" @click="handleDialogShow()">
          {{ $t('documentType_metaAdd') }}
        </el-button>
      </template>
      <template #display="{ row }">
        <el-switch v-model="row.display" :loading="row.loading"
                   @click.native.stop
                   @change="handleDisplayChange(row)"></el-switch>
      </template>
      <template #isRequire="{ row }">
        <el-icon v-if="row.isRequire" style="--color: var(--app-primary-color)"><Select /></el-icon>
        <el-icon v-else style="--color: #F56C6C">
          <CloseBold />
        </el-icon>
      </template>
    </VxeGrid>
    <DocTypeDialogAddDisplayMeta ref="MetaDisplayMetaDialogRef"
                                 :docTypeDetail="docTypeDetail"
                                 @refresh="handleRefresh" />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api'
import { Select, CloseBold } from '@element-plus/icons-vue'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const props = defineProps<{
  docTypeDetail: any;
  metadata: any;
}>()
const ResponsiveFilterRef = ref()
const emits = defineEmits(['refresh'])
const { tableConfig, tableEvent, tableRef } = useVxeTable({
  id: 'displayMetaTable',
  columns: [
    {
      field: 'metadata',
      title: 'rightDetail_meta',
      fixed: 'left',
      formatter({ cellValue }: any) {
        return t(cellValue)
      }
    },
    /*        {
                field: "metaDataType",
                title: "metadata.dataType",
                formatter({cellValue}: any) {
                    return t(`meta.dataType.${cellValue}`);
                },
            },
    { field: 'dataType', title: 'docTypeDetail.type' }, */
    {
      field: 'display',
      title: 'form_display',
      slots: {
        default: 'display'
      }
    }
  ],
  bodyActions: [
    [
      {
        code: 'edit',
        name: 'documentType_edit',
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDialogShow(row)
        }
      },
      {
        code: 'delete',
        name: 'documentType_delete',
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDelete(row)
        }
      }
    ]
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDialogShow(row)
  },
  virtualScroll: true
})

function handleRefresh(addMore: boolean = false) {
  ResponsiveFilterRef.value.handleFilter()
  if (addMore) handleDialogShow()
  emits('refresh')
}

async function handleDelete(row) {
  const action = await ElMessageBox.confirm(
    t('tip_deleteMsg', { modelName: t('docType_displayMeta'), name: null }),
    {
      confirmButtonClass: 'el-button el-button--warning',
      confirmButtonText: t('common_confirmDelete')
    }
  )
  if (action !== 'confirm') return
  const res = await adminApi.api.deleteDocpaltypeSettingsNameMetadata(props.docTypeDetail.name, {
    metadata: row.metadata
  })
  routerProvider?.message.success(t('tip_deleteSuccessMsg', { modelName: t('docType_displayMeta'), name: null }))
  emits('refresh')
}

const MetaDisplayMetaDialogRef = ref()

function handleDialogShow(data?: any) {
  MetaDisplayMetaDialogRef.value.handleOpen(props.metadata, data)
}

function handleFilterFormChange(formModel: any) {
  const data = props.metadata.filter((item: any) => {
    return (
      !formModel.metaData ||
      item.metadata.toLowerCase().includes(formModel.metaData.toLowerCase()) ||
      t(item.metadata).toLowerCase().includes(formModel.metaData.toLowerCase())
    )
  })
  console.log(data, formModel)
  tableRef.value?.loadData(data)
}

async function handleDisplayChange(row) {
  try {
    row.loading = true
    const params = {
      docType: props.docTypeDetail.name,
      id: row.id,
      display: row.display,
      ...row,
      metaData: row.metadata
    }
    await adminApi.api.postDocpaltypeSettingsAddMetadata(params)
  } catch (error) {
    row.display = !row.display
  } finally {
    setTimeout(() => {
      row.loading = false
    }, 500)
  }
}

watch(
  () => props.metadata,
  (newValue: any) => {
    setTimeout(() => {
      const data = !!newValue ? [...newValue] : []
      tableRef.value?.loadData(data)
    })
  },
  { immediate: true, deep: true }
)
</script>
<style lang="scss" scoped>
:deep .vxe-buttons--wrapper {
  display: flex;
  justify-content: space-between;
}

.responsive-container {
  width: 70%;

  :deep .el-input {
    width: 200px;
  }
}
</style>
