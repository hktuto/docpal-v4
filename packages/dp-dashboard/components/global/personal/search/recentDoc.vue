<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{$t('search.recentDocument')}}</h4>
      <Icon v-show="!hideSetting" name="material-symbols:delete-rounded" class="normal cursor-pointer"  @click="handleDelete"></Icon>
    </template>
    <el-skeleton  v-if="!hideSetting" :rows="5" />
    <div v-else class="main" v-infinite-scroll="getRecentDocumentPage"
      :infinite-scroll-disabled="state.scrollNoMore || state.loading"
      :infinite-scroll-immediate="false">
      <div
        v-for="(item, index) in state.recentDocuments"
        :key="`${index}-${item.id}`"
        class="flex-x-start doc-card"
        @dblclick="handlePreview(item)"
      >
        <!-- <BrowseItemIcon
          class="icon el-icon--left"
          :type="item.isFolder ? 'folder' : 'file'"
          :mimeType="item.mimeType"
          status="general"
        /> -->
        <div>{{ item.name }}</div>
      </div>
      <p v-show="state.loading" class="center">{{ $t('dpTip.loading') }}</p>
      <p v-show="!state.loading && state.scrollNoMore" class="center">{{ $t('dpTip.noMore') }}</p>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { clientApi } from "api";
const { t } = useI18n()

const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})

const {
  public: { endPoint },
} = useRuntimeConfig();

const emits = defineEmits(['delete'])
const pageParams = reactive({
  pageNum: -1,
  pageSize: 10,
});
const state = reactive<any>({
  loading: false,
  scrollNoMore: false,
  recentDocuments: [],
});

async function getRecentDocumentPage() {
  try {
    if (endPoint === "admin") {
      return;
    }
    pageParams.pageNum++;
    state.loading = true;
    const res: any = await clientApi.api.postLogsRecentDocumentPage(pageParams).then(res => res.data);
    if(!res) return;
    state.recentDocuments.push(...res.entryList);
    state.scrollNoMore = state.recentDocuments.length >= res.totalSize;
  } catch (error) {
  } finally {
    setTimeout(() => {
      state.loading = false;
    }, 500);
  }
}
function handlePreview(row: any) {
  // TODO: open file detail
  // if (row.isFolder) {
  //   router.push({
  //     path: "/browse",
  //     query: {
  //       path: row.path,
  //       docId: row.id,
  //       isFolder: row.isFolder,
  //     },
  //   });
  // } else {
  //   openFileDetail(row.id, {
  //     showInfo: true,
  //     showHeaderAction: true,
  //   });
  // }
}
async function handleDelete() {
  const action = await ElMessageBox.confirm(`${t("msg_confirmWhetherToDelete")}`);
  if (action !== "confirm") return;
  emits("delete");
}
onMounted(() => {
  getRecentDocumentPage();
});
function resize() {
}

defineExpose({ resize });
</script>
<style lang="scss" scoped>
.doc-card {
  cursor: pointer;
  padding: 3px 0;
  border-radius: 5px;
  &:hover {
    background-color: var(--app-primary-color);
    color: #fff;
  }
}
</style>
