<script lang="ts" setup>
import { Editor, EditorContent } from '@tiptap/vue-3';
import { DocTemplateProveKey } from '~/utils/docTempalteHelper';
import { normalizeTipTapOptions, setupExtensions, defaultPageSetting, type TipTapOptions } from '~/utils/tiptapHelper';


const props = withDefaults(defineProps<{
  editorOptions: TipTapOptions,
  json?: any,
  variables : VariableItem[]
}>(), {
 editorOptions:{
   ...defaultPageSetting
 },
 variables:[]
})
const { variables } = toRefs(props)

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


const lastSelection = ref<LastSelection | null>()

const headerRef = ref<any>(null)
function initEditor(initOptions:TipTapOptions, json?:any) {
  if(editor.value) {
    editor.value.destroy()
  }
  const normlizeOption = normalizeTipTapOptions(initOptions)
  const extensions = setupExtensions(normlizeOption)
  editor.value = new Editor({
    content: normalizeJson(normlizeOption, json),
    extensions,
    onSelectionUpdate({ editor }) {
      const selection = editor.state.selection;
      if(!selection || !selection?.jsonID) return;
      let newSelectionData:LastSelection = {
        type: 'text',
        data: selection
      }
      switch(selection?.jsonID) {
        case 'text':
          // text or textRange
          if(!selection?.text){
            lastSelection.type = "text"
          }else{
            lastSelection.type = "textRange"
          }
          break;
        case 'node' :
          // check image
          if(selection?.node.type.name ==="image"){
            lastSelection.type = "image"
          }
          break;
        default:
          break;
      }
      // console.log("type",lastSelection.type)
      lastSelection.value = newSelectionData
    },
  })
  if(normlizeOption.mode === 'PAGE') {
    // set up margin
    // editor.value.commands.setDocumentPageMargins(initOptions.pageSetting?.defaultMarginConfig || {
    //   top: 5, right: 5, bottom: 5, left: 5 
    // })
  }
  options.value = {...normlizeOption}
  headerRef.value.init(normlizeOption)
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
  initEditor,
  variables,
  lastSelection
})

</script>

<template>
  <div class="editorContainer">
    <DocTemplateHeader ref="headerRef"  />
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

<style>
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid var(--app-grey-950);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: var(--app-grey-850);
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: var(--app-grey-975);
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: var(--app-primary-color);
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
  [data-type="taskList"]{
    list-style: none;
    padding-inline-start: 0;
    li{
      > * {
        display: inline-block;
      }
    }
  }
}
</style>
