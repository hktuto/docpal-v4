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
      formJsonUrl="fromJsom"
      @change="handleSave">
    </CmmnSidePanelDraggable>
  </el-card>
</template>
<script lang="ts" setup>
import fromJsom from '~/assets/cmmn/field.vform.json'
const props = defineProps(['caseInformation', 'node'])
const emits = defineEmits(['save'])
const { t } = useI18n()
const dragHeader = [
  { name: 'name', label: t('docType_label') },
  { name: 'type', label: t('type'), i18n: 'marsterTable.type.' }
]
function handleSave() {
  const nodeData = props.node.data
  updateExtentionProperties(nodeData.data.casePlanModel, 'docpal:form', props.caseInformation, props.node.id)
  emits('save')
}

</script>
<style lang="scss" scoped>
</style>