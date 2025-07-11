<script lang="ts" setup>
import { Download } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { adminApi } from 'api'
import { navigateToTemplatePage } from '~/utils/documentTemplateHelper'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const { id, isEdit } = defineProps<{
  id: string
  name: string,
  isEdit: boolean,
}>()
const state = reactive<any>({
  info: {
    name: ''
  },
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
  isEdit: false,
  openWordDialog: false
})
const InteractDrawerRef = ref()
const docTemplateEditorRef = ref()
const variables = ref([])
const templateVariablesRendererRef = ref()

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
      // FormVariablesRendererRef.value.createJson(state.variables)
    })

  } catch (error) {

  }
}

const nodeBackendEndpoint = 'http://localhost:3333'

async function fetchExportBlob(endpoint: string, data: any): Promise<Blob> {
  const res = await fetch(nodeBackendEndpoint + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await res.blob()
}

async function handleTest() {
  state.downloadLoading = true

  try {
    const data = state.testVariables
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
      // TODO: call local server
      blob = await fetchExportBlob('/convert/docx', dataJson)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${state.info.name}.docx`
      document.body.appendChild(link)
      link.click()
      link.remove()
    } else {
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

  }
  state.downloadLoading = false
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
  documentOptions.value = json.json.options
  jsonData.value = json.json.content
  variables.value = json.variables
  templateVariablesRendererRef.value.setVariables(deepCopy(variables.value))
}

function createWordEdit(newData: any) {
  documentOptions.value = newData
  documentOptions.value.editable = true
  routerProvider?.updateTabName(newData.title)
  state.isEdit = true
  state.openWordDialog = false
}

function handleWordDialogClose() {
  routerProvider?.navigateTo(navigateToTemplatePage())
}

function handleEditEditor() {
  state.isEdit = true
}

// TODO test case
async function getWordJson(docId: string) {
  const url = new URL(nodeBackendEndpoint + '/convert/getJsonFile')
  url.searchParams.append('docId', docId)

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (res.status === 200) {
    return await res.blob()
  }
  return null
}

async function handleSaveWord() {
  const editDataJson = docTemplateEditorRef.value.getJsonData()
  documentOptions.value = editDataJson.json.options
  jsonData.value = editDataJson.json.content

  const newWordJson = {
    json: {
      options: documentOptions.value,
      content: jsonData.value
    },
    variables: variables.value
  }

  const fileName = state.info.name + '.json'
  const blob = await convertJsonToBlob(newWordJson, fileName)

  const formData = new FormData()
  formData.append('file', blob, fileName)
  formData.append('id', id)
  await adminApi.api.putTemplateDocumentUpload({ requestDTO: {} }, formData as any)
  state.isEdit = false
}

/**
 * 将JSON对象转换为Blob文件
 * @param jsonData - 要转换的JSON对象
 * @param fileName - 文件名（可选，默认为 'data.json'）
 * @returns Promise<Blob> - 返回包含JSON内容的Blob对象
 */
function convertJsonToBlob(jsonData: any, fileName: string = 'data.json'): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const jsonString = JSON.stringify(jsonData)
      // 创建Blob对象
      const blob = new Blob([jsonString], {
        name: fileName,
        type: 'application/json'
      })
      resolve(blob)
    } catch (error) {
      reject(error)
    }
  })
}

function updateVariables(newData: any) {
  variables.value = newData
  templateVariablesRendererRef.value.setVariables(deepCopy(variables.value))
  // TODO: 更新服務端的 Variables 數據

}

async function init() {
  await getInfo()
  await getPreviewFile()
  await getVariables()
  if (isEdit) {
    // 分流不同的文件類型，顯示不同的編輯器
    switch (state.info.fileType) {
      case 'Word':
        const blob = await getWordJson(id)
        console.log(22, state.previewFile.blob)

        // the word Json file  not created
        // if (!state.previewFile.blob) {
        if (!blob) {
          state.openWordDialog = true
          break
        }
        try {
          const text = await blob.text()
          // const text = await state.previewFile.blob.text()
          const json = JSON.parse(text)
          initWordEditor(json)
        } catch (error) {
          throw new Error('解析JSON文件失败:', error)
        }
        break
      case 'Excel':
        break
    }

    state.pageLoading = true
    return
  }

  // 新文件根據不同類型給與顯示的編輯器，並初始化編輯器
  switch (state.info.fileType) {
    case 'Word':
      state.openWordDialog = true
      break
    case 'Excel':
      break
    default:
  }

  state.pageLoading = true
}

function handleTestVariable(variables: any) {
  state.testVariables = variables
}

onBeforeMount(async () => {
  init()
})
</script>

<template>
  <div class="pageContainer--padding">
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
            <SvgIcon class="el-icon--left" src="/icons/file/file-refresh.svg" round :content="t('common_refresh')"
                     @click="handleRefresh({})" />

            <template v-if="state.info.fileType === 'Word'">
              <SvgIcon v-if="!state.isEdit" src="/icons/file/edit.svg" class="el-icon--right" round
                       :content="t('edit Word')" @click="handleEditEditor"></SvgIcon>
              <SvgIcon v-if="state.isEdit" src="/icons/file/save.svg" class="el-icon--right" round
                       :content="t('save Word')" @click="handleSaveWord">
              </SvgIcon>
            </template>

            <BrowseActionsOffice :doc="{...state.info, id: state.info.documentId}" @refresh="handleRefresh({})" />
            <TemplateReplaceButton :templateInfo="state.info" class="el-icon--right"
                                   @refresh="handleRefresh({ variables: true, preview: true })" />
          </div>
        </div>

        <el-divider />

        <div v-if="state.pageLoading">
          <template v-if="state.info.fileType === 'Word'">
            <div class="editor-container">
              <DocTemplateViewer v-if="!state.isEdit" :options="documentOptions" :json="jsonData" />
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
                                  :defaultOpened="state.openWordDialog" @submit="createWordEdit"
                                  @wordDialogClose="handleWordDialogClose" />
  </div>
</template>

<style lang="scss" scoped>
.template-container {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr min-content;
  gap: var(--app-space-xs);
  overflow: hidden;
}

.editor-container {
  height: calc(100vh - 110px);
  overflow-y: auto;
}

.reader-container {
  height: calc(100vh - 110px);
  overflow-y: auto;
  margin-top: 0;
  padding-top: 0;
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
</style>
