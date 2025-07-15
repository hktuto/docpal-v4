<template>
  <div class="pageContainer--padding">
    <RbacOrgChart v-if="userRole" :role-id="userRole" />
  </div>
</template>

<script lang="ts" setup>
const userRole: string = useUserRole().value
// const userRole: string = 'safsf'
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
