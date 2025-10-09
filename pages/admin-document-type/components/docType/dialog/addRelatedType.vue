<template>
  <el-dialog v-model="state.visible"
             :title="state.isEdit ? $t('docType_editRelatedMeta') : $t('docType_addRelatedMeta')"
             :close-on-click-modal="false"
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
    <template #footer>
      <el-button id="DocumentType__RelatedDocument__AddNewRelatedDocument__Submit" type="primary"
                 :loading="state.loading"
                 @click="handleSubmit()">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {adminApi} from 'api'
import formJson from './addRelatedType.vform.json'
import {ElMessage} from "element-plus";

const {t} = useI18n()
const props = defineProps<{
  docType: any,
}>()
const emits = defineEmits([
  'refresh'
])
const state = reactive<any>({
  loading: false,
  visible: false,
  allDocTypeList: [],
  isEdit: false,
  setting: {}
})
const FormRendererRef = ref()

async function handleSubmit() {
  try {
    state.loading = true
    const data = await FormRendererRef.value.getFormData()
    delete data.isEdit
    let msg;
    if (state.isEdit) {
      await adminApi.api.patchDocpaltypeSettingsNameNameRelated(props.docType.name, {
        metaData: data?.metadata,
        rootDocPalType: data?.documentType,
        id: state.setting.id
      })
      msg = t('tip_updateMsg', {modelName: t('tip_newMsg') + t('docType_relatedDocument'), name: null})
    } else {
      // return
      // props.docType.name
      await adminApi.api.postDocpaltypeSettingsNameNameRelated(props.docType.name, {
        metaData: data?.metadata,
        rootDocPalType: data?.documentType,
      })
      msg = t('tip_createdMsg', {modelName: t('docType_relatedDocument'), name: null})
    }
    ElMessage.success(msg)
    state.visible = false
    FormRendererRef.value.vFormRenderRef.resetForm()
    emits('refresh')
  } catch (error) {
    console.log(error)
  }
  state.loading = false
}

function handleOpen(exitList, data) {
  if (!exitList) exitList = []
  state.visible = true
  setTimeout(() => {
    FormRendererRef.value.vFormRenderRef.resetForm()
    handleOptions(exitList)
    if (!!data && data.documentType) {
      FormRendererRef.value.vFormRenderRef.setFormData({...data, isEdit: true})
      state.isEdit = true
      state.setting = data
    } else {
      state.isEdit = false
      state.setting = {}
    }
  })
}

async function handleOptions(exitList) {
  const metadataRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('documentType')
  FormRendererRef.value.vFormRenderRef.optionData.allTypeList = state.allDocTypeList
  const options = listFilter()
  metadataRef.loadOptions(options)

  function listFilter() {
    return state.allDocTypeList.reduce((prev, item) => {
      const index = exitList.findIndex(exitItem => exitItem.type === item.name)
      if (index === -1) {
        item.value = item.name
        item.label = t(item.name)
        prev.push(item)
      }
      return prev
    }, []);
  }
}

onMounted(async () => {
  state.allDocTypeList = await adminApi.api.getDocpaltypeSettingsAll().then(res => res.data)
})
defineExpose({handleOpen})
</script>
<style lang="scss" scoped>
</style>
