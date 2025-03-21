<template>
  <el-dialog v-model="state.visible" :title="$t('folderCabinet.newItem')"
             class="scroll-dialog"
             append-to-body
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" v-loading="state.initLoading"
                  @formChange="formChange">
      <template v-slot:metaForm>
        <MetaRenderForm ref="MetaFormRef" @formChange="formChange"></MetaRenderForm>
      </template>
      <template v-slot:namingRule>
        <div>{{ $t('tableHeader_labelRule') }}：
          <template v-for="(item, index) in getLabelList()" :key="index">
            <el-tag>{{ $t(item.metadata || item.metaData) }}</el-tag>
            <template v-if="index !== getLabelList().length - 1"> -</template>
          </template>
        </div>
      </template>
      <template v-slot:previewName>
        <div>{{ $t('folderCabinet.previewName') }}： {{ state.previewName }}</div>
      </template>
    </FormRenderer>
    <template #footer>
      <el-button clientFolderCabinetAllowOtherFilesCabinetNewItemNext
                 id="FolderCabinet__AllowOtherFilesCabinet__NewItem__Next" type="primary" :loading="state.loading"
                 data-testid="folderCabinet-next-button" @click="handleSubmit">
        {{ $t('button.next') }}
      </el-button>
    </template>
  </el-dialog>
  <FolderCabinetCreateNextDialog ref="NextDialogRef" @refresh="(loading: boolean)=>emits('refresh', loading)"/>
</template>
<script lang="ts" setup>
import {ElMessage, ElMessageBox} from 'element-plus'
import formJson from './dialog.vform.json'
import {clientApi} from 'api';

const emits = defineEmits([
  'refresh'
])
const {t} = useI18n()
const state = reactive<any>({
  initLoading: false,
  loading: false,
  visible: false,
  cabinetTemplate: {},
  previewName: ''
})
const userId: string = useUserId().value
const NextDialogRef = ref()
const FormRendererRef = ref()
// #region module: handleSubmit
const MetaFormRef = ref()

async function handleSubmit() {
  // 获取 v-form 数据
  const formData = await FormRendererRef.value.vFormRenderRef.getFormData()
  const arr = ['notificationReminder', 'emailReminder', 'emailReport']
  arr.forEach(key => {
    formData[key] = {}
    formData[key].intervalTime = formData[`${key}.intervalTime`]
    if (formData[`${key}.tos`]) formData[key].tos = formData[`${key}.tos`]
    if (formData[`${key}.ccs`]) formData[key].ccs = formData[`${key}.ccs`]
    delete formData[`${key}.intervalTime`]
    delete formData[`${key}.tos`]
    delete formData[`${key}.ccs`]
  })
  // 获取 metaForm 数据
  const metaFormData = await MetaFormRef.value.getData()

  if (!formData) return
  state.loading = true
  try {
    let fileName = await getMetaName()
    const _fileName = await getUniqueName({goPath: state.cabinetTemplate.documentPath, fileName})
    if (fileName !== _fileName) {
      const check = await ElMessageBox.confirm(`${t('dpTip_duplicateFileNameNext')}`).catch((action) => {
        return action
      })
      if (check !== 'confirm') {
        state.loading = false
        return
      } else {
        fileName = _fileName
      }
    }
    const idOrPath = `${state.cabinetTemplate.documentPath}/${fileName}`
    // 上传最上层数据
    const res = await clientApi.api.postCabinetCreate({
      ...formData,
      title: fileName,
      type: state.cabinetTemplate.documentType,
      idOrPath,
      properties: metaFormData,
      templateId: state.cabinetTemplate.id
    }).then(res => res.data)
    if (res?.path) {
      NextDialogRef.value.handleOpen(state.cabinetTemplate, res.path)
    }
    await new Promise(resolve => setTimeout(() => {
      state.visible = false
      emits('refresh')
      resolve
    }, 1000));
  } catch (error) {

  }
  state.loading = false
}

