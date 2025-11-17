<script lang="ts" setup>
import { adminApi } from 'api'

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey not found')
}

const caseList = ref<any[]>([])
const selectedCase = ref<any>(null)
const loading = ref(false)
const allWorkflowList = ref<any[]>([])

async function getCaseList() {
  const res = await adminApi.api.postCaseTypesPage({ pageNum: 0, pageSize: 1000 })
  caseList.value = res.data?.entryList.filter((item: any) => item.productionVersion) || []
  const res2 = await adminApi.api.postWorkflowProcessList({ pageNum: 0, pageSize: 1000 })
  allWorkflowList.value = res2.data || []
}
type CaseInfo = {
  userGroupList : any[],
  cases : any[],
  caseDashboard : any[],
  caseForm : any[],
  caseWorkflow : any[],
  caseDocumentTemplate : any[],
  caseEmailTemplate : any[],
  caseFolderCabinet : any[],
  caseMasterTable : any[],
}
const caseInfo = ref<any>(null)

async function getWorkflowDetail(workflow: any) {
  // get workflow xml
  console.log(workflow)
  // get workflow style json
  // loop all form item and get form json
  // get all email template
  // get all folder cabinet
  // get all master table
  // get all document template
}

async function getCaseDetail(caseId:string){
  const selectedCaseData = caseList.value.find((item) => item.id === caseId)

  let {data: caseStyleJson} = await adminApi.api.getCaseTypesIdStylejson(selectedCaseData.id, {versionNumber: selectedCaseData?.latestVersion})
  caseStyleJson = caseStyleJson ? JSON.parse(caseStyleJson) : null
  const blob = await adminApi.api.getCaseTypesIdDownloadXml(selectedCaseData.id, {versionNumber: selectedCaseData?.latestVersion}, {
    format: 'blob'
  }) as any
  const cmmnString = await blob.text()
  caseInfo.value.cases.push({
    id: selectedCaseData.id,
    name: selectedCaseData.name,
    cmmnString: cmmnString,
    caseStyleJson: caseStyleJson
  })
  
}

async function handleExport() {
  loading.value = true
  caseInfo.value = {
    userGroupList : [],
    cases : [],
    caseDashboard : [],
    caseForm : [],
    caseWorkflow : [],
    caseDocumentTemplate : [],
    caseEmailTemplate : [],
    caseFolderCabinet : [],
    caseMasterTable : [],
  } as CaseInfo
  try{
    // step 0 : check selectedCase value
    if(!selectedCase.value || selectedCase.value  === '') {
      return
    }
    const selectedCaseData = caseList.value.find((item) => item.id === selectedCase.value)
    console.log(selectedCaseData)

    let {data: caseStyleJson} = await adminApi.api.getCaseTypesIdStylejson(selectedCaseData.id, {versionNumber: selectedCaseData?.latestVersion})
    caseStyleJson = caseStyleJson ? JSON.parse(caseStyleJson) : null
    const blob = await adminApi.api.getCaseTypesIdDownloadXml(selectedCaseData.id, {versionNumber: selectedCaseData?.latestVersion}, {
      format: 'blob'
    }) as any
    const cmmnString = await blob.text()
    caseInfo.value.caseXML = cmmnString
    // get case dashboard
    const caseDashboard = await adminApi.api.postCaseDashboardPage({caseTypeId: selectedCaseData.id, pageNum: 0, pageSize: 1000})
    caseInfo.value.caseDashboard = (caseDashboard.data?.entryList || []).map((item: any) => ({
      selected: true,
      data:{...item}
    }))
    // get user group list from case dashboard
    for(let i = 0; i < caseInfo.value.caseDashboard; i++) {
      const item = caseInfo.value.caseDashboard[i]
      const userGroupList = item.data.permissions.filter((item: any) => item.dataType === 'group').map((item: any) => ({
        key: item.value,
        label: item.name
      }))
      caseInfo.value.userGroupList.push(...userGroupList)
    }
    // get case form
    const steps = caseStyleJson?.cells?.reduce((prev: any, item: any) => {
      if(item.data.type === 'humanTask') {
        prev.humanTask.push(item.data)
      } else if(item.data.type === 'processTask') {
        prev.processTask.push(item.data)
      }
      return prev
    }, {
      humanTask: [],
      processTask: [],
    })
    for(let i = 0; i < steps.humanTask.length; i++) {
      const item = steps.humanTask[i]
      const form = await adminApi.api.getRelationQuery({
        processKey: selectedCaseData.caseDefinitionKey,
        userTaskId: item.data.attr_id,
        versionId: selectedCaseData.productionVersionId
      })
      if(form && form.data && form.data.length > 0 && form.data[0].jsonValue) {
        caseInfo.value.caseForm.push({
          selected: true,
          params: {
            processKey: selectedCaseData.caseDefinitionKey,
            userTaskId: item.data.attr_id,
            versionId: selectedCaseData.productionVersionId,
            label: item.data.attr_name
          },
          form: form.data[0].jsonValue ? JSON.parse(form.data[0].jsonValue) : {}
        })
      }
    }
    const workflowPromise = []
    for(let i = 0; i < steps.processTask.length; i++) {
      const item = steps.processTask[i]
      const caseId = item.data.processRefExpression.__cdata
      if(caseId) {
        const workflow = allWorkflowList.value.find((item) => item.key === caseId)
        if(workflow) {
          caseInfo.value.caseWorkflow.push({
            selected: true,
            data: workflow
          })
          workflowPromise.push(getWorkflowDetail(workflow))
        }
      }
    }
    await Promise.all(workflowPromise)

  }catch(err:any){
    routerProvider?.message.error(err.message)
  }finally{
    loading.value = false
  }
  
}


