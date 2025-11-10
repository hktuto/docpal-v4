<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3/menus'
import { DocTemplateProveKey } from '../../../../utils/docTemplateHelper'
import { findParentNode, posToDOMRect } from '@tiptap/core'

const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) {
  throw createError('editorProvider not found')
}
const { editor, lastSelection } = editorProvider

const state = reactive({
  imageWidth: 100
})

function handleWidthChange() {
  editor.value.chain().focus().setImage({
    src: editor.value.state.selection.node.attrs.src,
    width: `${state.imageWidth}%;`
  }).run()
}

function toggleListType() {
  const chain = editor.value.chain().focus()
  console.log(editor.value);
  if (editor.value.isActive('bulletList')) {
    chain.toggleOrderedList()
  } else {
    chain.toggleBulletList()
  }
  chain.run()
}

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

/**
 * @param state (true: merge, false: split)
 */
function handleTableCellsMergeOrSplit(state: boolean) {
  if (state) {
    editor.value.chain().focus().mergeCells().run()
  } else {
    editor.value.chain().focus().splitCell().run()
  }
}
</script>

<template>
  <bubble-menu
    :editor="editor"
    :tippy-options="{ duration: 500, zIndex:11 }"
    v-if="editor"
    style="z-index: 3;"
  >
    <div v-if="lastSelection?.type === 'text'" class="bubble-menu">
      <button @click="editor.chain().focus().toggleBold().run()"
              :class="{ 'is-active': editor.isActive('bold') }">
        {{ $t('Bold') }}
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()"
              :class="{ 'is-active': editor.isActive('italic') }">
        {{ $t('Italic') }}
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">
        {{ $t('Clear') }}
      </button>
    </div>

    <div v-if="lastSelection?.type === 'image'" class="bubble-menu">
      <input v-model="state.imageWidth" type="number" min="1" max="100" step="1" />
      <button @click="handleWidthChange">
        {{ $t('Set image size') }}
      </button>
    </div>

    <!-- <div v-if="lastSelection?.type === 'cell'" class="bubble-menu">
      <button @click="handleTableCellsMergeOrSplit(true)">
        {{ $t('Merge Cells') }}
      </button>
      <button @click="handleTableCellsMergeOrSplit(false)">
        {{ $t('Split Cell') }}
      </button>
    </div> -->
  </bubble-menu>
  <bubble-menu
      v-if="editor"
      :editor="editor"
      :should-show="() => editor.isActive('bulletList') || editor.isActive('orderedList')"
      :get-referenced-virtual-element="getListVirtualElement"
      :options="{ placement: 'top-start', offset: 8 }"
    >
      <div class="bubble-menu">
        <button type="button" @click="toggleListType">Toggle list type</button>
      </div>
    </bubble-menu>
    
    
</template>

<style lang="scss" scoped>
.bubble-menu {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid var(--app-grey-900);
  gap: var(--app-space-xxs);
  background: var(--app-grey-950);
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);
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
