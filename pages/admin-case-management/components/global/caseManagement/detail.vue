<script lang="ts" setup>

import { adminApi } from 'api'

const props = defineProps<{
    id: string,
    name: string,
    currentVersion: string,
}>()

const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw new Error('MenuRouterKey not found')
}

const state = reactive<any>({
  detail: null,

})

const xmlRef = ref()
function handleSave() {

xmlRef.value.save()
}

const caseData = reactive<any>({
    caseNode: null,
    caseInformation: null,
    cmmn: null
})

const permissionRef = ref()

function getCase(data: any) {
  caseData.caseNode = data.caseNode
  caseData.caseInformation = data.caseInformation
  console.log("case data", data);

  caseData.cmmn = data.cmmn
  permissionRef.value.init(caseData.caseNode.data)
}

function handleUpdate(){
  // add missing function
}
onActivated(async()=> {
    const { data } = await adminApi.api.getCaseTypesId(props.id, { versionNumber: props.currentVersion  }) as any
    state.detail = data
})



</script>

<template>
    <div class="main">
        {{ state.detail }}
      <!-- <CaseManageDetailInfo :detail="state.detail"/>
      <CaseManageDetailCaseInfomation :caseInformation="caseData.caseInformation" :node="caseData.caseNode" @save="handleSave" />
      <CaseManageDetailPermission ref="permissionRef" :node="caseData.caseNode" @save="handleSave" />
      <CmmnDetailPermission :node="caseData.caseNode"/> 
      <CaseManageDetailXml ref="xmlRef" @getCase="getCase" @update="handleUpdate"/>
      <CaseManageDetailDashboard :caseDetail="state.detail"/> -->
    </div>
</template>