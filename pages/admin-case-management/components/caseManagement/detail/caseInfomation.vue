<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <h4>{{ t('caseManagement_detailCaseInformation') }}</h4>
      </div>
    </template>
    <CmmnSidePanelDraggable :list="caseInformation" :dragHeader="dragHeader" formJsonUrl="field" @change="handleSave"> </CmmnSidePanelDraggable>
  </el-card>
</template>
<script lang="ts" setup>
const props = defineProps(['caseInformation', 'node'])
const emits = defineEmits(['save'])
const { t } = useI18n()
const dragHeader = [
  { name: 'name', label: t('docType_label') },
  { name: 'type', label: t('docType.type') }
]

function handleSave() {
  const nodeData = props.node.data
  updateExtentionProperties(nodeData.data.casePlanModel, 'docpal:form', props.caseInformation, props.node.id)
  updateStartTask(nodeData.data.casePlanModel)
  emits('save')
}
function updateStartTask(casePlanModel) {
  try {
    const startTask = casePlanModel.humanTask.find(item => item.extensionElements['docpal:isStartingTask'].attr_id)
    if(startTask) {
      updateExtentionProperties(startTask, 'docpal:form', props.caseInformation, props.node.id)
    }
  } catch (error) {
    console.error("updateStartTask", error)
  }
}
</script>
<style lang="scss" scoped></style>
