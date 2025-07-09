<script lang="ts" setup>
import { Download } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { adminApi } from 'api'

const { t } = useI18n()
const { id } = defineProps<{
  id: string
  name: string
}>()
const state = reactive<any>({
  info: {
    name: ''
  },
  variables: [],
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
  isEdit: false
})
const InteractDrawerRef = ref()
const docTemplateEditorRef = ref()

async function getPreviewFile() {
  state.previewFile.loading = true
  try {
    const blob = await adminApi.api.postNuxeoDocumentPreview({ idOrPath: state.info.documentId }, {
      format: 'blob',
      timeout: 0,
      headers: {
        key: 'preview'
      }
    })
    state.previewFile.blob = blob
  } catch (error) {
  }
  state.previewFile.loading = false
}

async function getInfo() {
  const { data } = await adminApi.api.getTemplateDocumentId(id)
  state.info = data
}

// #region module: Variables
const FormVariablesRendererRef = ref()

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
      FormVariablesRendererRef.value.createJson(state.variables)
    })

  } catch (error) {

  }
}

async function handleTest() {
  state.downloadLoading = true

  try {
    const data = await FormVariablesRendererRef.value.getData()
    if (!data) return
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
    const blob = await adminApi.api.postTemplateDocumentGenerateFile({
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
    downloadBlob(blob, getName())
    setTimeout(() => {
      notification.close()
    }, 3000)
  } catch (error) {

  }
  state.downloadLoading = false
}

// #endregion
function getName() {
  return state.info.name.split('.')[0]
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

function initWordEditor() {
  if (state.info.fileType === 'Word') {
    const json = JSON.parse('{"json":{"options":{"mode":"PAGE","pageSetting":{"defaultMarginConfig":{"bottom":5,"top":5,"left":5,"right":5},"defaultPageBorders":{"bottom":1,"top":1,"left":1,"right":1},"defaultPaperColour":"#fff","defaultPaperOrientation":"portrait","defaultPaperSize":"A4","useDeviceThemeForPaperColour":false,"pageAmendmentOptions":{"enableHeader":false,"enableFooter":false}},"title":"New Document","creator":"","theme":{"fontSize":12,"fontColor":"#000000","fontBackgroundColor":"#ffffff","fontFamily":"Arial","bodyFontSize":20,"h1FontSize":20,"highlightColor":"#ffff00"},"editable":true},"content":{"type":"doc","content":[{"type":"page","attrs":{"paperSize":"A4","paperColour":"#fff","paperOrientation":"portrait","pageBorders":{"top":1,"right":1,"bottom":1,"left":1}},"content":[{"type":"body","attrs":{"pageMargins":{"top":5,"bottom":5,"left":5,"right":5}},"content":[{"type":"paragraph","attrs":{"textAlign":null,"indent":0},"content":[{"type":"text","text":"ffd;oajhg"}]},{"type":"paragraph","attrs":{"textAlign":null,"indent":0},"content":[{"type":"text","text":"asgp’dfa"}]},{"type":"paragraph","attrs":{"textAlign":null,"indent":0},"content":[{"type":"text","text":"asasg"}]},{"type":"paragraph","attrs":{"textAlign":null,"indent":0},"content":[{"type":"text","text":"afgagdfghadfgaslflas"}]},{"type":"paragraph","attrs":{"textAlign":null,"indent":0},"content":[{"type":"text","text":"sad"}]},{"type":"paragraph","attrs":{"textAlign":null,"indent":0},"content":[{"type":"text","text":"fgagasfgfg"}]},{"type":"paragraph","attrs":{"textAlign":null,"indent":0},"content":[{"type":"text","text":"sadfgasd"}]}]}]}]}},"variables":[]}')
    // documentOptions.value.title = state.info.name
    // TODO: service response
    documentOptions.value = json.json.options
    jsonData.value = json.json.content
    state.pageLoading = true
  }
}

function handleEditEditor() {
  state.isEdit = true
}

function handleSaveWord() {
  const { json, variables } = docTemplateEditorRef.value.getJsonData()

  console.log(1, variables)

  // 更新本地數據
  documentOptions.value = json.options
  jsonData.value = json.content
  // TODO： 因爲更新variables數據時，保存在外部的頁面上，需要另外處理
  state.variables = variables
  console.log(2, variables)

  // TODO: 組裝成完整的Json， 發送請求更新數據



  state.isEdit = false
}

onBeforeMount(async () => {
  await getVariables()
  await getInfo()
  await getPreviewFile()
  initWordEditor()
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
                     round :content="$t('tip.editTemplateInfo')"
                     @click="handleEdit"></SvgIcon>
          </div>
          <div class="flex-x-between">
            <SvgIcon class="el-icon--left" src="/icons/file/file-refresh.svg" round :content="$t('common_refresh')"
                     @click="handleRefresh()" />

            <!-- <template v-if="state.info.fileType === 'Word'">
              <SvgIcon v-if="!state.isEdit" src="/icons/file/edit.svg" class="el-icon--right" round
                       :content="$t('editTemplateData')" @click="handleEditEditor"></SvgIcon>
              <SvgIcon v-if="state.isEdit" src="/icons/file/edit.svg" class="el-icon--right" round
                       :content="t('saveWord')" @click="handleSaveWord">
              </SvgIcon>
            </template> -->

            <BrowseActionsOffice :doc="{...state.info, id: state.info.documentId}" @refresh="handleRefresh()" />
            <TemplateReplaceButton :templateInfo="state.info" class="el-icon--right"
                                   @refresh="handleRefresh({ variables: true, preview: true })" />
          </div>
        </div>
        <div class="editor-container">
          <el-divider />
          <Reader ref="ReaderRef" v-bind="state.previewFile"></Reader>
        </div>
        <!-- <div v-if="state.pageLoading">
          <template v-if="state.info.fileType === 'Word'">
            <div class="editor-container">
              <DocTemplateViewer v-if="!state.isEdit" :options="documentOptions" :json="jsonData" />
              <DocTemplateEditor ref="docTemplateEditorRef" v-if="state.isEdit" :editorOptions="documentOptions"
                                 :json="jsonData" :user="{}" :variables="state.variables" />
            </div>
          </template>
          <template v-else>
            <Reader ref="ReaderRef" v-bind="state.previewFile"></Reader>
          </template> 
        </div>-->
      </div>
      <InteractDrawer ref="InteractDrawerRef" class="template-interact-drawer" :min-width="200" :defaultOpen="true"
                      :showClose="false">
        <div class="template-title">{{ $t('template.variable') }}</div>
        <FormVariablesRenderer ref="FormVariablesRendererRef" />
        <el-button id="DocumentTemplate__PreviewDocument__TestTemplateDownload" :loading="state.downloadLoading"
                   @click="handleTest">{{ $t('template.test') }}
        </el-button>
      </InteractDrawer>
    </div>
    <TemplateAddStep1Dialog ref="TemplateAddStep1DialogRef" @update="getInfo()"></TemplateAddStep1Dialog>
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
  height: calc(100vh - 110px);;
  overflow-y: auto;
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
    overflow: auto;
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
