<script lang="ts" setup>
const state = reactive({
  activeTab: "pending",
});
</script>
<template>
  <div class="pageContainer--padding">
    <el-tabs
      v-model="state.activeTab"
      class="tag-container dp-tabs--auto"
    >
      <el-tab-pane :label="$t('retention_done')" name="done">
        <RetentionDoneTable v-if="state.activeTab === 'done'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('retention_pending')" name="pending">
        <RetentionPendingTable v-if="state.activeTab === 'pending'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss" scoped>
.tag-container {
  @media (max-width: 1024px) {
    padding-bottom: 40px;
  }
}
.dp-tabs--auto {
  height: 100%;
  overflow: hidden;
  .el-tab-pane {
    height: 100%;
  }
}
</style>
