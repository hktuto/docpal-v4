<script lang="ts" setup>
import { ref, inject, computed, watch } from 'vue'
import { ElDrawer, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElTable, ElTableColumn, ElMessage } from 'element-plus'
import { DocTemplateProveKey, type VariableItem, type TableRow } from '~/utils/docTempalteHelper'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  visible: boolean
  exportType: 'html' | 'docx' | 'pdf'
}>()

const emits = defineEmits<{
  close: []
  export: [variables: VariableItem[]]
}>()

const { t } = useI18n()
const docTemplateProvider = inject(DocTemplateProveKey)
if (!docTemplateProvider) throw new Error('DocTemplateProvider not found')

const { variables } = docTemplateProvider

// Create a copy of variables for editing
const editableVariables = ref<VariableItem[]>([])

// Watch for visibility changes to reset variables
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    // Deep clone variables to avoid modifying original
    editableVariables.value = variables.value.map(variable => {
      if (variable.type === 'Table') {
        return {
          ...variable,
          displayValue: Array.isArray(variable.displayValue) 
            ? (variable.displayValue as TableRow[]).map(row => ({ ...row }))
            : [],
          tableColumns: variable.tableColumns ? [...variable.tableColumns] : []
        } as VariableItem
      } else if (variable.type === 'List') {
        return {
          ...variable,
          displayValue: Array.isArray(variable.displayValue) 
            ? [...(variable.displayValue as string[])]
            : [String(variable.displayValue || '')],
          listStyle: variable.listStyle || 'bullet'
        } as VariableItem
      } else {
        return { ...variable } as VariableItem
      }
    })
  }
})

// Format display value for different types
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

// Add list item
function addListItem(variable: VariableItem) {
  if (variable.type === 'List') {
    if (!Array.isArray(variable.displayValue)) {
      variable.displayValue = []
    }
    (variable.displayValue as string[]).push('')
  }
}

// Remove list item
function removeListItem(variable: VariableItem, index: number) {
  if (variable.type === 'List' && Array.isArray(variable.displayValue) && variable.displayValue.length > 1) {
    (variable.displayValue as string[]).splice(index, 1)
  }
}

// Add table row
function addTableRow(variable: VariableItem) {
  if (variable.type === 'Table') {
    if (!Array.isArray(variable.displayValue)) {
      variable.displayValue = []
    }
    const newRow: TableRow = {}
    if (variable.tableColumns) {
      variable.tableColumns.forEach(col => {
        newRow[col.key] = ''
      })
    }
    (variable.displayValue as TableRow[]).push(newRow)
  }
}

// Remove table row
function removeTableRow(variable: VariableItem, index: number) {
  if (variable.type === 'Table' && Array.isArray(variable.displayValue)) {
    (variable.displayValue as TableRow[]).splice(index, 1)
  }
}

// Handle close
function handleClose() {
  emits('close')
}

// Handle export
function handleExport() {
  // Validate variables
  for (const variable of editableVariables.value) {
    if (variable.type === 'List' && Array.isArray(variable.displayValue)) {
      // Filter out empty items
      const filteredItems = (variable.displayValue as string[]).filter(item => String(item).trim() !== '')
      variable.displayValue = filteredItems
      if (filteredItems.length === 0) {
        ElMessage.error(`${t('docTemplate.variable.listEmpty')}: ${variable.key}`)
        return
      }
    } else if (variable.type !== 'Table' && !variable.displayValue) {
      ElMessage.error(`${t('docTemplate.variable.valueRequired')}: ${variable.key}`)
      return
    }
  }
  
  emits('export', editableVariables.value)
}
</script>

