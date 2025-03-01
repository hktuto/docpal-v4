<template>
  <div>
<input  v-show="false" ref="fileUploaderRef"
            multiple
            type="file"
            :accept="accept"
            @change="uploadHandler($event)"/>
<input  v-show="false" ref="folderUploaderRef"
        multiple="false"
        type="file"
        :accept="accept"
        webkitdirectory
        @change="uploadHandler($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useEventListener } from '@vueuse/core'
// import { useUploadAIStore } from '../../../composables/uploadAI'

const props = withDefaults(defineProps<{
    accept?: string,
    backPath?: string
}>(), {
    accept: '',
    backPath: '/browse'
})
const userPreference = useUserPreference()
// const handleOpenUploadDrawer = inject('handleOpenUploadDrawer')
const state = reactive({
    doc: {}
})
const router = useRouter()
const { createUploadRequest } = useUploadAIStore()
const fileUploaderRef = ref()
const folderUploaderRef = ref()
function handleOpenUploadDrawer(){
    const ev = new CustomEvent('openUploadDrawer', { detail: true })
    document.dispatchEvent(ev)
}
function handleComputerDropFile({files, doc}) {
    console.log("handleComputerDropFile", files)
    const uploadFiles = files.reduce((prev: any, file, index) => {
        if (!!userPreference.value.uploadFileMaxSize) {
            const fileSizeCheckResult = file.size / 1024 / 1024 <= userPreference.value.uploadFileMaxSize
            if (!fileSizeCheckResult) {
                ElMessage.error('[' + file.name + ']' + $i18n.t('render.hint.fileSizeExceed') + userPreference.value.uploadFileMaxSize + 'MB')
                return prev;
            }
        }
        prev.push({
            id: new Date().valueOf().toString() + index,
            size: file.size,
            name: file.name,
            fileType: file.type,
            file,
            path: getPath(file.webkitRelativePath)
        })
        return prev
    }, [])
    const treeData = createUploadRequest(doc, uploadFiles)
    handleOpenUploadDrawer(true)
}
function uploadHandler (e: any) {
    const files: File[] = Array.from(e.target?.files) 
    console.log("uploadHandler", files)
    const uploadFiles = files.reduce((prev: any, file, index) => {
        if (!!userPreference.value.uploadFileMaxSize) {
            const fileSizeCheckResult = file.size / 1024 / 1024 <= userPreference.value.uploadFileMaxSize
            if (!fileSizeCheckResult) {
                ElMessage.error('[' + file.name + ']' + $i18n.t('render.hint.fileSizeExceed') + userPreference.value.uploadFileMaxSize + 'MB')
                return prev;
            }
        }
        prev.push({
            id: new Date().valueOf().toString() + index,
            size: file.size,
            name: file.name,
            fileType: file.type,
            file,
            path: getPath(file.webkitRelativePath)
        })
        return prev
    }, [])
    e.target.value = '' // 解决不能上传相同文件问题
    const treeData = createUploadRequest(state.doc, uploadFiles)
    handleOpenUploadDrawer(true)
}
function getPath(path: string) {
    if(!path) return ''
    path='/'+path
    const pathNames = path.split('/')
    pathNames.pop()
    return pathNames.join('/')
}
function clickUploadFile (doc:any) {
    state.doc = doc
    fileUploaderRef.value.click()
}
function clickUploadFolder(doc:any) {
    state.doc = doc
    folderUploaderRef.value.click()
}
onMounted(() => {
    useEventListener(document, 'docActionUploadFile', (event: any) => clickUploadFile(event.detail))  
    useEventListener(document, 'docActionUploadFolder', (event: any) => clickUploadFolder(event.detail))  
    useEventListener(document, 'docActionDropFileFormComputer', (event: any) => handleComputerDropFile(event.detail))
})
</script>
<style lang="scss" scoped>
</style>
