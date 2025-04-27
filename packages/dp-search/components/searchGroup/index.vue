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
import { clientApi } from 'api'
import { conditionType, getMetadataOptions, languages, mimeTypes, getGroupList, sizes, sortListWithI18n } from '~/utils/formOptions'

const state = reactive<any>({
  aggregation: {}
})
const { tableId, searchParams } = defineProps<{
  tableId?: string
  searchParams?: any
}>()

const BarRef = ref()
let searchState: 'firstSearch' | 'aggChange' | '' = ''
const tableRef = ref()
const searchOptions = ref({})
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
async function getOptions() {
  const [docType, users, collections, tags, groupList, metadata] = await Promise.all([
    clientApi.api.getTypesActive(),
    clientApi.api.postNuxeoIdentityGetkeycloakallusers(),
    clientApi.api.getNuxeoCollection(),
    clientApi.api.postNuxeoTagsGetalltags(),
    getGroupList(),
    getMetadataOptions()
  ])
  searchOptions.value.groupList = sortListWithI18n(groupList)
  searchOptions.value.metadata = sortListWithI18n(metadata)
  searchOptions.value.conditionType = sortListWithI18n(conditionType, 'searchGroup.')
  const tagData = tags.data?.map((item: any) => ({ label: item, value: item }))
  searchOptions.value.tags = sortListWithI18n(tagData)
  const docTypeData = docType.data?.map((item: any) => ({ label: item.name, value: item.name }))
  searchOptions.value.docType = sortListWithI18n(docTypeData)
  const collectionData = collections?.data?.entryList?.map((item: any) => ({
    label: item.createdBy ? item.createdBy + ' - ' + item.name : item.name,
    value: item.id
  }))
  searchOptions.value.collections = sortListWithI18n(collectionData)
  const userData = users.data?.map((item: any) => ({ label: item.username, value: item.userId }))
  searchOptions.value.users = sortListWithI18n(userData)
  searchOptions.value.languages = sortListWithI18n(languages)
  searchOptions.value.mimeTypes = mimeTypes
  searchOptions.value.sizes = sizes
}
provide('searchOptions', searchOptions)
    
onMounted(() => {
  getOptions()
})
onActivated(() => {
  console.log('onActivated')
  if (searchParams) {
    // TODO : save query to tab if changed
    BarRef.value.setQuery(searchParams)
    tableRef.value.initBar(searchParams)
  }
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
