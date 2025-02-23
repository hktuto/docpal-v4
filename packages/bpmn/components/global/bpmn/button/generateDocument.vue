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

async function openPreivew(){
    try{


        loading.value = true;
        console.log("openPreivew")
        const xmlJson = bpmnStringToJson(props.xml)
        const targetTask = xmlJson.flatObj[props.attr_documentStepId]
        // get template id
        const templateId = targetTask.extensionElements['flowable:field'].find((field:any) => field.attr_name === "templateId")
        const varible = targetTask.extensionElements['flowable:field'].find((field:any) => field.attr_name === "variables")
        console.log("varible", varible, targetTask)
        if(!templateId || !varible) return;
        const templateIdValue = templateId['flowable:expression']['__cdata']
        // get template path from template id
        const allTemplate = await clientApi.api.postNuxeoTemplateGettemplatelist().then(res => res.data) as any
        const templateDetail = allTemplate.find(item => item.id === templateIdValue)
        console.log("templateDetail", templateDetail, allTemplate, templateIdValue)
        const varibleList = varible['flowable:expression']['__cdata'] ? JSON.parse(varible['flowable:expression']['__cdata']) : {}

        // create mapping 
        let map:any = {}
        Object.keys(varibleList).forEach((key:string) => {
            if(varibleList[key] ) {
                const vari = varibleList[key].replace('${variables:get(','').replace(')}', '')
                console.log("vari", vari)
                const value = props.formData[vari]
                if(value) {
                    map[key] = value
                }
            }
        })
        const res: any = await clientApi.api.postNuxeoTemplateSummitanddownloadfile({
                idOrPath: templateIdValue,
                paramsMap: map
            }, {
                format: 'blob'
        })
        downloadBlob(res, 'abc.pdf')
    }catch(err){
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

</template>