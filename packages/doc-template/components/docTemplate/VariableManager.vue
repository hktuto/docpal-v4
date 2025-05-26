<template>
  <el-drawer
    :model-value="visible"
    title="Manage Variables"
    direction="rtl"
    size="30%"
    @close="$emit('close')"
  >
    <div >
      <h3>Current Variables</h3>
      <el-table v-if="editorProvider && editorProvider.variables" :data="editorProvider.variables" style="width: 100%">
        <el-table-column prop="key" label="Key" />
        <el-table-column prop="type" label="Type" />
        <el-table-column prop="dataType" label="Data Type" />
        <el-table-column prop="value" label="Value" />
      </el-table>
    </div>
    <el-divider />
    <div>
      <h3>Add New Variable</h3>
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
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
const editorProvider = inject(DocTemplateProveKey)

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

function submit() {
  editorProvider?.addVariable(newVar.value)
  newVar.value = { key: '', type: 'Text', dataType: 'string', value: '' }
}

</script> 
