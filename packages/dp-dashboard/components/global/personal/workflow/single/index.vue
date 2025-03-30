<script lang="ts" setup>
const emits = defineEmits(['delete', 'refreshSetting']);
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
async function handleDelete() {
  emits("delete");
}
const settingRef = ref();
function openSetting() {
  console.log("close setting")
  settingRef.value.handleOpen(props.setting);
}
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
function resize() {
}
defineExpose({ resize });
</script>

<template>
  <el-card ref="cardRef" class="workflow-card dashboard-item dashboard-item-tab">
    <SvgIcon
      id="WorkPanel__DetailTask__Settings"
      v-if="!hideSetting"
      src="/icons/setting.svg"
      class="el-icon--right setting-icon"
      style="--icon-size: 1.14rem; --icon-color: #8796a4"
      @click="openSetting"
    />
    <PersonalWorkflowSingleTable :setting="setting" />
    <PersonalWorkflowSingleSetting ref="settingRef" @delete="handleDelete" @refresh="handleRefresh"/>
  </el-card>
</template>

<style lang="scss" scoped>
</style>
