<template>
  <el-drawer
    :model-value="visible"
    title="Manage Variables"
    direction="rtl"
    size="30%"
    :modal="false"
    @close="$emit('close')"
  >
    <div >
      <h3>Current Variables</h3>
      {{editorProvider?.variables?.value}}
      <vxe-grid
        ref="tableRef"
        v-bind="tableConfig"
        v-on="tableEvent"
      >
        <template #toolbar_buttons>

        </template>
      </vxe-grid>
    </div>
    <el-divider />
    <div>
      <el-button type="primary" @click="addDialogVisible = true">Add New Variable</el-button>
    </div>
    <el-dialog v-model="addDialogVisible" title="Add New Variable" width="400px" @close="resetForm">
      <el-form :model="newVar" label-width="80px">
        <el-form-item label="Key">
          <el-input v-model="newVar.key" />
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="newVar.type" placeholder="Select type">
            <el-option label="Text" value="Text" />
            <el-option label="Paragraph" value="Paragraph" />
            <el-option label="documentId" value="documentId" />
            <el-option label="CaseId" value="CaseId" />
            <el-option label="WorkflowId" value="WorkflowId" />
            <el-option label="Email" value="Email" />
            <el-option label="Website" value="Website" />
            <el-option label="Table" value="Table" />
          </el-select>
        </el-form-item>
        <el-form-item label="Value">
          <el-input v-model="newVar.value" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">Add</el-button>
          <el-button @click="addDialogVisible = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, inject } from 'vue'
import { DocTemplateProveKey } from '../../utils/docTempalteHelper'
import { useVxeTable } from '../../../base/composables/useVxeTable'

const editorProvider = inject(DocTemplateProveKey)
const opened = ref(false);
if (!editorProvider) throw new Error('editorProvider not found')
const props = defineProps({
  visible: Boolean,
})
const emit = defineEmits(['close', 'add'])

const newVar = ref<VariableItem>({
  key: '',
  type: 'Text',
  dataType: 'string',
  value: ''
})

const addDialogVisible = ref(false)

const columns = [
  { field: 'key', title: 'Key', minWidth: 100 },
  { field: 'type', title: 'Type', minWidth: 100 },
  { field: 'dataType', title: 'Data Type', minWidth: 100 },
  { field: 'value', title: 'Value', minWidth: 100 },
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

function submit() {
  editorProvider?.addVariable(newVar.value)
  resetForm()
  addDialogVisible.value = false
  reload()
}

function resetForm() {
  newVar.value = { key: '', type: 'Text', dataType: 'string', value: '' }
}


</script> 
