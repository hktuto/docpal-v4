<script lang="ts" setup>
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
import { DocTemplateProveKey } from '~/utils/docTempalteHelper';
import { setupExtensions, type TipTapOptions } from '~/utils/tiptapHelper';

const props = withDefaults(defineProps<{
  editorOptions: TipTapOptions
}>(), {
 editorOptions:{
   mode: "PAGE",
 }
})

const options = ref<TipTapOptions>({
  mode: "PAGE"
})
const editor = ref()

function initEditor(initOptions:TipTapOptions) {
  if(editor.value) {
    editor.value.destroy()
  }
  const extensions = setupExtensions(initOptions)
  editor.value = new Editor({
    content: `<p>I'm running Tiptap with Vue.js. 🎉</p> 
    <div style="page-break-after: always;"></div>
    <p>I'm running Tiptap with Vue.js. 🎉</p> 
    `,
    extensions,
  })
  if(initOptions.mode === 'PAGE') {
    // set up margin
    editor.value.commands.setDocumentPageMargins(initOptions.pageSetting?.defaultMarginConfig || {
      top: 5, right: 5, bottom: 5, left: 5 
    })
  }
  options.value = initOptions
}


onMounted(() => {
  initEditor(props.editorOptions)
})

onUnmounted(() => {
  editor.value.destroy()
})

provide(DocTemplateProveKey, {
  editor,
  options,
  initEditor
})

</script>

<template>
  <div class="editorContainer">
    <DocTemplateHeader  />
    <div class="editorBody">
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
