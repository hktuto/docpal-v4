<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding dp-dashboard--card__scroll"
    :hideSetting="hideSetting"
    :title="$t('dashboard.PersonalWorkflowCreate')"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <div class="workflow-create-content">
      <el-button v-for="item in state.workflowList" type="primary" :key="item.id" @click="handleClick(item)">{{item.name}}</el-button>
    </div>
    <PersonalWorkflowCreateDialog ref="settingRef" :workflowList="state.workflowList" :workflowAList="state.workflowAList" @delete="handleDelete" @refresh="handleRefresh"/>
    <div v-show="false"><WorkflowPopoverNewTask ref="newTaskRef" /></div>
    
  </DashboardCard>
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
  workflowList: [],
  workflowAList: []
})
async function handleDelete() {
  emits("delete");
}
const newTaskRef = ref()
function handleClick (item: any) {
  newTaskRef.value.workflowClickHandler(item)
}
function handleRefresh(chartSetting: any, workflowList: any) {
  state.workflowList = workflowList
  emits('refreshSetting', chartSetting)
}
async function getWorkflowId() {
  state.workflowAList = await clientApi.api.postWorkflowProcessList({}).then(res => res.data);
  if(props.setting.workflowKeys && props.setting.workflowKeys.length > 0) {
    state.workflowList = props.setting.workflowKeys.reduce((prev: any, key: any) => {
      const workflowItem = state.workflowAList?.find((workflow: any) => workflow.key === key)
      prev.push({ ...workflowItem })
      return prev
    }, [])
  }
}
const { settingRef, cardRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: async(setting: any) => {
    await getWorkflowId()
  }
})
onMounted(async() => {
  getWorkflowId()
})
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
