<template>
  <div class="xmlEditor">
    <div class="xmlEditor__content">
      <div class="xmlEditor__editor-container">
        <VAceEditor
          ref="aceEditorRef"
          v-model:value="xmlContent"
          :lang="'xml'"
          :theme="'monokai'"
          :options="aceOptions"
          :height="'400px'"
          :width="'100%'"
          @change="onXmlChange"
          @blur="onXmlChange"
          class="xmlEditor__ace-editor"
        />
      </div>

      <div class="footer">
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
          type="primary"
          @click="saveXml"
          :loading="isSaving"
          :disabled="!hasChanges"
        >
          {{ $t('common_save') || 'Save' }}
        </ElButton>
      </div>

      <ElAlert
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
        :closable="false"
        show-icon
      />

      <ElAlert
        v-if="hasChanges"
        :title="$t('bpmn_xmlEditor_unsaved_changes') || 'You have unsaved changes'"
        type="info"
        :closable="false"
        show-icon
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Node } from '@antv/x6'
import { nodeXmltoJson, jsonToBpmn } from '~/utils/bpmnConverter'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/mode-xml'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

const { t } = useI18n()

const props = defineProps<{
  node: Node
}>()

// Inject BPMN provider for graph access
const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw new Error('Missing BPMN provider')
}

// Reactive state
const xmlContent = ref('')
const originalXml = ref('')
const hasChanges = ref(false)
const isLoading = ref(false)
const isSaving = ref(false)
const errorMessage = ref('')
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
  minLines: 20,
  maxLines: 50
}

// Step 1: Convert ant x6 json data back to XML
function convertNodeDataToXml() {
  try {
    const nodeData = props.node.getData()
    if (!nodeData || !nodeData.data) {
      xmlContent.value = ''
      originalXml.value = ''
      return
    }

    // Convert the node's data back to XML
    const xml = jsonToBpmn(nodeData.data)
    // Format the XML for better readability
    let formattedXml = formatXmlString(xml)
    // 當xml顯示script Task的js代碼時，該方法會導致js内的"<"&">"等語法失，效導致後續運行workflow報錯
    if (nodeData.type === 'scriptTask') {
      formattedXml = xml
    }
    xmlContent.value = formattedXml
    originalXml.value = formattedXml
    hasChanges.value = false
    errorMessage.value = ''
  } catch (error) {
    console.error('Error converting node data to XML:', error)
    errorMessage.value = t('bpmn_xmlEditor_error_convert_to_xml') || 'Error converting to XML'
  }
}

// Step 2: Handle XML changes by user
function onXmlChange() {
  hasChanges.value = xmlContent.value !== originalXml.value
  errorMessage.value = ''
}

// Step 3: Save XML back to ant x6 json
async function saveXml() {
  if (!hasChanges.value) return

  try {
    isSaving.value = true
    errorMessage.value = ''

    // Parse the XML back to JSON
    const json = nodeXmltoJson(xmlContent.value)

    if (!json) {
      throw new Error('Invalid XML format')
    }

    // Update the node data
    const nodeData = props.node.getData()
    const newData = {
      ...nodeData,
      version: (nodeData.version || 0) + 1,
      data: {
        ...nodeData.data,
        ...json
      }
    }

    // Update the node with new data
    props.node.setData(newData, { overwrite: true, deep: true })

    // Update original XML reference
    originalXml.value = xmlContent.value
    hasChanges.value = false

    // Trigger graph history change
    graphProvider?.graph.value?.trigger('history:change')

    // Show success message
    ElMessage.success(t('bpmn_xmlEditor_save_success') || 'XML saved successfully')

  } catch (error) {
    console.error('Error saving XML:', error)
    errorMessage.value = t('bpmn_xmlEditor_error_save') || 'Error saving XML. Please check the format.'
  } finally {
    isSaving.value = false
  }
}

// Refresh XML from current node data
function refreshXml() {
  isLoading.value = true
  try {
    convertNodeDataToXml()
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

// Set up listeners for graph changes
function setupListeners() {
  if (!graphProvider?.graph.value) return

  // Listen for undo/redo operations
  graphProvider.graph.value.on('history:undo', () => {
    refreshXml()
  })

  graphProvider.graph.value.on('history:redo', () => {
    refreshXml()
  })

  // Listen for node data changes
  graphProvider.graph.value.on('cell:change:data', (args: any) => {
    if (args.cell.id === props.node.id) {
      refreshXml()
    }
  })
}

// Initialize component
onMounted(() => {
  convertNodeDataToXml()
  setupListeners()
})

// Watch for node changes
watch(() => props.node, () => {
  convertNodeDataToXml()
}, { deep: true })

// Expose methods for parent components
defineExpose({
  refreshXml,
  saveXml,
  hasChanges: computed(() => hasChanges.value)
})
</script>

<style lang="scss" scoped>
.xmlEditor {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--el-bg-color);
  border-radius: var(--el-border-radius-base);
  overflow: hidden;
  border: 1px solid var(--el-border-color);

  &__header {
    flex: 0 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
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
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    padding: var(--el-padding-base);
    gap: var(--el-padding-small);
  }

  &__editor-container {
    flex: 1 0 auto;
    position: relative;
    min-height: 400px;
  }

  &__ace-editor {
    width: 100%;
    height: 100%;
    min-height: 400px;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
  }

  .footer {
    display: flex;
    gap: var(--el-padding-small);
    justify-content: flex-end;
    padding: var(--el-padding-small) 0;
    border-top: 1px solid var(--el-border-color-light);
  }
}
</style>
