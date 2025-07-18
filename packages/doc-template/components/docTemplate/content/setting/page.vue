<script lang="ts" setup>
import { MenuRouterKey } from '#imports'
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { paperSizes } from 'tiptap-extension-pagination/src'
import type { pageSettingOptions } from '~/utils/tiptapHelper'

const routerProvider = inject(MenuRouterKey)
const editorProvider = inject(DocTemplateProveKey)
if (!editorProvider) {
  throw createError('editor Provider not found')
}
const { editor, options, initEditor, getEditContent } = editorProvider

const { t } = useI18n()
const opened = ref(false)
const form = ref<pageSettingOptions>()
const formRef = ref()
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

function open() {
  // TODO : get page Setting
  opened.value = true
  const extension = editor.value.options.extensions.find((ex: any) => ex.name === 'pagination')
  if (!extension) {
    throw createError('no pagination found')
  }
  // deep copy
  form.value = JSON.parse(JSON.stringify(options.value))
}

function close() {
  opened.value = false
}

function checkTitle(rule: any, value: any, callback: any) {
  // const invalidFileNameRegex = /[\/\\:*?"<>|]|^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i
  const invalidCharacterRegex = /[\/\\:*?"<>|]/
  if (invalidCharacterRegex.test(value)) {
    callback(new Error())
  } else {
    callback()
  }
}

async function updatePageSetting() {
  try {
    await formRef.value.validate()
  } catch (e) {
    return
  }

  const extension = editor.value.options.extensions.find((ex: any) => ex.name === 'pagination')

  extension.options = {
    ...extension.options,
    ...form.value.pageSetting
  }
  const newOptions = {
    ...form.value
  }
  // 初始化時也會設置頁邊距，但是使用的參數是舊的參數
  initEditor(newOptions, getEditContent())

  editor.value.commands.setDocumentPageMargins(form.value?.pageSetting.defaultMarginConfig)

  // check if title has changed
  routerProvider?.updateTabName(form.value?.title)

  opened.value = false
}

</script>

<template>
  <ElButton @click="open" style="margin-left: 4px">{{ $t('docTemplate.pageSetup.pageSetup') }}</ElButton>

  <ElDialog v-model="opened" :title="t('docTemplate.pageSetup.pageSetup')">
    <ElForm ref="formRef" :model="form" :rules="rules" label-position="top">
      <ElFormItem prop="title" :label="t('docTemplate.pageSetup.title')">
        <ElInput v-model="form.title" :placeholder="t('docTemplate.pageSetup.EnterDocumentTitle')" />
      </ElFormItem>
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
    </ElForm>
    <template #footer>
      <ElButton type="link" @click="close">{{ t('dpButtom_cancel') }}</ElButton>
      <ElButton type="primary" @click="updatePageSetting">{{ $t('button.save') }}</ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.iconContainer {
  cursor: pointer;
}
</style>
