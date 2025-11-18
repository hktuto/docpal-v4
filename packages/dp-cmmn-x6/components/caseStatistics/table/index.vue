<script lang="ts" setup>
import { clientApi } from 'api'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const platform = useAppPlatform()
const { setting, displayColumns, dates, sql } = defineProps<{
  setting: any
  displayColumns: any
  dates: any
  sql: string
}>()

const CMDProvider = inject(CaseManagementDashboardKey)
const caseId = CMDProvider?.instanceId?.value || null
let where = ref({})
const { t } = useI18n()
const emits = defineEmits(['close'])
const routerProvider = inject(MenuRouterKey)
const tabProvider = inject(TabManagerKey)
type TableState = {
  columns: any
  where: any[]
}
const caseEvents = ref<any>([])
const tableReady = ref(false)
const pageParams: any = {
  pageNum: 0,
  pageSize: 20,
  orderBy: 'created_date',
  isDesc: true
}

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
  try {
    const columns = []
    if (fields.length > 0) {
      const columneFromSetting = fields.reduce((prev: any, item: any) => {
        const newItem: any = {
          field: item.id,
          title: item.name.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase()),
          minWidth: 200
        }
        if (item.type === 'date') {
          newItem.formatter = ({ cellValue }) => {
            return formatDate(cellValue)
          }
        } else if (item.formatter) {
          newItem.formatter = item.formatter
        }

        if (setting.groupField === item.id) {
          newItem.treeNode = true
        }
        prev.push(newItem)
        return prev
      }, [])
      columns.splice(0, 0, ...columneFromSetting)
    }
    const index = columns.findIndex((item: any) => item.treeNode)
    if (index !== -1) {
      // tableConfig.treeConfig = {
      //   // expandAll: true,
      //   rowField: 'id',
      //   parentField: 'parent_id',
      //   transform: true,
      //   indent: 20
      // }
      const removedElement = columns.splice(index, 1)[0]
      columns.unshift(removedElement)
    }
    tableConfig.columns = columns
  } catch (e) {
    console.log('error', e)
  }
  tableReady.value = true
}
watch(
  () => setting?.displayColumns,
  (newVal) => {
    try {
      const fields = JSON.parse(setting.fields)
      const columns = newVal.reduce((prev: any, columnId: any) => {
        const columnItem = {
          id: columnId,
          name: columnId
        }
        const field = fields.find((item: any) => item.value === columnId)
        if (field) {
          columnItem.id = field.value
          columnItem.name = field.label
          columnItem.type = field.type
        }
        prev.push(columnItem)
        return prev
      }, [])
      reorderColumn(columns)
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
onMounted(() => {
  console.log('setting', setting)
})
defineExpose({ reorderColumn, reload, query })
</script>

<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent"> </VxeGrid>
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
