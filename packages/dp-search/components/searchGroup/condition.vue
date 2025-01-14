<script lang="ts" setup>
const mode = ref<'filter' | 'search'>('search')

const searchProvider = inject(SearchListProviderKey)
const filterRef = ref()
const aggRef = ref()
function toggleMode() {
  mode.value = mode.value === 'filter' ? 'search' : 'filter'
}
function handleAgg(data: any) {
  searchProvider?.search(data)
  // emits('aggSearch', data)
}
async function handleSearch() {
  const params = await filterRef.value.getData()
  if(!params.docId && params.query.length === 0) return
  aggRef.value.clear()
  searchProvider?.search(params)
}

</script>


<template>
    <div class="search-group-bar">
        <div class="search-group-bar-title">
            {{ $t('file_search') }}
        </div>
        <div class="flex-x-start search-group-bar-action">
            <!-- show hide filter and search icon -->
            <SvgIcon v-if="mode === 'search'" src="/icons/tools/filter.svg" class="mr-2" @click="toggleMode"></SvgIcon>
            <SvgIcon v-else src="/icons/tools/search.svg" class="mr-2" @click="toggleMode"></SvgIcon>
            <!-- end show hide filter and search icon -->
            <SearchGroupSavedSearch />
            <SearchGroupRecentSearch />
            <!-- <SearchGroupBarSaveLog ref="logRef" @search="handleLogSearch" @save="handleSave" />
            <SearchGroupBarRecentSearch ref="recentRef" @search="handleLogSearch" /> -->
        </div>
        <div class="search-group-bar-content" v-show="mode === 'search'">
          <!-- <SearchGroupBar1Filter ref="filterRef" @search="handleSearch"></SearchGroupBar1Filter> -->
          <SearchGroupFilter ref="filterRef" @search="handleSearch"></SearchGroupFilter>
        </div>
        <div class="search-group-bar-content" v-show="mode === 'filter'">
          <SearchGroupAggregation ref="aggRef" @filters="handleAgg"></SearchGroupAggregation>

        </div>
    </div>

</template>

<style lang="scss" scoped>
.search-group-bar {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: min-content 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  overflow: hidden;
  gap: var(--app-space-xs);
  &-title {
    grid-area: 1 / 1 / 2 / 2;
    font-size: var(--app-font-size-l);
  }
  &-action {
    grid-area: 1 / 2 / 2 / 3;
    --icon-size: 16px;
    --icon-color: var(--app-grey-400);
    :deep svg {
      cursor: pointer;
      margin-left: var(--app-space-xs);
    }
  }
  &-content {
    grid-area: 2 / 1 / 3 / 3;
    overflow: auto;
  }
}
</style>