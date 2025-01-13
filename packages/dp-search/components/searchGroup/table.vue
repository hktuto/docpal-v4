<template>
<Table ref="tableRef" v-loading="loading" :columns="state.columns" :table-data="tableData" :options="state.options"
  @pagination-change="handlePaginationChange"
  @row-dblclick="handleDblclick">
  <template #docTags="{ row, index }">
    <div v-if="row?.properties && row?.properties['nxtag:tags']">
      <el-tag v-for="item in row?.properties['nxtag:tags']" :key="item.label">{{item.label}}</el-tag>
    </div>
  </template>
  <template #docIcon="{ row, index }">
    <div class="nameItem">
      <BrowseItemIcon v-if="!!row" :type="row.isFolder ? 'folder' : 'file'"/>
      <div class="label">{{row.name}}</div>
    </div>
  </template> 
  <template #logicalPath="{ row }">
    <PathTabButton :path="row.path" :fileName="row.name" :openParent="!row.isFolder" :displayPath="row.logicalPath" canOpen/>
  </template>
  <template #summary="{ row }">
    <div v-if="row.properties && row.properties.summarys">
      <div v-if=" row.properties.summarys.length > 1" @click="row.expandSummary = !row.expandSummary">
        <el-icon :class="row.expandSummary ? 'revert' : 'rotate'"><ArrowUp /></el-icon>
      </div>
      <template v-if="row.properties.summarys.length <= 1 || row.expandSummary">
        <div v-for="item in row.properties.summarys" class="summaryItem">
          [{{item.summaryKey}}]: <b>{{item.summaryValue}}</b>
        </div>
      </template>
    </div>
  </template>
</Table>
</template>
<script lang="ts" setup>
import { ArrowLeftBold, ArrowUp } from '@element-plus/icons-vue';
import { watchDebounced } from '@vueuse/core'
import * as mime from 'mime-types'
import { 
  SearchGroupGetApi, 
  TABLE, defaultTableSetting } from 'dp-api'

  const emits = defineEmits(['updateAgg'])
// #region module: page
  const route = useRoute()
  const router = useRouter()
  let pageParams = {
      currentPageIndex: 0,
      pageSize: 20
  }
  const tableKey = TABLE.CLIENT_SEARCH
  const tableSetting = defaultTableSetting[tableKey]
  const state = reactive<State>({
      expanded: true,
      firstReady: false,
      loading: false,
      tableData: [],
      aggregation: {},
      options: {
          showPagination: true,
          paginationConfig: {
              total: 0,
              currentPage: 1,
              pageSize: pageParams.pageSize
          },
          sortKey: 'clientSearch',
          sortAll: true
      },
      barParams: {},
      aggParams: {},
      columns: tableSetting.columns
  })

  async function getList (param) {
    try {
      if(!state.barParams.docId && (!state.barParams.query || state.barParams.query.length === 0)) {
        state.tableData = []
        state.aggregation = {}
        state.options.paginationConfig.total = 0
        return
      }
      state.loading = true
      const res = await SearchGroupGetApi({ ...state.barParams, ...state.aggParams, ...param })
        state.tableData = res.entryList.map((item) => {
          const _item = { ...item }
          if (item.properties && item.properties['file:content']) {
            const mimeType = item.properties['file:content']['mime-type']
            _item.mimeType2 = mime.extension(mimeType) ? mime.extension(mimeType) : '-'
          }
          return _item
        })
        state.aggregation = res.aggregation
        state.options.paginationConfig.total = res.totalSize
        state.options.paginationConfig.pageSize = param.pageSize
        state.options.paginationConfig.currentPage = param.currentPageIndex + 1
    } catch (error) {
        state.tableData = []
        state.aggregation = {}
        state.options.paginationConfig.total = 0
    } finally {
      state.loading = false
      emits('updateAgg', state.aggregation)
    }
  }
  function handlePaginationChange (page: number, pageSize?: number) {
      if(!pageSize) pageSize = pageParams.pageSize
      const time = new Date().valueOf().toString()
      router.push({
          query: { ...route.query, ...pageParams, currentPageIndex:page, pageSize, time }
      })
  }
  watchDebounced(
      () => route.query,
      async (newVal, oldVal) => {
          const { currentPageIndex, pageSize } = newVal
          if(!currentPageIndex || !pageSize) return
          // pageParams = {...newVal}
          pageParams.currentPageIndex = (Number(currentPageIndex) - 1) > 0 ? (Number(currentPageIndex) - 1) : 0
          pageParams.pageSize = Number(pageSize) || pageParams.pageSize

          await getList(pageParams)
          setTimeout(() => {
              state.firstReady = true
          }, 100)
      },
      { debounce: 200, maxWait: 500, immediate: true }
  )
  
  const { tableData, loading } = toRefs(state)
// #endregion
async function handleDblclick (row) {
  if(row.isFolder) {
      goRoute(row.path)
  } else if(row.type === 'Collection') {
      goRoute(row.id, '/collection', 'tab')
  } else{
    openFileDetail(row.path, {
      showInfo:true,
      showHeaderAction:true
    })
  }

}
function goRoute (qPath, path: string = '/browse', qPathKey: string='path') {
  router.push({
      path,
      query: {
          [qPathKey]: qPath,
      },
  })
}
function initBar(searchParams: any, ) {
  console.log('initBar');
  
    state.barParams = searchParams
    state.aggParams = {}
    handlePaginationChange(1)
}
function initAgg(searchParams: any, isSearch: boolean = true) {
  state.aggParams = searchParams
  if (isSearch) handlePaginationChange(1)
}
function initSearch(searchParams: any) {
  console.log(searchParams);
  
  state.barParams = searchParams
  handlePaginationChange(1)
}
const tableRef = ref()
onMounted(() => {
})
defineExpose({ initBar, initAgg, initSearch })
</script>

<style lang="scss" scoped>
.summaryItem {
  padding: var(--app-space-xs);
  background-color: var(--primary-color);
  margin-bottom: var(--app-space-xs);
  color: var(--color-grey-000);
  border-radius: 4px;
}
.rotate {
  transition: all 1s;
}
.revert{
  transition: all 1s;
  transform:rotate(180deg);
}
.nameItem{
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: var(--app-space-xs);
}
</style>
