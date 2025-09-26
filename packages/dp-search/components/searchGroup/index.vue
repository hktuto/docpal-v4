<template>
  <div class="search-container">
    <SearchGroupBar
      ref="BarRef"
      :aggregation="state.aggregation"
      @search="handleSearch"
      @aggSearch="handleAggSearch"
      @searchLog="handleSearchLog"
    ></SearchGroupBar>
    <div style="height: 100%; overflow: hidden">
      <SearchGroupTable ref="tableRef" :tableId="String(tableId)" @updateAgg="handleUpdateAgg">
        <template #toolbar_buttons>
          <slot name="toolbar_buttons"></slot>
        </template>
      </SearchGroupTable>
    </div>
  </div>
</template>
<script lang="ts" setup>

const state = reactive<any>({
  aggregation: {}
})
const props = defineProps<{
  tableId?: string
  searchParams?: any
}>()
const { searchParams } = toRefs(props)
const BarRef = ref()
let searchState: 'firstSearch' | 'aggChange' | '' = ''
const tableRef = ref()
function handleSearch(params: any) {
  console.log('handleSearch', params)
  tableRef.value.initBar(params)
  searchState = 'firstSearch'
}
function handleSearchLog(params: any) {
  searchState = 'firstSearch'
  tableRef.value.initSearch(params)
}
function handleAggSearch(params: any) {
  tableRef.value.initAgg({ filter: params })
}
function handleUpdateAgg(aggregation: any, aggParams: any = {}) {
  // if(searchState === 'aggChange') return
  BarRef.value.aggRef.setDefaultFilter(aggParams.filter)
  state.aggregation = aggregation
  // searchState = 'aggChange'
}

onMounted(() => {
  BarRef.value.setQuery(searchParams.value)
    tableRef.value.initBar(searchParams.value)
})

watch(searchParams,(params) => {
  if(params){

    BarRef.value.setQuery(searchParams.value)
    tableRef.value.initBar(searchParams.value)
  }
},{
  deep:true,
})
</script>
<style lang="scss" scoped>
.search-container {
  height: 100%;
  display: grid;
  grid-template-columns: clamp(280px, 30%, 400px) 1fr;
  gap: var(--app-space-xs);
  overflow: hidden;
}
</style>