onMounted(() => {
  getCaseList()
})
</script>

<template>
  <div class="exportFormContainer" >
    <h3>
      Export Case
    </h3>
    <ElForm ref="formRef" label-position="top">
      <ElFormItem label="Case List" >
        <ElSelect v-model="selectedCase" placeholder="Select Case" filterable clearable>
          <ElOption v-for="item in caseList" :key="item.id" :label="item.name" :value="item.id" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" @click="handleExport">Confirm</ElButton>
    <!-- <div v-if="selectedCase && caseInfo"   class="caseInfoContainer">
      <div v-if="caseInfo.caseXML" class="caseInfoItem">
        Case XML : {{ caseInfo.caseXML ? "ready" : 'no' }}
      </div>
      <div v-if="caseInfo.caseDashboard.length > 0" class="caseInfoItem">
        Case Dashboard : 
        <div class="listContainer">

          <template v-if="caseInfo.caseDashboard.length > 0">
            <div v-for="item in caseInfo.caseDashboard" :key="item.id" class="caseInfoCard">
              <div class="selectedContainer">
                <ElCheckbox v-model="item.selected" />
              </div>
              <div class="cardContent">
                {{ item.data.label }}
              </div>
            </div>
          </template>
          <template v-else>
            no
          </template>
        </div>
      </div>
      <div v-if="caseInfo.caseForm.length > 0" class="caseInfoItem">
        Case form : 
        <div class="listContainer">
          <template v-if="caseInfo.caseForm.length > 0" >
            <div v-for="item in caseInfo.caseForm" :key="item.params.userTaskId" class="caseInfoCard">
              <div class="selectedContainer">
                <ElCheckbox v-model="item.selected" />
              </div>
              <div class="cardContent">

                {{ item.params.label }}
              </div>
            </div>
          </template>
          <template v-else>
            no
          </template>
        </div>
      </div>
      <div v-if="caseInfo.caseWorkflow.length > 0" class="caseInfoItem">
        workflow
        <div class="listContainer">
          <template v-if="caseInfo.caseWorkflow.length > 0">
            <div v-for="item in caseInfo.caseWorkflow" :key="item.data.key" class="caseInfoCard">
              <div class="selectedContainer">
                <ElCheckbox v-model="item.selected" />
              </div>
              <div class="cardContent">
                {{ item.data.name }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div> -->
    <div v-if="loading" class="loadingContainer">
      loading...
    </div>
  </div>
</template>


<
<style lang="scss" scoped>
.caseInfoContainer{
  display: flex;
  flex-flow: column nowrap;
  gap: var(--app-space-s);
}
.listContainer{
  display: flex;
  flex-flow: row wrap;
  gap: var(--app-space-xs);
  overflow: auto;
  height: 100%;
}
.caseInfoCard {
  flex: 0 0 120px;
  border: 1px solid #ccc;
  position: relative;
  padding: var(--app-space-s);
  border-radius: var(--app-border-radius-s);
}
.selectedContainer{
  position: absolute;
  top: var(--app-space-xxs);
  right: var(--app-space-xxs);
  z-index: 2;
}
</style>
