<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import { ElDialog, ElButton, ElTable, ElTableColumn, ElForm, ElFormItem, ElInput, ElMessageBox, ElMessage, ElSelect, ElOption, ElTag } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { DocTemplateProveKey, type VariableItem, type VariableType, type TableColumn, type TableRow } from '../../../../../../utils/docTempalteHelper'

const { t } = useI18n()
const emits = defineEmits(['close'])

const showAdd = ref(false)
const showEdit = ref(false)
const showTableEditor = ref(false)
const editVariable = ref<VariableItem | null>(null)
const newVariable = ref<VariableItem>({
  type: 'Text',
  key: '',
  displayValue: ''
})
const addError = ref('')
const editError = ref('')

// Table editor state
const tableColumns = ref<TableColumn[]>([])
const tableRows = ref<TableRow[]>([])
const newColumnName = ref('')
const tableKeyPrefix = ref(0)
const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) throw new Error('editorProvider not found')
const { variables, addVariable, removeVariable, updateVariable } = editorProvider
const safeUpdateVariable = updateVariable || (() => {})

const variableTypes: VariableType[] = [
  'Text', 'Paragraph', 'documentId', 'CaseId', 'WorkflowId', 'Email', 'Website', 'List', 'Table'
]

// Computed property to determine if current variable type is Table
const isTableType = computed(() => {
  return showAdd.value ? newVariable.value.type === 'Table' : editVariable.value?.type === 'Table'
})

// Computed property to determine if current variable type is List
const isListType = computed(() => {
  return showAdd.value ? newVariable.value.type === 'List' : editVariable.value?.type === 'List'
})

// Format display value for table view
function formatDisplayValue(variable: VariableItem) {
  if (variable.type === 'Table' && Array.isArray(variable.displayValue)) {
    return `Table (${variable.displayValue.length} rows)`
  }
  if (variable.type === 'List' && Array.isArray(variable.displayValue)) {
    return `List (${variable.displayValue.length} items)`
  }
  if (Array.isArray(variable.displayValue)) {
    return variable.displayValue.join(', ')
  }
  return variable.displayValue
}

function handleAdd() {
  showAdd.value = true
  addError.value = ''
  newVariable.value = { type: 'Text', key: '', displayValue: '' }
  resetTableEditor()
  resetListEditor()
}

function resetListEditor() {
  newVariable.value.listStyle = 'bullet'
  if (newVariable.value.type === 'List') {
    newVariable.value.displayValue = ['']
  }
}

function addListItem() {
  if (!Array.isArray(newVariable.value.displayValue)) {
    newVariable.value.displayValue = []
  }
  newVariable.value.displayValue.push('')
}

function removeListItem(index: number) {
  if (Array.isArray(newVariable.value.displayValue) && newVariable.value.displayValue.length > 1) {
    newVariable.value.displayValue.splice(index, 1)
  }
}

function confirmAdd() {
  addError.value = ''
  if (!newVariable.value.key) {
    addError.value = t('docTemplate.variable.addErrorKeyRequired')
    return
  }
  if (variables.value.some((v: VariableItem) => v.key === newVariable.value.key)) {
    addError.value = t('docTemplate.variable.addErrorKeyExists')
    return
  }
  
  const variableToAdd = { ...newVariable.value }
  if (variableToAdd.type === 'Table') {
    variableToAdd.displayValue = tableRows.value
    variableToAdd.tableColumns = tableColumns.value
  } else if (variableToAdd.type === 'List') {
    // Filter out empty items for lists
    variableToAdd.displayValue = Array.isArray(variableToAdd.displayValue) 
      ? variableToAdd.displayValue.filter(item => item.trim() !== '') 
      : []
  }
  
  addVariable(variableToAdd)
  showAdd.value = false
  ElMessage.success(t('docTemplate.variable.addSuccess'))
}

