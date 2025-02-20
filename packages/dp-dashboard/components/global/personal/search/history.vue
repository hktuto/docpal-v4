<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ $t("search.recentSearchs") }}</h4>
      <Icon
        v-show="!hideSetting"
        name="material-symbols:delete-rounded"
        class="normal cursor-pointer"
        @click="handleDelete"
      ></Icon>
    </template>
    <el-card v-if="!hideSetting" v-for="item in 2" :key="item" class="detail">
      <el-skeleton :rows="5" />
    </el-card>
    <SearchGroupBarRecentSearchList
      v-else
      ref="listRef"
      @search="handleSearch"
    ></SearchGroupBarRecentSearchList>
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
const emits = defineEmits(["setSearchParams", "delete"]);
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean;
  }>(),
  {
    setting: {},
    hideSetting: false,
  }
);
const {
  public: { endPoint },
} = useRuntimeConfig();

function resize() {}
function handleSearch(data: any) {
  sessionStorage.setItem("searchParams", JSON.stringify(data));
  // router.push('/searchGroup')
}
async function handleDelete() {
  const action = await ElMessageBox.confirm(`${t("msg_confirmWhetherToDelete")}`);
  if (action !== "confirm") return;
  emits("delete");
}
defineExpose({
  resize,
});
</script>
<style lang="scss" scoped>
.detail {
  margin-bottom: var(--app-space-xs);
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
.center {
  text-align: center;
  padding: var(--app-space-xs);
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
