<script lang="ts" setup>
import { adminApi } from 'api';
import { ElDialog } from 'element-plus';
import { th } from 'element-plus/es/locales.mjs';


const { data, copyVersion } = defineProps<{
  data: any 
  copyVersion: string 
}>();

const emits = defineEmits(['close'])
const form = reactive({
    name:'',
    copyVersion: "V1"
})

const rules = {
    name: [
        { required: true, message: '$t("workflowEditor.nameRequired")', trigger: 'blur' },
        { min: 2, max: 50, message: '$t("workflowEditor.nameLengthLimit")', trigger: 'blur' },
        { validator: validateName, trigger: 'blur' }
    ]
}

function validateName(rule:any, value:string, callback:any) {
    if(value === '') return callback(new Error('$t("workflowEditor.nameRequired")'))
    if(value.length < 2) return callback(new Error('$t("workflowEditor.nameLengthLimit")'))
    callback()
}

const opened  = ref(false)
const loading = ref(false)
function close(){
    opened.value = false
    emits('close')
}

async function save(){
    loading.value = true
    const blob = await adminApi.api.getWorkflowVersionBpmnxml({draftId:data.id, versionNumber:form.copyVersion}, {
        format: 'blob'
    }) 
    let {data:json} = await adminApi.api.getWorkflowVersionJson({draftId:data.id, versionNumber:form.copyVersion}, {})
    const timestamp = new Date().getTime();

    const newForm:any = new FormData();
    const newName = data.name + '_copy';
    const nameToId = newName.toLowerCase().replaceAll(' ', '_') + '_' + timestamp;
    const text = await blob.text()
    const bpmnFile = text.replaceAll(data.key, nameToId).replaceAll(data.name, form.name);
    const newBlob = new Blob([bpmnFile], {type: "text/xml;charset=utf-8"});
    newForm.append('name', form.name)
    newForm.append('attr_id', nameToId)
    newForm.append('versionId', 'V1')
    newForm.append('jsonValue', json || "")
    newForm.append('file', newBlob, 'workflow.bpmn.xml')
    newForm.append('isDraft', true)
    const {data:newVersionData} =await adminApi.api.postWorkflowProcessDefinitionUpload({requestDTO:{}},newForm) as any
    console.log("newVersionData", newVersionData)
    if(!newVersionData){
        throw new Error('newVersionData not found')
    }
    const forms = await getAllFormFromXML(bpmnFile, data.key, form.copyVersion)
    await batchSaveForm(forms, nameToId, newVersionData.latestVersionId);
    
    setTimeout(() => {
        emits('close')
        loading.value = false
        opened.value = false
    }, 500);
    
}

let versionList:any[] = [];
async function getVersionList() {
    if(!data || !data.id){
        throw new Error('data or data.id not found')
    }
    // get version list
    const response = await adminApi.api.postWorkflowVersionPage({pageNum:0, pageSize:100, draftId: data.id || data.draftId})
    versionList = response.data?.entryList || []
}

async function open(){
    
    await getVersionList()
    // 因為 props 有可能未更新，所以在 nextTick 中再次設置 form 的值
    nextTick(() => {
        form.name = data.name
        form.copyVersion = copyVersion
        opened.value = true
    })
}


defineExpose({ open })

</script>


<template>
    <ElDialog v-model="opened" :title="$t('workflowEditor_saveAs_title')" append-to-body :close-on-click-modal="false" >
        <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" label-position="top" class="demo-ruleForm" status-icon>
            <el-form-item :label="$t('workflowEditor.name')" prop="name">
                <el-input v-model="form.name" :placeholder="$t('workflowEditor.name')" />
            </el-form-item>
            <el-form-item :label="$t('workflowEditor.copyVersion')" prop="copyVersion">
                <el-select v-model="form.copyVersion" placeholder="Select">
                    <el-option v-for="item in versionList" :key="item.versionNumber" :label="item.versionNumber" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="close">{{$t('cancelText')}}</el-button>
            <el-button type="primary" @click="save">{{$t('common_save')}}</el-button>
        </template>
    </ElDialog>
</template>