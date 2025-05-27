<script setup lang="ts">
import { ref, inject } from 'vue'
import { ElDialog, ElButton, ElTable, ElTableColumn, ElForm, ElFormItem, ElInput, ElMessageBox, ElMessage, ElSelect, ElOption } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { DocTemplateProveKey } from '../../../../../../utils/docTempalteHelper'

const { t } = useI18n()
const emits = defineEmits(['close'])

const showAdd = ref(false)
const showEdit = ref(false)
const editVariable = ref<any>(null)
const newVariable = ref({
  type: 'Text',
  key: '',
  displayValue: ''
})
const addError = ref('')
const editError = ref('')

const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) throw new Error('editorProvider not found')
const { variables, addVariable, removeVariable, updateVariable } = editorProvider
const safeUpdateVariable = updateVariable || (() => {})

const variableTypes = [
  'Text', 'Paragraph', 'documentId', 'CaseId', 'WorkflowId', 'Email', 'Website', 'Table'
]

function handleAdd() {
  showAdd.value = true
  addError.value = ''
  newVariable.value = { type: 'Text', key: '', displayValue: '' }
}
function confirmAdd() {
  addError.value = ''
  if (!newVariable.value.key) {
    addError.value = t('docTemplate.variable.addErrorKeyRequired')
    return
  }
  if (variables.value.some((v: any) => v.key === newVariable.value.key)) {
    addError.value = t('docTemplate.variable.addErrorKeyExists')
    return
  }
  addVariable({ ...newVariable.value })
  showAdd.value = false
  ElMessage.success(t('docTemplate.variable.addSuccess'))
}
function handleEdit(variable: any) {
  showEdit.value = true
  editError.value = ''
  editVariable.value = { ...variable }
}
function confirmEdit() {
  editError.value = ''
  if (!editVariable.value.displayValue) {
    editError.value = t('docTemplate.variable.editErrorDisplayValueRequired')
    return
  }
  safeUpdateVariable({ ...editVariable })
  showEdit.value = false
  ElMessage.success(t('docTemplate.variable.editSuccess'))
}
function handleDelete(variable: any) {
  ElMessageBox.confirm(t('docTemplate.variable.deleteConfirm'), t('docTemplate.variable.delete'), { type: 'warning' })
    .then(() => {
      removeVariable(variable)
      ElMessage.success(t('docTemplate.variable.deleteSuccess'))
    })
}
function closeDialog() {
  emits('close')
}
</script>

<template>
  <ElDialog :model-value="true" :title="t('docTemplate.variable.managerTitle')" width="600px" @close="closeDialog">
    <ElTable :data="variables" style="width: 100%">
      <ElTableColumn :prop="'type'" :label="t('docTemplate.variable.type')" width="120" />
      <ElTableColumn :prop="'key'" :label="t('docTemplate.variable.key')" width="180" />
      <ElTableColumn :prop="'displayValue'" :label="t('docTemplate.variable.displayValue')" />
      <ElTableColumn :label="t('docTemplate.variable.actions')" width="160">
        <template #default="scope">
          <ElButton size="small" @click="handleEdit(scope.row)">{{ t('docTemplate.variable.edit') }}</ElButton>
          <ElButton size="small" type="danger" @click="handleDelete(scope.row)">{{ t('docTemplate.variable.delete') }}</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <div style="margin-top: 16px; text-align: right;">
      <ElButton type="primary" @click="handleAdd">{{ t('docTemplate.variable.add') }}</ElButton>
      <ElButton @click="closeDialog">{{ t('docTemplate.variable.cancel') }}</ElButton>
    </div>
    <!-- Add Variable Dialog -->
    <ElDialog v-model="showAdd" :title="t('docTemplate.variable.add')" width="400px">
      <ElForm label-width="100px">
        <ElFormItem :label="t('docTemplate.variable.type')">
          <ElSelect v-model="newVariable.type" style="width: 100%">
            <ElOption v-for="type in variableTypes" :key="type" :label="type" :value="type" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="t('docTemplate.variable.key')">
          <ElInput v-model="newVariable.key" />
        </ElFormItem>
        <ElFormItem :label="t('docTemplate.variable.displayValue')">
          <ElInput v-model="newVariable.displayValue" />
        </ElFormItem>
        <div v-if="addError" style="color: red; margin-bottom: 8px;">{{ addError }}</div>
        <div style="text-align: right;">
          <ElButton @click="showAdd = false">{{ t('docTemplate.variable.cancel') }}</ElButton>
          <ElButton type="primary" @click="confirmAdd">{{ t('docTemplate.variable.add') }}</ElButton>
        </div>
      </ElForm>
    </ElDialog>
    <!-- Edit Variable Dialog -->
    <ElDialog v-model="showEdit" :title="t('docTemplate.variable.edit')" width="400px">
      <ElForm label-width="100px">
        <ElFormItem :label="t('docTemplate.variable.key')">
          <ElInput v-model="editVariable.key" disabled />
        </ElFormItem>
        <ElFormItem :label="t('docTemplate.variable.displayValue')">
          <ElInput v-model="editVariable.displayValue" />
        </ElFormItem>
        <div v-if="editError" style="color: red; margin-bottom: 8px;">{{ editError }}</div>
        <div style="text-align: right;">
          <ElButton @click="showEdit = false">{{ t('docTemplate.variable.cancel') }}</ElButton>
          <ElButton type="primary" @click="confirmEdit">{{ t('docTemplate.variable.save') }}</ElButton>
        </div>
      </ElForm>
    </ElDialog>
  </ElDialog>
</template> 
