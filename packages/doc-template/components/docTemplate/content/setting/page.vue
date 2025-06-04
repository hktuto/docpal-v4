<script lang="ts" setup>
import { MenuRouterKey } from '#imports'
import { DocTemplateProveKey } from '~/utils/docTemplateHelper';
import {paperSizes} from "tiptap-extension-pagination/src"
import type { pageSettingOptions } from '~/utils/tiptapHelper';

const routerProvider = inject(MenuRouterKey)
const editorProvider = inject(DocTemplateProveKey)
if(!editorProvider){
  throw createError('editor Provider not found')
}
const { editor, options, initEditor } = editorProvider



const opened = ref(false);
const form = ref<pageSettingOptions>()

const rules = reactive({
  title: [
    { required: true, message: 'Title is required', trigger: 'blur' }
  ]
})

function updatePageSetting(){
  // check if pageSize change = 
  // editor.value.commands.
  // editor.value.commands.setDocumentPaperSize(form.value?.defaultPaperSize);
  // editor.value.commands.setDocumentPaperOrientation(form.value?.defaultPaperOrientation || "landscape")
  editor.value.commands.setDocumentPageMargins(form.value?.pageSetting.defaultMarginConfig)
  const extension = editor.value.options.extensions.find((ex:any) => ex.name === "pagination")

  extension.options = {
    ...extension.options,
    ...form.value.pageSetting
  }
  // TODO : get content and 
  const newOptions = {
    ...form.value
  }
  initEditor(newOptions)
  // check if title has changed
  routerProvider?.updateTabName(form.value?.title)

  opened.value = false;
}

function close() {
  opened.value = false;
}

function open(){
  // TODO : get page Setting
  opened.value = true
  const extension = editor.value.options.extensions.find((ex:any) => ex.name === "pagination")
  if(!extension) {
    throw createError('no pagination found')
  }
  form.value = options.value
}

</script>


<template>
  <ElButton @click="open" >Page Setup</ElButton>

  <ElDialog v-model="opened">
      <ElForm :model="form" label-position="top">
        <ElFormItem prop="title" label="Title">
          <ElInput v-model="form.title" placeholder="Enter document title" />
        </ElFormItem>
        <ElFormItem label="Page Size">
          <ElSelect v-model="form.pageSetting.defaultPaperSize">
            <ElOption v-for="key in paperSizes" :key="key" :label="key" :value="key" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Orientation">
          <ElSelect v-model="form.pageSetting.defaultPaperOrientation">
            <ElOption label="portrait" value="portrait" />
            <ElOption label="landscape" value="landscape" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Page Margin">

        
        <ElRow :gutter="12">
          <ElCol :span="6">
             <ElFormItem label="Left">
                <ElInputNumber v-model="form.pageSetting.defaultMarginConfig.left" />
              </ElFormItem>
          </ElCol>
          <ElCol :span="6">
             <ElFormItem label="Top">
                <ElInputNumber v-model="form.pageSetting.defaultMarginConfig.top" />
              </ElFormItem>
          </ElCol>
          <ElCol :span="6">
             <ElFormItem label="Right">
                <ElInputNumber v-model="form.pageSetting.defaultMarginConfig.right" />
              </ElFormItem>
          </ElCol>
          <ElCol :span="6">
             <ElFormItem label="Bottom">
                <ElInputNumber v-model="form.pageSetting.defaultMarginConfig.bottom" />
              </ElFormItem>
          </ElCol>
        </ElRow>
       </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton type="link" @click="close">Cancel</ElButton> 
        <ElButton type="primary" @click="updatePageSetting" >Save</ElButton>
      </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.iconContainer{
  cursor: pointer;
}
</style>
