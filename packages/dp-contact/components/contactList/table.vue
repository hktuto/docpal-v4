<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter ref="ResponsiveFilterRef" inputKey="name" @form-change="handleFilterFormChange" inputPlaceHolder="tableHeader_name" />
        <el-button id="Dashboard__CreateNewDashboard" type="primary" @click="handleCreate">
          {{ $t('button.add') }}
        </el-button>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 'A'" type="success">{{ $t('actions.activated') }}</el-tag>
        <el-tag v-else type="danger">{{ $t('actions.inactive') }}</el-tag>
      </template>
    </VxeGrid>
    <ContactListDialog ref="ContactListDialogRef" v-bind="props" @refresh="reload" @add="handleDblclick" />
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { globalApi } from 'api'
import { routeContactList } from '~/utils/routerHelper'

const props = defineProps<{
  id: string
  detail: any
}>()
const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
let extraParams: any = {}
const { tableConfig, tableEvent, tableRef, query, reload, cleanSelectedRows } = useVxeTable({
  id: `contactBook-${props.id}`,
  api: (pageParams: any) => {
    return globalApi.api.postContactgroupIdContactdetailPage(props.id, { ...pageParams, ...extraParams })
  },
  columns: [
    { field: 'name', title: 'tableHeader_name', fixed: 'left', editRender: { name: 'VxeInput' } },
    { title: 'role.creator', field: 'createdBy' },
    {
      field: 'createdDate',
      title: 'tableHeader_creationDate',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    },
    {
      field: 'modifiedDate',
      title: 'tableHeader_modifiedDate',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    }
  ],
  bodyActions: [
    [
      {
        code: 'contactbook_edit',
        name: t('common_edit'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleDblclick(row)
        }
      },
      {
        code: 'contactbook_delete',
        name: t('common_remove'),
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          deleteItem(row)
        }
      }
    ]
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row)
  },
  editRender: {
    editClosed: async ({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }: any) => {
      console.log(1111)
      console.log(row, rowIndex, $rowIndex, column, columnIndex, $columnIndex)
    },
    editConfig: {
      trigger: 'click',
      mode: 'row',
      showStatus: true
    }
  }
})

const ContactListDialogRef = ref()

function handleDblclick(row: any) {
  routerProvider?.navigateTo(routeContactList(row), false)
}

function handleConfig(row: any) {
  ContactListDialogRef.value.handleOpen({
    ...row,
    isEdit: true
  })
}

async function deleteItem(row: any) {
  const action = await ElMessageBox.confirm(t('msg_confirmWhetherToDelete'))
  if (action !== 'confirm') return
  await globalApi.api.deleteContactgroupId(row.id)
  routerProvider?.message.success(
    t('tip_deleteSuccessMsg', {
      modelName: t('contactBook.title'),
      name: row.name
    })
  )
  query({})
}

async function handleCreate() {
  ContactListDialogRef.value.handleOpen()
}

function handleFilterFormChange(formModel: any) {
  if (!formModel.isDesc) formModel.isDesc = true
  if (!!formModel.isDesc) formModel.isDesc = formModel.isDesc !== 'false'
  let filterParams: any = {
    name: formModel.name === '' ? undefined : formModel.name,
    orderBy: formModel.orderBy === undefined || formModel.orderBy === '' ? 'createdDate' : formModel.orderBy
  }
  filterParams.isDesc = formModel.isDesc
  extraParams = filterParams
  reload()
}

const ResponsiveFilterRef = ref()

async function getFilter() {
  const data = [
    {
      key: 'orderBy',
      label: 'tableHeader.sortBy',
      type: 'string',
      isMultiple: false,
      options: [
        { label: 'dashboard_accessUserGroup', value: 'access' },
        { label: 'dashboard_name', value: 'name' },
        { label: 'workflow_createDate', value: 'createdDate' }
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
function init() {
  getFilter()
}
onMounted(() => {
  // getFilter()
})
defineExpose({
  init
})
</script>
<style lang="scss" scoped>
:deep(.vxe-buttons--wrapper) {
  display: flex;
  justify-content: space-between;
}

.responsive-container {
  width: 70%;
  :deep(.el-input) {
    width: 200px;
  }
}
</style>
