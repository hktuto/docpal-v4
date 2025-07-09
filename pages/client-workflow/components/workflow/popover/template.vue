<template>

  <el-dialog v-model="state.dialogVisible" :title="$t('workflow_GenerateDocument')"
             destroy-on-close append-to-body :close-on-click-modal="false" width="90%" height="90%" :align-center="true"
             @closed="reset">
    <el-select v-model="form.templatePath" clearable filterable
               @change="templateParamGet">
      <el-option v-for="(item,index) in state.templateList" :key="index" :label="item.name" :value="item.path" />
    </el-select>
    
    <div class="template_form" style="min-height: 50px" v-loading="state.variableLoading">
      <div class="preview">
        <Reader v-if="previewFile.blob" v-bind="previewFile" />
        <!-- <img v-else-if="imgBlob" :src="imgBlob" /> -->
      </div>
      <FormVariablesRenderer ref="FormVariablesRendererRef" />
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
import { clientApi } from 'api'

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
  params: {
    fileType: '',
    templatePath: '',
    name: ''
  },
  canDownload: false
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

async function getImgPreviewBlob() {
  // check if 
  const blob: any = await clientApi.api.postNuxeoDocumentPreview({ idOrPath: form.templatePath }, {
    format: 'blob',
    timeout: 0,
    headers: {
      key: 'preview'
    }
  })
  console.log({blob})
  const urlCreator = window.URL || window.webkitURL
  imgBlob.value = urlCreator.createObjectURL(blob)
}

// #region module: dialog
function handleOpen(shareInfo) {
  state.dialogVisible = true
}

async function generatePreviewFile() {
  try {

    state.loading = true
    const res = await generateFile()
    const ext = mimeTypeToExtension(res.type)

    previewFile.blob = res

  } finally {
    state.loading = false
  }
}

async function generateFile() {
  const data = await FormVariablesRendererRef.value.getData()
  if(!data) return
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
  state.canDownload = false
  state.variableLoading = true
  previewFile.blob = null
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
    const blob = await clientApi.api.postNuxeoDocumentPreview({ idOrPath: templatePath }, {
      format: 'blob',
      timeout: 0,
      headers: {
        key: 'preview'
      }
    })
    previewFile.blob = blob
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
}
// @ts-ignore
watch(form, async () => {
  if (form.templatePath) {
    await getImgPreviewBlob()
  } else {
    imgBlob.value = null
  }
}, {
  deep: true
})
defineExpose({ handleOpen })
</script>

<style scoped lang="scss">
.preview {
  width: 100%;
  max-width: 800px;
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
