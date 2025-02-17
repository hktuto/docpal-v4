<script lang="ts" setup>
import { adminApi } from 'api'
import type { Node } from '@antv/x6'
const { t } = useI18n()
const { node } = defineProps<{
    node:Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider){
    throw new Error('Missing provider')
}

const allFields = computed(() => {
    return Object.keys(graphProvider.allFormField.value).map((key:string) => {
    return graphProvider.allFormField.value[key]
  })
})

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
        refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
        refreshData()
    })
}

const allMasterTables = ref([])
async function getMasterTableList(){
    const {data} = await adminApi.api.postMasterTablesPage({
        pageSize: 100
    })
    allMasterTables.value = data.entryList.map( item => ({
        id: item.id,
        name: item.name
    }))
}

const form = ref({
    attr_allowUpdate:"",
    attr_masterTableId:"",
    attr_workflowInfo:"",
    attr_tableColumn:"",
    field:[]
})

function refreshData(){  
    const data = node.getData()
    if(data.data.extensionElements['flowable:mastertableRecord']) {
        form.value = data.data.extensionElements['flowable:mastertableRecord']
    }
}

const ignoreList = ['id', 'created_date', 'created_by', 'modified_date', 'status', 'modified_by'];
async function masterTableIdChange(newId) {
    if(newId) {
        // get all columns from master table
        const { data } = await adminApi.api.getMasterTablesId(newId)
        const fields = data.fields.filter(item => !ignoreList.includes(item.columnName))
        form.value.field = fields.map( column => {
            return {
                attr_formProperty: "",
                attr_tableColumn: column.columnName,
            }
        })
    }else{
        form.value.field = []
    }
    refreshData()
}

function updateData(){
    const data = node.getData()
    const newData = {
        ...data,
        version: data.version + 1 || 1,
        data:{
            ...data.data,
            ...form.value
        }
    }
    node.setData(newData,{ overwrite: true, deep:true });
}


onMounted(async() => {
    await getMasterTableList()
    setUpListener()
    refreshData()
})
</script>

<template>
    <div class="formContainer">
        <BpmnSidebarEditLabel :node="node" />
        <div class="formContainer">
            <ElForm :model="form" label-position="top" ref="formRef">
                <ElFormItem label="allow Update">
                    <ElSwitch v-model="form.attr_allowUpdate" @change="updateData"></ElSwitch>
                </ElFormItem>
                <ElFormItem label="Master Table:">
                    <ElSelect v-model="form.attr_masterTableId" placeholder="Master Table" @change="masterTableIdChange">
                        <ElOption v-for="item in allMasterTables" :key="item.id" :label="item.name" :value="item.id" />
                    </ElSelect>
                </ElFormItem>
                <ElFormItem label="Workflow Info">
                    <ElSelect v-model="form.attr_workflowInfo" placeholder="Workflow Info" @change="updateData">
                        <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
                    </ElSelect>
                </ElFormItem>
                <ElDivider />
                <h4>Fields</h4>
                <ElFormItem v-for="item in form.field" :key="item.attr_tableColumn" :label="item.attr_tableColumn">
                    <ElSelect v-model="form.attr_formProperty" placeholder="Field" @change="updateData">
                        <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
                    </ElSelect>
                </ElFormItem>
            </ElForm>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.fromContainer{
    overflow: auto;
}
</style>