<script lang="ts" setup>
import { clientApi } from 'api'
import Cards from './cards.vue'
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
const cardsRef = ref()
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
    console.log('handleRefreshAction', tableRef)
    tableRef.value.query({})
  }
})

async function getMasterTableDetail(id: string) {
  try {
    const res = await clientApi.api.getMasterTablesId(id).then((res) => res.data)
    return res
  } catch (error) {
    console.log('get cast type error', error)
    return {}
  }
}
// #region module: tableRef
async function handleShowColumn() {
  // if displayColumnSetting is not empty, use it
  let result:any[] = [];
  const list = props.setting.displayColumnSetting;
  if(list && list.length > 0) {
    result = list.map((item: any) => {
      return {
        id: item.field,
        name: item.label,
        minWidth: 200
      }
    })
  }else{
    result = props.setting.displayColumns.reduce((prev: any, columnId: any) => {
      const column = state.detail?.fields?.find((p: any) => p.columnName === columnId)
      // check if the field is default fields
      if (columnId === 'case_id') {
        prev.push({ id: 'case_id', name: 'Case Id', minWidth: 200 })
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
      } else if (!!column) {
        // get label from primaryForm
        // TODO : this is a backend bug, the information is not returning correct label/name
        const field = state.detail.fields.find((p: any) => p.id === columnId)
        prev.push({
          id: columnId,
          name: field?.name || columnId
        })
      }
      return prev
    }, [])
  }
  setTimeout(() => {
    console.log('handleShowColumn', result, tableRef)
    if(tableRef.value) {
      tableRef.value.reorderColumn(result)
    }
    if(cardsRef.value) {
      cardsRef.value.reorderColumn(result)
    }
    handleRefreshTable()
  }, 100)
}
function handleRefreshTable() {
  tableRef.value.reload()
}
// #endregion

watch(
  () => props.setting,
  async () => {
    if (!props.setting || !props.setting.masterTableId) return
    state.detail = await getMasterTableDetail(props.setting.masterTableId)
    handleShowColumn()
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
    :title="props.setting.label"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <div v-if="setting.view === 'table'" class="table-container">
      <DashboardRelatedMasterTable ref="tableRef" :relatedField="setting.relatedField" :name="setting.name" :detail="state.detail">
      </DashboardRelatedMasterTable>
    </div>
    <div v-if="setting.view === 'card'" class="cards-container">
      <Cards ref="cardsRef" :name="setting.name" :detail="state.detail" :relatedField="setting.relatedField"></Cards>
    </div>
    <DashboardRelatedMasterSetting v-if="!hideSetting" ref="settingRef" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>
<style lang="scss" scoped>
.table-container {
  :deep(.vxe-toolbar) {
    display: flex;
  }
}
</style>
