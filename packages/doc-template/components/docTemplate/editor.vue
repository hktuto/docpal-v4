<script lang="ts" setup>
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
import { DocTemplateProveKey } from '~/utils/docTempalteHelper';

const props = defineProps<{
  editorOptions: TipTapOptions
}>()
const { editorOptions } = toRef(props)


const editor = ref()

function initEditor() {
  if(editor.value) {
    editor.value.destroy()
  }
  const extensions = setupExtensions(editorOptions.value)
  editor.value = new Editor({
    content: `<p>I'm running Tiptap with Vue.js. 🎉</p> 
    <div style="page-break-after: always;"></div>
    <p>I'm running Tiptap with Vue.js. 🎉</p> 
    `,
    extensions,
  })
  if(editorOptions.value.mode === 'PAGE') {
    // set up margin
    editor.value.commands.setDocumentPageMargins({
      top: 5, right: 5, bottom: 5, left: 5 
    })
  }
}

function setConfig(newOptions:TipTapOptions) {
  editorOptions.value = newOptions
  initEditor()
}

onMounted(() => {
  initEditor()
})

onUnmounted(() => {
  editor.value.destroy()
})

provide(DocTemplateProveKey, {
  editor,
  editorOptions,
  setConfig
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
