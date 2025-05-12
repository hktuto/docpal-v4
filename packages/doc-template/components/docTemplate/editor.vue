<script lang="ts" setup>
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
 

const { editorOptions= {
  textCount: null,
  mode: 'PAGE'
} } = defineProps<{
  editorOptions: TipTapOptions
}>()


const editor = ref()
const extensions = setupExtensions(editorOptions)
function initEditor() {
  editor.value = new Editor({
    content: `<p>I'm running Tiptap with Vue.js. 🎉</p> 
    <div style="page-break-after: always;"></div>
    <p>I'm running Tiptap with Vue.js. 🎉</p> 
    `,
    extensions,
  })
  if(editorOptions.mode === 'PAGE') {
    // set up margin
    editor.value.commands.setDocumentPageMargins({
      top: 5, right: 5, bottom: 5, left: 5 
    })
  }
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
  overflow: auto;
  :deep(.tiptap){
    outline: none;
  }
}
</style>
