<script lang="ts" setup>
import {  BubbleMenu } from '@tiptap/vue-3';
import { DocTemplateProveKey } from '~/utils/docTempalteHelper';

const editorProvider = inject(DocTemplateProveKey)
if(!editorProvider) {
  throw createError('editorProvider not found')
}
const { editor } = editorProvider


</script>

<template>
    <bubble-menu
        :editor="editor"
        :tippy-options="{ duration: 300 }"
      >
        <div class="bubble-menu">
          <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            Bold
          </button>
          <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            Italic
          </button>
        </div>
      </bubble-menu>
</template>

<style lang="scss" scoped>
.bubble-menu {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid var(--app-grey-950);
  gap: var(--app-space-xxs);
  background: var(--app-grey-1000);
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);
}
button {
  border: none;
  background: var(--app-grey-950);
  padding: var(--app-space-xs);
  border-radius: var(--app-border-radius-s);
  &:hover {
    background: var(--app-success-3);
  }
  &.is-active {
    background: var(--app-accent-color);
    color : #fff;
  }
}
</style>
