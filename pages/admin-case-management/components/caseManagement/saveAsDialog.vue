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
    const copyRes = await adminApi.api.postCaseTypesIdCopy(data.id, params).then(res => res.data);
    // get case detail
    
    const blob = await adminApi.api.getCaseTypesIdDownloadXml(data.id, {versionNumber: formData.copyVersion}, {
        format: 'blob'
    }) as any
    const cmmnString = await blob.text()
    const v = cmmnToJson(cmmnString)
    const humanTasks = v.definitions.case.casePlanModel.humanTask || []

    // const {data} = await adminApi.api.postCaseTypesVersionVersionidNew(props.caseTypeId)
    //TODO : get all form in case and save as to new version
    // Step 1 : get all form in case
    // const allFrom = await xmlRef.value.getAllForm()
    for(let i = 0; i < humanTasks.length; i++) {
      const task = humanTasks[i] as any
      const response = await adminApi.api.getRelationQuery({
                processKey: data.name,
                userTaskId: task.attr_id,
                versionId:  versionId
            });
      if(response && response.data && response.data.length > 0 && response.data[0].jsonValue && JSON.parse(response.data[0].jsonValue)) {
        const params:any = {
          processKey: copyRes.name,
          userTaskId: task.attr_id,
          versionId: copyRes.latestVersionId
        }
        params.jsonValue = response.data[0].jsonValue
        await adminApi.api.postRelationSave(params)
      }
      
      
    }
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
