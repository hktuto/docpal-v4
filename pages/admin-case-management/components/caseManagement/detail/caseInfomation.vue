<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Information</span>
      </div>
    </template>
    <CmmnSidePanelDraggable 
      :list="caseInformation" 
      :dragHeader="dragHeader" 
      formJsonUrl="cmmn/field.json"
      @change="handleSave">
    </CmmnSidePanelDraggable>
  </el-card>
</template>
<script lang="ts" setup>
const props = defineProps(['caseInformation', 'node'])
const emits = defineEmits(['save'])

const dragHeader = [
  { name: 'name', label: $i18n.t('docType_label') },
  { name: 'type', label: $i18n.t('type'), i18n: 'marsterTable.type.' }
]
function handleSave() {
  const nodeData = props.node.data
  updateExtentionProperties(nodeData.data.casePlanModel, 'docpal:form', props.caseInformation, props.node.id)
  emits('save')
}

</script>
<style lang="scss" scoped>
</style>