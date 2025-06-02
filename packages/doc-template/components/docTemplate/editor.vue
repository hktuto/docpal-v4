<script lang="ts" setup>
import { ref, toRefs, onMounted, onUnmounted, provide } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { DocTemplateProveKey } from '../../utils/docTemplateHelper'
import {type TipTapOptions} from 'docpal-document-editor/src/types' 
import { defaultPageSetting} from 'docpal-document-editor/src/utils'
import { normalizeTipTapOptions, clientEditorExtensions  } from 'docpal-document-editor/src/client'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import { HocuspocusProvider } from '@hocuspocus/provider'
import { validateVariable, type DocTemplateVariable } from '../../utils/docTemplateHelper'

const props = defineProps<{
    editorOptions: TipTapOptions
    json?: any
    user?: any
    variables: DocTemplateVariable[],
  }>()
const { variables } = toRefs(props)

const options = ref<TipTapOptions>({
  mode: 'PAGE',
  pageSetting : {...defaultPageSetting},
  title: "Editor",
  creator: "",
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
const room = ref("12345")

export type LastSelection = {
  type: 'text' | 'textRange' | 'image' | 'cell'
  data: any
}

const lastSelection = ref<LastSelection | null>()

const ydoc = new Y.Doc();

const provider = new HocuspocusProvider({
  url: "ws://localhost:3333/ws",
  name: "docpal-doc-editor",
  document: ydoc,
});

const headerRef = ref<any>(null)
function initEditor(initOptions: TipTapOptions, json?: any) {
  if (editor.value) {
    editor.value.destroy()
  }
  const normlizeOption = normalizeTipTapOptions(initOptions)
  const extensions = clientEditorExtensions(normlizeOption)
  if(initOptions.editable) {
  }
  editor.value = new Editor({
    content: json || "",
    extensions:[
      ...extensions,
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
    },
    onCreate({editor}) {
      // update page setting base on normlizeOption
      console.log(editor)
      if(normlizeOption.mode === 'PAGE' && normlizeOption?.pageSetting?.defaultMarginConfig) {
        editor.commands.setDocumentPageMargins(normlizeOption?.pageSetting?.defaultMarginConfig)
      }
    }
  })
  options.value = { ...normlizeOption }
  headerRef.value.init(normlizeOption)
}

function addVariable(variable: DocTemplateVariable) {
  if (!validateVariable(variable)) {
    throw new Error('Invalid variable', variable)
  }
  variables.value.push(variable)
  console.log('variables', variables.value)
}
function updateVariable(updateVariable: DocTemplateVariable) {
  const index = variables.value.findIndex(v => v.key === updateVariable.key)
  if (index !== -1 && validateVariable(updateVariable)) {
    variables.value[index] = updateVariable
  } else {
    // Show error to user
    console.error('Invalid update or variable not found:', updateVariable)
  }
}
function removeVariable(variable: DocTemplateVariable) {
  const index = variables.value.findIndex(v => v.key === variable.key)
  if (index !== -1) {
    variables.value.splice(index, 1)
  }
}

function handleInsertVariable(variable: any) {
  if (!editor.value) return
  let nodeType = ''
  switch (variable.type) {
    case 'text': nodeType = 'variableText'; break
    case 'list': nodeType = 'variableList'; break
    case 'table': nodeType = 'variableTable'; break
    case 'link': nodeType = 'variableLink'; break
    case 'image': nodeType = 'image'; break // or your custom variableImage
    default: return
  }
  editor.value.commands.insertContent({
    type: nodeType,
    attrs: { ...variable }
  })
}

onMounted(() => {
  initEditor(props.editorOptions)
})

onUnmounted(() => {
  if(editor.value) {
    editor.value.destroy()
  }
})

provide(DocTemplateProveKey, {
  editor,
  options,
  initEditor,
  variables,
  addVariable,
  removeVariable,
  lastSelection,
  updateVariable
})
</script>

<template>
  <div class="editorContainer">
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
