<script lang="ts" setup>
import { defaultPageSetting } from 'docpal-document-editor/src/utils'
import { type TipTapOptions } from 'docpal-document-editor/src/types'
import { paperSizes } from 'tiptap-extension-pagination/src'

const emits = defineEmits(['submit', 'close'])
const { t } = useI18n()
const formRef = ref()

const props = defineProps<{
  title?: string
}>()

const showTextCounter = ref(false)
watch(showTextCounter, (bool) => {
  if (bool) {
    form.textCount ||= 200
  } else {
    form.textCount &&= undefined
  }
})
const form = reactive<TipTapOptions>({
  textCount: undefined,
  mode: 'PAGE',
  pageSetting: {
    ...defaultPageSetting
  },
  title: props.title ? props.title : 'New Document',
  creator: '',
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

const rules = reactive({
  title: [
    {
      required: true,
      message: t('render.hint.fieldRequired', { name: t('vxe.custom.setting.colTitle') }),
      trigger: 'blur'
    },
    { validator: checkTitle, message: t('docTemplate.createTemplate.error'), trigger: 'blur' }
  ]
})

const ModeOption = ['PAGE', 'ENDLESS']

function checkTitle(rule: any, value: any, callback: any) {
  // const invalidFileNameRegex = /[\/\\:*?"<>|]|^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i
  const invalidCharacterRegex = /[\/\\:*?"<>|]/
  if (invalidCharacterRegex.test(value)) {
    callback(new Error())
  } else {
    callback()
  }
}

async function submit() {
// check form valid
  try {
    await formRef.value.validate()
    emits('submit', { ...form })
  } catch (e) {
    console.error(e)
  }
}

function handleClose() {
  if (!props.title) {
    emits('close')
  }
}

</script>

<template>
  <ElForm ref="formRef" :model="form" :rules="rules" label-position="top">
    <ElFormItem prop="title" :label="t('docTemplate.pageSetup.title')">
      <ElInput v-model="form.title" :placeholder="t('docTemplate.pageSetup.EnterDocumentTitle')" />
    </ElFormItem>
    <ElFormItem prop="mode" label="Page Mode">
      <ElSelect v-model="form.mode" filterable>
        <ElOption v-for="mode in ModeOption" :key="mode" :label="mode" :value="mode" />
      </ElSelect>
    </ElFormItem>
    <!-- Text Counter  -->
    <ElFormItem label="Text Counter">
      <ElSwitch v-model="showTextCounter" />
    </ElFormItem>
    <template v-if="showTextCounter">
      <ElFormItem prop="textCount" label="Max Text Count">
        <ElInputNumber v-model="form.textCount" />
      </ElFormItem>
    </template>
    <!-- PAGE setting -->
    <template v-if="form.mode === 'PAGE'">
      <ElFormItem :label="t('docTemplate.pageSetup.pageSize')">
        <ElSelect v-model="form.pageSetting.defaultPaperSize">
          <ElOption v-for="key in paperSizes" :key="key" :label="key" :value="key" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem :label="t('docTemplate.pageSetup.orientation')">
        <ElSelect v-model="form.pageSetting.defaultPaperOrientation">
          <ElOption :label="t('docTemplate.pageSetup.portrait')" value="portrait" />
          <ElOption :label="t('docTemplate.pageSetup.landscape')" value="landscape" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem :label="t('docTemplate.pageSetup.pageMargin')">
        <ElRow :gutter="12">
          <ElCol :span="6">
            <ElFormItem :label="t('docTemplate.pageSetup.left')">
              <ElInputNumber v-model="form.pageSetting.defaultMarginConfig.left" min="0" max="100" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="t('docTemplate.pageSetup.top')">
              <ElInputNumber v-model="form.pageSetting.defaultMarginConfig.top" min="0" max="100" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="t('docTemplate.pageSetup.right')">
              <ElInputNumber v-model="form.pageSetting.defaultMarginConfig.right" min="0" max="100" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="6">
            <ElFormItem :label="t('docTemplate.pageSetup.bottom')">
              <ElInputNumber v-model="form.pageSetting.defaultMarginConfig.bottom" min="0" max="100" />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElFormItem>
    </template>

    <ElFormItem>
      <ElButton type="primary" @click="submit">{{ $t('button.save') }}</ElButton>
      <el-button @click="handleClose">{{ $t('button.close') }}</el-button>
    </ElFormItem>
  </ElForm>
</template>
