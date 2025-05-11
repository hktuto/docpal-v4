<script lang="ts" setup>
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Highlight from '@tiptap/extension-highlight'
import link from '@tiptap/extension-link'
import SuperScript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'

import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import FontFamily from '@tiptap/extension-font-family'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import List from '@tiptap/extension-list'
import TextStyle from '@tiptap/extension-text-style'
import Gapcursor from '@tiptap/extension-gapcursor'
import Image from '@tiptap/extension-image'

import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
 
type EditorOptions = {
  textCount?: number
}
const { editorOptions= {
  textCount: null
} } = defineProps<{
  editorOptions: EditorOptions
}>()


const editor = ref()

function initEditor() {
  editor.value = new Editor({
    content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
    extensions: [
      Heading,
      Document,
      FontFamily,
      Paragraph,
      List,
      Text,
      TextStyle,
      Gapcursor,
      Image,
      Bold,
      Italic,
      Highlight,
      Underline,
      SuperScript,
      link,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount.configure({
        limit: editorOptions.textCount,
      })
    ],
  })
}

onMounted(() => {
  initEditor()
})

onUnmounted(() => {
  editor.value.destroy()
})

provide('editor', {
  editor
})

</script>

<template>
  <div class="editorContainer">
    <DocTemplateHeader  />
    <div class="editorBody">
      <bubble-menu
        :editor="editor"
        :tippy-options="{ duration: 100 }"
        v-if="editor"
      >
        <div class="bubble-menu">
          <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            Bold
          </button>
          <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            Italic
          </button>
          <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
            Strike
          </button>
        </div>
      </bubble-menu>
      <EditorContent :editor="editor" />
    </div>
    <DocTemplateFooter />
  </div>
</template>

<style lang="scss" scoped>
.editorContainer{
  width:100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content  1fr min-content;
}
.editorBody{
  flex: 1 0 auto;
  padding: var(--app-space-m);
}
</style>
