<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus'
import { useI18n } from 'vue-i18n'
import VariableSuggestionDropdown from '../../../../../../../../libraries/docpal-document-editor/src/packages/VariableSuggestionDropdown.vue'
import { DocTemplateProveKey } from '../../../../../../utils/docTempalteHelper'

const { t } = useI18n()
const showDialog = ref(false)
const provider = inject(DocTemplateProveKey)

const linkForm = reactive({
  label: '',
  targetKey: '',
  targetValue: '',
})

function openDialog() {
  // Reset form
  linkForm.label = ''
  linkForm.targetKey = ''
  linkForm.targetValue = ''
  showDialog.value = true
}

function onTargetSelect(variable: any) {
  linkForm.targetKey = variable.key
  linkForm.targetValue = variable.displayValue || variable.key
}

function insertLink() {
  if (provider?.editor?.value && linkForm.targetKey) {
    provider.editor.value.chain().focus().insertContent({
      type: 'variableLink',
      attrs: {
        key: linkForm.targetKey,
        type: 'link',
        label: linkForm.label || linkForm.targetKey,
        target: linkForm.targetValue,
      },
    }).run()
  }
  showDialog.value = false
}

function isFormValid() {
  return linkForm.targetKey && linkForm.targetKey.trim() !== ''
}
</script>

<template>
  <div>
    <ElButton size="small" @click="openDialog">
      {{ t('docTemplate.variable.insertLink') }}
    </ElButton>
    <ElDialog 
      v-model="showDialog" 
      :title="t('docTemplate.variable.createLink')" 
      width="500px" 
      append-to-body
    >
      <div class="link-creation-form">
        <el-form label-width="80px">
          <el-form-item :label="t('docTemplate.variable.linkLabel')">
            <el-input 
              v-model="linkForm.label" 
              :placeholder="t('docTemplate.variable.linkLabelPlaceholder')"
            />
          </el-form-item>
          <el-form-item :label="t('docTemplate.variable.linkTarget')" required>
            <div class="target-selection">
              <el-input 
                v-model="linkForm.targetKey" 
                :placeholder="t('docTemplate.variable.selectTargetVariable')"
                readonly
                style="margin-bottom: 8px"
              />
              <VariableSuggestionDropdown
                query=""
                :command="onTargetSelect"
              />
            </div>
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
            @click="insertLink"
            :disabled="!isFormValid()"
          >
            {{ t('docTemplate.variable.insertLink') }}
          </el-button>
        </span>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped>
.target-selection {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  background: #f9f9f9;
}
</style> 
