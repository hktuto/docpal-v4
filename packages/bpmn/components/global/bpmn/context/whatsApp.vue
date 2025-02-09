<script lang="ts" setup>
import type { Node } from '@antv/x6'
import {adminApi} from 'api'
const {node} = defineProps<{
    node:Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER);
if(!graphProvider || !editorProvider) {
    throw createError('graph provider not found')
}

const allTemplate = ref<any[]>([]);
const templateId = ref<string>("")

const variables = ref<any[]>([])

const allFields = computed(() => {
    if(!graphProvider?.allFormField.value) return []
    return graphProvider?.allFormField.value
})

function refreshData(){
    // get templateId
    const data = node.getData();
    if(data.data.extensionElements['flowable:field']){
        const index = data.data.extensionElements['flowable:field'].findIndex((item: any) => item.attr_name === "templateId");
        if(index === -1) {
            templateId.value = ""
        }else{
            templateId.value = data.data.extensionElements['flowable:field'][index]['flowable:expression']['__cdata']
        }
        const allVariable = data.data.extensionElements['flowable:field'].filter((item: any) => !item.attr_name === "templateId");
        // check 'tos' is exist, if not , add in front of allVariable
        if(!allVariable.find((item:any) => item.attr_name === "tos")){
            allVariable.unshift({
                attr_name: "tos",
                "flowable:string": {
                    "__cdata": ""
                }
            })
        }
        // variable cdata is wrap by ${variables:get(variable)}
        allVariable.forEach((item:any) => {
            variables.value.push({
                attr_name: item.attr_name,
                cdata : item['flowable:string'].__cdata.replace('${variables:get(', '').replace(')}', '')
            })
        })
    }else{
        templateId.value = ""
        variables.value = [];
    }
    
}

async function searchTemplte(keyword:string) {
    const {data} = await adminApi.api.postMessageTemplateList({
        name: keyword,
        pageSize: 1000,
        pageNum:0,
    })
    console.log("searchTemplte", data)
    allTemplate.value = data.entryList || []
}

function templateIdChanged(newVal:string){
    const data = node.getData()
    const index = data.data.extensionElements['flowable:field'].findIndex((item: any) => item.attr_name === "templateId");
    if(index === -1) {
        data.data.extensionElements['flowable:field'].push({
            "attr_name": "templateId",
            "flowable:string": {
                "__cdata": newVal
            }
        })

    }else{
        data.data.extensionElements['flowable:field'][index] = {
            "attr_name": "templateId",
            "flowable:string": {
                "__cdata": newVal
            }
        }
    }

    node.setData({
        ...data,
        version: node.data.version+1 || 0,
    },{
        overwrite: true,
        deep: true,
    })
}


function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
      refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
      refreshData()
    })
}

onMounted(async() => {
    searchTemplte()
    setUpListener()
    refreshData()
})

</script>

<template>
<div class="formContainer">
    <BpmnSidebarEditLabel :node="node" />
    <ElForm label-position="top" label-width="100px" size="small">
        <ElFormItem label="Template Name">
            <ElSelect v-model="templateId" placeholder="Select Template" remote filterable :remote-method="searchTemplte" @change="templateIdChanged">
                <ElOption v-for="item in allTemplate" :key="item.id"  :label="item.templateName" :value="item.id" />
            </ElSelect>
        </ElFormItem>
        <!-- variable -->
        <template v-if="templateId">
            <ElFormItem v-for="(item, index) in variables" :key="index" :label="item.attr_name">
                <ElSelect v-model="item.cdata" placeholder="Select Variable" filterable clearable>
                    <ElOption v-for="option in allFields" :key="option.attr_id" :label="option.attr_name" :value="option.attr_id" />
                </ElSelect>
            </ElFormItem>
        </template>
    </ElForm>
</div>
</template>