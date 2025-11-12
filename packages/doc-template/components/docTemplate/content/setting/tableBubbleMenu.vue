<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3/menus'
import { DocTemplateProveKey } from '../../../../utils/docTemplateHelper'
import { findParentNode, posToDOMRect } from '@tiptap/core'

interface TableStyleDialogExpose {
  open: (initialStyle?: string | Record<string, string>) => void
}

const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) {
  throw createError('editorProvider not found')
}
const { editor, lastSelection } = editorProvider
const tableStyleDialog = ref<TableStyleDialogExpose | null>(null)
const isEmptySelection = computed(() => {
  return !lastSelection || lastSelection.value === null  || lastSelection.value?.data.anchor === lastSelection.value?.data.head
})

function getListVirtualElement() {
  const parentNode = findParentNode(node => node.type.name === 'bulletList' || node.type.name === 'orderedList')(
    editor.value.state.selection,
  )
  if (parentNode) {
    const domRect = posToDOMRect(editor.value.view, parentNode.start, parentNode.start + parentNode.node.nodeSize)
    return {
      getBoundingClientRect: () => domRect,
      getClientRects: () => [domRect],
    }
  }
  return null
}

function removeColumn(){
  editor.value.chain().focus().deleteColumn().run()
}
function removeRow(){
  editor.value.chain().focus().deleteRow().run()
}

function addColumnBefore(){
  editor.value.chain().focus().addColumnBefore().run()
}
function addColumnAfter(){
  editor.value.chain().focus().addColumnAfter().run()
}
function addRowBefore(){
  editor.value.chain().focus().addRowBefore().run()
}
function addRowAfter(){
  editor.value.chain().focus().addRowAfter().run()
}

function toggleHeaderRow(){
  editor.value.chain().focus().toggleHeaderRow().run()
}

function handleTableCellsMergeOrSplit(state: boolean) {
  if (state) {
    editor.value.chain().focus().mergeCells().run()
  } else {
    editor.value.chain().focus().splitCell().run()
  }
}

function getCurrentCellStyle(): string | undefined {
  if (!editor.value) {
    return undefined
  }

  if (editor.value.isActive('tableHeader')) {
    const headerAttrs = editor.value.getAttributes('tableHeader')
    if (headerAttrs?.customStyle) {
      return headerAttrs.customStyle as string
    }
  }

  if (editor.value.isActive('tableCell')) {
    const cellAttrs = editor.value.getAttributes('tableCell')
    if (cellAttrs?.customStyle) {
      return cellAttrs.customStyle as string
    }
  }

  return undefined
}

function openTableStyleDialog(){
  const initialStyle = getCurrentCellStyle()
  tableStyleDialog.value?.open(initialStyle)
}

function updateTableStyle(newStyle: string){
  editor.value.chain().focus().setCellAttribute('customStyle', newStyle).run()
}


</script>

<template>
<bubble-menu
    :editor="editor"
    :tippy-options="{ duration: 500, zIndex:11 }"
    v-if="editor"
    style="z-index: 3;"
  >
    <div v-if="lastSelection?.type === 'cell'" class="bubble-menu">
      <button @click="handleTableCellsMergeOrSplit(true)">
        {{ $t('Merge Cells') }}
      </button>
      <button @click="handleTableCellsMergeOrSplit(false)">
        {{ $t('Split Cell') }}
      </button>
      <button @click="openTableStyleDialog" >Update Cell Style</button>
    </div>
  </bubble-menu>
  <bubble-menu
      v-if="editor"
      :editor="editor"
      :should-show="() => editor.isActive('tableHeader') && isEmptySelection"
      :get-referenced-virtual-element="getListVirtualElement"
      :options="{ placement: 'top-start', offset: 8 }"
      style="z-index: 3;"
    >
      <div class="bubble-menu">
        <button @click="toggleHeaderRow">Toggle Header Row</button>
        <button @click="addColumnBefore">Add Column Before</button>
        <button @click="addColumnAfter">Add Column After</button>
        <button @click="removeColumn">Remove Column</button>
        <button @click="removeRow">Remove Row</button>
      </div>
    </bubble-menu>
    <bubble-menu
      v-if="editor"
      :editor="editor"
      :should-show="() => editor.isActive('tableCell') && isEmptySelection"
      :get-referenced-virtual-element="getListVirtualElement"
      :options="{ placement: 'top-start', offset: 8 }"
      style="z-index: 3;"
    >
      <div class="bubble-menu">
        <button @click="toggleHeaderRow">Toggle Header Row</button>
        <button @click="addColumnBefore">Add Column Before</button>
        <button @click="addColumnAfter">Add Column After</button>
        <button @click="addRowBefore">Add Row Before</button>
        <button @click="addRowAfter">Add Row After</button>
        <button @click="removeRow">Remove Row</button>
        <button @click="removeColumn">Remove Column</button>
        <button @click="openTableStyleDialog" >Update Cell Style</button>
      </div>
    </bubble-menu>
    <docTemplateContentSettingTableStyleDialog ref="tableStyleDialog" @apply="updateTableStyle" />
</template>


<style lang="scss" scoped>
.bubble-menu {
  display: flex;
  max-width: 260px;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid var(--app-grey-900);
  gap: var(--app-space-xxs);
  background: var(--app-grey-950);
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);
  z-index: 999;
}

button {
  border: none;
  background: var(--app-grey-900);
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);

  &:hover {
    background: var(--app-success-3);
  }

  &.is-active {
    background: var(--app-accent-color);
    color: #fff;
  }
}
</style>
