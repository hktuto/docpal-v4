<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          inputKey="label"
          @form-change="handleFilterFormChange"
          inputPlaceHolder="folder_cabinetFilterItemName"
        />
        <el-button id="UniqueIdGeneratorList__AddUniqueIdGenerator" class="el-icon--right button" type="primary"
                   @click="handleDetail">
          {{ $t('button.add') }}
        </el-button>
      </template>
    </VxeGrid>
  </div>

  <el-dialog v-model="dialogShow" :title="t('Duplicate')" width="500">
    <el-form ref="duplicateRef" :model="duplicateForm" @submit.native.prevent>
      <el-form-item :label="t('New Generator Name')" label-position="top"
                    :rules="[{ required: true, message: t('New Generator Name') + t('render.hint.fieldRequired') }]">
        <el-input v-model="duplicateForm.name" clearable :placeholder="t('Name')">
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="handleDuplicateSubmit">
        {{ t('common_submit') }}
      </el-button>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { adminApi } from 'api'
import { routeUniqueIdGeneratorDetail } from '~/utils/routerHelper'

const routerProvider = inject(MenuRouterKey)
const ResponsiveFilterRef = ref()
const { t } = useI18n()
let extraParams: any = {}
let dialogShow = false
let duplicateForm = {
  name: ''
}
const duplicateRef = ref()

const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows
} = useVxeTable({
  id: 'unique-id-generator',
  api: async (pageParams: any) => {
    return await adminApi.api.postIdTemplatesPage({
      ...pageParams,
      ...extraParams
    })
  },
  columns: [
    { field: 'name', title: 'name', fixed: 'left' },
    { field: 'lastIdValue', title: 'Latest Id' },
    { field: 'startNumber', title: 'startNumber' },
    { field: 'createdByName', title: 'Create By' },
    { field: 'modifiedByName', title: 'modified_by' },
    {
      field: 'modifiedDate',
      title: 'table_last_update',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    }
  ],
  bodyActions: [
    [
      {
        code: 'delete',
        name: t('common_edit'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDetail(row)
        }
      },
      {
        code: 'duplicate',
        name: t('actions.duplicate'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDuplicate(row)
        }
      },
      {
        code: 'delete',
        name: t('common_delete'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDelete(row)
        }
      }
    ]
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDetail(row)
  }
})

function handleDetail(row: any) {
  routerProvider?.navigateTo(routeUniqueIdGeneratorDetail(row), false)
}

/**
 * 複製配置
 * 彈窗編寫新的名稱，需要檢查是否存在同名
 * @param row
 */
async function handleDuplicate(row: any) {
  try {
    duplicateForm = deepCopy(row)
    duplicateForm.name = ''
    dialogShow = true
  } catch (e) {
    console.log(e)
  }
}

async function handleDuplicateSubmit() {
  const data = await adminApi.api.postIdTemplates({ name: duplicateForm.name }).then(res => res.data)
  duplicateForm.id = data.id
  await adminApi.api.putIdTemplatesId(data.id, { ...data, ...duplicateForm })
  routerProvider?.message.success(t('tip_createdSuccessMsg', {
    modelName: t('Unique Id'),
    name: duplicateForm.name
  }))
  reload()
}


async function handleDelete(row: any) {
  ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    .then(async () => {
      try {
        await adminApi.api.deleteIdTemplatesId(row.id)
        routerProvider?.message.success(t('tip_deleteSuccessMsg', {
          modelName: t('share_internalShareLink'),
          name: null
        }))
      } catch (error) {
        console.log(error)
      } finally {
        reload()
      }
    })
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
        { label: 'name', value: 'name' },
        { label: 'Latest Id', value: 'lastIdValue' },
        { label: 'startNumber', value: 'startNumber' },
        { label: 'createdByName', value: 'Create By' },
        { label: 'modified_by', value: 'modifiedByName' },
        { label: 'table_last_update', value: 'modifiedDate' }
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
</script>
<style lang="scss" scoped>
:deep .el-input {
  width: 200px;
}

:deep .vxe-buttons--wrapper {
  justify-content: space-between;

  .responsive-container {
    width: 70%;
  }
}
</style>