function handleEdit(variable: VariableItem) {
  showEdit.value = true
  editError.value = ''
  editVariable.value = { ...variable }
  
  if (variable.type === 'Table') {
    tableColumns.value = variable.tableColumns ? [...variable.tableColumns] : []
    tableRows.value = Array.isArray(variable.displayValue) ? [...variable.displayValue] : []
  } else if (variable.type === 'List') {
    // For list variables, ensure displayValue is an array
    if (Array.isArray(variable.displayValue)) {
      editVariable.value.displayValue = [...variable.displayValue]
    } else {
      editVariable.value.displayValue = [variable.displayValue || '']
    }
    editVariable.value.listStyle = variable.listStyle || 'bullet'
  }
}

function confirmEdit() {
  editError.value = ''
  if (!editVariable.value) return
  
  if (editVariable.value.type !== 'Table' && editVariable.value.type !== 'List' && !editVariable.value.displayValue) {
    editError.value = t('docTemplate.variable.editErrorDisplayValueRequired')
    return
  }
  
  const variableToUpdate = { ...editVariable.value }
  if (variableToUpdate.type === 'Table') {
    variableToUpdate.displayValue = tableRows.value
    variableToUpdate.tableColumns = tableColumns.value
  } else if (variableToUpdate.type === 'List') {
    // Filter out empty items for lists
    variableToUpdate.displayValue = Array.isArray(variableToUpdate.displayValue) 
      ? variableToUpdate.displayValue.filter(item => item.trim() !== '') 
      : []
  }
  
  safeUpdateVariable(variableToUpdate)
  showEdit.value = false
  tableKeyPrefix.value += 1
  ElMessage.success(t('docTemplate.variable.editSuccess'))
}

function handleDelete(variable: VariableItem) {
  ElMessageBox.confirm(t('docTemplate.variable.deleteConfirm'), t('docTemplate.variable.delete'), { type: 'warning' })
    .then(() => {
      removeVariable(variable)
      ElMessage.success(t('docTemplate.variable.deleteSuccess'))
    })
}

function closeDialog() {
  emits('close')
}

// Table editor functions
function resetTableEditor() {
  tableColumns.value = []
  tableRows.value = []
  newColumnName.value = ''
}

function addColumn() {
  if (!newColumnName.value.trim()) return
  
  const newColumn: TableColumn = {
    header: newColumnName.value.trim(),
    key: newColumnName.value.trim().toLowerCase().replace(/\s+/g, '_')
  }
  
  tableColumns.value.push(newColumn)
  
  // Add empty value for this column in all existing rows
  tableRows.value.forEach(row => {
    row[newColumn.key] = ''
  })
  
  newColumnName.value = ''
}

function removeColumn(index: number) {
  const columnToRemove = tableColumns.value[index]
  tableColumns.value.splice(index, 1)
  
  // Remove this column from all rows
  tableRows.value.forEach(row => {
    delete row[columnToRemove.key]
  })
}

function addRow() {
  const newRow: TableRow = {}
  tableColumns.value.forEach(col => {
    newRow[col.key] = ''
  })
  tableRows.value.push(newRow)
}

function removeRow(index: number) {
  tableRows.value.splice(index, 1)
}

function openTableEditor() {
  showTableEditor.value = true
}

function closeTableEditor() {
  showTableEditor.value = false
}
</script>

