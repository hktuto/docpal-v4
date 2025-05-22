<template>
  <el-dialog
    style="--scroll-dialog-height: 80vh"
    v-model="state.visible"
    :title="$t('folderCabinet.newItem')"
    :close-on-click-modal="false"
    class="scroll-dialog"
    append-to-body
  >
    <main>
      <FolderCabinetCreateUploadTree ref="FolderCabinetUploadTreeRef" :treeData="state.treeData" v-loading="state.treeLoading"> </FolderCabinetCreateUploadTree>
    </main>
    <template #footer>
      <el-button id="FolderCabinet__AllowOtherFilesCabinet__NewItem__Next__Submit" type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { clientApi } from 'api'
import { ElMessage } from 'element-plus'

const props = defineProps(['id'])
const emits = defineEmits(['refresh'])
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
  try {
    const uploadList = await FolderCabinetUploadTreeRef.value.getData(true)
    if (!uploadList) {
      throw new Error('')
    }
    // 后端folder-cabinet有延时，立即上传folder-cabinet不起作用
    setTimeout(async () => {
      await uploadFiles(uploadList, state.rootDetail.idOrPath)
      state.loading = false
      state.visible = false
      ElMessage.success(
        t('tip_createdSuccessMsg', {
          modelName: t('common_item'),
          name: uploadList[0].previewName
        })
      )
      emits('refresh')
    }, 2000)
  } catch (error) {
    console.log(error)
  }
  async function uploadFiles(fileTree: any, parentPath: string) {
    const uploadPromises = fileTree.map((item: any) => {
      if (item.folder) {
        item.path = parentPath + '/' + item.label
        return createDirectory(item).then((dir: any) => {
          if (dir?.id && item.children) uploadFiles(item.children, item.path)
        })
      } else {
        return uploadFile(item, parentPath)
      }
    })
    await Promise.all(uploadPromises)
    // for (const item of fileTree) {
    //   item.path = parentPath + '/' + item.label
    //   if (item.folder) {
    //     // 如果是目录，先创建目录
    //     const dir: any = await createDirectory(item)
    //     // 然后递归上传子文件
    //     if(dir.id && item.children) await uploadFiles(item.children, item.path)
    //   } else {
    //     // 如果是文件，上传文件
    //     await uploadFile(item)
    //   }
    // }
  }
  async function createDirectory(directory: any) {
    let defaultValue = {}
    if (directory.metadataValue) defaultValue = JSON.parse(directory.metadataValue)
    const name = directory.previewName ? directory.previewName : getMetaName(
      {
        label: directory.label,
        ...defaultValue
      },
      directory
    )
    return await clientApi.api
      .postNuxeoDocumentCreatefolders({
        templateId: props.id,
        layoutId: directory.id,
        name,
        type: directory.documentType,
        idOrPath: directory.path,
        properties: directory.properties
      })
      .then((res) => res.data)
  }
  async function uploadFile(file: any, parentPath: string) {
    let defaultValue = {}
    if (file.metadataValue) defaultValue = JSON.parse(file.metadataValue)
    const name = file.previewName ? file.previewName : getMetaName(
      {
        label: file.label,
        docName: file.docName,
        ...defaultValue
      },
      file
    )

    const document = {
      templateId: props.id,
      layoutId: file.parentId,
      name,
      idOrPath:  parentPath + '/' + name,
      type: file.documentType,
      properties: file.properties
    }
    const formData: any = new FormData()
    formData.append('files', file.raw)
    formData.append('document', JSON.stringify(document))
    return await clientApi.api.postNuxeoDocumentCreatedocument(formData).then((res) => res.data)
  }
}

// #endregion

// #region module: init
async function handleOpen(cabinetTemplate: any, idOrPath: string) {
  state.cabinetTemplate = cabinetTemplate
  state.rootDetail.idOrPath = idOrPath
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
    console.log(error)
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
    item.previewName = getMetaName(
      {
        ...defaultValue,
        docName: item.label,
        label: item.label
      },
      item
    )

    if (item.children) initTreeData(item.children, item.id)
    else item.children = []
  })
}

function getLabelList(row: any) {
  return row.labelRule ? JSON.parse(row.labelRule) : [{ dataType: 'string', metadata: 'fc:docTitle', noDelete: true }]
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
