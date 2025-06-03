<template>
  <div class="pageContainer--padding">
    <el-tabs class="dp-tabs--auto" v-model="activeName">
      <el-tab-pane label="Graph" name="chart">
        <RbacOrgChart />
      </el-tab-pane>
      <el-tab-pane label="Group" name="Group">
        <UserGroupList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
const activeName = ref('chart')
</script>

<style lang="scss" scoped>
.dp-tabs--auto {
  height: 100%;
  overflow: hidden;
  .el-tab-pane {
    height: 100%;
  }
}
</style>
