<template>
  <el-dialog
    v-model="visible"
    :title="$t('docTemplate.variableManager.title')"
    width="30%"
    destroy-on-close
    @close="close"
  >
    <div>
      <vxe-grid
        ref="tableRef"
        v-bind="tableConfig"
        v-on="tableEvent"
      >
        <template #toolbar_buttons>
          <h3>{{ $t('docTemplate.variableManager.currentVariables') }}</h3>
        </template>
      </vxe-grid>
    </div>
    <el-divider />
    <div>
      <el-button type="primary" @click="newVariableFormRef?.open()">{{ $t('docTemplate.variableManager.addNew') }}</el-button>
    </div>
    <NewVariableForm 
      ref="newVariableFormRef"
      :existing-variables="editorProvider?.variables?.value || []"
      @variable-added="handleVariableAdded"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, inject, defineExpose, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { DocTemplateProveKey } from '../../utils/docTempalteHelper'
import { useVxeTable } from '../../../base/composables/useVxeTable'
import NewVariableForm from './NewVariableForm.vue'

const { t } = useI18n()
const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) throw new Error('editorProvider not found')

const visible = ref(false)
const newVariableFormRef = ref()

const columns = [
  { field: 'key', title: 'Key', minWidth: 100 },
  { field: 'type', title: 'Type', minWidth: 100 },
  { field: 'value', title: 'Value', minWidth: 100 },
  { field: 'update', title: 'Update', minWidth: 100 },
]

const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
  id: 'variable-table',
  api: () => {
    return editorProvider?.variables?.value
  },
  columns: columns,
  virtualScroll: true,
  saveColumnOrder: false,
  height: '300px',
})

function handleVariableAdded(variable: VariableItem) {
  editorProvider?.addVariable(variable)
  nextTick(() => {
    reload()
  })
}

const open = () => {
  visible.value = true
  reload()
}

const close = () => {
  visible.value = false
}

defineExpose({
  open,
  close
})
</script> 
