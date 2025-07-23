<script setup lang="ts">
import { templateApi } from 'api'
import { navigateToTemplatePage } from '~/utils/documentTemplateHelper'

const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
  userId: string,
  blob: Blob
}>()
const emits = defineEmits(['convertJson'])
const { t } = useI18n()
const state = reactive({
  visible: false,
  blob: Blob,
  name: ''
})

function openDialog(blob: Blob, name: string) {
  state.visible = true
  state.blob = blob
  state.name = name
}

function handleExportOldDocxDocument() {
  // download docx file
  downloadBlob(state.blob, state.name)
}

async function handleConvertDocxToJson() {
  try { // convert docx file to json
    const formData = new FormData()
    formData.append('file', state.blob)
    const json = await templateApi.convert.postConvertUploaddocxtotemplatejson(formData as any)
    json.json.options.title = state.name
    emits('convertJson', json)
  } catch (e) {
    console.log(e)
    throw new Error(e)
  } finally {
    state.visible = false
  }
}

function handelDialogClose() {
  routerProvider?.navigateTo(navigateToTemplatePage())
}

defineExpose({ openDialog })
</script>

<template>
  <el-dialog v-model="state.visible" :title="t('dpTip_warning')" :center="true" :before-close="handelDialogClose">
    {{ t('documentTemplate_warningMsg') }}
    <template #footer>
      <el-button @click="handleExportOldDocxDocument">{{ t('Export') }}</el-button>
      <el-button @click="handleConvertDocxToJson">{{ t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>