<script lang="ts" setup>
import { defaultPageSetting } from "docpal-document-editor/src/utils"
import  { type TipTapOptions} from "docpal-document-editor/src/types"
import {paperSizes} from "tiptap-extension-pagination"

const emits = defineEmits(['submit'])

const formRef = ref()

const showTextCounter = ref(false)
watch(showTextCounter, (bool) => {
  if(bool){
    form.textCount ||= 200
  }else{
    form.textCount &&= undefined
  }
})
const form = reactive<TipTapOptions>({
  textCount: undefined,
  mode: "PAGE",
  pageSetting: {
    ...defaultPageSetting
  },
  title: "",
  creator: "",
  theme: {
    fontSize: 12,
    fontColor: '#000000',
    fontBackgroundColor: '#ffffff',
    fontFamily: 'Arial',
    bodyFontSize: 20,
    h1FontSize: 20,
    highlightColor: '#ffff00'
  }
})

const rules = reactive({})

const ModeOption = ['PAGE', "ENDLESS"]

async function submit(){
// check form valie
  const valid = await formRef.value.validate()
  if(valid) {
    emits("submit", {...form})
  }
}

</script>

<template>
  <ElForm ref="formRef" :model="form" :rules="rules" label-position="top">
    <ElFormItem prop="mode" label="Page Mode">
      <ElSelect v-model="form.mode" filterable>
        <ElOption v-for="mode in ModeOption" :key="mode" :label="mode" :value="mode" />
      </ElSelect>
    </ElFormItem>
    <!-- Text Couter  -->
    <ElFormItem label="Text Counter">
      <ElSwitch v-model="showTextCounter" />
    </ElFormItem>
    <template v-if="showTextCounter" >
      <ElFormItem prop="textCount" label="Max Text Count" >
        <ElInputNumber v-model="form.textCount" />
      </ElFormItem>
    </template>
    <!-- PAGE setting -->
    <template v-if="form.mode === 'PAGE'">
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
    </template>
    <ElFormItem >
      <ElButton type="primary" @click="submit" >Save</ElButton>
    </ElFormItem>
  </ElForm>
</template>
