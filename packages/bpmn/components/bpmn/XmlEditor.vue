<template>
  <ElDialog
    v-model="dialogVisible"
    title="BPMN XML Editor"
    width="90%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    append-to-body
    center
    class="xml-editor-dialog big"
  >
    <div class="adminXmlEditor">
      <div class="adminXmlEditor__header">
        <h3>{{ $t('bpmn_adminXmlEditor_title') || 'BPMN XML Editor' }}</h3>
        <div v-if="!readonly" class="adminXmlEditor__actions">
          <ElButton 
            size="small" 
            type="info"
            @click="refreshXml"
            :loading="isLoading"
          >
            {{ $t('common_refresh') || 'Refresh' }}
          </ElButton>
          <ElButton 
            size="small" 
            type="warning"
            @click="validateXml"
            :loading="isValidating"
          >
            {{ $t('bpmn_adminXmlEditor_validate') || 'Validate' }}
          </ElButton>
          <ElButton 
            size="small" 
            type="primary" 
            @click="saveXml"
            :loading="isSaving"
            :disabled="!hasChanges"
          >
            {{ $t('common_save') || 'Save' }}
          </ElButton>
        </div>
      </div>
      
      <div class="adminXmlEditor__content">
        <div class="adminXmlEditor__editor-container">
          <VAceEditor
            ref="aceEditorRef"
            v-model:value="xmlContent"
            :lang="'xml'"
            :theme="'monokai'"
            :options="aceOptions"
            :height="'600px'"
            :width="'100%'"
            :readonly="readonly"
            @change="onXmlChange"
            @blur="onXmlChange"
            class="adminXmlEditor__ace-editor"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDialog">
          {{ $t('common_cancel') || 'Cancel' }}
        </ElButton>
        <ElButton 
          type="primary" 
          @click="saveAndClose"
          :loading="isSaving"
          :disabled="!hasChanges || readonly"
        >
          {{ $t('common_save') || 'Save' }}
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import type { Graph } from '@antv/x6'
import { bpmnStringToJson, graphToBpmnJson } from '~/utils/bpmnConverter'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/mode-xml'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

const { t } = useI18n()

const props = defineProps<{
  bpmnXml: string,
  readonly:boolean
}>()

const emit = defineEmits<{
  save: [xml: string]
  refresh: []
}>()

// Dialog state
const dialogVisible = ref(false)

// Reactive state
const xmlContent = ref('')
const originalXml = ref('')
const hasChanges = ref(false)
const isLoading = ref(false)
const isSaving = ref(false)
const isValidating = ref(false)
const aceEditorRef = ref<InstanceType<typeof VAceEditor>>()

// Ace editor options
const aceOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showPrintMargin: false,
  showGutter: true,
  highlightActiveLine: true,
  fontSize: 14,
  tabSize: 2,
  useSoftTabs: true,
  wrap: true,
  showLineNumbers: true,
  foldStyle: 'markbegin',
  autoScrollEditorIntoView: true,
  minLines: 30,
  maxLines: 100
}

function closeXmlEditor() {
  dialogVisible.value = false
  resetState()
}

// Open dialog and load XML
function openXmlEditor() {
  dialogVisible.value = true
  nextTick(() => {
    convertBpmnToXml()
  })
}

// Close dialog
function closeDialog() {
  if (hasChanges.value) {
    ElMessageBox.confirm(
      t('bpmn_adminXmlEditor_unsaved_changes_confirm') || 'You have unsaved changes. Are you sure you want to close?',
      t('common_warning') || 'Warning',
      {
        confirmButtonText: t('confirmText') || 'OK',
        cancelButtonText: t('vxe.button.cancel') || 'Cancel',
        type: 'warning',
      }
    ).then(() => {
      dialogVisible.value = false
      resetState()
    }).catch(() => {
      // User cancelled, keep dialog open
    })
  } else {
    dialogVisible.value = false
    resetState()
  }
}

// Save and close dialog
async function saveAndClose() {
  await saveXml()
  // If save was successful (no error thrown), close the dialog
  dialogVisible.value = false
  resetState()
}

// Reset component state
function resetState() {
  xmlContent.value = ''
  originalXml.value = ''
  hasChanges.value = false
}

// Step 1: Convert current BPMN to XML
function convertBpmnToXml() {
  try {
    // Use the existing BPMN XML
    const xml = props.bpmnXml
    
    // Format the XML for better readability
    const formattedXml = formatXmlString(xml)
    xmlContent.value = formattedXml
    originalXml.value = formattedXml
    hasChanges.value = false
  } catch (error) {
    console.error('Error loading BPMN XML:', error)
    ElMessage.error(t('bpmn_adminXmlEditor_error_convert_to_xml') || 'Error loading BPMN XML')
  }
}

// Step 2: Handle XML changes by user
function onXmlChange() {
  hasChanges.value = xmlContent.value !== originalXml.value
}

