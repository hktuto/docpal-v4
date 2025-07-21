<script lang="ts" setup>
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import formJson from './docJson.json'
import { ElMessageBox } from 'element-plus'

const routerProvider = inject(MenuRouterKey)
const { editor, options, initEditor, setVariables } = inject(DocTemplateProveKey)
const { t } = useI18n()

const state = reactive({
  loading: false,
  visible: false,
  textContent: ''
})

const FormRendererRef = ref()

function handleOpen() {
  state.visible = true
  setTimeout(async () => {
    await FormRendererRef.value.vFormRenderRef.resetForm()
    state.loading = false
  })
}

async function handleSubmit() {
  try {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    if (!data) return
    const json = JSON.parse(data.textContent)
    ElMessageBox.confirm(
      t('docTemplate.import.msg'),
      'Warning',
      {
        confirmButtonText: t('dpButtom_confirm'),
        cancelButtonText: t('dpButtom_cancel'),
        type: 'warning'
      }
    ).then(() => {
      setVariables(json.variables)
      initEditor(json.json.options, json.json.content)
      editor.value.commands.focus('end')
      state.visible = false
    })
  } catch (e) {
    routerProvider?.message.error(t('docTemplate.import.importError'))
  }
}

</script>

<template>
  <ElButton @click="handleOpen" style="margin-right: 4px">Import</ElButton>
  <el-dialog v-model="state.visible" :title="t('docTemplate.import.import')">
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
