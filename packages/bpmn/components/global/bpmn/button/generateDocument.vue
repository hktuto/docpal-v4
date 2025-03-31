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

async function generatePreview(){
  try{
    loading.value = true;
    previewFile.blob = null;
    const xmlJson = bpmnStringToJson(props.xml)
    const targetTask = xmlJson.flatObj[props.attr_documentStepId]
    const latestFormData = await workflowFormDetail?.getFormData(false)
    // merge latestFormData and props.formData, if item in object is null, use latestFormData
    // merge form data and latest form data keys
    const mergeKeys = [...new Set([...Object.keys(props.formData), ...Object.keys(latestFormData)])]
    const mergeFormData = mergeKeys.reduce((prev:any, key:string) => {
      if(latestFormData[key]){
        prev[key] = latestFormData[key]
      } else if(props.formData[key]) {
        prev[key] = props.formData[key]
      }
      return prev
    }, {})
    console.log("mergeFormData", mergeFormData, latestFormData)
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
                    try{
                      const data = JSON.parse(value)
                      map[key] = data
                    }catch(err){

                      map[key] = value
                    }
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
        return res;
  }catch(err){
    console.log(err)
    if(err.name !== "AxiosError"){
          routerProvider?.message.error(err.message)
      }
    throw new Error("Generate Preview Error")
  }finally{
    loading.value = false;
  }
}

async function openPreivew(){
  const res = await generatePreview()
  dialogHeight.value = window.innerHeight - 60;
  dialogOpened.value = true
  setTimeout(() => {
    previewFile.blob = res
  },100)
}
function init(){

}

async function beforeSubmit(){
  // because backend can not handle loop data in workflow generate template, so we need to upload file to server
  const res = await generatePreview() as blob
  // will set default file name to 'preview'
  // default filed name is 'file'
  // get  file extension from blob
  const ext = mimeTypeToExtension(res.type)

  
  const fileName = 'preview' + Date.now() + '.'+ ext
  // return null 
  const formData = new FormData()
  
  const params = {
    type:"File",
    properties: {
      'dc:title': fileName
    },
            
  }
  formData.append('document', JSON.stringify(params))
  formData.append('file', res, fileName)
  formData.append('nonPermission', true)
  
  const uploadRes = await clientApi.instance.post('/docpal/workflow/upload/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data.data)
  console.log("res", uploadRes.id)
  return {
    file: uploadRes.id,
    hasFile: true
  }
}

onMounted(() => {
    init()
})
defineExpose({ beforeSubmit })
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
