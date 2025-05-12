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
        :tippy-options="{ duration: 100 }"
        
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
