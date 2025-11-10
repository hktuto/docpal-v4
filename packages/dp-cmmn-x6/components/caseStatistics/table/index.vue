<script lang="ts" setup>
import { clientApi } from 'api'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const platform = useAppPlatform()
const { setting, displayColumns, dates } = defineProps<{
  setting: any
  displayColumns: any
  dates: any
}>()

const CMDProvider = inject(CaseManagementDashboardKey)
const caseId = CMDProvider?.instanceId?.value || null
let where = ref({})
const { t } = useI18n()
const emits = defineEmits(['filter-change', 'refresh'])
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
const extraParams: any = {
  q: '',
  where: {}
}
const { tableConfig, tableEvent, tableRef, query, reload, cleanSelectedRows } = useVxeTable({
  id: 'dashboardRelatedCaseTable',
  refresh: false,
  api: async (params: any) => {
    if (platform.value === 'admin') {
      return {
        entryList: [],
        totalSize: 0
      }
    }
    if (setting.relatedField) extraParams.where[setting.relatedField] = caseId
    return clientApi.api.postCaseTypesCasetypeidRecordsPage(id, { ...pageParams, ...params, ...extraParams })
  },
  columns: [],
  dblClickAction: ({ row }) => {
    const newItem = caseManageDashboardPage({ ...row, id, instanceId: row.case_id, versionId: row.caseDefinitionVersionId, data: detail })
    console.log(newItem)
    tabProvider?.openTab(newItem)
  },
  zoom: false,
  saveColumnOrder: false
})

const dialogRef = ref()

const responsiveFilterRef = ref()
function handleFilterFormChange(formModel) {
  if (formModel.q) {
    extraParams.q = formModel.q
  } else {
    delete extraParams.q
  }
  reload()
}
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
          newItem.formatter = (row: any) => {
            return formatDate(row[item.id])
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
    if(!setting.fields) return
    const fields = JSON.parse(setting.fields)
    const columns = newVal.reduce((prev: any, columnId: any) => {
      const field = fields.find((item: any) => item.value === columnId)
      if(field) {
        prev.push({
          id: field.value,
          name: field.label,
          type: field.type,
        })
      } else {
        prev.push({
          id: columnId,
          name: columnId,
        })
      }
      return prev
    },[])
    reorderColumn(columns)
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
  <VxeGrid v-if="tableReady" ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <ResponsiveFilter ref="responsiveFilterRef" @form-change="handleFilterFormChange" inputKey="q" inputPlaceHolder="caseManagement_filter" />
    </template>
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
