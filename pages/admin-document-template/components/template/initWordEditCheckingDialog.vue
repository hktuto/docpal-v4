<script setup lang="ts">
import { templateApi } from 'api'

const props = defineProps<{
  userId: string,
  blob: Blob
}>()
const emits = defineEmits(['convertJson'])
const { t } = useI18n()
const state = reactive({
  visible: false
})

function openDialog(blob) {
  state.visible = true
  state.blob = blob
}

function handleExportOldDocxDocument() {
  // download docx file

}

async function handleConvertDocxToJson() {
  // convert docx file to json
  const formData = new FormData()
  formData.append('file', state.blob)
  const json = await templateApi.convert.postConvertUploaddocxtotemplatejson(formData as any)
  emits('convertJson', json)
  state.visible = false
}

function handelDialogClose() {
  // TODO 跳轉回去page頁面
}

defineExpose({ openDialog })
</script>

<template>
  <el-dialog v-model="state.visible" :title="t('dpTip_warning')" :center="true" :before-close="handelDialogClose">
    {{ t('aaaaa') }}
    <template #footer>
      <el-button @click="handleExportOldDocxDocument">{{ t('Export') }}</el-button>
      <el-button @click="handleConvertDocxToJson">{{ t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>