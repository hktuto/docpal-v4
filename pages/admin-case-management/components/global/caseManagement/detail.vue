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

const loading = ref(false)
const caseInfo = ref<any>()

const xmlRef = ref()
function handleSave() {

  console.log(caseData.caseNode)
  xmlRef.value.save()
}

const caseData = reactive<any>({
    caseNode: null,
    caseInformation: null,
    cmmn: null
})

const permissionRef = ref()

function getCase(data: any) {
  console.log("getCase", data);
  caseData.caseNode = data.caseNode
  caseData.caseInformation = data.caseInformation

  caseData.cmmn = data.cmmn
  permissionRef.value.init(caseData.caseNode.data)
}

function handleUpdate(){
  // add missing function
}
onActivated(async()=> {
    loading.value = true
    const { data } = await adminApi.api.getCaseTypesVersionVersionid(props.caseTypeId) as any
    caseInfo.value = data
    loading.value = false
})


provide(CaseManagementDetailProviderKey, {
  caseData,
  caseInfo,
  currentVersionId: props.caseTypeId,
  currentVersion: props.currentVersion,
})


</script>

<template>
    <div v-if="!loading && caseInfo" class="pageContainer">
      <CaseManagementDetailInfo />
      <CaseManagementDetailCaseInfomation :caseInformation="caseData.caseInformation" :node="caseData.caseNode" @save="handleSave" />
     <CaseManagementDetailPermission ref="permissionRef" :node="caseData.caseNode" @save="handleSave" />
     <!-- <CmmnDetailPermission :node="caseData.caseNode"/>  -->
      <CaseManagementDetailXml ref="xmlRef" @getCase="getCase" @update="handleUpdate"/>
      <CaseManagementDetailDashboard :caseDetail="caseInfo"/>
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
    > * {
        flex: 1 0 auto;
    }
}
</style>