<script lang="ts" setup>

import { adminApi } from 'api'


const props = defineProps<{
  caseTypeId: string,
  name: string,
  currentVersion: string,
  versionId:string
}>()
const{ t } = useI18n()
const editorEl = ref()
const readOnly = ref(false);
const state = reactive<any>({
  loading: false
})
const caseInfo = ref<any>()
const production = ref(false);
const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw createError('menu manger not found')
}
async function getCaseData() {

    const { data } = await adminApi.api.getCaseTypesVersionVersionid(props.versionId) as any
    readOnly.value = data.production;
    production.value = data.production
    caseInfo.value = data
  routerProvider?.updateTabName(props.name)
}
async function getFileAndDisplay(path: string){
  // ordercase | test
  const cmmnString = await fetch('/cmmn/test.xml').then(res => res.text())
  editorEl.value.init(cmmnString)
}
async function loadX6Json() {
    const cmmnString = await fetch('/cmmn/test.xml').then(res => res.text())
    const x6Json = await fetch('/cmmn/x6Test.json').then(res => res.json())
    editorEl.value.init(cmmnString, x6Json)
}
async function loadXml () {
    const blob = await adminApi.api.getCaseTypesIdDownloadXml(props.caseTypeId, { versionNumber: props?.currentVersion },{
    format:'blob'
  }) as any
  const cmmnString = await blob.text()
  editorEl.value.init(cmmnString)
}
async function loadJsonAndXml () {
  let {data:styleJson} = await adminApi.api.getCaseTypesIdStylejson(props.caseTypeId, { versionNumber: props?.currentVersion })
  styleJson = styleJson ? JSON.parse(styleJson) : null
  const blob = await adminApi.api.getCaseTypesIdDownloadXml(props.caseTypeId, { versionNumber: props?.currentVersion },{
    format:'blob'
  }) as any
  const cmmnString = await blob.text()
  editorEl.value.init(cmmnString, styleJson, readOnly.value)
  
}
async function init(){
  loadJsonAndXml()
}


async function handleSave() {
  try {
    state.loading = true
    const data = editorEl.value.save()
    console.log("save data", data);
    const blob = xmlStringToFile(data.xml, 'file.cmmn.xml')
    const formData = new FormData()
    formData.append('file', blob)
    // TODO : method are not correct in swagger, tem use instance.
    await adminApi.instance.patch(`/docpal/case/types/version/${props.versionId}/save`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      await adminApi.api.postCaseTypesStylejsonSave(
        {
          caseTypeId: props.caseTypeId,
          versionNumber: props.currentVersion,
          styleJson: JSON.stringify(data.json)
        }
      )

  } catch (error) {
    console.log(error)
  } finally {
    state.loading = false
  }
}
function xmlStringToFile(xmlString, fileName) {
  // 创建一个Blob对象
  var blob = new Blob([xmlString], { type: 'text/xml' });

  // 创建一个File对象
  var file = new File([blob], fileName, { type: 'text/xml' });

  return file;
}
async function getSavedData() {
  const cmmnString = await fetch('/cmmn/saved.xml').then(res => res.text())
  const x6Json = await fetch('/cmmn/saved.json').then(res => res.json())

  editorEl.value.init(cmmnString, x6Json)
}

function openDetail() {
  
  const newItem = newCaseManagementDetail(props.versionId, props.name, props.currentVersion)

  routerProvider?.navigateTo(newItem)
}

function openVersionList(){
    const params = {
        ...caseInfo.value,
        name: routerProvider?.tabData.value.label,
        id: props.caseTypeId,
        draftId: props.caseTypeId
    }
    const newItem = newCaseManagementVersionList(params)

    routerProvider?.navigateTo(newItem)
}

async function saveAsNewVersion(){
  const { data } = await adminApi.api.postCaseTypesVersionVersionidNew(props.versionId)
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

async function promoteToProduction(){
   const { data } = await adminApi.api.postCaseTypesVersionVersionidActive(props.versionId)
   routerProvider?.message.success(t('dpMsg_success'))
   await getCaseData()
    await init()
}
//
// provide(CaseManagementDetailProviderKey, {
//     caseData,
//     caseInfo,
//     currentVersionId: props.caseTypeId,
//     currentVersion: props.currentVersion,
// })

onActivated(async () => {
    await getCaseData()
    await init()

})
</script>

<template>
  <div class="pageContainer">
      <CmmnEditor ref="editorEl" >
        <template #actions>
            <template v-if="!production">
                <ElButton type="primary" @click="promoteToProduction">Promote To Prodocution : {{ currentVersion }}</ElButton>
            </template>
            <ElButton type="primary" @click="saveAsNewVersion">Save As New Version</ElButton>
            <ElButton @click="openVersionList" type="primary">Version List</ElButton>
            <ElButton @click="openDetail" type="primary">View Detail</ElButton>
         <ElButton type="primary" :loading="state.loading" :disabled="readOnly" @click="handleSave"> {{$t('dpTool_save')}}</ElButton>
        </template>
      </CmmnEditor>
    </div>
</template>

<style scoped lang="scss">
.pageContainer{
  width:100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: var(--app-space-xs);
}
.bottom{
  width:100%;
  padding: calc(var(--app-space-s) * 2);
  border-top: 1px solid var(--app-grey-400);
}
</style>
