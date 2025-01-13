<template>
<div class="search-container">
  <SearchGroupCondition />
  <!-- <SearchGroupBar ref="BarRef" :aggregation="state.aggregation" 
    @search="handleSearch"
    @aggSearch="handleAggSearch"
    @searchLog="handleSearchLog"></SearchGroupBar> -->
  <div style="height: 100%; overflow: hidden;">
    <!-- <SearchGroupTable ref="tableRef" @updateAgg="handleUpdateAgg"></SearchGroupTable> -->
  </div>
</div>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
import { ElMessage } from 'element-plus'
import { SearchListProviderKey } from '~/utils/searchProviderHelper'

const state = reactive<any>({
  aggregation: {}
})
let searchState: 'firstSearch' | 'aggChange' | '' = ''
const {t} = useI18n()

const filterRef = ref()
const aggRef = ref()
const logRef = ref()
const tableRef = ref()


function handleSearch(params: any) {
  tableRef.value.initBar(params)
  searchState = 'firstSearch'
}
function handleSearchLog(params: any) {
  searchState = 'firstSearch'
  tableRef.value.initSearch(params)
}
function handleAggSearch(params: any) {
  tableRef.value.initAgg({filter: params})
}
function handleUpdateAgg(aggregation: any) {
  if(searchState === 'aggChange') return
  state.aggregation = aggregation
  searchState = 'aggChange'
}

const conditions = ref();

async function handleSaveSearch(data: any){
  // const condition = await filterRef.value.getData()
  if (!conditions.value.docId && (!conditions.value.query || conditions.value.query.length === 0)) {
    ElMessage.warning(t('search.noCondition'))
    return
  }
  if (data.includeFilter) {
    const agg = await aggRef.value.getData()
    conditions.value.filter = agg
  }
  const params = {
    label: data.label,
    queryCondition: JSON.stringify(conditions.value)
  }
  await clientApi.api.postNuxeoSearchSaveNestedSearchLog(params)
  ElMessage.success(t('dpMsg_success'))
  logRef.value.getList()
}


provide(SearchListProviderKey, {
  saveSearch: handleSaveSearch,
  search: async(params:any) => {},
  conditions
})
--app-space-xs


</script>
<style lang="scss" scoped>
.search-container {
  height: 100%;
  display: grid;
  grid-template-columns: 20% 1fr;
  gap: var(--app-space-xs);
  padding: var(--app-space-s);
  overflow: hidden;
}
</style>
