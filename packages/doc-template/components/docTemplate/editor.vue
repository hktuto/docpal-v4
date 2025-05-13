<script lang="ts" setup>
import { Editor, EditorContent } from '@tiptap/vue-3';
import { DocTemplateProveKey } from '~/utils/docTempalteHelper';
import { normalizeTipTapOptions, setupExtensions, type TipTapOptions } from '~/utils/tiptapHelper';


const props = withDefaults(defineProps<{
  editorOptions: TipTapOptions,
  json?: any,
  variables ?: any
}>(), {
 editorOptions:{
   mode: "PAGE",
 }
})

const options = ref<TipTapOptions>({
  mode: "PAGE"
})
const editor = ref()

function normalizeJson(option:TipTapOptions, json?:any){
  if(json) {
    return json
  }
  if(option.mode === 'PAGE') {
    return ""        
  } else {
    return ""
  }

}


function initEditor(initOptions:TipTapOptions, json?:any) {
  if(editor.value) {
    editor.value.destroy()
  }
  const normlizeOption = normalizeTipTapOptions(initOptions)
  const extensions = setupExtensions(normlizeOption)
  editor.value = new Editor({
    content: normalizeJson(normlizeOption, json),
    extensions,
  })
  if(normlizeOption.mode === 'PAGE') {
    // set up margin
    // editor.value.commands.setDocumentPageMargins(initOptions.pageSetting?.defaultMarginConfig || {
    //   top: 5, right: 5, bottom: 5, left: 5 
    // })
  }
  options.value = {...normlizeOption}
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
