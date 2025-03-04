<template>
<div class="action-list">
  <div :style="`--b-color: ${getBColor(item.planItemDefinitionType)}`" class="action-item" 
    v-for="item in actionList"
    @click="handleTask(item)">
    <SvgIcon :src="`/icons/cmmn/${item.planItemDefinitionType}.svg`"></SvgIcon>
    <div>{{ item.name }}</div>
  </div>
  <DashboardActionHumanTaskDialog ref="dialogRef" @submit="emits('submit')"/>
</div>
</template>
<script lang="ts" setup>
import { ElMessage} from 'element-plus'
import { clientApi } from 'api'

const props = defineProps(['actionList'])
const emits = defineEmits(['refresh','submit'])
const { t } = useI18n()
function getBColor(type, state) {
  if(state === 'completed') return '#D9D9D9'
  const map = {
    humantask: '#409EFF',
    processtask: '#29CC6A'
  }
  return map[type] || '#D9D9D9'
}
const dialogRef = ref()
async function handleTask(actionItem) {
  if (actionItem.planItemDefinitionType === 'humantask') {
    console.log('handleTask', actionItem)
    dialogRef.value.handleOpen(actionItem.referenceId, actionItem, props.actionList)
  } else if(actionItem.planItemDefinitionType === 'usereventlistener') {
    await clientApi.api.postCaseInstanceTriggerEvent({ caseInstanceId: actionItem.caseInstanceId, planItemDefinitionId: actionItem.planItemDefinitionId})
    // await completeEventTaskApi(actionItem.id, actionItem.planItemDefinitionId)
    ElMessage.success(t('dpMsg_success'))
    emits('refresh')
  }
} 
</script>
<style lang="scss" scoped>
.action-list{
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-xs);
}
.action-item {
  width:100%;
  display: flex;
  align-items: center;
  gap: var(--app-space-xs);
  padding: var(--app-space-xs);
  background-color: var(--b-color);
  border-radius: 20px;
  color: #fff;
  margin-bottom: var(--app-input-padding);
  cursor: pointer;
}
</style>