<script lang="ts" setup>
import { adminApi } from 'api';
import { ElDialog } from 'element-plus';


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

function close(){
    opened.value = false
    emits('close')
}

function save(){
    opened.value = false
}

let versionList:any[] = [];
async function getVersionList() {
    // get version list
    const response = await adminApi.workflowVersionController.postPage({draftId: data.id || data.draftId})
    versionList = response.data?.entryList || []
}

async function open(){
    
    await getVersionList()
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
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="demo-ruleForm" status-icon>
            <el-form-item :label="$t('workflowEditor.name')" prop="name">
                <el-input v-model="form.name" :placeholder="$t('workflowEditor.name')" />
            </el-form-item>
            <el-form-item :label="$t('workflowEditor.copyVersion')" prop="copyVersion">
                <el-select v-model="form.copyVersion" placeholder="Select">
                    <el-option v-for="item in versionList" :key="item.versionNumber" :label="item.versionNumber" :value="item.versionNumber" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="save">{{$t('common_save')}}</el-button>
            <el-button @click="close">{{$t('common_cancel')}}</el-button>
        </template>
    </ElDialog>
</template>