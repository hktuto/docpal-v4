<script lang="ts" setup>
import { Download } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { adminApi, templateApi } from 'api'
import InitWordEditCheckingDialog from '~/components/template/initWordEditCheckingDialog.vue'
import { variablesSchema } from 'docpal-document-editor/src/client'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const { id, isEdit } = defineProps<{
  id: string
  name: string,
  isEdit: boolean,
}>()
const state = reactive<any>({
  info: {
    name: '',
    fileType: ''
  },
  oldVariables: [],
  variables: [],
  testVariables: [],
  previewFile: {
    blob: null,
    name: '',
    id: '',
    loading: false,
    options: {
      noDownload: true,
      print: false,
      loadAnnotations: false,
      readOnly: true
    }
  },
  downloadLoading: false,
  pageLoading: false,
  saveLoading: false,
  isEdit: false,
  openWordDialog: false
})
const InteractDrawerRef = ref()
const docTemplateEditorRef = ref()
const variables = ref([])
const templateVariablesRendererRef = ref()
const wordEditCheckingDialogRef = ref()
const templateViewerRef = ref()

async function getInfo() {
  const { data } = await adminApi.api.getTemplateDocumentId(id)
  state.info = data
}

async function getPreviewFile() {
  state.previewFile.loading = true
  try {
    state.previewFile.blob = await adminApi.api.postNuxeoDocumentPreview({ idOrPath: state.info.documentId }, {
      format: 'blob',
      timeout: 0,
      headers: {
        key: 'preview'
      }
    })
  } catch (error) {
    console.log(error)
  }
  state.previewFile.loading = false
}

async function getVariables() {
  try {
    // const date = new Date().valueOf()
    const { data: res } = await adminApi.api.getTemplateDocumentRefreshId(id) as any
    if (!res.templateVariable) return
    const templateVariable = [...new Set(JSON.parse(res.templateVariable))]
    state.variables = []
    templateVariable.forEach((item, index) => {
      // check item may be an stringify json
      try {
        const data = JSON.parse(item)
        const firstKey = Object.keys(data)[0]
        state.variables.push({
          name: firstKey,
          type: 'json-editor',
          required: false
        })
      } catch (err) {
        state.variables.push({
          name: item,
          type: 'input',
          required: true
        })
      }
    })
    nextTick(() => {
      templateVariablesRendererRef.value.setVariables(deepCopy(state.variables))
    })

  } catch (error) {

  }
}

