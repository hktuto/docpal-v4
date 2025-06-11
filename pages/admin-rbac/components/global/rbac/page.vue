<template>
  <div class="pageContainer--padding">
    <el-tabs class="dp-tabs--auto" v-model="activeName">
      <el-tab-pane label="Graph" name="graph">
        <RbacOrgChart v-if="activeName === 'graph'" />
      </el-tab-pane>
      <el-tab-pane label="Table" name="table">
        <RbacTable v-if="activeName === 'table'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
const activeName = ref('graph')
</script>

<style lang="scss" scoped>
.dp-tabs--auto {
  height: 100%;
  overflow: hidden;
  position: relative;
  .el-tab-pane {
    height: 100%;
  }
}
</style>
