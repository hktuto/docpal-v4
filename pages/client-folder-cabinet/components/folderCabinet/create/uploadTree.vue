<template>
  <div class="new-item-child">
    <el-tree
      ref="treeRef"
      :data="treeData"
      :props="state.defaultProps"
      nodeKey="id"
      default-expand-all
      :expand-on-click-node="false"
      :highlight-current="true"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <div class="tree-item">
          <div>
            <el-button v-if="data.loading" size="small" text circle :loading="data.loading"></el-button>
            <SvgIcon v-if="data.folder" src="/icons/folder-general.svg"></SvgIcon>
            <SvgIcon v-else-if="data.folder === false" src="/icons/file-general.svg"></SvgIcon>
            <span :class="getCss(data)">
              {{ data.docName || data.label }}
            </span>
          </div>
          <div style="--icon-size: 18px">
            <SvgIcon v-if="showAddButton(data)" src="/icons/add.svg" @click="handleAddFile(data)"></SvgIcon>
            <SvgIcon v-if="data.raw" src="/icons/menu/trash.svg" @click="handleDeleteFile(data)"></SvgIcon>
          </div>
        </div>
      </template>
    </el-tree>
    <div>
      <template v-if="state.selectedRow && state.selectedRow.folder !== false">
        <div class="flex-x-start">
          <SvgIcon v-if="state.selectedRow.folder" class="el-icon--left" src="/icons/folder-general.svg"></SvgIcon>
          <SvgIcon v-else class="el-icon--left" src="/icons/file-general.svg"></SvgIcon>
          {{ state.selectedRow.docName || state.selectedRow.label }}
        </div>
        <div>
          {{ $t('tableHeader_labelRule') }}：
          <template v-for="(item, index) in getLabelList(state.selectedRow.labelRule)" :key="index">
            <el-tag>{{ $t(item.metadata || item.metaData) }}</el-tag>
            <template v-if="index !== getLabelList(state.selectedRow.labelRule).length - 1"> -</template>
          </template>
        </div>
        <el-text :type="hasPreviewName(state.selectedRow.previewName) ? '': 'danger'" style="margin-bottom: 15px">{{ $t('folderCabinet.previewName') }}：{{ state.selectedRow.previewName }}</el-text>
        <MetaRenderForm2 ref="MetaFormRef" mode="folderCabinet" @formChange="handleMetaChange"></MetaRenderForm2>
      </template>
      <template v-else>
        {{ $t('tip.clickFolderOrFileToSetMeta') }}
      </template>
    </div>
    <MetaRenderForm2 ref="MetaFormRef2" @formChange="handleMetaChange"></MetaRenderForm2>
    <input v-show="false" ref="fileUploaderRef" multiple type="file" @change="uploadHandler($event)" />
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox, ElMessage } from 'element-plus'

const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
  treeData: Object
}>()
const state = reactive<any>({
  defaultProps: {
    children: 'children',
    label: 'label'
  },
  treeItem: {},
  isCheck: true,
  selectedRow: {}
})
const userId: string = useUserId().value
const { t } = useI18n()
const treeRef = ref()
const MetaFormRef = ref()
const MetaFormRef2 = ref()

async function getData(isValidate: boolean = false) {
  state.isCheck = true
  try {
    const errorMessageList: any = []
    const nodeMap: any = Object.values(treeRef.value.store.nodesMap).reduce((prev: any, item: any) => {
      if (item.data.folder || (!item.data.folder && item.data.raw)) {
        prev[item.data.id] = {
          ...item.data
        }
        const errorMessage = getErrorMessage(prev[item.data.id])
        if (errorMessage) errorMessageList.push(errorMessage)
        delete prev[item.data.id].children
      }
      return prev
    }, {})
    if (isValidate) {
      if (errorMessageList.length > 0) {
        ElMessageBox.confirm(errorMessageList.join('<br>'), t('dpTip_warning'), {
          dangerouslyUseHTMLString: true,
          confirmButtonText: t('dpButtom_confirm'),
          showCancelButton: false
        })
        throw new Error('error')
      }
    }
    const result: any = []
    Object.values(nodeMap).forEach((item: any) => {
      if (item.folder !== false) {
        const parent = nodeMap[item.parentId]
        if (!!parent) {
          if (!parent.children) parent.children = []
          parent.children.push(item)
        } else {
          result.push(item)
        }
      }
    })
    return result
  } catch (error) {
  } finally {
  }

  function getErrorMessage(doc: any) {
    const message = []
    const labelRules = getLabelList(doc.labelRule)
    const requiredFields = labelRules.map((item: any) => item.metadata)
    const _requiredFields = requiredFields.filter((key) => !['fc:docTitle','fc:label', 'fc:createDate', 'fc:creator'].includes(key))
    _requiredFields.forEach((key) => {
      if (!doc.properties[key]) {
        message.push(`【${doc.properties.docName || doc.docName}】: ${key} is required`)
      }
    })
    return message.join('<br>')
  }
}

