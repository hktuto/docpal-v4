<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { type TipTapOptions } from 'docpal-document-editor/src/types'
import { defaultPageSetting } from 'docpal-document-editor/src/utils'
import { normalizeTipTapOptions, clientEditorExtensions, generateHtml } from 'docpal-document-editor/src/client'

const props = defineProps<{
  json?: any,
  content?: any,
  options?: TipTapOptions,
}>()
const editor = ref<Editor | undefined>(undefined)

const defaultTheme = {
  fontSize: 12,
  fontColor: '#000000',
  fontBackgroundColor: '#ffffff',
  fontFamily: 'Arial',
  bodyFontSize: 20,
  h1FontSize: 20,
  highlightColor: '#ffff00'
}

onMounted(() => {
  const normlizeOption = normalizeTipTapOptions({
    ...props.options,
    editable: false,
    mode: props.options?.mode || 'PAGE',
    pageSetting: props.options?.pageSetting || { ...defaultPageSetting },
    title: props.options?.title ?? 'Viewer',
    creator: props.options?.creator ?? '',
    theme: props.options?.theme ?? defaultTheme
  })
  const extensions = clientEditorExtensions(normlizeOption)
  editor.value = new Editor({
    content: props.content || '',
    extensions: [...extensions],
    editable: false
  })
})

function initEditor(initOptions: TipTapOptions, json?: any) {
  if (editor.value) {
    editor.value.destroy()
  }
  const normalizeOption = normalizeTipTapOptions(initOptions)
  const extensions = clientEditorExtensions(normalizeOption)

  const html = generateHtml(json, initOptions)

  editor.value = new Editor({
    content: html || '',
    autofocus: true,
    extensions: [
      ...extensions
    ],
    editable: false
  })
}

onMounted(() => {
  initEditor(props.options, props.json)
})

onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

defineExpose({ initEditor })
</script>

<template>
  <div class="editorContainer"
       :style="`--margin-top: ${options.pageSetting?.defaultMarginConfig?.top}mm; --margin-bottom: ${options.pageSetting?.defaultMarginConfig?.bottom}mm; --margin-left: ${options.pageSetting?.defaultMarginConfig?.left}mm; --margin-right: ${options.pageSetting?.defaultMarginConfig?.right}mm;`">
    <div class="editorBody">
      <EditorContent :editor="editor" />
    </div>
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
