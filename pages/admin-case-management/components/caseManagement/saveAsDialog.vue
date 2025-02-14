<script lang="ts" setup>
import { ElDialog } from 'element-plus';
import { adminApi } from 'api';

const opened  = ref(false)
const loading = ref(false)
const emits = defineEmits(['close'])

const { data, copyVersion } = defineProps<{
  data: any 
  copyVersion: string 
}>();


const form = reactive({
    name:'',
    copyVersion: "V1"
})
function close(){
    opened.value = false
    emits('close')
}

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

let versionList:any[] = [];
async function getVersionList() {
    // get version list
    const response = await adminApi.api.postCaseTypesVersionPage({pageNum:0, pageSize:1000, caseTypeId: data.id || data.draftId})
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

async function save(){

}

defineExpose({ open })
</script>

<template>
<ElDialog v-model="opened" append-to-body>
        <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" label-position="top" class="demo-ruleForm" status-icon>
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
            <el-button @click="close">{{$t('cancelText')}}</el-button>
            <el-button type="primary" @click="save">{{$t('common_save')}}</el-button>
        </template>
</ElDialog>

</template>