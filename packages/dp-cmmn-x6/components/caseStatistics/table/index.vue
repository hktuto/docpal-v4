<script lang="ts" setup>
import { clientApi } from 'api'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
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
  api: async (params: any) => {
    // if (platform.value === 'admin') {
    //   return {
    //     entryList: [],
    //     totalSize: 0
    //   }
    // }
    const url = `http://132.148.160.188:3003/${setting.tableName}?${sql}`
    const response = await axios.get(url)
    return response.data
  },
  columns: [],
  dblClickAction: ({ row }) => {
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
        prev.push(newItem)
        return prev
      }, [])
      columns.splice(0, 0, ...columneFromSetting)
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
        const field = fields.find((item: any) => item.value === columnId)
        if (field) {
          prev.push({
            id: field.value,
            name: field.label,
            type: field.type
          })
        } else {
          prev.push({
            id: columnId,
            name: columnId
          })
        }
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
onMounted(() => {
  console.log('setting', setting)
})
defineExpose({ reorderColumn, reload, query })
</script>

<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
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