// Step 3: Save XML back to BPMN
async function saveXml() {
  if (!hasChanges.value) return

  try {
    isSaving.value = true

    // First validate the XML
    const isValid = await validateXmlContent(xmlContent.value)
    if (!isValid) {
      throw new Error('Invalid XML format')
    }

    // Emit save event with XML
    emit('save', xmlContent.value)

    // Update original XML reference
    originalXml.value = xmlContent.value
    hasChanges.value = false

    // Show success message
    ElMessage.success(t('bpmn_adminXmlEditor_save_success') || 'BPMN XML saved successfully')

  } catch (error) {
    console.error('Error saving BPMN XML:', error)
    ElMessage.error(t('bpmn_adminXmlEditor_error_save') || 'Error saving BPMN XML. Please check the format.')
  } finally {
    isSaving.value = false
  }
}

// Validate XML content
async function validateXml() {
  if (!xmlContent.value) return

  try {
    isValidating.value = true

    const isValid = await validateXmlContent(xmlContent.value)
    
    if (isValid) {
      ElMessage.success(t('bpmn_adminXmlEditor_validation_success') || 'XML is valid')
    } else {
      ElMessage.error(t('bpmn_adminXmlEditor_validation_error') || 'XML is invalid')
    }

  } catch (error) {
    console.error('Error validating XML:', error)
    ElMessage.error(t('bpmn_adminXmlEditor_validation_error') || 'Error validating XML')
  } finally {
    isValidating.value = false
  }
}

// Helper function to validate XML content
function validateXmlContent(xml: string): boolean {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xml, 'text/xml')
    
    // Check for parsing errors
    const parseError = xmlDoc.getElementsByTagName('parsererror')
    if (parseError.length > 0) {
      return false
    }

    // Check if it's a valid BPMN document
    const definitions = xmlDoc.getElementsByTagName('definitions')
    if (definitions.length === 0) {
      return false
    }

    const process = xmlDoc.getElementsByTagName('process')
    if (process.length === 0) {
      return false
    }

    return true
  } catch (error) {
    console.error('XML validation error:', error)
    return false
  }
}

// Refresh XML from current BPMN data
function refreshXml() {
  isLoading.value = true
  try {
    convertBpmnToXml()
    emit('refresh')
  } finally {
    isLoading.value = false
  }
}

// Helper function to format XML string with proper indentation
function formatXmlString(xml: string): string {
  let formatted = ''
  let indent = ''
  const tab = '  ' // 2 spaces for indentation
  
  // Remove all whitespace between tags
  xml = xml.replace(/>\s+</g, '><')
  
  // Split by tags
  const parts = xml.split(/(<\/?[^>]+>)/)
  
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim()
    if (!part) continue
    
    // Check if it's a closing tag
    if (part.startsWith('</')) {
      indent = indent.substring(tab.length)
    }
    
    // Add indentation and the tag
    formatted += indent + part + '\n'
    
    // Check if it's an opening tag (not self-closing)
    if (part.startsWith('<') && !part.startsWith('</') && !part.endsWith('/>')) {
      indent += tab
    }
  }
  
  return formatted.trim()
}

// Watch for graph or bpmnJson changes
watch([() => props.bpmnXml], () => {
  if (dialogVisible.value) {
    convertBpmnToXml()
  }
}, { deep: true })

// Expose methods for parent components
defineExpose({
  openXmlEditor,
  refreshXml,
  saveXml,
  validateXml,
  closeXmlEditor,
  hasChanges: computed(() => hasChanges.value),
  xmlContent: computed(() => xmlContent.value)
})
</script>

<style lang="scss" scoped>
.adminXmlEditor {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 80dvh;
  background: var(--el-bg-color);
  border-radius: var(--el-border-radius-base);
  overflow: hidden;

  &__header {
    flex: 0 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--el-padding-base);
    border-bottom: 1px solid var(--el-border-color);
    background: var(--el-bg-color-page);

    h3 {
      margin: 0;
      font-size: var(--el-font-size-large);
      font-weight: var(--el-font-weight-primary);
      color: var(--el-text-color-primary);
    }

    &__actions {
      display: flex;
      gap: var(--el-padding-small);
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: var(--el-padding-base);
    gap: var(--el-padding-small);
    overflow: auto;
  }

  &__editor-container {
    flex: 1;
    position: relative;
    min-height: 600px;
  }

  &__ace-editor {
    width: 100%;
    height: 100%;
    min-height: 600px;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--el-padding-small);
}
</style>

<style lang="scss">
.xml-editor-dialog {
  .el-dialog__body {
    padding: 0;
    height: 80vh;
    overflow: hidden;
  }
  
  .el-dialog__header {
    padding: var(--el-padding-base);
    border-bottom: 1px solid var(--el-border-color-light);
  }
  
  .el-dialog__footer {
    padding: var(--el-padding-base);
    border-top: 1px solid var(--el-border-color-light);
  }
}
</style> 
