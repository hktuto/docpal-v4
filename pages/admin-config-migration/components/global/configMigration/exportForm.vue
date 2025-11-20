<script lang="ts" setup>
import { adminApi } from 'api'

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey not found')
}

const caseList = ref<any[]>([])
const workflowList = ref<any[]>([])
const selectedCase = ref<any[]>([])
const selectedWorkflow = ref<any[]>([])
const selectedHomePage = ref<any[]>([])
//  store related data
const relatedCase  = new Set<string>()
const relatedWorkflow = new Set<string>()
const relatedDocumentTemplate = new Set<string>()
const relatedFolderCabinet = new Set<string>()
const relatedMasterTable = new Set<string>()
const relatedIdGenerator = new Set<string>()
const relatedEmailTemplate = new Set<string>()

const exportData = ref<any>({
  case:{},
  workflow:{},
  documentTemplate:{},
  folderCabinet:{},
  masterTable:{},
  idGenerator:{},
  emailTemplate:{},
  homePage:{}
})

const loading = ref(false)

async function getHomePageList() {

}

async function getCaseList() {
  const res = await adminApi.api.postCaseTypesPage({ pageNum: 0, pageSize: 1000 })
  caseList.value = res.data?.entryList.filter((item: any) => item.productionVersion) || []
  await getWorkflowList()
}

async function getWorkflowList() {
  const res = await adminApi.api.postWorkflowProcessList({ pageNum: 0, pageSize: 1000 })
  workflowList.value = res.data || []
}

async function handleCaseExport(caseId: string) {
  const caseInfo = await getCaseExportData(caseId)
  relatedCase.add(caseId)
  caseInfo.workflow.forEach((workflowKey: string) => {
    // check if workflowKey is already in relatedWorkflow
    relatedWorkflow.add(workflowKey)
  })
  exportData.value.case[caseId] = caseInfo.case
}

async function handleWorkflowExport(workflowKey: string) {
  const workflowInfo = await getWorkflowExportData(workflowKey)
  relatedWorkflow.add(workflowKey)
  if(!exportData.value.workflow[workflowKey]) {
    exportData.value.workflow[workflowKey] = workflowInfo.workflowData
  }
  workflowInfo.relatedCase.forEach((caseId: string) => {
    relatedCase.add(caseId)
  })
  workflowInfo.relatedDocumentTemplate.forEach((documentTemplateId: string) => {
    relatedDocumentTemplate.add(documentTemplateId)
  })
  workflowInfo.relatedFolderCabinet.forEach((folderCabinetId: string) => {
    relatedFolderCabinet.add(folderCabinetId)
  })
  workflowInfo.relatedMasterTable.forEach((masterTableId: string) => {
    relatedMasterTable.add(masterTableId)
  })
  workflowInfo.relatedIdGenerator.forEach((idGeneratorId: string) => {
    relatedIdGenerator.add(idGeneratorId)
  })
  workflowInfo.relatedEmailTemplate.forEach((emailTemplateId: string) => {
    relatedEmailTemplate.add(emailTemplateId)
  })
}

async function handleExport() {
  loading.value = true

  try{
    // step1 reset all related data
    relatedCase.clear()
    relatedWorkflow.clear()
    relatedDocumentTemplate.clear()
    relatedFolderCabinet.clear()
    relatedMasterTable.clear()
    relatedIdGenerator.clear()
    exportData.value = {
      case:{},
      workflow:{},
      documentTemplate:{},
      folderCabinet:{},
      masterTable:{},
      idGenerator:{},
      emailTemplate:{},
      homePage:{}
    }
    if(selectedCase.value.length === 0 && selectedWorkflow.value.length === 0) {
      routerProvider?.message.error('Please select at least one case or workflow')
      return
    }
    for(let i = 0; i < selectedCase.value.length; i++) {
      await handleCaseExport(selectedCase.value[i])
    }
    for(let i = 0; i < selectedWorkflow.value.length; i++) {
      await handleWorkflowExport(selectedWorkflow.value[i])
    }
    // loop case and handleCaseExport
    for( let caseId of relatedCase) {
      await handleCaseExport(caseId)
    }
    // loop workflow and handleWorkflowExport
    for(let workflowKey of relatedWorkflow) {
      await handleWorkflowExport(workflowKey)
    }
    console.log("relatedCase", relatedCase)
    console.log("relatedWorkflow", relatedWorkflow)
    console.log("relatedDocumentTemplate", relatedDocumentTemplate)
    console.log("relatedFolderCabinet", relatedFolderCabinet)
    console.log("relatedMasterTable", relatedMasterTable)
    console.log("relatedIdGenerator", relatedIdGenerator)
  }catch(err:any){
    console.error(err)
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
        <ElSelect v-model="selectedCase" placeholder="Select Case" multiple filterable clearable>
          <ElOption v-for="item in caseList" :key="item.id" :label="item.name" :value="item.id" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Workflow List" >
        <ElSelect v-model="selectedWorkflow" placeholder="Select Workflow" multiple filterable clearable>
          <ElOption v-for="item in workflowList" :key="item.id" :label="item.name" :value="item.key" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" @click="handleExport">Confirm</ElButton>
    <ElDivider />
    <div class="relatedDataContainer">
      <div class="relatedDataItem">
        <div>Related Case</div>
        <span>{{ relatedCase }}</span>
      </div>
      <div class="relatedDataItem">
        <div>Related Workflow</div>
        <span>{{ relatedWorkflow }}</span>
      </div>
      <div class="relatedDataItem">
        <div>Related Document Template</div>
        <span>{{ relatedDocumentTemplate }}</span>
      </div>
      <div class="relatedDataItem">
        <div>Related Folder Cabinet</div>
        <span>{{ relatedFolderCabinet }}</span>
      </div>
      <div class="relatedDataItem">
        <div>Related Master Table</div>
        <span>{{ relatedMasterTable }}</span>
      </div>
      <div class="relatedDataItem">
        <div>Related Id Generator</div>
        <span>{{ relatedIdGenerator }}</span>
      </div>
      <div class="relatedDataItem">
        <div>Related Email Template</div>
        <span>{{ relatedEmailTemplate }}</span>
      </div>
    </div>
    <div class="preContainer">
      <pre>{{ exportData }}</pre>
    </div>
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
