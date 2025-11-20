<script lang="ts" setup>
import { adminApi } from 'api'

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey not found')
}

const caseList = ref<any[]>([])
const workflowList = ref<any[]>([])
const homePageList = ref<any[]>([])
const selectedCase = ref<any[]>([])
const userGroupList = ref<any[]>([])
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
const relatedHomePage = new Set<string>()
const relatedUserGroup = new Set<string>()
const relatedUserRole = new Set<string>()

const exportData = ref<any>({
  case:{},
  workflow:{},
  documentTemplate:{},
  folderCabinet:{},
  masterTable:{},
  idGenerator:{},
  emailTemplate:{},
  homePage:{},
  userGroup:{},
  userRole:{}
})

const loading = ref(false)

async function getHomePageList() {
  const res = await adminApi.api.postPersonalDashboard({ pageNum: 0, pageSize: 1000 })
  homePageList.value = res.data?.entryList || []
}
async function getListData() {
  const promiseList = [
    getCaseList(),
    getWorkflowList(),
    getHomePageList(),
    getUserGroupList()
  ]
  await Promise.all(promiseList)
}
async function getCaseList() {
  const res = await adminApi.api.postCaseTypesPage({ pageNum: 0, pageSize: 1000 })
  caseList.value = res.data?.entryList.filter((item: any) => item.productionVersion) || []
}

async function getUserGroupList() {
  const res = await adminApi.api.postNuxeoIdentityGroups()
  userGroupList.value = res.data || []
}
async function getWorkflowList() {
  const res = await adminApi.api.postWorkflowProcessList({ pageNum: 0, pageSize: 1000 })
  workflowList.value = res.data || []
}

