<script lang="ts" setup>
import { ElDialog } from 'element-plus';
import { adminApi } from 'api';
import formJson from './copy.vform.json'

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
const FormRendererRef = ref()

let versionList:any[] = [];
async function getVersionList() {
    // get version list
    const response = await adminApi.api.postCaseTypesVersionPage({pageNum:0, pageSize:1000, caseTypeId: data.id || data.draftId})
    versionList = (response.data?.entryList || [])
    const copy = FormRendererRef.value.vFormRenderRef.getWidgetRef('copyVersion')
    copy.loadOptions(versionList.map(item => ({
        label: item.versionNumber,
        value: item.versionNumber
    })))
    const defaultValue = {
      name: data.name + "_copy",
      copyVersion: data.latestVersion
    }
    FormRendererRef.value.vFormRenderRef.setFormData(defaultValue)
}

async function open(){
  opened.value = true;
  nextTick(() => {
     getVersionList()
  }) 
}

async function save(){
    // TODO : handle save as logic
    let formData = await FormRendererRef.value.vFormRenderRef.getFormData()
    const versionId = versionList.find(item => item.versionNumber === formData.copyVersion).id
    const params = {
      caseIdPrefix: formData.caseIdPrefix,
      caseIdDigit: formData.caseIdDigit,
      startNumber: formData.startNumber,
      name: formData.name,
      versionId: versionId
    }
    const res = await adminApi.api.postCaseTypesIdCopy(data.id, params)
    // TODO : copy form data
    opened.value = false;
    emits('close')
}

defineExpose({ open })
</script>

<template>
<ElDialog v-model="opened" append-to-body>
  <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
            <el-button @click="close">{{$t('cancelText')}}</el-button>
            <el-button type="primary" @click="save">{{$t('common_save')}}</el-button>
        </template>
</ElDialog>

</template>
