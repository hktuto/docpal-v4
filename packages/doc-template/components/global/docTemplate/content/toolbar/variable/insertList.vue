<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'
import { useI18n } from 'vue-i18n'
import VariableSuggestionDropdown from '../../../../../../../../libraries/docpal-document-editor/src/packages/VariableSuggestionDropdown.vue'
import { DocTemplateProveKey } from '../../../../../../utils/docTempalteHelper'

const { t } = useI18n()
const showDialog = ref(false)
const provider = inject(DocTemplateProveKey)

const listForm = reactive({
  key: '',
  listStyle: 'bullet' as 'bullet' | 'numbered' | 'none',
})

function openDialog() {
  // Reset form
  listForm.key = ''
  listForm.listStyle = 'bullet'
  showDialog.value = true
}

function onSelect(variable: any) {
  if (variable.type === 'List') {
    listForm.key = variable.key
  }
}

function insertList() {
  if (provider?.editor?.value && listForm.key) {
    // Find the selected variable from the provider
    const selectedVariable = provider.variables.value.find(v => v.key === listForm.key)
    
    if (selectedVariable && selectedVariable.type === 'List') {
      provider.editor.value.chain().focus().insertVariableList({
        key: selectedVariable.key,
        displayValue: selectedVariable.displayValue,
        listStyle: listForm.listStyle,
      }).run()
    }
  }
  showDialog.value = false
}

function isFormValid() {
  return listForm.key && listForm.key.trim() !== ''
}

function getListVariables() {
  if (!provider?.variables?.value) return []
  return provider.variables.value.filter(v => v.type === 'List')
}
</script>

<template>
  <div>
    <ElButton size="small" @click="openDialog">
      {{ t('docTemplate.variable.insertList') }}
    </ElButton>
    <ElDialog 
      v-model="showDialog" 
      :title="t('docTemplate.variable.insertListVariable')" 
      width="500px" 
      append-to-body
    >
      <div class="list-insertion-form">
        <el-form label-width="100px">
          <el-form-item :label="t('docTemplate.variable.selectVariable')" required>
            <div class="variable-selection">
              <el-input 
                v-model="listForm.key" 
                :placeholder="t('docTemplate.variable.selectListVariable')"
                readonly
                style="margin-bottom: 8px"
              />
              <VariableSuggestionDropdown
                query=""
                :command="onSelect"
                :filter-type="'List'"
              />
            </div>
          </el-form-item>
          <el-form-item :label="t('docTemplate.variable.listStyle')">
            <el-select v-model="listForm.listStyle" style="width: 100%">
              <el-option value="bullet" :label="t('docTemplate.variable.listStyleBullet')" />
              <el-option value="numbered" :label="t('docTemplate.variable.listStyleNumbered')" />
              <el-option value="none" :label="t('docTemplate.variable.listStyleNone')" />
            </el-select>
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
            @click="insertList"
            :disabled="!isFormValid()"
          >
            {{ t('docTemplate.variable.insertList') }}
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