async function handleExportEmailTemplate(emailTemplateId: string) {
  const emailTemplateDetail = await adminApi.api.getTemplateEmailTemplateId(emailTemplateId)
  exportData.value.emailTemplate[emailTemplateId] = emailTemplateDetail.data
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

async function handleHomePageExport(homePageId: string) {
    const homePageDetail = homePageList.value.find((item: any) => item.id === homePageId)
    relatedHomePage.add(homePageId)
    exportData.value.homePage[homePageId] = homePageDetail
    const group = homePageDetail.groupId.split(',')
    group.forEach((groupId: string) => {
      relatedUserGroup.add(groupId)
    })
}

async function handleUserGroupExport(groupId: string) {
  const userGroupDetail = userGroupList.value.find((item: any) => item.id === groupId)
  relatedUserGroup.add(groupId)
  exportData.value.userGroup[groupId] = userGroupDetail
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

async function handleDocumentTemplateExport(documentTemplateId: string) {
  // const documentTemplateDetail = await adminApi.api.getTemplateDocumentTemplateId(documentTemplateId)
  // relatedDocumentTemplate.add(documentTemplateId)
  // exportData.value.documentTemplate[documentTemplateId] = documentTemplateDetail.data
}

async function handleFolderCabinetExport(folderCabinetId: string) {
  
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
    relatedUserGroup.clear()
    relatedUserRole.clear()
    relatedHomePage.clear()
    relatedEmailTemplate.clear()
    exportData.value = {
      case:{},
      workflow:{},
      documentTemplate:{},
      folderCabinet:{},
      masterTable:{},
      idGenerator:{},
      emailTemplate:{},
      homePage:{},
      userGroup:{},
      userRole:{}
    }
    if(selectedCase.value.length === 0 && selectedWorkflow.value.length === 0 && selectedHomePage.value.length === 0) {
      routerProvider?.message.error('Please select at least one case, workflow or home page')
      return
    }
    // get case export data
    for(let i = 0; i < selectedCase.value.length; i++) {
      await handleCaseExport(selectedCase.value[i])
    }
    // get workflow export data
    for(let i = 0; i < selectedWorkflow.value.length; i++) {
      await handleWorkflowExport(selectedWorkflow.value[i])
    }
    // get home page export data
    for(let i = 0; i < selectedHomePage.value.length; i++) {
      await handleHomePageExport(selectedHomePage.value[i])
    }
    // loop case and handleCaseExport
    for( let caseId of relatedCase) {
      await handleCaseExport(caseId)
    }
    // loop workflow and handleWorkflowExport
    for(let workflowKey of relatedWorkflow) {
      await handleWorkflowExport(workflowKey)
    }
    // loop user group and handleUserGroupExport
    for(let groupId of relatedUserGroup) {
      await handleUserGroupExport(groupId)
    }
    // loop email template and handleExportEmailTemplate
    for(let emailTemplateId of relatedEmailTemplate) {
      console.log("emailTemplateId", emailTemplateId)
      await handleExportEmailTemplate(emailTemplateId)
    }

    // loop document template and handleDocumentTemplateExport
    for(let documentTemplateId of relatedDocumentTemplate) {
      await handleDocumentTemplateExport(documentTemplateId)
    }
    // loop folder cabinet and handleFolderCabinetExport
    for(let folderCabinetId of relatedFolderCabinet) {
      await handleFolderCabinetExport(folderCabinetId)
    }
    
  }catch(err:any){
    console.error(err)
    routerProvider?.message.error(err.message)
  }finally{
    loading.value = false
  }
  
}


onMounted(() => {
  getListData()
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
      <ElFormItem label="Home Page List" >
        <ElSelect v-model="selectedHomePage" placeholder="Select Home Page" multiple filterable clearable>
          <ElOption v-for="item in homePageList" :key="item.id" :label="item.name" :value="item.id" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" @click="handleExport">Confirm</ElButton>
    <ElDivider />
    
    <div v-loading="loading" class="preContainer">
      <div class="exportedCaseContainer">
        <template v-if="Object.keys(exportData.case).length > 0">
          <h3>Case</h3>
          <div v-for="item in exportData.case" :key="item.id" class="caseInfoCard">
            <div class="cardContent">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
      <div class="exportedWorkflowContainer">
        <template v-if="Object.keys(exportData.workflow).length > 0">
          <h3>Workflow</h3>
          <div v-for="item in exportData.workflow" :key="item.id" class="workflowInfoCard">
            <div class="cardContent">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
      <div class="exportedHomePageContainer">
        <template v-if="Object.keys(exportData.homePage).length > 0">
          <h3>Home Page</h3>
          <div v-for="item in exportData.homePage" :key="item.id" class="homePageInfoCard">
            <div class="cardContent">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
      <div class="exportedUserGroupContainer">
        <template v-if="Object.keys(exportData.userGroup).length > 0">
          <h3>User Group</h3>
          <div v-for="item in exportData.userGroup" :key="item.id" class="userGroupInfoCard">
            <div class="cardContent">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
      <div class="exportedUserRoleContainer">
        <template v-if="Object.keys(exportData.userRole).length > 0">
          <h3>User Role</h3>
          <div v-for="item in exportData.userRole" :key="item.id" class="userRoleInfoCard">
            <div class="cardContent">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
      <template v-if="Object.keys(exportData.userRole).length > 0">
        <h3>User Role</h3>
        <div v-for="item in exportData.userRole" :key="item.id" class="userRoleInfoCard">
          <div class="cardContent">
            {{ item.name }}
          </div>
        </div>
      </template>
      <div class="exportedEmailTemplateContainer">
        <template v-if="Object.keys(exportData.emailTemplate).length > 0">
          <h3>Email Template</h3>
          <div v-for="item in exportData.emailTemplate" :key="item.id" class="emailTemplateInfoCard">
            <div class="cardContent">
              {{ item.label }}
            </div>
          </div>
        </template>
      </div>
      <div class="exportedDocumentTemplateContainer">
        <template v-if="Object.keys(exportData.documentTemplate).length > 0">
          <h3>Document Template</h3>
          <div v-for="item in exportData.documentTemplate" :key="item.id" class="documentTemplateInfoCard">
            <div class="cardContent">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
      <div class="exportedFolderCabinetContainer">
        <template v-if="Object.keys(exportData.folderCabinet).length > 0">
          <h3>Folder Cabinet</h3>
          <div v-for="item in exportData.folderCabinet" :key="item.id" class="folderCabinetInfoCard">
            <div class="cardContent">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
      <div class="exportedMasterTableContainer">
        <template v-if="Object.keys(exportData.masterTable).length > 0">
          <h3>Master Table</h3>
          <div v-for="item in exportData.masterTable" :key="item.id" class="masterTableInfoCard">
            <div class="cardContent">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
      <div class="exportedIdGeneratorContainer">
        <template v-if="Object.keys(exportData.idGenerator).length > 0">
          <h3>Id Generator</h3>
          <div v-for="item in exportData.idGenerator" :key="item.id" class="idGeneratorInfoCard">
            <div class="cardContent">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
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
