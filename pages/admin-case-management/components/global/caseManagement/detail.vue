<script lang="ts" setup>
import {CaseManagementDetailProviderKey} from '#imports'
import { adminApi } from 'api'

const props = defineProps<{
    caseTypeId: string,
    name: string,
    currentVersion: string,
}>()
const { caseTypeId, name, currentVersion } = toRefs(props)

const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw new Error('MenuRouterKey not found')
}
const { t } = useI18n()
const loading = ref(false)
const caseInfo = ref<any>()

const xmlRef = ref()
function handleSave() {

  xmlRef.value.save()
}
const caseTypeInfo = ref<any>()
const caseData = reactive<any>({
    caseNode: null,
    caseInformation: null,
    cmmn: null
})

const permissionRef = ref()

function getCase(data: any) {
    caseData.caseNode = data.caseNode
    caseData.caseInformation = data.caseInformation

    caseData.cmmn = data.cmmn
    permissionRef.value.init(caseData.caseNode.data)
}

function handleUpdate(){
  // add missing function
}

async function promoteToProduction() {
  const { data } = await adminApi.api.postCaseTypesVersionVersionidActive(props.caseTypeId)
   routerProvider?.message.success(t('dpMsg_success'))
    await init()
}
async function saveAsNewVersion() {
  // console.log("props",props);
  // TODO : end point is not correct
  const { data } = await adminApi.api.postCaseTypesVersionVersionidNew(props.caseTypeId)
  // console.log("data", data)
  routerProvider?.updateProps({
    caseTypeId: data.id,
    currentVersion: data.versionNumber,
  })
  console.log("new props", props)
  nextTick(() => {
    init();
  })
}

function openVersionList() {
  const params = {
    ...caseInfo.value,
    name: routerProvider?.tabData.value.label,
    id: caseTypeInfo.value.id,
    draftId: props.caseTypeId
  }
  const newItem = newCaseManagementVersionList(params)
  routerProvider?.navigateTo(newItem)
}

function openEditor(){
  const newItm = newCaseManagementEditor(
      caseInfo.value.caseTypeId,
      props.name,
      props.currentVersion,
      props.caseTypeId
  )
  console.log("newItm", newItm)
  routerProvider?.navigateTo(newItm)
}
const production = ref(false);
async function init(){
  loading.value = true
    const { data } = await adminApi.api.getCaseTypesVersionVersionid(props.caseTypeId) as any
    const { data: removeCaseTypeInfo } = await adminApi.api.getCaseTypesId(data.caseTypeId) as any
    
    caseTypeInfo.value = removeCaseTypeInfo
    caseInfo.value = data
    production.value = caseInfo.value.production
    // TODO : no way to get case name in version, use another api to get, and update tab name
    loading.value = false
    routerProvider?.updateTabName(props.name + ` - (${props.currentVersion})`)
}
onActivated(async()=> {
  await init()
})

onDeactivated(() => {
  caseTypeInfo.value = {}
  caseInfo.value = {}
  production.value = false
})


provide(CaseManagementDetailProviderKey, {
  caseData,
  caseInfo,
  currentVersionId: caseTypeId,
  currentVersion: currentVersion,
})


</script>

<template>
    <div v-if="!loading && caseInfo" class="pageContainer">

      <CaseManagementDetailInfo :detail="caseTypeInfo" >
            <template v-if="!production">
                <ElButton type="primary" @click="promoteToProduction">Promote To Prodocution : {{ currentVersion }}</ElButton>
            </template>
            <ElButton type="primary" @click="saveAsNewVersion">Save As New Version</ElButton>
            <ElButton @click="openVersionList" type="primary">Version List</ElButton>
            <ElButton @click="openEditor" type="primary">Open Editor</ElButton>
      </CaseManagementDetailInfo>
      <CaseManagementDetailCaseInfomation :caseInformation="caseData.caseInformation" :node="caseData.caseNode" @save="handleSave" />
      <CaseManagementDetailPermission ref="permissionRef" :node="caseData.caseNode" @save="handleSave" />
      <!-- <CmmnDetailPermission :node="caseData.caseNode"/>  -->
      <CaseManagementDetailXml ref="xmlRef" v-bind="props" @getCase="getCase" @update="handleUpdate"/>
      <CaseManagementDetailDashboard :caseDetail="caseTypeInfo" :caseDetailId="caseInfo.caseTypeId" v-bind="props"/>
      
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    position: relative;
    padding: var(--app-space-s);
    display: flex;
    flex-flow: column nowrap;
    gap: var(--app-space-xs);
    overflow: auto;
    > * {
        flex: 1 0 auto;
    }
}
</style>