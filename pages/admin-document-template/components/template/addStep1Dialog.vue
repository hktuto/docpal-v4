<template>
  <el-dialog
    class="scroll-dialog"
    v-model="state.visible" :title="state.isEdit ? $t('template.editInfo') : $t('documentTemplate_Create')"
    :close-on-click-modal="false" append-to-body
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson">
    </FormRenderer>
    <template #footer>
      <!-- <el-button @click="createFile('Excel', 'test')"></el-button> -->
      <el-button id="DocumentTemplate__CreateNewDocumentTemplate__Submit" type="primary" :loading="state.loading"
                 @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
  <TemplateAddStep2Dialog ref="TemplateAddStep2DialogRef" />
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import { ExtensionMap } from '~/utils/documentTemplateHelper'
import formJson from './templateAddStep1.vform.json'
import { ElMessage } from 'element-plus'

const emits = defineEmits([
  'update'
])
const state = reactive({
  loading: false,
  visible: false,
  setting: {},
  isEdit: false
})
const { t } = useI18n()
const routerProvider = inject(MenuRouterKey)
const form = reactive({
  labelRule: []
})
const FormRendererRef = ref()
const TemplateAddStep2DialogRef = ref()

async function handleSubmit() {
  try {
    const formData = await FormRendererRef.value.getFormData()
    if (!formData) return
    state.loading = true
    if (state.isEdit) {
      await adminApi.api.putTemplateDocument({
        name: formData.name,
        description: formData.description,
        id: state.setting.id,
        fileType: state.setting.fileType
      })
      ElMessage.success(t('tip_updateSuccessMsg', { modelName: t('adminMenu.template'), name: null }))
      emits('update')
    } else {
      const file = await createFile(formData.type, formData.name)
      const params = new FormData()
      params.append('file', file)
      params.append('name', formData.name)
      params.append('fileType', formData.type)
      params.append('description', formData.description)
      const { data } = await adminApi.api.postTemplateDocument({ requestDTO: {} }, params as any) as any
      ElMessage.success(t('tip_createdSuccessMsg', { modelName: t('adminMenu.template'), name: null }))
      const templateInfo = data
      const link = createNewDocumentTemplateDetail({
        id: templateInfo.id,
        name: templateInfo.name,
        item: templateInfo
      }, false)
      routerProvider?.navigateTo(link)
      TemplateAddStep2DialogRef.value.handleOpen(templateInfo)
    }
    state.visible = false
  } catch (error) {
    console.log(error)
  }
  state.loading = false
}

async function handleOpen(setting?) {
  state.visible = true
  setTimeout(async () => {
    await FormRendererRef.value.vFormRenderRef.resetForm()
    if (setting && setting.isEdit) {
      state.isEdit = true
      state.setting = setting
      await FormRendererRef.value.vFormRenderRef.setFormData({ ...state.setting })
      state.loading = false
    } else {
      state.isEdit = false
      state.setting = {}
    }
  })
}

async function createFile(fileType: 'Word' | 'Excel' | 'PPT' | 'PDF', name: string) {
  const path = `/docTemplate/template${ExtensionMap[fileType]}`
  const file = await fetch(path)
  const fileArrayBuffer = await file.arrayBuffer()
  return new File([fileArrayBuffer], `${name}${ExtensionMap[fileType]}`, { type: ExtensionMimeTypeMap[fileType] })
}

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
