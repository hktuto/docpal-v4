<template>
    <el-dialog class="scroll-dialog" v-model="state.dialogOpened" append-to-body
                :close-on-click-modal="false">
        <template #header>
            <strong class="primaryTitle">{{ $t('filePopover_uploadFile') }}</strong>
            {{ 'in ' + state.setting.documentPath }}
        </template>
        <div>{{$t('tableHeader_labelRule')}}：
            <template v-for="(item, index) in getLabelList()" :key="index">
                <el-tag >{{$t(item.metadata || item.metaData)}}</el-tag>
                <template v-if="index !== getLabelList().length - 1"> - </template>
            </template>
        </div>
        <div style="margin-bottom: 15px">{{$t('folderCabinet.previewName')}}：{{state.setting.previewName}}</div>
        <BrowseActionsReplaceUpload v-model="state.fileList" :limit="1" @change="handleChange"></BrowseActionsReplaceUpload>
        <MetaRenderForm ref="MetaFormRef" mode="folderCabinet" @formChange="handleMetaChange"></MetaRenderForm>
        <template #footer>
            <el-button :loading="state.loading" type="primary" @click="handleSubmit">{{$t('submit')}}</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { clientApi } from 'api';

const emits = defineEmits(['success'])
const route = useRoute()
const state = reactive<any>({
    loading: false,
    dialogOpened: false,
    setting: {},
    fileList: [],
    metaFormData: {},
    previewName: ''
})
const MetaFormRef = ref()
const userId:string = useUserId().value
function getMetaName(formData: any = {}) {
    const date = new Date()
    const labelRule = getLabelList()
    try {
        if(!!state.metaFormData) formData = {
            ...formData,
            ...state.metaFormData
        }
    } catch (error) {
        
    }
    formData.label = state.setting.label
    return labelRule.reduce((prev: any, rule: any, index: number) => {
        const joiner = index === 0 ? '' : '-'
        if(!rule.metadata) rule.metadata = rule.metaData
        if(rule.metadata === 'fc:createDate') {
            prev += joiner + formatDate(date)
        }
        else if(rule.metadata === 'fc:label'){
            prev += joiner + formData.label
        }
        else if(rule.metadata === 'fc:creator'){
            prev += joiner + userId
        }
        else if(rule.metadata === 'fc:docTitle'){
            if(!formData.docName) prev += joiner + ''
            else prev += joiner + formData.docName
        }
        else if(rule.dataType === 'date') {
            if(!formData[rule.metadata]) prev += joiner + ''
            else prev += joiner + formatDate(formData[rule.metadata])
        } 
        else {
            if(!formData[rule.metadata]) prev += joiner + ''
            else prev += joiner + formData[rule.metadata]
        }
        return prev
    }, '')
}
function getLabelList() {
    const labelRule = state.setting.labelRule ? JSON.parse(state.setting.labelRule) : [
        { dataType: "string", metadata: "fc:docTitle", noDelete: true }
    ]
    return labelRule
}
async function handleChange() {
    const file = state.fileList[0]
    await MetaFormRef.value.setData({ docName: file.name.split('.').shift()  })
}
async function handleMetaChange(data: any) {
    state.metaFormData = data.formModel
    state.setting.previewName = getMetaName()
}
function handleOpen(setting:any){
    state.dialogOpened = true
    state.setting = deepCopy(setting)
    console.log(state.setting);
    
    state.fileList = []
    let defaultValue = {}
    if (state.setting.metadataValue) defaultValue = JSON.parse(state.setting.metadataValue)
    nextTick(async() => {
        await MetaFormRef.value.init(state.setting.documentType)
        MetaFormRef.value.setData({ ...defaultValue })
    })
}
async function handleSubmit () {
    try {
        const metaFormData = await MetaFormRef.value.getData()
        if(!metaFormData) return
        if(!state.fileList || state.fileList.length === 0) {
            throw new Error("msg_fileFetchFailed");
        }
        const file = state.fileList[0]
        state.loading = true
        const inputFile: any = {
            name: state.setting.previewName,
            properties: metaFormData,
            idOrPath: state.setting.documentPath + '/' + state.setting.previewName,
            type: state.setting.documentType,
        }
        const duplicateResult: any = await clientApi.api.postNuxeoDocumentIsduplicatename({
            path: state.setting.documentPath, 
            titles: [state.setting.previewName] 
        }).then(res => res.data)
        if(duplicateResult[state.setting.previewName]){
            if (state.setting.repeatName) {
                handleReplace({
                    idOrPath: duplicateResult[state.setting.previewName].idOrPath,
                    properties: metaFormData
                }, file)
                return
            } else {
                inputFile.name = duplicateResult[state.setting.previewName].uniqueName
                inputFile.idOrPath = state.setting.documentPath + '/' + inputFile.name
            }
        }
        inputFile.templateId = route.query.tab
        inputFile.layoutId = state.setting.templateId
        delete inputFile.properties.docName
        const formData: any = new FormData()
        formData.append('files', file.raw)
        formData.append('document', JSON.stringify(inputFile))
        const res = await clientApi.api.postNuxeoDocumentCreatedocument(formData)
        emits('success', inputFile)
        state.dialogOpened = false
    } catch (error) {
    } finally {
        state.loading = false
    }
}
async function handleReplace(inputFile: any, file: any) {
    const formData:any = new FormData()
    formData.append('file', file.raw)
    formData.append('document', JSON.stringify(inputFile))
    state.loading = true
    try {
        const res = await clientApi.api.patchNuxeoDocumentReplacefileV2(formData, formData)
        state.dialogOpened = false
        emits('success', inputFile)
    } catch (error) {
        
    } finally {
        state.loading = false
    }
}
onMounted(() => {
})
defineExpose({ handleOpen })
</script>