async function handleTest() {
  state.downloadLoading = true

  try {
    const id = new Date().valueOf() + state.info.name
    const notification = ElNotification({
      title: '',
      icon: Download,
      dangerouslyUseHTMLString: true,
      message: `<span id="${id}">0%</span> <span title="${state.info.name}">${state.info.name}</span>`,
      showClose: false,
      customClass: 'download-notification',
      duration: 0,
      position: 'bottom-right'
    })
    let blob
    if (state.info.fileType === 'Word') {
      const dataJson = {
        json: {
          options: documentOptions.value,
          content: jsonData.value
        },
        variables: state.testVariables
      }
      blob = await templateApi.convert.postConvertDocx(dataJson, { format: 'blob' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${state.info.name}.docx`
      document.body.appendChild(link)
      link.click()
      link.remove()
    } else {
      const data = await templateVariablesRendererRef.value.getData(state.fileType)
      if (!data) return
      blob = await adminApi.api.postTemplateDocumentGenerateFile({
        id: state.info.id,
        variables: data
      }, {
        format: 'blob',
        timeout: 0,
        onDownloadProgress: (e: any) => {
          const el = document.getElementById(id)
          if (el) el.innerHTML = Math.round((e.loaded / e.total) * 100) + '%'
        }
      })
      downloadBlob(blob, state.info.name)
    }

    setTimeout(() => {
      notification.close()
    }, 3000)
  } catch (error) {
    throw new Error(error)
  } finally {
    state.downloadLoading = false
  }
}

const TemplateAddStep1DialogRef = ref()

function handleEdit() {
  TemplateAddStep1DialogRef.value.handleOpen({ ...state.info, isEdit: true })
}

function handleRefresh(state: any) {
  if (!state || state.info) getInfo()
  if (!state || state.variables) getVariables()
  if (!state || state.preview) getPreviewFile()
}

const documentOptions = ref({})
const jsonData = ref({})

function initWordEditor(json: any) {
  if (!json) {
    state.openWordDialog = true
    return
  }
  documentOptions.value = json.json.options
  jsonData.value = json.json.content
  variables.value = json.variables
  state.oldVariables = JSON.parse(JSON.stringify(json.variables))
  templateVariablesRendererRef.value.setVariables(deepCopy(variables.value))
}

function createWordEdit(newData: any) {
  documentOptions.value = newData
  documentOptions.value.editable = true
  routerProvider?.updateTabName(newData.title)
  state.isEdit = true
  state.openWordDialog = false
}

function handleEditEditor() {
  state.isEdit = true
}

async function handleSaveWord() {
  state.saveLoading = true
  const editDataJson = docTemplateEditorRef.value.getJsonData()
  documentOptions.value = editDataJson.json.options
  jsonData.value = editDataJson.json.content
  editDataJson.variables = variables.value

  try {
    const fileName = state.info.name + '.json'
    const blob = await convertJsonToBlob(editDataJson, fileName)
    const file = new File([blob], fileName, { type: 'application/json' })

    const form = new FormData()
    form.append('file', file)
    form.append('fileName', fileName)
    form.append('id', id)
    await adminApi.api.putTemplateDocumentUpload({ requestDTO: {} }, form)

    const schema = variablesSchema(variables.value)
    await adminApi.api.patchTemplateDocumentUpdatetemplatevariable({ id: id, templateVariable: JSON.stringify(schema) })
    state.oldVariables = JSON.parse(JSON.stringify(variables.value))
    routerProvider?.message.success(t('tip_updateSuccessMsg', { modelName: null, name: state.info.name }))
  } catch (e) {
    routerProvider?.message.error('Save Document template Error')
  } finally {
    state.saveLoading = false
  }
}

async function handleSaveWordAndClose() {
  await handleSaveWord()
  state.isEdit = false
}

function handleCloseWordEditor() {
  updateVariables(deepCopy(state.oldVariables))
  state.isEdit = false
}

async function convertJsonToBlob(jsonData: any): Promise<Blob> {
  if (!jsonData) {
    throw new Error('JSON data cannot be empty')
  }
  try {
    const jsonString = JSON.stringify(jsonData)
    return new Blob([jsonString], { type: 'application/json; charset=utf-8' })
  } catch (error) {
    console.error('Converting JSON to Blob failed:', error)
  }
}

async function updateVariables(newData: any) {
  variables.value = newData
  templateVariablesRendererRef.value.setVariables(deepCopy(variables.value))
}

async function getWordJsonFile() {
  const blob = await adminApi.api.postNuxeoDocumentPreview({ idOrPath: state.info.documentId }, {
    format: 'blob'
  })

  // check dataJson is json or old docx
  try {
    const isJson = await blob.text()
    if (isJson === '' && isJson.length === 0) {
      state.openWordDialog = true
      return
    }
    const dataJson = JSON.parse(isJson)
    initWordEditor(dataJson)
  } catch (e) {
    console.log(e)
    wordEditCheckingDialogRef.value.openDialog(blob, state.info.name)
  }
}

function updateEditorData(json: any) {
  if (json === '') {
    initWordEditor(json)
    return
  }

  documentOptions.value = json.json.options
  jsonData.value = json.json.content
  templateViewerRef.value.initEditor(documentOptions.value, jsonData.value)
}

async function init() {
  await getInfo()
  if (isEdit) {
    // 分流不同的文件類型，顯示不同的編輯器
    switch (state.info.fileType) {
      case 'Word':
        await getWordJsonFile()
        break
      case 'Excel':
        await getVariables()
        await getPreviewFile()
        break
      case 'PPT':
        await getVariables()
        await getPreviewFile()
        break
      default:
        break
    }

    state.pageLoading = true
    return
  }

  switch (state.info.fileType) {
    case 'Word':
      state.openWordDialog = true
      break
    case 'Excel' || 'PPT':
      break
    default:
  }

  state.pageLoading = true
}

function handleTestVariable(variables: any) {
  state.testVariables = variables
}

// 优化后的变量处理函数
function processVariablesToObject(variableList: any[]) {
  return variableList
    .filter((item: any) => item.value) // 过滤掉空值
    .reduce((acc: Record<string, string>, item: any) => {
      acc[item.id] = `\${variables:get(${item.value})}`
      return acc
    }, {})
}

// 使用示例：
// const all = processVariablesToObject(variableList.value)

onBeforeMount(async () => {
  init()
})
</script>

<template>
  <div class="template-container">
    <div class="template-left-container">
      <div class="flex-x-between">
        <div class="flex-x-between">
          <span class="template-title"> {{ state.info.name }} </span>
          <SvgIcon src="/icons/file/edit.svg" class="el-icon--right"
                   round :content="t('tip.editTemplateInfo')"
                   @click="handleEdit"></SvgIcon>
        </div>
        <div class="flex-x-between">
          <SvgIcon v-if="state.info.fileType !== 'Word'" class="el-icon--left" src="/icons/file/file-refresh.svg"
                   round :content="t('common_refresh')"
                   @click="handleRefresh({})" />

          <template v-if="state.info.fileType === 'Word'">
            <SvgIcon v-if="!state.isEdit" src="/icons/file/edit.svg" class="el-icon--right" round
                     :content="t('Edit Word')" @click="handleEditEditor"></SvgIcon>

            <div v-if="state.isEdit" class="save-or-exit-icon-container">
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="t('button.save')"
                placement="bottom"
              >
                <Icon style="width:1.2em; height:1.2em;" name="lucide:save" @click="handleSaveWord" />
              </el-tooltip>
            </div>
            <div v-if="state.isEdit" class="save-or-exit-icon-container">
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="t('button.saveAndClose')"
                placement="bottom"
              >
                <Icon style="width:1.2em; height:1.2em;" name="lucide:save-all" @click="handleSaveWordAndClose" />
              </el-tooltip>
            </div>
            <div v-if="state.isEdit" class="save-or-exit-icon-container">
              <el-popconfirm
                class="box-item"
                :title="t('button.saveOff')"
                placement="top"
                @confirm="handleCloseWordEditor"
              >
                <template #reference>
                  <SvgIcon style="width: 18px; "
                           src="https://api.iconify.design/lucide:save-off.svg?color=%23333333"
                           :content="t('button.saveOff')"></SvgIcon>
                </template>
              </el-popconfirm>
            </div>
          </template>

          <BrowseActionsOffice v-if="state.info.fileType !== 'Word'" :doc="{...state.info, id: state.info.documentId}"
                               @refresh="handleRefresh({})" />
          <TemplateReplaceButton v-if="state.info.fileType !== 'Word'" :templateInfo="state.info"
                                 class="el-icon--right"
                                 @refresh="handleRefresh({ variables: true, preview: true })" />
        </div>
      </div>

      <el-divider />

      <div v-if="state.pageLoading">
        <template v-if="state.info.fileType === 'Word'">
          <div class="doc-template-viewer-container" v-loading="state.saveLoading">
            <DocTemplateViewer ref="templateViewerRef" v-if="!state.isEdit" :options="documentOptions"
                               :json="jsonData" />
            <DocTemplateEditor ref="docTemplateEditorRef" v-if="state.isEdit" :editorOptions="documentOptions"
                               :json="jsonData" :user="{}" :variables="variables"
                               @update:variables="updateVariables($event)" />
          </div>
        </template>
        <template v-else>
          <Reader class="reader-container" ref="ReaderRef" v-bind="state.previewFile"></Reader>
        </template>
      </div>
    </div>
    <InteractDrawer ref="InteractDrawerRef" class="template-interact-drawer" :min-width="200" :defaultOpen="true"
                    :showClose="false">
      <div class="template-title">{{ t('template.variable') }}</div>
      <DocTemplateVariablesRenderer ref="templateVariablesRendererRef" @update="handleTestVariable" />

      <el-button class="template-test-button" id="DocumentTemplate__PreviewDocument__TestTemplateDownload"
                 :loading="state.downloadLoading" @click="handleTest">{{ t('template.test') }}
      </el-button>
    </InteractDrawer>
  </div>
  <TemplateAddStep1Dialog ref="TemplateAddStep1DialogRef" @update="getInfo()"></TemplateAddStep1Dialog>

  <DocTemplateNewDocumentDialog ref="wordEditDialog" v-model="state.openWordDialog" :title="state.info.name"
                                :defaultOpened="state.openWordDialog" @submit="createWordEdit" />

  <InitWordEditCheckingDialog ref="wordEditCheckingDialogRef" @convertJson="updateEditorData" />
</template>

<style lang="scss" scoped>
.template-container {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr min-content;
  gap: var(--app-space-xs);
  overflow: hidden;
}

.reader-container {
  height: calc(100vh - 110px);
  overflow-y: auto;
  margin-top: 0;
  padding-top: 0;
}

.doc-template-viewer-container {
  height: calc(100vh - 110px);
  overflow: hidden;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  // 确保 DocTemplateViewer 能够正确显示和滚动
  :deep(.editorContainer) {
    height: 100%;
    min-height: 0;
  }

  :deep(.editorBody) {
    height: 100% !important;
    min-height: 0;
    overflow: auto;
  }
}

.template-test-button {
  margin-bottom: 15px;
}

.template-left-container {
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-xs);
}

.template-interact-drawer {
  height: 100%;
  overflow: hidden;
  box-shadow: unset;
  border-left: 1px solid #ddd;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: var(--app-space-xs);
  padding-bottom: 0;

  .formContainer {
    overflow-y: auto;
  }
}

.template-title {
  font-size: 18px;
  font-weight: bold;
  line-height: 22px;
  letter-spacing: 0px;
  color: #606266;
}

.save-or-exit-icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #f0f3f4;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 2px;
  margin-right: 2px;

  &:hover {
    background-color: #f0f3f4;
    color: #848687;
  }

  .icon {
    width: 20px;
    height: 20px;
    color: white;
  }
}
</style>
