<template>
<div class="search-group-bar">
  <div class="search-group-bar-title">
    {{ $t('file_search') }}
  </div>
  <div class="flex-x-start search-group-bar-action">
    <SvgIcon v-if="mode === 'filter'" src="/icons/tools/filter.svg" class="mr-2" @click="handleMode"
      @search="handleSearch"></SvgIcon>
    <SvgIcon v-else src="/icons/tools/search.svg" class="mr-2" @click="handleMode"></SvgIcon>
    <SearchGroupBarSaveLog ref="logRef" @search="handleLogSearch" @save="handleSave" />
    <SearchGroupBarRecentSearch ref="recentRef" @search="handleLogSearch" />
  </div>
  <div class="search-group-bar-content" v-show="mode === 'filter'">
    <!-- <SearchGroupBar1Filter ref="filterRef" @search="handleSearch"></SearchGroupBar1Filter> -->
    <SearchGroupBar2Filter ref="filterRef" @search="handleSearch"></SearchGroupBar2Filter>
  </div>
  <div class="search-group-bar-content" v-show="mode === 'search'">
    <SearchGroupBarAggregation ref="aggRef" :aggregation="aggregation" @filters="handleAgg"></SearchGroupBarAggregation>
  </div>
</div>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
import { ElMessage } from 'element-plus'
const { t } = useI18n();
const mode = ref<'filter' | 'search'>('filter')
const props = defineProps(['aggregation'])
const emits = defineEmits(['search','aggSearch', 'searchLog'])
const filterRef = ref()
const aggRef = ref()
let isHistory = false // 控制是否触发form change事件
async function handleSearch() {
  if(isHistory) return
  const params = await filterRef.value.getData()
  if(!params.docId && params.query.length === 0) return
  aggRef.value.clear()
  emits('search', params)
  // mode.value = 'search'
}
function handleMode() {
  mode.value = mode.value === 'filter' ? 'search' : 'filter'
}
function handleAgg(data: any) {
  emits('aggSearch', data)
}
function handleOpenRecent() {
}

const logRef = ref()
async function handleSave(data: any) {
  const condition = await filterRef.value.getData()
  if (!condition.docId && (!condition.query || condition.query.length === 0)) {
    ElMessage.warning($i18n.t('search.noCondition'))
    return
  }
  if (data.includeFilter) {
    const agg = await aggRef.value.getData()
    condition.filter = agg
  }
  const params = {
    label: data.label,
    queryCondition: JSON.stringify(condition)
  }
  await clientApi.api.postNuxeoSearchSaveNestedSearchLog(params);
  ElMessage.success(t('dpMsg_success'))
  logRef.value.getList()
}
 
async function handleLogSearch(query: any) {
  isHistory = true
  aggRef.value.clear()
  // if (query.filter) aggRef.value.setDefaultFilter(query.filter)
  await filterRef.value.initForm(query)
  emits('searchLog', query)
  setTimeout(() => {
    isHistory = false
  }, 2000)
}
</script>
<style lang="scss" scoped>
.search-group-bar {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: min-content 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  overflow: hidden;
  gap: var(--app-padding);
  &-title {
    grid-area: 1 / 1 / 2 / 2;
  }
  &-action {
    grid-area: 1 / 2 / 2 / 3;
    --icon-size: 16px;
    --icon-color: var(--color-grey-400);
    :deep svg {
      cursor: pointer;
      margin-left: var(--app-input-padding);
    }
  }
  &-content {
    grid-area: 2 / 1 / 3 / 3;
    overflow: auto;
  }
}

</style>
