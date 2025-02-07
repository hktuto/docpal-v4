<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import {saveXmlCaseTypeApi} from 'dp-api'
import { adminApi } from 'api'
import {newCaseManagementEditor} from "~/utils/caseManagementHelper";

const caseDetailProvider = inject(CaseManagementDetailProviderKey)
const routerProvider = inject(MenuRouterKey)
if(!caseDetailProvider || !routerProvider) {
  throw new Error('CaseManagementDetailProviderKey not found')
}
const props = defineProps<{
    caseTypeId: string,
    name: string,
    currentVersion: string,
}>()
const emits = defineEmits(['getCase'])
const router = useRouter()
const editorEl = ref()
const state = reactive<any>({
  cmmn: {},
  caseNode: {},
  caseInformation: {}
})
async function save() {
  const data = editorEl.value.save()
  // ordercase,test
  const bslob = xmlStringToFile(data.xml, 'ordercase.cmmn.xml')
  const formData = new FormData()
  formData.append('file', bslob)
  await adminApi.instance.patch(`/api/docpal/case/types/version/${caseDetailProvider?.currentVersionId}/save`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  // await adminApi.api.patchCaseTypesVersionVersionidSave(props.id, formData)
  // saveXmlCaseTypeApi(props.id, formData)
  updateCaseInfo()
}
function xmlStringToFile(xmlString, fileName) {
  // 创建一个Blob对象
  var blob = new Blob([xmlString], { type: 'text/xml' });
  // 创建一个File对象
  var file = new File([blob], fileName, { type: 'text/xml' });
  return file;
}
async function init(){

  const blob = await adminApi.api.getCaseTypesIdDownloadXml(caseDetailProvider?.caseInfo.value.caseTypeId, { versionNumber: caseDetailProvider?.currentVersion },{
    format:'blob'
  }) as any
  let {data:styleJson} = await adminApi.api.getCaseTypesIdStylejson(caseDetailProvider?.caseInfo.value.caseTypeId, { versionNumber: caseDetailProvider?.currentVersion })
  styleJson = styleJson ? JSON.parse(styleJson) : null
  const cmmnString = await blob.text()
  state.cmmn = editorEl.value.init(cmmnString, styleJson)

  updateCaseInfo()
}
function updateCaseInfo() {
  console.log('?????????????????????');

  setTimeout(() => {
    state.caseNode = null
    state.caseInformation = null
    // getFileAndDisplay
    state.caseNode = state.cmmn.graph.getCellById(state.cmmn.caseId)

    // getCaseInformation
    if(!state.caseNode) {
      throw new Error('caseNode is null')
      return
    }
    state.caseInformation = getExtentionProperties(state.caseNode.data.data.casePlanModel, 'docpal:form')
    emits('getCase', state)
  }, 300)
}
function handleEdit() {
  //
  const newItm = newCaseManagementEditor(
      caseDetailProvider?.caseInfo.value.caseTypeId,
      props.name,
      props.currentVersion,
      props.caseTypeId
  )
  console.log("newItm", newItm)
  routerProvider?.navigateTo(newItm)
}
onMounted(() => {
  init()
})
defineExpose({ save })
</script>

<template>
  <el-card class="viewer">
    <template #header>
      <div class="flex-x-between">
        <span>Design</span>
        <el-icon class="color__primary__hover cursorPointer" size="20" @click="handleEdit">
          <Edit />
        </el-icon>
      </div>
      
    </template>
    <CmmnViewer class="xmlViewer" ref="editorEl" :padding="20" :options="{panning:{enable:false},mousewheel:{enable:false}}"/>
  </el-card>
</template>

<style lang="scss" scoped>
.xmlViewer{
  height: 500px;
}
.viewer {
  width: 100%;
  overflow: hidden;
  :deep .el-card__body{
    display: grid;
    grid-template-rows: min-content 1fr;
    gap: var(--app-space-xs);
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}
</style>
