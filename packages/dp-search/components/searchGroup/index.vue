<template>
<div class="search-container">
  <SearchGroupCondition />
  <!-- <SearchGroupBar ref="BarRef" :aggregation="state.aggregation" 
    @search="handleSearch"
    @aggSearch="handleAggSearch"
    @searchLog="handleSearchLog"></SearchGroupBar> -->
  <div style="height: 100%; overflow: hidden;">
    <SearchGroupTable2 ref="tableRef"  @updateAgg="handleUpdateAgg" />
    <!-- <SearchGroupTable ref="tableRef" @updateAgg="handleUpdateAgg"></SearchGroupTable> -->
  </div>
</div>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
import { ElMessage } from 'element-plus'
import { SearchListProviderKey } from '~/utils/searchProviderHelper'

const routerProvider = inject(MenuRouterKey)

let searchState: 'firstSearch' | 'aggChange' | '' = ''
const {t} = useI18n()
const aggregation = ref<any>()

const tableRef = ref()

const state = reactive<any>({
      expanded: true,
      firstReady: false,
      tableData: [],
      aggregation: {},
      barParams: {},
      aggParams: {},
  })


function handleSearch(params: any) {
  tableRef.value.initBar(params)
  searchState = 'firstSearch'
}
function handleSearchLog(params: any) {
  searchState = 'firstSearch'
  tableRef.value.reload(params)
}
function handleAggSearch(params: any) {
  tableRef.value.initAgg({filter: params})
}
function handleUpdateAgg(newAggregation: any) {
  if(searchState === 'aggChange') return
  aggregation.value = newAggregation
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
  paramsUpdate:(params:any) => {
    tableRef.value.reload()
  },
  search: async(params:any) => {
    console.log('search', params)
    if(!state.barParams.docId && (!state.barParams.query || state.barParams.query.length === 0)) {
        state.tableData = []
        state.aggregation = {}
        state.options.paginationConfig.total = 0
        return []
      }
    return [];
  },
  openDetail:(row:any) => {
    if(row.isFolder || row.type === 'Collection') {
      const newItem = {
        id: 'client-browse',
        name: row.name,
        icon: 'dp-icon:browse-outline',
        hoverIcon: 'dp-icon:browse-fill',
        label: row.name,
        component: "LazyBrowsePage",
        props:{
          query:{
            idOrPath:row.path,
            selectFile: row.name
          }
        }
      }
      routerProvider?.navigateTo(newItem);
    } else {
      const newItem = {
        id:'client-browse-detail',
        name: row.name,
        icon: 'dp-icon:browse-outline',
        hoverIcon: 'dp-icon:browse-fill',
        label: row.name,
        component: "LazyBrowseDetail",
        props:{
          query:{
            idOrPath:row.path,
            selectFile: row.name
          }
        }
      }
      routerProvider?.navigateTo(newItem);
    }
  },
  conditions,
  aggregation
})


</script>
<style lang="scss" scoped>
.search-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: clamp(280px, 30%, 400px) 1fr;
  gap: var(--app-space-xs);
  padding: var(--app-space-s);
  overflow: hidden;
}
</style>
