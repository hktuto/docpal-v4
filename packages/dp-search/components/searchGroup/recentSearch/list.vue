<template>
<div class="list">
  <div v-infinite-scroll="getList" 
    :infinite-scroll-disabled="state.scrollNoMore || state.loading" 
    infinite-scroll-distance="3"
    :infinite-scroll-immediate="false"
    class="list-scroll">
    <el-card v-for="(item,index) in state.list" :key="index" @dblclick="handleSearch(item)">
      <template v-for="(q,qIndex) in item.searchRequest.query" :key="'q' + qIndex">
        <div class="search-child">
          <template v-for="(c,cIndex) in q.matchs" :key="'qc' + qIndex">
            <div class="search-child-child">
              <el-tag class="el-icon--left el-tag--ellipsis" type="info" size="small" effect="dark">
                {{c.queryType}}: <b>{{c.value}}</b>
              </el-tag>
            </div>
            <span v-if="cIndex !== q.matchs.length - 1">{{ $t(`logic.${q.condition}`)  }}</span>
          </template>
        </div>
        <span v-if="qIndex !== item.searchRequest.query.length - 1">{{ $t(`logic.${item.searchRequest.condition}`)  }}</span>
      </template>
      <div>{{$t('search.result')}}: {{item.totalSize}}</div>
    </el-card>
    <div v-if="state.loading" class="flex-x-center">{{ $t('dpTip.loading') }}</div>
    <div v-if="state.scrollNoMore" class="flex-x-center">{{ $t('dpTip.noMore') }}</div>
  </div>
</div>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
import { conditionDecorators } from '~/utils/searchFormHelper'
const state = reactive<any>({
  list: [],
  scrollNoMore: false,
  loading: false
})
const emits = defineEmits(['search'])
const pageParams = reactive({
    pageNum: -1,
    pageSize: 10
})
function handleSearch(item: any) {
  const data = { ...item.searchRequest }
  conditionDecorators(data)
  emits('search', data)
}
async function getList() {
  try {
    pageParams.pageNum ++
    state.loading = true
    const {data} = await clientApi.api.postLogsRecentSearchPageV2(pageParams) as any
    state.list.push(...data.entryList)
    state.scrollNoMore = state.list.length >= data.totalSize
  } catch (error) {
    
  } finally {
    state.loading = false
  }
}
function initList(){
  state.list = []
  pageParams.pageNum = -1
  getList()
}
onMounted(() => {
  initList()
})
defineExpose({
  initList
})
</script>
<style lang="scss" scoped>
.list {
  height: 100%;
  overflow: hidden;
}
.list-scroll {
  height: 100%;
  overflow: auto;
}
.el-card {
  margin-bottom: var(--app-space-xs);
}
.search-child {
  // background-color: var(--primary-color);
  padding: var(--app-space-xs);
  background: var(--el-color-info-light-5);
  margin-bottom: var(--app-space-xs);
}
.search-child-child {
  // background-color: var(--primary-color);
  background: var(--el-color-info-light-7);
  margin-bottom: var(--app-space-xs);
  padding: var(--app-space-xs);
  border-radius: 4px;
}
</style>