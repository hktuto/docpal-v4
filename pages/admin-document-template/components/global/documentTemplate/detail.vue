<script lang="ts" setup>
import {Download} from '@element-plus/icons-vue';
import {ElNotification} from 'element-plus'
import {adminApi} from 'api'

const {id} = defineProps<{
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
  downloadLoading: false
})
const InteractDrawerRef = ref()

async function getPreviewFile() {
  state.previewFile.loading = true
  try {
    const blob = await adminApi.api.postNuxeoDocumentPreview({idOrPath: state.info.documentId}, {
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
  const {data} = await adminApi.api.getTemplateDocumentId(id)
  state.info = data
}

// #region module: Variables
const FormVariablesRendererRef = ref()

async function getVariables() {
  try {
    // const date = new Date().valueOf()
    const {data: res} = await adminApi.api.getTemplateDocumentRefreshId(id) as any
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
          required: false,
        })
      }catch(err){

        state.variables.push({
          name: item,
          type: 'input',
          required: true
        })
      }
    });
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
    });
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
  TemplateAddStep1DialogRef.value.handleOpen({...state.info, isEdit: true})
}

function handleRefresh(state: any) {
  if (!state || state.info) getInfo()
  if (!state || state.variables) getVariables()
  if (!state || state.preview) getPreviewFile()
}

onMounted(async () => {
  getVariables()
  await getInfo()
  getPreviewFile()
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
                     @click="handleRefresh()"/>
            <BrowseActionsOffice :doc="{...state.info, id: state.info.documentId}" @refresh="handleRefresh()"/>
            <TemplateReplaceButton :templateInfo="state.info" class="el-icon--right"
                                   @refresh="handleRefresh({ variables: true, preview: true })"/>
          </div>
        </div>
        <div v-loading="state.previewFile.loading">
          <Reader ref="ReaderRef" v-bind="state.previewFile"></Reader>
        </div>
      </div>
      <InteractDrawer ref="InteractDrawerRef" class="template-interact-drawer" :min-width="200" :defaultOpen="true"
                      :showClose="false">
        <div class="template-title">{{ $t('template.variable') }}</div>
        <FormVariablesRenderer ref="FormVariablesRendererRef"/>
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
