<template>
  <div class="list">
    <div
      v-infinite-scroll="getList"
      :infinite-scroll-disabled="state.scrollNoMore || state.loading"
      infinite-scroll-distance="3"
      :infinite-scroll-immediate="false"
      class="list-scroll"
    >
      <el-card
        v-for="(item, index) in state.list"
        :key="index"
        @dblclick="handleSearch(item)"
      >
        <template v-for="(q, qIndex) in item.searchRequest.query" :key="'q' + qIndex">
          <div class="search-child">
            <template v-for="(c, cIndex) in q.matchs" :key="'qc' + qIndex">
              <div class="search-child-child">
                <el-tag
                  class="el-icon--left el-tag--ellipsis"
                  type="info"
                  size="small"
                  effect="dark"
                >
                  {{ c.queryType }}：
                  <b>{{ displayValueMap(c.queryType, c.value) }}</b>
                </el-tag>
              </div>
              <span v-if="cIndex !== q.matchs.length - 1">{{
                $t(`logic.${q.condition}`)
              }}</span>
            </template>
          </div>
          <span v-if="qIndex !== item.searchRequest.query.length - 1">{{
            $t(`logic.${item.searchRequest.condition}`)
          }}</span>
        </template>
        <div>{{ $t("search.result") }}: {{ item.totalSize }}</div>
      </el-card>
      <div v-if="state.loading" class="flex-x-center">{{ $t("dpTip.loading") }}</div>
      <div v-if="state.scrollNoMore" class="flex-x-center">{{ $t("dpTip.noMore") }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { clientApi } from "api";
import { conditionDecorators } from "~/utils/searchFormHelper";
import * as mime from 'mime-types';

const state = reactive<any>({
  list: [],
  scrollNoMore: false,
  loading: false,
});
const emits = defineEmits(["search"]);
const pageParams = reactive({
  pageNum: -1,
  pageSize: 10,
});
function handleSearch(item: any) {
  const data = { ...item.searchRequest };
  conditionDecorators(data);
  emits("search", data);
}

function displayValueMap(type: string, value: any) {

  switch (type) {
    case 'mimeTypes':
      const v = Array.isArray(value) ? value : [value];
      return v.map((v: string) => {
        if(v && v.includes('*')){
          return v.split('*')[0];
        }
        return mime.extension(v);
      }).join(', ');
    default:
      return value;
  }
}
async function getList() {
  if (state.loading) return;
  try {
    pageParams.pageNum++;
    state.loading = true;
    const { data: res } = (await clientApi.api.postLogsRecentSearchPageV2(
      pageParams
    )) as any;
    console.log(res);
    state.list.push(...res.entryList);
    state.scrollNoMore = state.list.length >= res.totalSize;
  } catch (error) {
    console.log("get recent error", error);
  } finally {
    state.loading = false;
  }
}
async function initList() {
  state.list = [];
  pageParams.pageNum = -1;
  await getList();
}
onMounted(() => {
  initList();
});
defineExpose({
  initList,
});
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
  height: fit-content!important;
}
.search-child {
  // background-color: var(--app-primary-color);
  padding: var(--app-space-xs);
  background: var(--el-color-info-light-5);
  margin-bottom: var(--app-space-xs);
}
.search-child-child {
  // background-color: var(--app-primary-color);
  background: var(--el-color-info-light-7);
  margin-bottom: var(--app-space-xs);
  padding: var(--app-space-xs);
  border-radius: 4px;
  overflow: hidden;
  .el-tag {
    overflow: hidden;
  }
}
</style>
