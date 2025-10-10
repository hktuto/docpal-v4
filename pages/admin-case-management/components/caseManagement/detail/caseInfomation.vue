<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span style="font-size: 18px">{{ t('caseManagement_detailCaseInformation') }}</span>
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
  emits('save')
}
</script>
<style lang="scss" scoped></style>
