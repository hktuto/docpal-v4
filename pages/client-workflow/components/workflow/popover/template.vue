<template>
  <el-dialog v-model="state.dialogVisible" :title="$t('workflow_GenerateDocument')" :fullscreen="state.fullscreen"
             destroy-on-close append-to-body :close-on-click-modal="false" width="90%" height="90%" :align-center="true"
             @closed="reset">
    <el-select v-model="form.templatePath" clearable filterable
               @change="templateParamGet">
      <el-option v-for="(item,index) in state.templateList" :key="index" :label="item.name" :value="item.path" />
    </el-select>

    <div class="template_form" style="min-height: 50px; height: 100%" v-loading="state.variableLoading">
      <div class="preview">
        <DocTemplateViewer ref="wordTemplateViewerRef" v-if="state.fileType=== 'json' && state.showViewer"
                           :options="state.documentOptions" :json="state.jsonData" />
        <Reader style="margin-top: 28px; max-height: 100vh" v-if="previewFile.blob" v-bind="previewFile" />
      </div>
      <div style="margin-top: 28px; max-width: 820px; overflow-y: auto">
        <DocTemplateVariablesRenderer ref="templateVariablesRendererRef" v-if="state.fileType==='json'"
                                      @update="handleTestVariable" />
        <FormVariablesRenderer v-else ref="FormVariablesRendererRef" />
      </div>
    </div>
    <template #footer>
      <el-button id="Workflow__PersonalWorkflow__Cancel" @click="state.dialogVisible = false">
        {{ $t('dpButtom_cancel') }}
      </el-button>
      <el-button id="Workflow__PersonalWorkflow__Download" type="primary" v-if="state.canDownload"
                 :loading="state.loading" @click="generatePreviewFile">
        {{ $t('common_preview') }}
      </el-button>
      <el-button id="Workflow__PersonalWorkflow__Download" type="primary" v-if="state.canDownload"
                 :loading="state.loading" @click="handleSubmit">
        {{ $t('common_download') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { adminApi, clientApi } from 'api'
import { replaceVariables } from 'docpal-document-editor/src/utils'

const routerProvider = inject(MenuRouterKey)
// @ts-ignore
const { t } = useI18n()
// @ts-ignore
const state = reactive({
  dialogVisible: false,
  loading: false,
  variableLoading: false,
  templateList: [],
  canSubmit: false,
  fileType: '',
  canDownload: false,
  showViewer: false,
  documentOptions: [],
  jsonData: {},
  variables: [],
  fullscreen: false
})
// @ts-ignore
const form = reactive({
  templatePath: '',
  paramList: []
})
// @ts-ignore
const imgBlob = ref()
const previewFile = reactive<{
  name: string,
  blob: Blob | null
}>({
  name: '',
  blob: null
})
const wordTemplateViewerRef = ref()
const templateVariablesRendererRef = ref()

function handleFullscreen() {
  state.fullscreen = !state.fullscreen
}

function handleOpen() {
  state.dialogVisible = true
}

function handleTestVariable(variables: any) {
  state.variables = variables
}

async function generatePreviewFile() {
  try {
    state.loading = true
    state.showViewer = false
    if (state.fileType === 'json') {
      state.jsonData.content = replaceVariables(state.jsonData.content, state.variables)
      wordTemplateViewerRef.value.initEditor(state.documentOptions, state.jsonData)
      state.showViewer = true
      return
    }

    const res = await generateFile()
    const ext = mimeTypeToExtension(res.type)
    previewFile.blob = res
  } finally {
    state.loading = false
  }
}

async function generateFile() {
  const data = await FormVariablesRendererRef.value.getData()
  const res: any = await clientApi.api.postNuxeoTemplateSummitanddownloadfile({
    templatePath: form.templatePath,
    paramsMap: data
  }, {
    format: 'blob'
  })
  return res
}

// #endregion
async function handleSubmit() {
  state.loading = true
  try {
    const res = await generateFile()
    if (!res || res.errorCode) throw new Error(`${t('responseMsg_errorCode_2')}`)
    // get document name from state.templateList
    const name = state.templateList.find(item => item.path === form.templatePath)?.name

    // @ts-ignore
    downloadBlob(res, name)
    state.dialogVisible = false
  } catch (error) {
  }
  state.loading = false
}

// @ts-ignore
const FormVariablesRendererRef = ref()

async function templateParamGet(templatePath: string) {
  state.fileType = state.templateList.find((item: any) => item.path === templatePath).fileSuffix
  state.canDownload = false
  state.variableLoading = true
  previewFile.blob = null

  // word
  if (state.fileType === 'json') {
    const dataJson = await adminApi.api.postNuxeoDocumentPreview({ idOrPath: form.templatePath })
    state.jsonData = dataJson.json.content
    state.documentOptions = dataJson.json.options
    state.variables = dataJson.variables
    templateVariablesRendererRef.value.setVariables(deepCopy(state.variables))
    state.showViewer = true
    state.canDownload = true
    state.variableLoading = false
    return
  }

  // excel and ppt
  try {
    const res: any = await clientApi.api.postNuxeoTemplateGettemplateparams({
      templatePath
    }).then(res => res.data)
    form.paramList = [...new Set(res.paramsList)].map(item => ({
      name: item,
      type: 'input',
      required: true
    }))
    // get preview file
    previewFile.blob = await clientApi.api.postNuxeoDocumentPreview(
      { idOrPath: templatePath },
      {
        format: 'blob',
        timeout: 0,
        headers: {
          key: 'preview'
        }
      }
    )
    FormVariablesRendererRef.value.createJson(form.paramList)
    state.canDownload = true
  } catch (error) {
    // routerProvider?.message.error(error?.response?.data?.message || error.message)
  }
  state.variableLoading = false
}

// @ts-ignore
onMounted(async () => {
  state.templateList = await clientApi.api.postNuxeoTemplateGettemplatelist().then(res => res.data) || []
})

const reset = () => {
  previewFile.blob = null
  form.templatePath = ''
  form.paramList = []
  state.fileType = ''
  state.showViewer = false
}

defineExpose({ handleOpen })
</script>

<style scoped lang="scss">
.preview {
  width: 100%;
  max-width: 1000px;
  height: 100%;
  overflow-y: hidden;
}

.template_form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--app-space-xs) * 2);

  img {
    width: 100%;
    border: 1px solid #eee;
  }
}
</style>
