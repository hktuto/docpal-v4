<script lang="ts" setup>
const props = defineProps<{
  date: any
  setting?: any;
  hideSetting?: boolean;
}>()
const {
  hideSetting,
  handleDelete, 
  openSetting, 
  settingRef,
  setting,
  handleRefresh
} = useDashboard()



</script>

<template>
  <el-card ref="cardRef" class="workflow-card dashboard-item dashboard-item-tab">
    <SvgIcon
      id="Dashboard__Home__Detail__SingleWorkflow__Settings"
      v-if="!hideSetting"
      src="/icons/setting.svg"
      class="el-icon--right setting-icon"
      style="--icon-size: 1.14rem; --icon-color: #8796a4;font-size: 20px"
      @click="openSetting"
    />
    <PersonalWorkflowSingleTable :setting="setting" />
    <PersonalWorkflowSingleSetting ref="settingRef" @delete="handleDelete" @refresh="handleRefresh"/>
  </el-card>
</template>

<style lang="scss" scoped>
</style>
