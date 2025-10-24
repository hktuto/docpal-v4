<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="$t('search.recentSearchs')"
    :setting="setting"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <div v-if="!hideSetting" style="height: 100%; overflow: auto">
      <el-card v-for="item in 2" :key="item" class="detail">
        <el-skeleton :rows="5" />
      </el-card>
    </div>
    <SearchGroupBarRecentSearchList v-else ref="listRef" @search="handleSearch"></SearchGroupBarRecentSearchList>
  </DashboardCard>
</template>
<script lang="ts" setup>
const emits = defineEmits(['setSearchParams', 'delete'])
import { MenuRouterKey } from '#imports'
const routerProvider = inject(MenuRouterKey)
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
const { searchOptions, searchOptionsLoading } = useSearchOptions()
provide('searchOptions', searchOptions)
provide('searchOptionsLoading', searchOptionsLoading)
const listRef = ref()
const { cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: async (setting: any) => {
    if (listRef.value?.initList) await listRef.value.initList()
  }
})
function handleSearch(data: any) {
  routerProvider?.navigateTo(routeSearch({ searchParams: data }), false)
}
async function handleDelete() {
  emits('delete')
}
</script>
<style lang="scss" scoped>
.detail {
  margin-bottom: var(--app-space-xs);
  height: fit-content !important;
  cursor: pointer;
  :deep(.el-card__body) {
    padding: var(--app-space-xs);
  }
  .el-divider {
    margin: var(--app-space-xs) 0;
  }
  &:hover {
    background-color: var(--app-primary-color);
    color: #fff;
  }
}

.el-tag {
  max-width: 100%;
  overflow: hidden;
  margin-bottom: 3px;
  :deep(.el-tag__content) {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
}
</style>
