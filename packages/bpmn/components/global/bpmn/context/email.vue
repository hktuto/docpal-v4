<script lang="ts" setup>
import type { Node } from '@antv/x6'
import { adminApi } from 'api'

const { node } = defineProps<{
    node:Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER);
if(!graphProvider || !editorProvider) {
    throw createError('graph provider not found')
    
}

graphProvider?.graph.value?.on('history:change', async() => {
    console.log("history:change form email")
    if(allEmailTemplates.value.length === 0){
        await getEmailTemplates()
    }
    await getForm()
})

const allEmailTemplates = ref<any>([]);
const templateVariables = ref<any>([]);

const allFieldOptions = computed(() => {
    if(!graphProvider.allFormField.value) return []

    const allField = Object.fromEntries(
      Object.entries(graphProvider.allFormField.value).filter(([key, value]) => value.attr_type === 'string')
    )

    return Object.keys(allField).map((key) => {
      return {
        label: graphProvider.allFormField.value[key].attr_name,
        value: '${variables:get(' + graphProvider.allFormField.value[key].attr_id + ')}'
      }
  })
}); 


async function getEmailTemplates(){
    const response = await adminApi.api.getTemplateEmailAll()
    allEmailTemplates.value = response.data
    const nodeData = node.getData()
    const {data:{extensionElements}} = node.getData()
    const index = extensionElements['flowable:field'].findIndex((item: any) => item.attr_name === "notificationType")
    const item = extensionElements['flowable:field'][index]
    if(!item) throw createError("notificationType not found")
    let varList = allEmailTemplates.value.find((ii: any) => ii.id === item['flowable:string']['__cdata']);
    varList = varList?.emailTemplateVariable || null;
    if(!varList || !JSON.parse(varList)) {
        nodeData.data.extensionElements['flowable:field'] = [item]
        nodeData.data.extensionElements['flowable:field'].push({
            "attr_name":"tos",
            "flowable:expression": {
                    "__cdata": ''
                }
        },{
            "attr_name":"ccs",
            "flowable:expression": {
                    "__cdata": ''
                }
        },
        {
            "attr_name":"bcc",
            "flowable:expression": {
                    "__cdata": ''
                }
        }
    )
        
    }else{
        const varListJson = JSON.parse(varList)
        varListJson.unshift("tos", "ccs", "bcc")
        // varList = "tos,ccs,bcc," + varList
        const variable = varListJson.filter(j => !j.includes(",")).map((item: any) => {
            const exist = extensionElements['flowable:field'].find((field: any) => field.attr_name === item);
            if(exist) return exist;
            return {
                "attr_name": item,
                "flowable:expression": {
                    "__cdata": ''
                }
            }
        })
        nodeData.data.extensionElements['flowable:field'] = [
            item,
            ...variable
        ]
    }
    console.log("Set data", nodeData)
    node.setData(nodeData)
    templateVariables.value = nodeData.data.extensionElements['flowable:field'].filter((item: any) => !(item.attr_name === "notificationType") && !(item.attr_name === "hostUrl") && !(item.attr_name === "processInstanceId") && !(item.attr_name.includes(',')));

    // console.log(node.getData())
}
const emailTemplateId = ref("")
function getForm(){
    const nodeData = node.getData()
    const templateItem = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === "notificationType");
    if(templateItem){
        emailTemplateId.value = templateItem['flowable:string']['__cdata']
        setEmailTemplateId(templateItem['flowable:string']['__cdata'])
    }else{
        emailTemplateId.value = ""
    }
}

function setEmailTemplateId(value:string) {
    const newItem = {
        "attr_name": "notificationType",
        "flowable:string": {
        "__cdata": value
        }
    }
    const nodeData = node.getData()
    const varList = allEmailTemplates.value.find((item: any) => item.id === value)?.emailTemplateVariable;
    if(!varList || !JSON.parse(varList)) {
        nodeData.data.extensionElements['flowable:field'] = [newItem]
        nodeData.data.extensionElements['flowable:field'].push(
            {
                "attr_name":"tos",
                "flowable:expression": {
                        "__cdata": ''
                    }
            },{
                "attr_name":"ccs",
                "flowable:expression": {
                        "__cdata": ''
                    }
            },
            {
                "attr_name":"bcc",
                "flowable:expression": {
                        "__cdata": ''
                    }
            }
        )
    }else{
        const varListJson = JSON.parse(varList)
        varListJson.unshift("tos", "ccs", "bcc")
        const variable = varListJson.filter(j => !j.includes(",")).map((item: any) => {
            const exist = nodeData.data.extensionElements['flowable:field'].find((field: any) => field.attr_name === item);
            if(exist) return exist;
            return {
                "attr_name": item,
                "flowable:expression": {
                "__cdata": ''
                }
            }
        })
        nodeData.data.extensionElements['flowable:field'] = [
            newItem,
            ...variable
        ]
    }
    templateVariables.value = nodeData.data.extensionElements['flowable:field'].filter((item: any) => !(item.attr_name === "notificationType") && !(item.attr_name === "hostUrl") && !(item.attr_name === "processInstanceId") && !(item.attr_name.includes(',')));
    node.setData(nodeData,)
    
}

function fieldMappingUpdate(index:number, newVal:string) {
    graphProvider?.graph.value?.startBatch('update-email-data');

    
    const nodeData = node.getData()
    const newData = {
        ...nodeData,
        version: (nodeData.version || 0) + 1,
    }
    newData.data.extensionElements['flowable:field'][index + 1]['flowable:expression'].__cdata = newVal || '';

    node.setData(newData, { overwrite: true, deep: true, silent:false })

    graphProvider?.graph.value?.stopBatch('update-email-data')

}



watch( () => node, async() => {
    console.log("watch node from email", node)
    if(allEmailTemplates.value.length === 0){
        await getEmailTemplates()
    }
    await getForm()
},{
    immediate: true,
    deep: true
})


</script>

<template>
<div class="fromContainer">
    <BpmnSidebarEditLabel :node="node" />
    <ElForm label-position="top" label-width="80px" >
    <ElFormItem label="Email template">
          <ElSelect v-model="emailTemplateId" placeholder="Select email template" class="fullwidth" @change="setEmailTemplateId" :disabled="editorProvider.readonly.value" filterable>
            <ElOption v-for="item in allEmailTemplates" :key="item.id" :label="item.label" :value="item.id"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem v-for="(item, index) in templateVariables" :key="item.attr_name" :label="item.attr_name" >
            <ElSelect v-model="item['flowable:expression'].__cdata" placeholder="Select form field" class="fullwidth" :disabled="editorProvider.readonly.value" clearable @change="(val:any) => fieldMappingUpdate(index, val)">
              <ElOption v-for="item in allFieldOptions" :key="item.value" :label="item.label" :value="item.value"></ElOption>
            </ElSelect>
        </ElFormItem>
    </ElForm> 
</div>
</template>


<style lang="scss" scoped>
.fromContainer{
    overflow: auto;
}
</style>