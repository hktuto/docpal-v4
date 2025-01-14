<template>
<div class="search-container">
  <SearchGroupBar ref="BarRef" :aggregation="state.aggregation" 
    @search="handleSearch"
    @aggSearch="handleAggSearch"
    @searchLog="handleSearchLog"></SearchGroupBar>
  <div style="height: 100%; overflow: hidden;">
    <SearchGroupTable ref="tableRef" @updateAgg="handleUpdateAgg"></SearchGroupTable>
  </div>
</div>
</template>
<script lang="ts" setup>
const state = reactive<any>({
  aggregation: {}
})
let searchState: 'firstSearch' | 'aggChange' | '' = ''
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
