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
<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import {downloadXmlCaseTypeApi, getJsonCaseTypeApi, saveXmlCaseTypeApi} from 'dp-api'
const props = defineProps(['id'])
const emits = defineEmits(['getCase'])
const router = useRouter()
const editorEl = ref()
const state = reactive<any>({
  cmmn: {},
  caseNode: {},
  caseInformation: {}
})
function save() {
  const data = editorEl.value.save()
  console.log(data);
  // ordercase,test
  const bslob = xmlStringToFile(data.xml, 'ordercase.cmmn.xml')
  const formData = new FormData()
  formData.append('file', bslob)
  saveXmlCaseTypeApi(props.id, formData)
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
  const blob = await downloadXmlCaseTypeApi(props.id)
  let styleJson = await getJsonCaseTypeApi(props.id)
  styleJson = styleJson ? JSON.parse(styleJson) : null
  const cmmnString = await blob.text()
  console.log("cmmnString", cmmnString)
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
    console.log("caseNode", state.cmmn.graph.getNodes() );
    if(!state.caseNode) {
      throw new Error('caseNode is null')
      return
    }
    state.caseInformation = getExtentionProperties(state.caseNode.data.data.casePlanModel, 'docpal:form')
    emits('getCase', state)
    console.log(state.cmmn);
  }, 300)
}
function handleEdit() {
  // 
  router.push(`/caseManage/editor?id=${props.id}`)
}
onMounted(() => {
  init()
})
defineExpose({ save })
</script>
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
    gap: var(--app-padding);
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}
</style>
