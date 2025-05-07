<template>
  <el-dialog
    style="--scroll-dialog-height: 80vh"
    v-model="state.visible" :title="$t('folderCabinet.newItem')"
    :close-on-click-modal="false"
    class="scroll-dialog"
    append-to-body
  >
    <main>
      <FolderCabinetCreateUploadTree ref="FolderCabinetUploadTreeRef"
                                     :treeData="state.treeData"
                                     v-loading="state.treeLoading">
      </FolderCabinetCreateUploadTree>
    </main>
    <template #footer>
      <el-button id="FolderCabinet__AllowOtherFilesCabinet__NewItem__Next__Submit" type="primary"
                 :loading="state.loading"
                 @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
import { ElMessage } from 'element-plus'

const props = defineProps(['id'])
const emits = defineEmits([
  'refresh'
])
const { t } = useI18n()
const userId: string = useUserId().value
const state = reactive<any>({
  loading: false,
  treeLoading: false,
  visible: false,
  cabinetTemplate: {},
  treeData: [],
  rootDetail: {}

})
// #region module: handleSubmit
const FolderCabinetUploadTreeRef = ref()

async function handleSubmit() {
  state.loading = true
  const pList: any = []
  try {
    const uploadList = await FolderCabinetUploadTreeRef.value.getData(true)
    if (!uploadList) {
      throw new Error('')
    }
    // 后端folder-cabinet有延时，立即上传folder-cabinet不起作用
    setTimeout(async () => {
      await uploadHandler(uploadList, state.rootDetail.idOrPath, state.rootDetail.id)
      const res = await Promise.all(pList)
      state.loading = false
      state.visible = false
      ElMessage.success(t('tip_createdSuccessMsg', {
        modelName: t('common_item'),
        name: uploadList[0].previewName
      }))
      emits('refresh')
    }, 2000)
  } catch (error) {

  }

  async function uploadHandler(children: any, parentPath: string = '', parentId: string = '',parentStatus?: 'skip' | 'fail') {
    children.forEach(async (item: any) => {
      item.path = parentPath + '/' + item.label
      try {
        if (parentStatus === 'skip' || parentStatus === 'fail') throw new Error('skip')
        if (item.folder) {
          item.status = 'loading'
          
          pList.push(
            item.Createfolders = await clientApi.api.postNuxeoDocumentCreatefolders({
              templateId: props.id,
              layoutId: item.id,
              name: item.previewName,
              type: item.documentType,
              idOrPath: item.path,
              parentId,
              properties: item.properties
            }).then(res => res.data)
          )
        } else {
          let defaultValue = {}
          if (item.metadataValue) defaultValue = JSON.parse(item.metadataValue)
          const document = {
            templateId: props.id,
            layoutId: item.parentId,
            name: item.previewName ? item.previewName : getMetaName({
              docName: item.docName,
              ...defaultValue
            }, item),
            idOrPath: item.path,
            parentId,
            type: item.documentType,
            properties: item.properties
            // languages: file.languages,
            // properties: {}
          }
          const formData: any = new FormData()
          formData.append('files', item.raw)
          formData.append('document', JSON.stringify(document))
          pList.push(
            clientApi.api.postNuxeoDocumentCreatedocument(formData).then(res => res.data)
          )
        }
        item.status = 'finish'
      } catch (error) {
        item.status = 'skip'
      }
      await new Promise(resolve => setTimeout(async () => {
        if (item.children) await uploadHandler(item.children, item.path, item.Createfolders.id, item.status)
        resolve(500)
      }, 1000))
    })
  }
}

// #endregion

// #region module: init
async function handleOpen(cabinetTemplate: any, path: string, id: string) {
  state.cabinetTemplate = cabinetTemplate
  state.rootDetail.idOrPath = path
  state.rootDetail.id = id
  state.visible = true
  state.loading = false
  state.treeLoading = true
  try {
    initTreeData(state.cabinetTemplate.children)
    state.treeData = state.cabinetTemplate.children

    setTimeout(() => {
      if (state.treeData[0]) {
        FolderCabinetUploadTreeRef.value.treeRef.setCurrentKey(state.treeData[0].id)
        FolderCabinetUploadTreeRef.value.handleNodeClick(state.treeData[0])
      }
    })
  } catch (error) {

  }
  state.treeLoading = false
}

function initTreeData(children: any, parentId: string = '') {
  children.forEach(async (item: any) => {
    item.isLack = false
    if (parentId) item.parentId = parentId
    if (item.folder === true) {
      item.properties = {}
    }
    let defaultValue = {}
    if (item.metadataValue) defaultValue = JSON.parse(item.metadataValue)
    item.previewName = getMetaName({
      docName: item.label,
      ...defaultValue
    }, item)

    if (item.children) initTreeData(item.children, item.id)
    else item.children = []
  })
}

function getLabelList(row: any) {
  const labelRule = row.labelRule ? JSON.parse(row.labelRule) : [
    { dataType: 'string', metadata: 'fc:docTitle', noDelete: true }
  ]
  return labelRule
}

function getMetaName(formData: any = {}, row: any) {
  const date = new Date()
  const labelRule = getLabelList(row)
  return labelRule.reduce((prev: any, rule: any, index: number) => {
    const joiner = index === 0 ? '' : '-'
    if (!rule.metadata) rule.metadata = rule.metaData
    if (rule.metadata === 'fc:createDate') {
      prev += joiner + formatDate(date, 'YYYY-MM-DD')
    } else if (rule.metadata === 'fc:label') {
      prev += joiner + formData.label
    } else if (rule.metadata === 'fc:creator') {
      prev += joiner + userId
    } else if (rule.metadata === 'fc:docTitle') {
      if (!formData.docName) prev += joiner + ''
      else prev += joiner + formData.docName
    } else if (rule.dataType === 'date') {
      if (!formData[rule.metadata]) prev += joiner + ''
      else prev += joiner + formatDate(formData[rule.metadata], 'YYYY-MM-DD')
    } else {
      if (!formData[rule.metadata]) prev += joiner + ''
      else prev += joiner + formData[rule.metadata]
    }
    return prev
  }, '')
}

// #endregion

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>
main {
}
</style>
