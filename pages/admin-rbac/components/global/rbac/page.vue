<template>
  <div class="pageContainer--padding">
    <el-tabs class="dp-tabs--auto" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="chart" name="chart">

        <RbacOrgChart />
      </el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
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
