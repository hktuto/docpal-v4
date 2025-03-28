<script lang="ts" setup>
import { ElButton } from 'element-plus';
import { clientApi } from 'api';

const routerProvider = inject(MenuRouterKey)

const props = defineProps<{
    xml: string,
    taskDetail: any
    formData:any,
    attr_documentStepId: string
    attr_previewButtonText: string
}>()

const loading = ref(false)
const opened = ref()
const userId = useUserId()
const workflowFormDetail = inject('workflowFormRender')
const previewFile =reactive<{
    name:string,
    blob:Blob | null
}>({
    name:"",
    blob:null
})
const dialogOpened = ref(false)
const iframeUrl = ref('')

const dialogHeight = ref(640);
async function openPreivew(){
    try{
      loading.value = true;
      previewFile.blob = null;
      const xmlJson = bpmnStringToJson(props.xml)
      const targetTask = xmlJson.flatObj[props.attr_documentStepId]
      const latestFormData = await workflowFormDetail?.getFormData(false)
      // merge latestFormData and props.formData, if item in object is null, use latestFormData
      const mergeFormData = Object.keys(props.formData).reduce((prev:any, key:string) => {
        if(props.formData[key]) {
          prev[key] = props.formData[key]
        }else{
          prev[key] = latestFormData[key]
        }
        return prev
      }, {})
        // get template id
        const templateId = targetTask.extensionElements['flowable:field'].find((field:any) => field.attr_name === "templateId")
        const varible = targetTask.extensionElements['flowable:field'].find((field:any) => field.attr_name === "variables")

        if(!templateId || !varible) return;
        const templateIdValue = templateId['flowable:expression']['__cdata']
        // get template path from template id
        const varibleList = varible['flowable:expression']['__cdata'] ? JSON.parse(varible['flowable:expression']['__cdata']) : {}

        // create mapping 
        let map:any = {}
        Object.keys(varibleList).forEach((key:string) => {
            if(varibleList[key] ) {
                const vari = varibleList[key].replace('${variables:get(','').replace(')}', '')
                const value = mergeFormData[vari]
                if(value) {
                    map[key] = value
                }else{
                    map[key] = ""
                }
            }
        })
        const res: any = await clientApi.api.postNuxeoTemplateSummitanddownloadfile({
                templateId: templateIdValue,
                paramsMap: map
            }, {
                format: 'blob'
        })
        const submitFormData = new FormData()
        const fileName = 'preview'
        submitFormData.append('file', res, fileName)
        const templaRequest = JSON.stringify({
            fileName: res.name,
            fileType: 'File',
            userId: userId.value,
            fileRelativePath: '/' + fileName,
        })
        submitFormData.append('uploadTempFileRequestStr', templaRequest)
        dialogHeight.value = window.innerHeight - 60;
        dialogOpened.value = true
        setTimeout(() => {
          previewFile.name = fileName
          previewFile.blob = res
        },100)
        
    }catch(err){
      console.log(err)
        // check if error is come from server
        if(err.name !== "AxiosError"){
            routerProvider?.message.error(err.message)
        }
    }
    finally{

        loading.value = false;
    }
}
function init(){

}

onMounted(() => {
    init()
})

</script>

<template>
   <ElButton type="primary" :loading="loading" @click="openPreivew">{{  props.attr_previewButtonText }}</ElButton>
   <ElDialog v-model="dialogOpened"  width="100%" fullscreen apped-to-body>
        <div  class="readerContainer" :style="`--height: ${dialogHeight}px`">
            <Reader v-if="previewFile.blob" v-bind="previewFile" />
        </div>
    </ElDialog>
</template>

<style lang="scss" scoped>

.readerContainer{
    width:100%;
    height:var(--height);
    overflow: auto;
}
</style>
