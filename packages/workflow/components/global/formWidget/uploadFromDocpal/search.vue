<template>
  <div class="search-contaniner" style="overflow: hidden">
    <el-input v-model="search" :placeholder="$t('tip.input')">
      <template #append>
        <el-button :icon="Search" @click="handleSearch" />
      </template>
    </el-input>
    <div style="overflow: hidden">
      <SearchGroupTable ref="tableRef" showCheckbox tableId="uploadFromDocpal" @selectChange="handleSelectChange">
        <template #toolbar_buttons>
          {{ $t('smartFolder.searchResult') }}
        </template>
      </SearchGroupTable>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  disabled: boolean
  formData: any
  vformOptions: any
  baseSearch: any
}>()
import { Search } from '@element-plus/icons-vue'
const search = ref('')
const searchCondition = ref<any>({})
const tableRef = ref()
let selectedRows: any[] = []
function handleSearch() {
  if (search.value) {
    searchCondition.value.query[0].matchs.push({
      queryType: 'keyword',
      value: search.value,
      option: {
        fullMatch: false,
        synonyms: false,
        includeLanguages: []
      }
    })
  } else {
    searchCondition.value = JSON.parse(JSON.stringify(props.baseSearch))
  }
  tableRef.value.initBar({
    ...searchCondition.value,
    pageNum: 0,
    pageSize: 20
  })
}
function handleSelectChange(rows: any[]) {
  console.log('selectedRows', rows)
  selectedRows = rows
}

async function getData() {
  // tableRef.value.cleanSelected()
  setTimeout(() => {
    tableRef.value.cleanSelected()
  }, 100)
  return selectedRows
}
onMounted(() => {
  handleSearch()
})
defineExpose({
  getData
})
</script>
<style scoped lang="scss">
.search-contaniner {
  display: grid;
  grid-template-rows: min-content 1fr;
}
</style>
