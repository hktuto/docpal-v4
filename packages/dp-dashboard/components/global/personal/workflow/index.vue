<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-tab">
    <SvgIcon
      v-if="!hideSetting"
      src="/icons/setting.svg"
      class="el-icon--right setting-icon"
      style="--icon-size: 1.14rem; --icon-color: #8796a4"
      @click="openSetting"
    />
    <PersonalWorkflowContent :isTabView="setting.isTabView" />

    <PersonalWorkflowSetting ref="settingRef" @delete="handleDelete" @refresh="handleRefresh"/>
  </el-card>
</template>
<script lang="ts" setup>
import {  } from "element-plus";
const emits = defineEmits(['delete', 'refreshSetting']);
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
const activeTab = ref('activeTask')
async function handleDelete() {
  emits("delete");
}
const settingRef = ref();
function openSetting() {
  settingRef.value.handleOpen(props.setting);
}
function handleRefresh(chartSetting) {
  emits('refreshSetting', chartSetting)
}
function resize() {
}

defineExpose({ resize });
</script>
<style lang="scss" scoped>

</style>
