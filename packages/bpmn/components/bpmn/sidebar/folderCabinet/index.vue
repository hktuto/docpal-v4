<script lang="ts" setup>
import type {Node} from '@antv/x6'
import { adminApi } from 'api';

const { node } = defineProps<{
    node:Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')   
}

// #region folder cabinet form setup

const cabinetOptions = ref();
const cabinetDetail = ref()

const selectedCabinet = ref()

const form = ref<any[]>([])


async function loopChildren(all:any, item: any, level = 0) {
    const response = await adminApi.docPalTypeSettingController.getName(item.documentType);
    const meta = response.data
    all.push({...item, level, displayMeta : meta && meta.metadata ? meta.metadata.map((item:any) => item.metadata) : []})

    if(item.children){
        level ++ ;
        for (const child of item.children) {
            all = await loopChildren(all, child, level)
        }
    }
    return all
}

async function getCabinetDetail(id:string) {
    if(!id) {
        form.value = []
        node.setData({
            ...node.data,
            version: node.data.version ? node.data.version + 1 : 1,
            data:{
                ...node.data.data,
                extensionElements:{
                    ...node.data.data.extensionElements,
                    'flowable:folderCabinetMapping': []
                }
            }
        })
        return
    }

    const response = await adminApi.folderCabinetController.getTemplate(id);
    cabinetDetail.value = response.data;
    let arr:any[] =[];
    arr = await loopChildren(arr, cabinetDetail.value, 0)
    const graph = graphProvider?.graph.value
    const processNode = graph?.getCellById(node.data.id)
    if(!processNode){
        throw createError('Process node not found')
    }
    const processData = processNode.getData().data;
    const cabinetMapping = processData.extensionElements['flowable:folderCabinetMapping'];
    console.log(cabinetMapping)
    if(cabinetMapping){
        form.value = arr.map(item => {
            const fields = item.displayMeta.reduce((allMeta:any, meta:any) => {
                const bpmnItem =  cabinetMapping.find((oldItem:any) => item.id === oldItem.attr_id)
                if(bpmnItem && bpmnItem.field){
                    const formItem = bpmnItem.field.find((item:any) => item.attr_metadata === meta)
                    allMeta.push({
                        attr_formProperty: formItem ? formItem.attr_formProperty : "",
                        attr_metadata: meta
                    })
                }else{
                    allMeta.push({
                        attr_formProperty: "",
                        attr_metadata: meta
                    })
                }
                return allMeta
            }, [])
            return {
                attr_id: item.id,
                attr_name: item.label,
                attr_level: item.level,
                attr_isFolder: item.folder,
                field: fields,
            }
        })
    }else{
        form.value = arr.map(item => {
            const field = item.displayMeta.map( (meta:any) => ({
                attr_ormProperty:"",
                attr_metadata: meta
                }))
            
            return {
                attr_id: item.id,
                attr_name: item.label,
                attr_level: item.level,
                attr_isFolder: item.folder,
                field
            }
        }) 
    }

}
async function getList() {
    const response = await adminApi.folderCabinetController.getList()
    cabinetOptions.value = response.data
}

async function setData(){
    const graph = graphProvider?.graph.value
    const processNode = graph?.getCellById(node.data.id)
    if(!processNode){
        throw createError('Process node not found')
    }
    const processData = processNode.getData().data;
    if(processData.extensionElements && processData.extensionElements['flowable:folderCabinetMapping']) {
        const cabinetMapping = processData.extensionElements['flowable:folderCabinetMapping'];
        if(Array.isArray(cabinetMapping)) {
            selectedCabinet.value = cabinetMapping[0].attr_id
        }else{
            selectedCabinet.value = cabinetMapping.attr_id
            node.setData({
                ...node.data,
                version: node.data.version ? node.data.version + 1 : 1,
                data:{
                    ...node.data.data,
                    extensionElements:{
                        ...node.data.data.extensionElements,
                        'flowable:folderCabinetMapping': [node.data.data.extensionElements['flowable:folderCabinetMapping']]
                    }
                }
            })
            
        }
        getCabinetDetail(selectedCabinet.value)
    } else {
        selectedCabinet.value = ''
        form.value = []
    }

    setForm()
}

function setForm(){
    let saveItem = [];
    
    for (const item of form.value) {
        if(item.attr_id === selectedCabinet.value){
            const field = item.field.reduce((acc, cur) => {
                if(cur.attr_formProperty) acc.push(cur)
                return acc
            }, [])
            saveItem.push({
                attr_id: item.attr_id,
                attr_name: item.attr_name,
                field
            })
        }else {
            
            const notEmpty = item.field.find((item) => item.attr_formProperty)
            if(notEmpty){
                const field = item.field.reduce((acc, cur) => {
                    
                    if(cur.attr_formProperty) acc.push(cur)
                    return acc
                }, [])
                
                if(field.length > 0){
                    saveItem.push({
                        attr_id: item.attr_id,
                        attr_name: item.attr_name,
                        field
                    })
                }
            }

        }
    }
    node.setData({
        ...node.data,
        version: node.data.version ? node.data.version + 1 : 1,
        extensionElements:{
            ...node.data.extensionElements,
            'flowable:folderCabinetMapping': saveItem
        }
    })
}

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
        setData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
        setData()
    })
}

onMounted(async () => {
    await getList()
    setData()
})

// #endregion
</script>

<template>
    <ElForm label-position="top" @native.enter="() => {}">
            <ElFormItem lable="Folder Cabinet">
                <ElSelect v-model="selectedCabinet" @change="getCabinetDetail" clearable>
                    <ElOption v-for="item in cabinetOptions" :key="item.id" :label="item.label" :value="item.id" />
                </ElSelect>
            </ElFormItem>
        </ElForm>
        <div class="folderCabinetDetail" v-if="selectedCabinet && cabinetDetail" >
            {{ cabinetDetail }}
            <!-- <BpmnSidebarFolderCabinetDetail v-model:field="form" :folderCabinetItem="cabinetDetail" :all-field="allFields" @update:field="setForm"  /> -->
        </div>
</template>