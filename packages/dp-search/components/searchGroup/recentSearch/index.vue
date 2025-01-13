<template>
<el-popover
  ref="popoverRef"
  :width="350"
  size="small"
  trigger="click"
  popper-class="search-bar2-meta-popper"
>
  <SearchGroupRecentSearchList ref="listRef" @search="handleSearch"></SearchGroupRecentSearchList>
  <template #reference>
    <SvgIcon src="/icons/tools/recent.svg" class="mr-2" ></SvgIcon>
  </template>
</el-popover>
</template>
<script lang="ts" setup>
import { SearchListProviderKey } from '~/utils/searchProviderHelper'
const searchProvider = inject(SearchListProviderKey)
const popoverRef = ref()
const listRef = ref()
function hidePopover () {
    popoverRef.value.hide()
}
function handleSearch(data: any) {  
  searchProvider?.search(data)
  hidePopover()
}
function initList(){
  listRef.value.initList()
}
onMounted(() => {
  // getList()
})
defineExpose({
  initList
})
</script>
<style lang="scss">
.search-bar2-meta-popper {
  height: 50vh;
}
</style>