function getMetaName(formData: any = {}) {
  const labelRules = getLabelList(state.selectedRow.labelRule)
  let data = { ...formData }
  if (state.selectedRow?.properties) data = { ...data, ...state.selectedRow.properties }
  data.label = state.selectedRow.docName ? state.selectedRow.docName : state.selectedRow.label
  return getNameByLabelRule(labelRules, data)
}

async function handleNodeClick(row: any) {
  state.selectedRow = null
  await new Promise((resolve) => setTimeout(resolve, 10))
  state.selectedRow = row
  let defaultValue = {}
  if (state.selectedRow.metadataValue) defaultValue = JSON.parse(state.selectedRow.metadataValue)
  if (state.selectedRow.folder === false) return
  if (!state.selectedRow.properties) state.selectedRow.properties = {}
  // 用了 v-if，如果不用 nextTick 会报错
  nextTick(async () => {
    const labelRules = getLabelList(state.selectedRow.labelRule)
    const requiredFields = labelRules.map((item: any) => item.metadata)
    await MetaFormRef.value.init(state.selectedRow.documentType, {
      requiredFields
    })
    const properties = JSON.parse(JSON.stringify(state.selectedRow.properties))
    MetaFormRef.value.setData({
      docName: state.selectedRow.docName ? state.selectedRow.docName : row.label,
      ...defaultValue,
      ...state.selectedRow.properties
    })
  })
}

async function handleMetaChange(data: any) {
  state.selectedRow.properties = deepCopy(data.formModel)
  state.selectedRow.previewName = getMetaName()
}

// #region module: style
function getCss(data: any) {
  if (!state.isCheck) return ''
  if (data.folder === false && data.children && data.children.length === 0) {
    return 'lack-item'
  }
}

function showAddButton(data: any) {
  return data.folder === false && !(!data.multiple && data.children && data.children.length > 0)
}

// #endregion

// #region module: tree actions
const fileUploaderRef = ref()

function handleAddFile(treeItem: any) {
  state.treeItem = treeItem
  fileUploaderRef.value.click()
}

let num = 1

async function uploadHandler(e: any) {
  const files: any = Array.from(e.target.files)
  state.treeItem.loading = true
  const pList: any = []
  const childData: any = getParentChildren(state.treeItem)
  files.forEach(async (file: any) => {
    pList.push(append(file))
  })
  e.target.value = '' // 解决不能上传相同文件问题
  const res = await Promise.all(pList)
  state.treeItem.loading = false

  async function append(file: File) {
    const index = childData.findIndex((item: any) => item.label === file.name)
    if (index > -1) {
      ElMessage.warning('tip.fileExists')
      return
    }
    const names = file.name.split('.')
    names.pop()
    const param = {
      labelRule: state.treeItem.labelRule,
      metadataValue: state.treeItem.metadataValue,
      id: new Date().valueOf() + num++,
      raw: file,
      label: state.treeItem.label,
      docName: names.join('.'),
      parentId: state.treeItem.parentId,
      documentType: state.treeItem.documentType,
      properties: {}
    }
    treeRef.value.append(param, state.treeItem)
  }

  function getParentChildren(curTreeItem: any) {
    if (!curTreeItem.parentId) return
    const pNode = treeRef.value.getNode(curTreeItem.parentId)
    const children: any = []
    getChild([pNode])
    return children

    function getChild(nodes: any) {
      nodes.forEach((node: any) => {
        if (!!node && !node.isLeaf) {
          if (node.data && node.data.folder === false && node.data.children) {
            children.push(...node.data.children)
          }
          if (node.childNodes) getChild(node.childNodes)
        }
      })
    }
  }
}

function handleDeleteFile(treeItem: any) {
  treeRef.value.remove(treeItem)
}

// #endregion
defineExpose({
  getData,
  treeRef,
  getLabelList,
  getMetaName,
  handleNodeClick
})
</script>

<style lang="scss" scoped>
.new-item-child {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--app-space-xs);
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
}

.tree-item {
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
    gap: calc(var(--app-space-xs) / 3);
  }
}

.lack-item {
  color: red;
}

.scroll-dialog {
  height: 50vh;
}
</style>
<style lang="scss">
.msg-h4 {
  margin: unset;
  padding: unset;
}
</style>
