<template>
    <el-dialog v-model="state.dialogVisible" :title="$t('workflow_GenerateDocument')"
        destroy-on-close append-to-body :close-on-click-modal="false" width="80%">
        <el-select v-model="form.templatePath" clearable filterable
            @change="templateParamGet">
            <el-option v-for="(item,index) in state.templateList" :key="index" :label="item.name" :value="item.path" />
        </el-select>
        <div class="template_form" style="min-height: 50px" v-loading="state.variableLoading">
            <img v-if="imgBlob" :src="imgBlob" />
            <FormVariablesRenderer ref="FormVariablesRendererRef"/>
        </div>
        <template #footer>
            <el-button @click="state.dialogVisible = false">{{$t('cancel')}}</el-button>
            <el-button v-if="state.canDownload" :loading="state.loading" @click="handleSubmit">{{$t('common_download')}}</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { clientApi } from 'api';
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
const imgBlob = ref();
async function getImgPreviewBlob() {
  const blob: any = await clientApi.api.postNuxeoDocumentThumbnail({idOrPath: form.templatePath}, {
    format: 'blob',
    timeout: 0,
    headers: {
        key: 'preview'
    }
  })
  const urlCreator = window.URL || window.webkitURL
  imgBlob.value = urlCreator.createObjectURL(blob)
}
// #region module: dialog
    function handleOpen(shareInfo) {
        state.dialogVisible = true
    }
// #endregion
async function handleSubmit() {
    state.loading = true
    try {
        const data = await FormVariablesRendererRef.value.getData()
        const res: any = await clientApi.api.postNuxeoTemplateSummitanddownloadfile({
            templatePath: form.templatePath,
            paramsMap: data
        }, {
            format: 'blob'
        })
        if(!res || res.errorCode) throw new Error(`${t('responseMsg_errorCode_2')}`);
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
async function templateParamGet (templatePath: string) {
    state.canDownload = false
    state.variableLoading = true
    try {
        const res: any = await clientApi.api.postNuxeoTemplateGettemplateparams({
            templatePath
        }).then(res => res.data)
        form.paramList = [...new Set(res.paramsList)].map(item => ({
            name: item,
            type: 'input',
            required: true
         }))
        FormVariablesRendererRef.value.createJson(form.paramList)
        state.canDownload = true
    } catch (error) {
        // ElMessage.error(error?.response?.data?.message || error.message)
    }
    state.variableLoading = false
}
// @ts-ignore
onMounted(async () => {
    state.templateList = await clientApi.api.postNuxeoTemplateGettemplatelist().then(res => res.data) || []
})
// @ts-ignore
watch(form, async() => {
  if(form.templatePath) {
    await getImgPreviewBlob()
  }else{
    imgBlob.value = null
  }
},{
  deep: true
})
defineExpose({ handleOpen })
</script>

<style scoped lang="scss">
.template_form{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--app-space-xs) * 2 );
  img{
    width: 100%;
    border: 1px solid #eee;
  }
}
</style>
