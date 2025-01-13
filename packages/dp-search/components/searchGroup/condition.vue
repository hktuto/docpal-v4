<script lang="ts" setup>
const mode = ref<'filter' | 'search'>('search')
</script>


<template>
    <div class="search-group-bar">
        <div class="search-group-bar-title">
            {{ $t('file_search') }}
        </div>
        <div class="flex-x-start search-group-bar-action">
            <!-- show hide filter and search icon -->
            <SvgIcon v-if="mode === 'filter'" src="/icons/tools/filter.svg" class="mr-2"></SvgIcon>
            <SvgIcon v-else src="/icons/tools/search.svg" class="mr-2" ></SvgIcon>
            <!-- end show hide filter and search icon -->
            <SearchGroupSavedSearch />
            <SearchGroupRecentSearch />
            <!-- <SearchGroupBarSaveLog ref="logRef" @search="handleLogSearch" @save="handleSave" />
            <SearchGroupBarRecentSearch ref="recentRef" @search="handleLogSearch" /> -->
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