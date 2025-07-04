<template>
  <div class="searchContainer">
    <el-input v-model="searchQuery" clearable :placeholder="$t('tip.input')" @change="handlChange" @keyup.enter="handlChange">
      <template #append>
        <el-button :icon="Search" @click="handlChange" />
      </template>
    </el-input>
    <div style="overflow: hidden">
      <SearchGroupTable ref="tableRef" tableId="uploadFromDocpal" @selectChange="handleSelectChange">
        <template #toolbar_buttons>
          <el-tag class="el-icon--left">{{listProvider?.docDetail?.value?.path}}</el-tag>
          {{ $t('smartFolder.searchResult') }}
        </template>
      </SearchGroupTable>
    </div>
    <!-- <el-button type="primary" @click="listProvider.collapseSearch()">{{ $t('searchGroup.search') }}</el-button> -->
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const props = defineProps<{
  mode: string
}>()
const listProvider = inject(BrowseListProviderKey)
const searchQuery = ref('')
const baseSearch = {
  condition: 'and',
  docId: '',
  query: [
    {
      condition: 'and',
      matchs: []
    }
  ]
}
const searchCondition = ref<any>({})
const tableRef = ref()
function handlChange() {
  if (!searchQuery.value) {
    listProvider?.collapseSearch()
  } else {
    searchCondition.value.query[0].matchs[0].value = searchQuery.value
    handleSearch()
  }
}
function handleSearch() {
  tableRef.value.initBar({
    ...searchCondition.value,
    pageNum: 0,
    pageSize: 20
  })
}
watch(
  () => props.mode,
  (newVal) => {
    if (newVal === 'search') {
      searchQuery.value = listProvider?.searchQuery.value
      searchCondition.value = JSON.parse(JSON.stringify(baseSearch))
      searchCondition.value.query[0].matchs.push(
        {
          queryType: 'keyword',
          value: searchQuery.value,
          option: {
            fullMatch: false,
            synonyms: false,
            includeLanguages: []
          }
        },
        {
          queryType: 'path',
          value: listProvider?.docDetail.value.path
        }
      )
      handleSearch()
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.searchContainer {
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-xs);
}
</style>
