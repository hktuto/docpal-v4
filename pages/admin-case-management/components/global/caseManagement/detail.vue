<script lang="ts" setup>
import {CaseManagementDetailProviderKey} from '#imports'
import { adminApi } from 'api'

const props = defineProps<{
  caseTypeId: string,
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
    const { data } = await adminApi.api.getCaseTypesVersionVersionid(props.caseTypeId) as any
    console.log("case data", data)
    state.detail = data
})


provide(CaseManagementDetailProviderKey, {
  caseData,
  currentVersion: props.currentVersion,
})


</script>

<template>
    <div class="pageContainer">
      <CaseManagementDetailInfo :detail="state.detail"/>
      <CaseManagementDetailCaseInfomation :caseInformation="caseData.caseInformation" :node="caseData.caseNode" @save="handleSave" />
     <CaseManagementDetailPermission ref="permissionRef" :node="caseData.caseNode" @save="handleSave" />
     <!-- <CmmnDetailPermission :node="caseData.caseNode"/>  -->
      <CaseManagementDetailXml ref="xmlRef" @getCase="getCase" @update="handleUpdate"/>
       <!-- <CaseManagementDetailDashboard :caseDetail="state.detail"/> -->
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    position: relative;
    padding: var(--app-space-xs);
    display: flex;
    flex-flow: column nowrap;
    gap: var(--app-space-xs);
    overflow: auto;
}
</style>