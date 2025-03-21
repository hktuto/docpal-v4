<template>
  <el-dialog v-model="state.visible"
             :title="state.isEdit ? $t('docTypeDetail_editDisplayMeta') : $t('docTypeDetail_addDisplayMeta')"
             :close-on-click-modal="false"
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" @metaChange="handleMetaChange">
      <template v-slot:languageForm>
        <LanguageUnitForm ref="LanguageUnitFormRef" class="mg-b" :lKey="state.lKey"/>
      </template>
      <!-- <template v-slot:regexDialog>
      </template> -->
    </FormRenderer>
    <template #footer>
      <!-- <FromRegexButton /> -->
      <el-button id="DocumentType__DisplayMeta__AddNewDisplayMeta__Submit" :loading="state.loading"
                 @click="handleSubmit()">
        {{ $t('common_submit') }}
      </el-button>
      <el-button id="DocumentType__DisplayMeta__AddNewDisplayMeta__SubmitAndAddMore" v-show="!state.isEdit"
                 type="primary" :loading="state.loading" @click="handleSubmit(true)">
        {{ $t('common_addMore') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import formJson from './addDisplayMeta.vform.json'
import {adminApi} from '../../../../../libraries/api/src';
import {ElMessage} from "element-plus";

const props = defineProps<{
  docTypeDetail: any,
}>()
const {t} = useI18n()
const emits = defineEmits([
  'refresh'
])
const state = reactive({
  loading: false,
  visible: false,
  isEdit: false,
  lKey: '',
  setting: {}
})
const FormRendererRef = ref()

async function handleSubmit(addMore: boolean = false) {
  const formData = await FormRendererRef.value.vFormRenderRef.getFormData()
  state.loading = true
  const param: any = {
    metaData: formData.metadata,
    isRequire: formData.isRequire,
    display: formData.display,
    dataType: formData.dataType,
    options: getFormOptions(formData),
    docType: props.docTypeDetail.name,
  }
  try {
    if (state.isEdit) {
      param.id = state.setting.id
    }
    await adminApi.api.postDocpaltypeSettingsAddMetadata(param)

    if (state.isEdit) {
      ElMessage.success(t('documentType_duplicateUpdateSuccessMsg'))
    } else {
      ElMessage.success(t('documentType_duplicateAddSuccessMsg'))
    }
    state.visible = false
    FormRendererRef.value.vFormRenderRef.resetForm()
    emits('refresh', addMore)
  } catch (error) {

  } finally {
    state.loading = false
    await saveI18n()
  }

  function getFormOptions(formOptions) {
    const result: any = {}
    switch (formOptions.dataType) {
      case 'input':
      case 'textarea':
        result.length = formOptions.length
        result.regex = formOptions.regex
        break;
      case 'date':
        result.formatDate = formOptions.formatDate
        break;
      case 'select':
        result.multipleLimit = formOptions.length
        result.dropdownType = formOptions.dropdownType
        result.multiple = formOptions.multiple
        if (formOptions.dropdownType === 'vocabulary') {
          result.vocabulary = formOptions.vocabulary
        } else if (formOptions.dropdownType === 'masterTable') {
          result.masterTable = formOptions.masterTable
          result.masterTableColumn = formOptions.masterTableColumn
        } else if (formOptions.dropdownType === 'documentType') {
          result.documentType = formOptions.documentType
          result.displayField = formOptions.displayField
        }
        break;
      default:
        break;
    }
    return JSON.stringify(result)
  }
}

function handleOpen(exitList: any[], data: any) {
  state.visible = true
  setTimeout(() => {
    FormRendererRef.value.vFormRenderRef.resetForm()
    handleOptions(exitList)
    if (!!data) {
      const pData = data.options ? JSON.parse(data.options) : {}
      FormRendererRef.value.vFormRenderRef.setFormData({...data, ...pData})
      state.isEdit = true
      state.setting = data
    } else {
      state.isEdit = false
      state.setting = {}
    }
    state.loading = false
    setReady()
  })

  function setReady() {
    setTimeout(() => {
      const readyRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('ready')
      readyRef.setValue(true)
    }, 1000)
  }
}

const ignoreList = ['dc:title', 'dc:creator', 'dc:modified', 'dc:lastContributor', 'dc:created', 'dc:publisher', 'dc:contributors', 'common:icon', 'common:icon-expanded', 'uid:uid', 'uid:major_version', 'uid:minor_version', 'file:content', 'files:files', 'nxtag:tags', 'relatedtext:relatedtextresources', 'sec:clearanceLevel', 'sec:securityKeyword']

// 过滤获取可选meta
async function handleOptions(exitList: any[]) {
  const metaDataRef = FormRendererRef.value.vFormRenderRef.getWidgetRef('metadata')
  const globalSchemaList: any = await adminApi.api.getDocpaltypeSettingsMetadataDocumenttype('GlobalFile').then(res => res.data.keywords)
  const options = listFilter()
  metaDataRef.loadOptions(options)

  function listFilter() {
    return globalSchemaList.reduce((prev, item) => {
      let index = -1
      if (!!exitList) index = exitList.findIndex(exitItem => exitItem.metadata === item.name)
      if (item.type !== 'complex' && !ignoreList.includes(item.name)) {
        item.dataType = item.value
        item.length = item.value === 'text' ? 4000 : 200
        item.value = item.name
        item.label = $i18n.t(item.name)
        if (index === -1) item.disabled = false
        else item.disabled = true
        prev.push(item)
      }
      return prev
    }, []);
  }
}

// #region module: i18n
const LanguageUnitFormRef = ref()

function handleMetaChange(lKey) {
  state.lKey = lKey
}

async function saveI18n() {
  await LanguageUnitFormRef.value.handleSubmit()
}

// #endregion

defineExpose({handleOpen})
</script>
<style lang="scss" scoped>
.mg-b {
  margin-bottom: var(--app-space-xs);
}
</style>
