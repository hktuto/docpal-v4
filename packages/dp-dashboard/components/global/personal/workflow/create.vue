<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ $t("dashboard.PersonalWorkflowCreate") }}</h4>
      <div v-if="!hideSetting" class="flex-x-between">
        <SvgIcon
          id="Dashboard__Home__Detail__AddWorkflow__Delete"
          src="/icons/setting.svg"
          class="el-icon--right"
          style="--icon-size: 1.14rem; --icon-color: #8796a4; font-size: 20px"
          @click="openSetting"
        />
      </div>
    </template>
    <div class="workflow-create-content">
      <el-button v-for="item in state.workflowList" type="primary" :key="item.id" @click="handleClick(item)">{{item.name}}</el-button>
    </div>
    <PersonalWorkflowCreateDialog ref="settingRef" @delete="handleDelete" @refresh="handleRefresh"/>
    <div v-show="false"><WorkflowPopoverNewTask ref="newTaskRef" /></div>
    
  </el-card>
</template>
<script lang="ts" setup>
import { clientApi } from "api";
const emits = defineEmits(['delete', 'refreshSetting']);

const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
const state = reactive<any>({
  workflowList: []
})
async function handleDelete() {
  emits("delete");
}
const settingRef = ref();
function openSetting() {
  settingRef.value.handleOpen({
    workflowList: state.workflowList,
    workflowKeys: props.setting.workflowKeys
  });
}
const newTaskRef = ref()
function handleClick (item: any) {
  newTaskRef.value.workflowClickHandler(item)
}
function handleRefresh(chartSetting, workflowList) {
  state.workflowList = workflowList
  emits('refreshSetting', chartSetting)
}
onMounted(async() => {
  if(props.setting.workflowKeys && props.setting.workflowKeys.length > 0) {
    const workflowAList = await clientApi.api.postWorkflowProcessList({}).then(res => res.data);
    state.workflowList = props.setting.workflowKeys.reduce((prev, key: any) => {
      const workflowItem = workflowAList?.find((workflow: any) => workflow.key === key)
      prev.push({ ...workflowItem })
      return prev
    }, [])
  }
})
function resize() {
}

defineExpose({ resize });
</script>
<style lang="scss" scoped>
.workflow-create-content {
  .el-button {
    width: 100%;
    margin: 0;
    margin-bottom: var(--app-space-xs);
  }
}

</style>
