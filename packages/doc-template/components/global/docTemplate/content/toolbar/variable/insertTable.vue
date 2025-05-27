<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElSwitch } from 'element-plus'
import { useI18n } from 'vue-i18n'
import VariableSuggestionDropdown from '../../../../../../../../libraries/docpal-document-editor/src/packages/VariableSuggestionDropdown.vue'
import { DocTemplateProveKey } from '../../../../../../utils/docTempalteHelper'

const { t } = useI18n()
const showDialog = ref(false)
const provider = inject(DocTemplateProveKey)

const tableForm = reactive({
  key: '',
  bordered: true,
  striped: false,
})

function openDialog() {
  // Reset form
  tableForm.key = ''
  tableForm.bordered = true
  tableForm.striped = false
  showDialog.value = true
}

function onSelect(variable: any) {
  if (variable.type === 'Table') {
    tableForm.key = variable.key
  }
}

function insertTable() {
  if (provider?.editor?.value && tableForm.key) {
    // Find the selected variable from the provider
    const selectedVariable = provider.variables.value.find(v => v.key === tableForm.key)
    
    if (selectedVariable && selectedVariable.type === 'Table') {
      provider.editor.value.chain().focus().insertVariableTable({
        key: selectedVariable.key,
        displayValue: selectedVariable.displayValue,
        tableColumns: selectedVariable.tableColumns,
        bordered: tableForm.bordered,
        striped: tableForm.striped,
      }).run()
    }
  }
  showDialog.value = false
}

function isFormValid() {
  return tableForm.key && tableForm.key.trim() !== ''
}

function getTableVariables() {
  if (!provider?.variables?.value) return []
  return provider.variables.value.filter(v => v.type === 'Table')
}
</script>

<template>
  <div>
    <ElButton size="small" @click="openDialog">
      {{ t('docTemplate.variable.insertTable') }}
    </ElButton>
    <ElDialog 
      v-model="showDialog" 
      :title="t('docTemplate.variable.insertTableVariable')" 
      width="500px" 
      append-to-body
    >
      <div class="table-insertion-form">
        <el-form label-width="100px">
          <el-form-item :label="t('docTemplate.variable.selectVariable')" required>
            <div class="variable-selection">
              <el-input 
                v-model="tableForm.key" 
                :placeholder="t('docTemplate.variable.selectTableVariable')"
                readonly
                style="margin-bottom: 8px"
              />
              <VariableSuggestionDropdown
                query=""
                :command="onSelect"
                filter-type="Table"
              />
            </div>
          </el-form-item>
          <el-form-item :label="t('docTemplate.variable.tableBordered')">
            <el-switch v-model="tableForm.bordered" />
          </el-form-item>
          <el-form-item :label="t('docTemplate.variable.tableStriped')">
            <el-switch v-model="tableForm.striped" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">
            {{ t('docTemplate.variable.cancel') }}
          </el-button>
          <el-button 
            type="primary" 
            @click="insertTable"
            :disabled="!isFormValid()"
          >
            {{ t('docTemplate.variable.insertTable') }}
          </el-button>
        </span>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped>
.variable-selection {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  background: #f9f9f9;
}
</style> 
