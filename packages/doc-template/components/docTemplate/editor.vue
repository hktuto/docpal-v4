<script lang="ts" setup>
import { ref, toRefs, onMounted, onUnmounted, provide } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { DocTemplateProveKey, validateVariable, type DocTemplateVariable } from '../../utils/docTemplateHelper'
import { type TipTapOptions } from 'docpal-document-editor/src/types'
import { defaultPageSetting, replaceVariables } from 'docpal-document-editor/src/utils'
import { normalizeTipTapOptions, clientEditorExtensions, generateHtml, getJsonConfig } from 'docpal-document-editor/src/client'
import * as Y from 'yjs'
import { HocuspocusProvider } from '@hocuspocus/provider'

const props = defineProps<{
  editorOptions: TipTapOptions
  json?: any
  user?: any
  variables: DocTemplateVariable[],
}>()
const { variables } = toRefs(props)

const emit = defineEmits(['update:variables'])

const options = ref<TipTapOptions>({
  mode: 'PAGE',
  pageSetting: { ...defaultPageSetting },
  title: 'Editor',
  creator: '',
  editable: false,
  theme: {
    fontSize: 12,
    fontColor: '#000000',
    fontBackgroundColor: '#ffffff',
    fontFamily: 'Arial',
    bodyFontSize: 20,
    h1FontSize: 20,
    highlightColor: '#ffff00'
  }
})
const editor = ref()

export type LastSelection = {
  type: 'text' | 'textRange' | 'image' | 'cell'
  data: any
}

const lastSelection = ref<LastSelection | null>()

const ydoc = new Y.Doc()

const provider = new HocuspocusProvider({
  url: 'ws://localhost:3333/ws',
  name: 'docpal-doc-editor',
  document: ydoc
})

const headerRef = ref<any>(null)

function initEditor(initOptions: TipTapOptions, json?: any) {
  if (editor.value) {
    editor.value.destroy()
  }

  const normalizeOption = normalizeTipTapOptions(initOptions)
  const extensions = clientEditorExtensions(normalizeOption)
  if (variables.value.length > 0 && json && json.content) {
    json.content = replaceVariables(json.content, [...variables.value])
  }

  let html = generateHtml(json, initOptions)

  editor.value = new Editor({
    // 如果導入的數據類型是json的情況，在首次進入頁面時uno按鈕允許點擊，會導致頁面樣式變動
    content: html || '',
    autofocus: true,
    extensions: [
      ...extensions
    ],
    onSelectionUpdate({ editor }) {
      const selection = editor.state.selection as any
      if (!selection || !selection?.jsonID) return
      let newSelectionData: LastSelection = {
        type: 'text',
        data: selection
      }
      switch (selection?.jsonID) {
        case 'text':
          // text or textRange
          if (!selection?.text) {
            newSelectionData.type = 'text'
          } else {
            newSelectionData.type = 'textRange'
          }
          break
        case 'node':
          // check image
          if (selection?.node.type.name === 'image') {
            newSelectionData.type = 'image'
          }
          break
        case 'cell':
          // cell
          newSelectionData.type = 'cell'
          break
        default:
          break
      }
      lastSelection.value = newSelectionData
    }
  })
  options.value = { ...normalizeOption }
  headerRef.value.init(normalizeOption)
}

function addVariable(variable: DocTemplateVariable) {
  if (!validateVariable(variable)) {
    throw new Error('Invalid variable', variable)
  }
  emit('update:variables', [...variables.value, variable])
}

function updateVariable(updateVariable: DocTemplateVariable) {
  // TODO: check if variable is in use, if in use, update node content
  const index = variables.value.findIndex(v => v.id === updateVariable.id)
  if (index !== -1 && validateVariable(updateVariable)) {
    variables.value[index] = updateVariable
    const editorJson = editor.value.getJSON()
    setVariables(variables.value)
    editorJson.content = replaceVariables(editorJson.content, variables.value)
    initEditor(options.value, editorJson)
  } else {
    // Show error to user
    console.error('Invalid update or variable not found:', updateVariable)
  }
}

