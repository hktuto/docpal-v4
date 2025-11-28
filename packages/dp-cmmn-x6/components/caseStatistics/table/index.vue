<script lang="ts" setup>
import { clientApi } from 'api'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import '../../../../../packages/dp-dashboard/components/formSlot/displayColumn/vxeTableRender.ts'
import { formSlotOrderDisplayColumns } from '../../../../../packages/dp-dashboard/components/formSlot/displayColumn/reorderColumn'
const platform = useAppPlatform()
const { setting, displayColumns, dates, sql } = defineProps<{
  setting: any
  displayColumns: any
  dates: any
  sql: string
}>()

const CMDProvider = inject(CaseManagementDashboardKey)
const caseId = CMDProvider?.instanceId?.value || null
const { t } = useI18n()
const emits = defineEmits(['close'])
const tabProvider = inject(TabManagerKey)
let extraParams: any = {}
const tableReady = ref(false)
const { tableConfig, tableEvent, tableRef, query, reload, cleanSelectedRows } = useVxeTable({
  id: 'dashboardRelatedCaseTable',
  refresh: false,
  virtualScroll: true,
  optionalConfig: {
    treeConfig: {
      // expandAll: true,
      rowField: 'id',
      parentField: 'parent_id',
      transform: true,
      indent: 20
    }
  },
  api: async (params: any) => {
    // if (platform.value === 'admin') {
    //   return {
    //     entryList: [],
    //     totalSize: 0
    //   }
    // }
    const response = await clientApi.api.getPostgrestTable(`${setting.tableName}?${sql}`)
    const data = groupTree(response.data)
    // setTimeout(() => {
    //   tableRef.value.setAllTreeExpand(true)
    // })
    console.log('data', data)
    console.log('extraParams', extraParams)
    return data
  },
  columns: [],
  dblClickAction: ({ row }) => {
    if (!row.case_id) return
    notiHandleView({ content: { caseInstanceId: row.case_id } }, tabProvider)
    emits('close')
  },
  zoom: false,
  saveColumnOrder: false
})

const dialogRef = ref()

async function reorderColumn(fields: any) {
  tableReady.value = false
  const columns = await formSlotOrderDisplayColumns(fields, tabProvider, closeDialog)
  tableConfig.columns = [...columns]
  console.log('columns', columns)
  setTimeout(() => {
    tableReady.value = true
  }, 200)
}
function closeDialog() {
  emits('close')
}
watch(
  () => setting?.displayColumns,
  (newVal) => {
    try {
      console.log('newVal', newVal)
      reorderColumn(newVal)
    } catch (error) {
      console.log('error', error)
    }
  },
  {
    deep: true,
    immediate: true
  }
)
function groupTree(data: any[]) {
  let treeData: any = []
  if (setting.groupField && setting.sortBy) {
    const groupData = data.reduce((prev: any, item: any) => {
      const groupField = item[setting.groupField] === 'null' || !item[setting.groupField] ? '-' : item[setting.groupField]
      const sortBy = item[setting.sortBy]
      if (!prev[groupField]) {
        prev[groupField] = {
          id: groupField,
          [setting.groupField]: groupField,
          [setting.sortBy]: 0,
          parent_id: null
        }
      }
      prev[groupField][setting.sortBy] += sortBy
      treeData.push({ ...item, parent_id: prev[groupField].id, id: item.case_id })
      return prev
    }, {})
    Object.values(groupData).forEach((item: any) => {
      treeData.push(item)
    })
  } else {
    treeData = data
  }
  return treeData
}
function handleFilterFormChange(form: any) {
  console.log('form', form)
  extraParams = form
  reload()
}
onMounted(() => {
  console.log('setting', setting)
})
defineExpose({ reorderColumn, reload, query })
</script>

<template>
  <VxeGrid v-if="tableReady" ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <!-- <template #toolbar_buttons>
      <ResponsiveFilter ref="ResponsiveFilterRef" :inputPlaceHolder="$t('common_filter')" @form-change="handleFilterFormChange" inputKey="q" />
    </template> -->
  </VxeGrid>
  <DashboardActionHumanTaskDialog ref="dialogRef" @refresh="reload()" />
</template>

<style lang="scss" scoped>
.tableActions {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow: hidden;
  gap: var(--app-space-s);
  .responsive-container {
    flex: 1 0 auto;
    width: auto;
  }
}
:deep(.el-input) {
  width: 200px;
}
</style>
