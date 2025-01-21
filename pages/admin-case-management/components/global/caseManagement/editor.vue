<script lang="ts" setup>
import { ElMessage } from 'element-plus'

import { adminApi } from 'api'

const props = defineProps<{
  caseTypeId: string,
  name: string,
  currentVersion: string,
}>()
const editorEl = ref()
const state = reactive<any>({
  loading: false
})
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
  let {data:styleJson} = await await adminApi.api.getCaseTypesIdStylejson(props.caseTypeId, { versionNumber: props?.currentVersion })
  styleJson = styleJson ? JSON.parse(styleJson) : null
  const blob = await adminApi.api.getCaseTypesIdDownloadXml(props.caseTypeId, { versionNumber: props?.currentVersion },{
    format:'blob'
  }) as any
  const cmmnString = await blob.text()
  console.log("loadJsonAndXml", cmmnString, styleJson)
  editorEl.value.init(cmmnString, styleJson)
}
async function init(){
  loadJsonAndXml()
}


async function handleSave() {
  try {
    state.loading = true
    const data = editorEl.value.save()
    console.log("save data", data);
    const bslob = xmlStringToFile(data.xml, 'file.cmmn.xml')
    const formData = new FormData()
    formData.append('file', bslob)
    await adminApi.api.patchCaseTypesVersionVersionidSave(props.caseTypeId, formData)
    await adminApi.api.patchCaseTypesStyleJsonSave(
        {
            caseTypeId: props.caseTypeId,
            versionNumber: props.currentVersion,
            styleJson: JSON.stringify(data.json)
        }
    )
    ElMessage.success($i18n.t('dpMsg_success'))
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

onMounted(() => {
    init()
})
</script>

<template>
  <div class="pageContainer">
      <CmmnEditor ref="editorEl"  >
        <template #actions>
          <ElButton type="primary" :loading="state.loading" @click="handleSave"> {{$t('dpTool_save')}}</ElButton>
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