<template>
  <ElDialog :model-value="true" :title="t('docTemplate.variable.managerTitle')" width="800px" @close="closeDialog">
    {{ tableKeyPrefix }} {{ variables.length }}
    {{ variables }}
    <ElTable :data="variables" :key="tableKeyPrefix + '_' +variables.length" style="width: 100%">
      <ElTableColumn :prop="'type'" :label="t('docTemplate.variable.type')" width="120">
        <template #default="scope">
          <ElTag :type="scope.row.type === 'Table' ? 'success' : 'primary'">{{ scope.row.type }}</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn :prop="'key'" :label="t('docTemplate.variable.key')" width="180" />
      <ElTableColumn :label="t('docTemplate.variable.displayValue')">
        <template #default="scope">
          {{ formatDisplayValue(scope.row) }}
        </template>
      </ElTableColumn>
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
    <ElDialog v-model="showAdd" :title="t('docTemplate.variable.add')" width="600px">
      <ElForm label-width="120px">
        <ElFormItem :label="t('docTemplate.variable.type')">
          <ElSelect v-model="newVariable.type" style="width: 100%" @change="resetTableEditor">
            <ElOption v-for="type in variableTypes" :key="type" :label="type" :value="type" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="t('docTemplate.variable.key')">
          <ElInput v-model="newVariable.key" />
        </ElFormItem>
        <ElFormItem v-if="newVariable.type !== 'Table' && newVariable.type !== 'List'" :label="t('docTemplate.variable.displayValue')">
          <ElInput v-model="newVariable.displayValue" :type="newVariable.type === 'Paragraph' ? 'textarea' : 'text'" />
        </ElFormItem>
        <ElFormItem v-if="newVariable.type === 'List'" :label="t('docTemplate.variable.listContent')">
          <div class="list-editor">
            <div class="list-editor-header">
              <ElSelect v-model="newVariable.listStyle" style="width: 150px; margin-right: 8px;" :placeholder="t('docTemplate.variable.listStyle')">
                <ElOption value="bullet" :label="t('docTemplate.variable.listStyleBullet')" />
                <ElOption value="numbered" :label="t('docTemplate.variable.listStyleNumbered')" />
                <ElOption value="none" :label="t('docTemplate.variable.listStyleNone')" />
              </ElSelect>
            </div>
            <div class="list-items">
              <div v-for="(item, idx) in (Array.isArray(newVariable.displayValue) ? newVariable.displayValue : [])" :key="idx" class="list-item-row">
                <ElInput 
                  v-model="newVariable.displayValue[idx]" 
                  :placeholder="t('docTemplate.variable.listItemPlaceholder')" 
                  style="flex: 1; margin-right: 8px;"
                />
                <ElButton 
                  size="small" 
                  type="danger" 
                  @click="removeListItem(idx)"
                  :disabled="newVariable.displayValue.length <= 1"
                >
                  ×
                </ElButton>
              </div>
              <ElButton @click="addListItem" style="width: 100%; margin-top: 8px;">
                {{ t('docTemplate.variable.addListItem') }}
              </ElButton>
            </div>
          </div>
        </ElFormItem>
        <ElFormItem v-if="newVariable.type === 'Table'" :label="t('docTemplate.variable.tableContent')">
          <div class="table-editor">
            <div class="table-editor-header">
              <ElInput 
                v-model="newColumnName" 
                :placeholder="t('docTemplate.variable.columnName')" 
                style="width: 200px; margin-right: 8px"
                @keyup.enter="addColumn"
              />
              <ElButton @click="addColumn" :disabled="!newColumnName.trim()">
                {{ t('docTemplate.variable.addColumn') }}
              </ElButton>
            </div>
            <div v-if="tableColumns.length > 0" class="table-preview">
              <ElTable :data="tableRows" size="small" border>
                <ElTableColumn 
                  v-for="(col, idx) in tableColumns" 
                  :key="col.key" 
                  :prop="col.key" 
                  :label="col.header"
                  min-width="120"
                >
                  <template #header>
                    <span>{{ col.header }}</span>
                    <ElButton 
                      size="small" 
                      type="danger" 
                      text 
                      @click="removeColumn(idx)"
                      style="margin-left: 8px"
                    >
                      ×
                    </ElButton>
                  </template>
                  <template #default="scope">
                    <ElInput v-model="scope.row[col.key]" size="small" />
                  </template>
                </ElTableColumn>
                <ElTableColumn label="Actions" width="80">
                  <template #default="scope">
                    <ElButton size="small" type="danger" @click="removeRow(scope.$index)">×</ElButton>
                  </template>
                </ElTableColumn>
              </ElTable>
              <div style="margin-top: 8px;">
                <ElButton @click="addRow">{{ t('docTemplate.variable.addRow') }}</ElButton>
              </div>
            </div>
          </div>
        </ElFormItem>
        <div v-if="addError" style="color: red; margin-bottom: 8px;">{{ addError }}</div>
        <div style="text-align: right;">
          <ElButton @click="showAdd = false">{{ t('docTemplate.variable.cancel') }}</ElButton>
          <ElButton type="primary" @click="confirmAdd">{{ t('docTemplate.variable.add') }}</ElButton>
        </div>
      </ElForm>
    </ElDialog>

    <!-- Edit Variable Dialog -->
    <ElDialog v-model="showEdit" :title="t('docTemplate.variable.edit')" width="600px">
      <ElForm label-width="120px" v-if="editVariable">
        <ElFormItem :label="t('docTemplate.variable.key')">
          <ElInput v-model="editVariable.key" disabled />
        </ElFormItem>
        <ElFormItem v-if="editVariable.type !== 'Table' && editVariable.type !== 'List'" :label="t('docTemplate.variable.displayValue')">
          <ElInput v-model="editVariable.displayValue" :type="editVariable.type === 'Paragraph' ? 'textarea' : 'text'" />
        </ElFormItem>
        <ElFormItem v-if="editVariable.type === 'List'" :label="t('docTemplate.variable.listContent')">
          <div class="list-editor">
            <div class="list-editor-header">
              <ElSelect v-model="editVariable.listStyle" style="width: 150px; margin-right: 8px;" :placeholder="t('docTemplate.variable.listStyle')">
                <ElOption value="bullet" :label="t('docTemplate.variable.listStyleBullet')" />
                <ElOption value="numbered" :label="t('docTemplate.variable.listStyleNumbered')" />
                <ElOption value="none" :label="t('docTemplate.variable.listStyleNone')" />
              </ElSelect>
            </div>
            <div class="list-items">
              <div v-for="(item, idx) in (Array.isArray(editVariable.displayValue) ? editVariable.displayValue : [])" :key="idx" class="list-item-row">
                <ElInput 
                  v-model="editVariable.displayValue[idx]" 
                  :placeholder="t('docTemplate.variable.listItemPlaceholder')" 
                  style="flex: 1; margin-right: 8px;"
                />
                <ElButton 
                  size="small" 
                  type="danger" 
                  @click="editVariable.displayValue.splice(idx, 1)"
                  :disabled="editVariable.displayValue.length <= 1"
                >
                  ×
                </ElButton>
              </div>
              <ElButton @click="editVariable.displayValue.push('')" style="width: 100%; margin-top: 8px;">
                {{ t('docTemplate.variable.addListItem') }}
              </ElButton>
            </div>
          </div>
        </ElFormItem>
        <ElFormItem v-if="editVariable.type === 'Table'" :label="t('docTemplate.variable.tableContent')">
          <div class="table-editor">
            <div class="table-editor-header">
              <ElInput 
                v-model="newColumnName" 
                :placeholder="t('docTemplate.variable.columnName')" 
                style="width: 200px; margin-right: 8px"
                @keyup.enter="addColumn"
              />
              <ElButton @click="addColumn" :disabled="!newColumnName.trim()">
                {{ t('docTemplate.variable.addColumn') }}
              </ElButton>
            </div>
            <div v-if="tableColumns.length > 0" class="table-preview">
              <ElTable :data="tableRows" size="small" border>
                <ElTableColumn 
                  v-for="(col, idx) in tableColumns" 
                  :key="col.key" 
                  :prop="col.key" 
                  :label="col.header"
                  min-width="120"
                >
                  <template #header>
                    <span>{{ col.header }}</span>
                    <ElButton 
                      size="small" 
                      type="danger" 
                      text 
                      @click="removeColumn(idx)"
                      style="margin-left: 8px"
                    >
                      ×
                    </ElButton>
                  </template>
                  <template #default="scope">
                    <ElInput v-model="scope.row[col.key]" size="small" />
                  </template>
                </ElTableColumn>
                <ElTableColumn label="Actions" width="80">
                  <template #default="scope">
                    <ElButton size="small" type="danger" @click="removeRow(scope.$index)">×</ElButton>
                  </template>
                </ElTableColumn>
              </ElTable>
              <div style="margin-top: 8px;">
                <ElButton @click="addRow">{{ t('docTemplate.variable.addRow') }}</ElButton>
              </div>
            </div>
          </div>
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

<style scoped>
.table-editor {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  background: #f9f9f9;
}

.table-editor-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.table-preview {
  max-height: 300px;
  overflow-y: auto;
}

.list-editor {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  background: #f9f9f9;
}

.list-editor-header {
  margin-bottom: 16px;
}

.list-items {
  max-height: 300px;
  overflow-y: auto;
}

.list-item-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.list-item-row:last-child {
  margin-bottom: 0;
}
</style> 
