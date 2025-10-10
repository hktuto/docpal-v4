<template>
<el-popover
  ref="popoverRef"
  :width="350"
  size="small"
  trigger="click"
  popper-class="search-bar2-meta-popper"
>
  <ElText size="large">{{ t('dashboard.PersonalSearchHistory') }}</ElText>
  <SearchGroupBarRecentSearchList ref="listRef" @search="handleSearch"></SearchGroupBarRecentSearchList>
  <template #reference>
    <SvgIcon id="Search__Recent" src="/icons/tools/recent.svg" class="mr-2" ></SvgIcon>
  </template>
</el-popover>
</template>
<script lang="ts" setup>
const emits = defineEmits(['search'])
const popoverRef = ref()
const listRef = ref()
const { t } = useI18n()
function hidePopover () {
    popoverRef.value.hide()
}
function handleSearch(data: any) {
  emits('search', data)
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
  padding: var(--app-space-s) 0 var(--app-space-s) var(--app-space-s)!important;
}
</style>
