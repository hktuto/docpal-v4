<script lang="ts" setup>
import { DocTemplateProveKey } from '~/utils/docTemplateHelper';

const editorProvider = inject(DocTemplateProveKey)
if(!editorProvider) {
  throw createError('editorProvider not found')
}
const { editor } = editorProvider
</script>

<template>
  <div class="undoRedoContainer">
    <button
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().undo()"
      >
      <Icon name="lucide:undo-2" />
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().redo()"
      >
        <Icon name="lucide:redo-2" />
      </button>
  </div>
</template>

<style lang="scss" scoped>
button {
  border: none;
  background: #f8f9fa;
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);
  &:hover {
    background: #17c2da;
  }
  &.is-active {
    background: #fc8f00;
    color : #fff;
  }
}
</style>