<template>
  <ElDrawer
    :model-value="visible"
    :title="`${t('docTemplate.export.configureVariables')} - ${exportType.toUpperCase()}`"
    size="600px"
    direction="rtl"
    @close="handleClose"
  >
    <div class="export-variable-sidebar">
      <div class="sidebar-content">
        <div v-if="editableVariables.length === 0" class="no-variables">
          <p>{{ t('docTemplate.export.noVariables') }}</p>
        </div>
        
        <div v-else class="variables-list">
          <div v-for="(variable, index) in editableVariables" :key="variable.key" class="variable-item">
            <div class="variable-header">
              <h4>{{ variable.key }}</h4>
              <span class="variable-type">{{ variable.type }}</span>
            </div>
            
                         <!-- Text/Paragraph/Email/Website/documentId/CaseId/WorkflowId -->
             <div v-if="['Text', 'Paragraph', 'Email', 'Website', 'documentId', 'CaseId', 'WorkflowId'].includes(variable.type)" class="variable-input">
               <ElInput
                 :model-value="String(variable.displayValue)"
                 @update:model-value="(val: string) => variable.displayValue = val"
                 :type="variable.type === 'Paragraph' ? 'textarea' : 'text'"
                 :placeholder="`${t('docTemplate.variable.enter')} ${variable.type}`"
                 :rows="variable.type === 'Paragraph' ? 4 : 1"
               />
             </div>
            
            <!-- List -->
            <div v-else-if="variable.type === 'List'" class="variable-list">
              <div class="list-style-selector">
                <ElSelect v-model="variable.listStyle" style="width: 150px;">
                  <ElOption value="bullet" :label="t('docTemplate.variable.listStyleBullet')" />
                  <ElOption value="numbered" :label="t('docTemplate.variable.listStyleNumbered')" />
                  <ElOption value="none" :label="t('docTemplate.variable.listStyleNone')" />
                </ElSelect>
              </div>
              <div class="list-items">
                                 <div v-for="(item, idx) in (Array.isArray(variable.displayValue) ? variable.displayValue : [])" :key="idx" class="list-item-row">
                   <ElInput 
                     :model-value="String(item)"
                     @update:model-value="(val: string) => (variable.displayValue as string[])[idx] = val"
                     :placeholder="t('docTemplate.variable.listItemPlaceholder')" 
                     style="flex: 1; margin-right: 8px;"
                   />
                  <ElButton 
                    size="small" 
                    type="danger" 
                    @click="removeListItem(variable, idx)"
                    :disabled="variable.displayValue.length <= 1"
                  >
                    ×
                  </ElButton>
                </div>
                <ElButton @click="addListItem(variable)" style="width: 100%; margin-top: 8px;" size="small">
                  {{ t('docTemplate.variable.addListItem') }}
                </ElButton>
              </div>
            </div>
            
            <!-- Table -->
            <div v-else-if="variable.type === 'Table'" class="variable-table">
              <div v-if="variable.tableColumns && variable.tableColumns.length > 0" class="table-editor">
                <ElTable :data="Array.isArray(variable.displayValue) ? variable.displayValue : []" size="small" border>
                  <ElTableColumn 
                    v-for="col in variable.tableColumns" 
                    :key="col.key" 
                    :prop="col.key" 
                    :label="col.header"
                    min-width="120"
                  >
                    <template #default="scope">
                      <ElInput v-model="scope.row[col.key]" size="small" />
                    </template>
                  </ElTableColumn>
                  <ElTableColumn label="Actions" width="80">
                    <template #default="scope">
                      <ElButton size="small" type="danger" @click="removeTableRow(variable, scope.$index)">×</ElButton>
                    </template>
                  </ElTableColumn>
                </ElTable>
                <div style="margin-top: 8px;">
                  <ElButton @click="addTableRow(variable)" size="small">{{ t('docTemplate.variable.addRow') }}</ElButton>
                </div>
              </div>
              <div v-else class="no-table-structure">
                <p>{{ t('docTemplate.variable.noTableStructure') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="sidebar-footer">
        <ElButton @click="handleClose">{{ t('docTemplate.variable.cancel') }}</ElButton>
        <ElButton type="primary" @click="handleExport">
          {{ t('docTemplate.export.export') }} {{ exportType.toUpperCase() }}
        </ElButton>
      </div>
    </div>
  </ElDrawer>
</template>

<style scoped>
.export-variable-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.no-variables {
  text-align: center;
  color: #999;
  padding: 40px 20px;
}

.variables-list {
  space-y: 24px;
}

.variable-item {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.variable-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.variable-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.variable-type {
  background: #f0f2f5;
  color: #606266;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.variable-input {
  margin-bottom: 8px;
}

.variable-list {
  margin-bottom: 8px;
}

.list-style-selector {
  margin-bottom: 12px;
}

.list-items {
  space-y: 8px;
}

.list-item-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.variable-table {
  margin-bottom: 8px;
}

.no-table-structure {
  text-align: center;
  color: #999;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #e4e7ed;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style> 
