<script lang="ts" setup>
import { clientApi } from 'api'
const emits = defineEmits(['delete', 'refreshSetting'])
const props = withDefaults(
  defineProps<{
    dates?: any
    setting?: any
    hideSetting?: boolean
  }>(),
  {
    setting: {},
    hideSetting: false
  }
)
const tableRef = ref()

const state = reactive<any>({
  detail: {}
})
function handleRefresh(chartSetting: any) {
  emits('refreshSetting', chartSetting)
}
async function handleDelete() {
  emits('delete')
}
const { settingRef, cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: async (setting: any) => {
    tableRef.value.query({})
  }
})

async function getCaseDetail(caseId: string) {
  try {
    const res = await clientApi.api.getCaseTypesCasetypeid(caseId).then((res) => res.data)
    return res
  } catch (error) {
    console.log('get cast type error', error)
    return {}
  }
}
// #region module: tableRef
function handleShowColumn() {
  const displayColumns = props.setting.displayColumns.reduce((prev: any, columnId: any) => {
    const column = state.detail?.informations?.find((p: any) => p.metadata === columnId)
    // check if the field is default fields
    if (columnId === 'case_id') {
      prev.push({ id: 'case_id', name: 'Case ID', minWidth: 200 })
    } else if (columnId === 'created_date') {
      prev.push({
        id: 'created_date',
        name: 'workflow_createDate',
        minWidth: 200,
        formatter({ cellValue }: any) {
          return formatDate(cellValue)
        }
      })
    } else if (columnId === 'modified_date') {
      prev.push({
        id: 'modified_date',
        name: 'table_modifiedDate',
        minWidth: 200,
        formatter({ cellValue }: any) {
          return formatDate(cellValue)
        }
      })
    } else if (columnId.includes('Date')) {
      prev.push({
        id: columnId,
        name: columnId,
        minWidth: 200,
        formatter({ cellValue }: any) {
          const format = 'DD-MMM-YYYY'
          return formatDate(cellValue, format)
        }
      })
    } else if (!!column) {
      // get label from primaryForm
      // TODO : this is a backend bug, the information is not returning correct label/name
      const field = state.detail.primaryForm.fields.find((p: any) => p.id === columnId)
      prev.push({
        id: columnId,
        name: field?.name || columnId
      })
    }
    return prev
  }, [])
  tableRef.value.reorderColumn(displayColumns)
}
function handleRefreshTable() {
  tableRef.value.reload()
}
// #endregion

watch(
  () => props.setting,
  async () => {
    if (!props.setting || !props.setting.caseId) return
    state.detail = await getCaseDetail(props.setting.caseId)
    handleShowColumn()
    handleRefreshTable()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="props.setting.caseLabel"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <div class="table-container">
      <DashboardRelatedCaseTable ref="tableRef" :relatedField="setting.relatedField" :id="setting.caseId" :detail="state.detail" :label="setting.caseLabel">
        <template #table_right>
          <el-button v-if="props.setting.caseId && props.setting.showAdd" type="primary" @click="handleAddCaseDialog">
            {{ $t(props.setting.newButtonLabel) }}
          </el-button>
        </template>
      </DashboardRelatedCaseTable>
    </div>
    <DashboardRelatedCaseSetting ref="settingRef" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>
<style lang="scss" scoped>
.table-container {
  :deep(.vxe-toolbar) {
    display: flex;
  }
}
</style>