function setVariables(newVariables: DocTemplateVariable[]) {
  emit('update:variables', newVariables)
}

function removeVariable(variable: DocTemplateVariable) {
  const newVariables = variables.value.filter(v => v.name !== variable.name)
  setVariables(newVariables)
}

function handleInsertVariable(variable: any) {
  if (!editor.value) return
  let nodeType = ''
  switch (variable.type) {
    case 'text':
      nodeType = 'variableText'
      break
    case 'list':
      nodeType = 'variableList'
      break
    case 'table':
      nodeType = 'variableTable'
      break
    case 'link':
      nodeType = 'variableLink'
      break
    case 'image':
      nodeType = 'image'
      break // or your custom variableImage
    default:
      return
  }
  editor.value.commands.insertContent({
    type: nodeType,
    attrs: { ...variable }
  })
}

/**
 * Get the entire edit page data JSON
 * Include data, options, variables
 */
function getJsonData() {
  return getJsonConfig(getEditContent(), options.value, variables)
}

/**
 * Get the content of the edit data
 */
function getEditContent() {
  return editor.value.getJSON()
}

onMounted(() => {
  initEditor(props.editorOptions, props.json)
})

onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

provide(DocTemplateProveKey, {
  editor,
  options,
  initEditor,
  variables,
  setVariables,
  addVariable,
  removeVariable,
  lastSelection,
  updateVariable,
  getEditContent
})

defineExpose({ getJsonData })
</script>

<template>
  <div class="editorContainer"
       :style="`--margin-top: ${options.pageSetting?.defaultMarginConfig?.top}mm; --margin-bottom: ${options.pageSetting?.defaultMarginConfig?.bottom}mm; --margin-left: ${options.pageSetting?.defaultMarginConfig?.left}mm; --margin-right: ${options.pageSetting?.defaultMarginConfig?.right}mm;`">
    <DocTemplateHeader ref="headerRef" />
    <div class="editorBody">
      <EditorContent :editor="editor" />
      <DocTemplateContentSettingBubbleMenu />
    </div>
    <DocTemplateFooter />
  </div>
</template>

<style lang="scss" scoped>
.editorContainer {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
}

.editorBody {
  flex: 1 0 auto;
  padding: var(--app-space-m);
  overflow: auto;

  :deep(.tiptap) {
    outline: none;
  }
}

</style>

<style>
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* Table-specific styling */

  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid var(--app-grey-950);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: var(--app-grey-850);
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: var(--app-grey-975);
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: var(--app-primary-color);
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  [data-type='taskList'] {
    list-style: none;
    padding-inline-start: 0;

    li {
      > * {
        display: inline-block;
      }
    }
  }

  .page {
    --border-color: #888;

    &:before {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      top: calc(var(--margin-top) - 20px);
      right: calc(var(--margin-right) - 20px);
      display: block;
      border-bottom: 1px solid var(--border-color);
      border-left: 1px solid var(--border-color);
    }

    &:after {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      bottom: calc(var(--margin-bottom) - 20px);
      right: calc(var(--margin-right) - 20px);
      display: block;
      border-top: 1px solid var(--border-color);
      border-left: 1px solid var(--border-color);
    }
  }

  .body {
    position: relative;
    overflow: visible !important;

    &:before {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      top: -20px;
      left: -20px;
      display: block;
      border-bottom: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
    }

    &:after {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      bottom: -20px;
      left: -20px;
      display: block;
      border-top: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
    }
  }
}

.collaboration-cursor__caret {
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  margin-left: -1px;
  margin-right: -1px;
  pointer-events: none;
  position: relative;
  word-break: normal;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  border-radius: 3px 3px 3px 0;
  color: #0d0d0d;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  left: -1px;
  line-height: normal;
  padding: 0.1rem 0.3rem;
  position: absolute;
  top: -1.4em;
  user-select: none;
  white-space: nowrap;
}
</style>