async function getMetaName() {
  const date = new Date()
  let formData: any = {};
  try {
    const data = await FormRendererRef.value.vFormRenderRef.getFormData()
    const metadataForm = await MetaFormRef.value.getData()
    if (data) formData = {...formData, ...data, ...metadataForm}
  } catch (error) {
  }
  const labelRule = state.cabinetTemplate.labelRule ? JSON.parse(state.cabinetTemplate.labelRule) : []

  if (!labelRule || labelRule.length === 0) throw new Error("no labelRule");
  else {
    const name = labelRule.reduce((prev: any, rule: any, index: number) => {
      if (!rule.metadata) rule.metadata = rule.metaData
      const joiner = index === 0 ? '' : '-'
      if (rule.metadata === 'fc:createDate') {
        prev += joiner + formatDate(date, 'YYYY-MM-DD')
      } else if (rule.metadata === 'fc:label') {
        prev += joiner + state.cabinetTemplate.label
      } else if (rule.metadata === 'fc:creator') {
        prev += joiner + userId
      } else if (rule.metadata === 'fc:docTitle') {
        prev += formData.title ? joiner + formData.title : ''
      } else if (rule.dataType === 'date') {
        prev += formData[rule.metadata] ? joiner + formatDate(formData[rule.metadata], 'YYYY-MM-DD') : ''
      } else {
        prev += formData[rule.metadata] ? joiner + formData[rule.metadata] : ''
      }
      return prev
    }, '')
    return name
  }
  // return state.cabinetTemplate.label + '-' + formatDate(date,'YYYY-MM-DD')
}

function getLabelList() {
  const labelRule = state.cabinetTemplate.labelRule ? JSON.parse(state.cabinetTemplate.labelRule) : []
  return labelRule
}

// #endregion

// #region module: init
async function handleOpen(id: string) {
  state.initLoading = true
  state.loading = false
  state.visible = true
  try {
    let defaultValue = {}
    state.cabinetTemplate = await clientApi.api.getCabinetTemplateId(id).then(res => res.data)
    if (state.cabinetTemplate.metadataValue) {
      defaultValue = JSON.parse(state.cabinetTemplate.metadataValue)
    }
    setTimeout(async () => {
      await MetaFormRef.value.init(state.cabinetTemplate.documentType, defaultValue)
      await FormRendererRef.value.vFormRenderRef.resetForm()
      MetaFormRef.value.setData(defaultValue)
      FormRendererRef.value.vFormRenderRef.setFormData({...getReminder(state.cabinetTemplate, ['notificationReminder', 'emailReminder', 'emailReport'])})
      setTitleRequired()
      setTimeout(async () => {
        state.previewName = await getMetaName()
        state.initLoading = false
      }, 10)
    }, 10)
  } catch (error) {
    ElMessage.error(t('dpMsg_error'))
    // state.visible = false
  }

  function getReminder(data: any, revertList: any) {
    return revertList.reduce((prev: any, item: any) => {
      if (!data[item]) data[item] = {}
      if (!data[item].tos) data[item].tos = []
      if (!data[item].ccs) data[item].ccs = []
      const toCreateByIndex = data[item].tos.findIndex((item: any) => item === 'createBy')
      if (toCreateByIndex !== -1) data[item].tos[toCreateByIndex] = userId
      const ccCreateByIndex = data[item].ccs.findIndex((item: any) => item === 'createBy')
      if (ccCreateByIndex !== -1) data[item].ccs[ccCreateByIndex] = userId
      prev[`${item}.intervalTime`] = data[item].intervalTime
      prev[`${item}.tos`] = data[item].tos
      prev[`${item}.ccs`] = data[item].ccs
      return prev
    }, {})
  }

  function setTitleRequired() {
    const labelRule = state.cabinetTemplate.labelRule ? JSON.parse(state.cabinetTemplate.labelRule) : []
    const titleIndex = labelRule.findIndex((item: any) => item.metaData === 'fc:docTitle')
    const titleWidget = FormRendererRef.value.vFormRenderRef.getWidgetRef('title')
    titleWidget.setRequired(titleIndex !== -1)
  }
}

// #endregion
// #region module: form change
async function formChange({fieldName, formModel, newValue, oldValue}: any) {
  if (state.initLoading) return
  state.previewName = await getMetaName()
}

// #endregion
defineExpose({handleOpen})
</script>
<style lang="scss" scoped>
main {
  display: grid;
  gap: var(--app-space-xs);
}

.row-item {
  &-top {
    padding: var(--app-space-xs) 0;
  }
}

:deep(.static-content-item) {
  margin-bottom: 10px;
}

</style>
