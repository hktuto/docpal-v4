<script lang="ts" setup>
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import formJson from './docJson.json'

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
    setVariables(json.variables)
    initEditor(json.json.options, json.json.content)
    state.visible = false
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <ElButton @click="handleOpen">Import</ElButton>
  <el-dialog v-model="state.visible" :title="t('Import')">
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
