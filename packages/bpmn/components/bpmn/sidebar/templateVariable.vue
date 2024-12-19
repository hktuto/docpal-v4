<script lang="ts" setup>
import type {Node, Graph} from '@antv/x6'
import { adminApi } from 'api'

const props = defineProps<{
    node: Node,
    templateCData: string
    templateId: string
    allFields:any[]
}>()
const emits = defineEmits(['updateCData'])
const {templateId} = toRefs(props)
const variableList = ref<any>({})
async function getTemplateVariableList() {
    if(!props.templateId) {
        return;
    }
    const {data} = await adminApi.documentTemplateController.getRefresh(props.templateId)
    // const {templateVariable} = await GetTemplateVariablesApi(props.templateId);
    
    const varList = [...new Set(JSON.parse(data as any))]
    // check if templateCData is in varList
    const cdata = props.templateCData ? JSON.parse(props.templateCData) : {};
    variableList.value = varList.reduce((all:any,key:any) => {
        
        // get variable from ${variables:get(variable)} in cdata[key]
        all[key] = cdata[key] ? cdata[key].replace('${variables:get(', '').replace(')}', '') : "";
        
        return all
    },{})
}

function updateData(){
    // loop thought variableList.value, and convert all value to ${variables:get(variable)}
    const newCDate = Object.keys(variableList.value).reduce((all:any,key:any) => {
        if(!variableList.value[key]) {
            return all
        }
        all[key] = '${variables:get(' + variableList.value[key] + ')}';
        return all
    },{})

    emits("updateCData", JSON.stringify(newCDate))
}

function isEmptyObj(obj: any) {
    return Object.keys(obj).length === 0
}

watch(templateId, ()=>{
    console.log("templateId", templateId)
    getTemplateVariableList()
},{
    immediate: true
})
</script>

<template>
    <div class="templateVariableContainer">
        <ElForm v-if="!isEmptyObj(variableList)" label-position="top" style="width:100%;">
            <ElFormItem>
                <span>Variables</span>
            </ElFormItem>
            <ElFormItem v-for="(value, key) in variableList" :key="key" :label="key" >
                <ElSelect v-model="variableList[key]" @change="updateData" clearable filterable>
                    <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
                </ElSelect>
            </ElFormItem>
        </ElForm>
        <div v-else>
            No variable
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>