<script lang="tsx" setup>
import { useDebounceFn } from '@vueuse/core'
import { emitBus, EventType, useEventBus } from 'eventbus'
import { createDropableFolder, createDropableFile } from '#imports'
const cleanSelectedRowsBus = useEventBus(EventType.FILE_CLEAN_SELECTED_ROWS)
const listProvider = inject(BrowseListProviderKey)
const routerProvider = inject(MenuRouterKey)
import { clientApi } from 'api'

if (!listProvider || !routerProvider) {
  throw new Error('BrowseListProviderKey not found')
}
const { selectedRows, expandedItems } = defineProps<{
  selectedRows: any[],
  expandedItems: any[]
}>()
const copyDocumentList = useCopyDocumnetList()
const tableContainer = ref<HTMLElement>()
const emits = defineEmits(['selectedChange'])

async function loadData(entry: any[], path?: string, pageNum: number = 0) {
  const { data } = await listProvider?.getchildApi({ idOrPath: path, pageSize: 1000, pageNum })
  data.entryList.forEach((item: any) => {
    item.parentRef = path
  })
  entry.push(...data.entryList)
  if (data.isNextPageAvailable) {
    return loadData(entry, path, pageNum + 1)
  } else {
    return entry
  }
}

function sortEntry(a:any, b:any) {
  if (a.isFolder === b.isFolder) {
    return a.name.localeCompare(b.name)
  }
  return b.isFolder ? 1 : -1
}

function resursiveLoadChild(checkList: any[] = [], treeData: any[], result: any[] = []) {
  checkList.forEach((row, index) => {
    const rowData = treeData.find((el) => el.id === row)
    console.log("found", rowData, row)
    if (rowData) {
      if (!tableRef.value?.isTreeExpandByRow(rowData)) {
        result.push(rowData)
      } else {
        result = resursiveLoadChild(checkList, rowData.children, result)
      }
    }
  })
  return result
}
const reopenFolder = useDebounceFn(() => {
  if (!listProvider?.docDetail?.value) {
    console.log("no docDetail")
    return
  }
  console.log("Check list", expandedItems)
  if (!tableRef.value || expandedItems.length === 0) return
  const tableData = tableRef.value.getData()
  let needExpandList: any[] = resursiveLoadChild(expandedItems, tableData, [])

  tableRef.value?.setTreeExpand(needExpandList, true)
  // get table opened row
}, 300)

const { tableConfig, tableEvent, tableRef, reload, cleanSelectedRows } = useVxeTable({
  id: 'browseTableSetting',
  api: async (pageParams: any) => {
    cleanSelectedRows()
    const data = await loadData([], listProvider.idOrPath?.value || '/')
    data.sort(sortEntry)
    emits('selectedChange', [])
    return data
  },
  childChangeHander: () => {
    tableChildChangeHandler()
    reopenFolder()
  },
  columns: [
    {
      type: 'checkbox',
      fixed: 'left',
      width: 50
    },
    {
      field: 'name',
      title: 'document_name',
      minWidth: 200,
      treeNode: true,
      type: 'html',
      formatter: ({ cellValue, row }: any) => {
        let icon = '/icons/doc/file.svg'
        if (row.isFolder) {
          icon = '/icons/doc/folder.svg'
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        // get differnent icon base on row.mimeType
        if (!row.mimeType) {
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        const mimeType = row.mimeType
        if (mimeType?.startsWith('image')) {
          icon = '/icons/doc/image.svg'
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        if (mimeType?.startsWith('video')) {
          icon = '/icons/doc/video.svg'
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        if (mimeType?.startsWith('audio')) {
          icon = '/icons/doc/audio.svg'
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        if (mimeType?.startsWith('application/pdf')) {
          icon = '/icons/doc/pdf.svg'
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        if (mimeType?.startsWith('text')) {
          icon = '/icons/doc/text.svg'
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        if (mimeType?.startsWith('application/zip')) {
          icon = '/icons/doc/zip.svg'
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        if (mimeType?.startsWith('application/vnd.ms-excel') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
          icon = '/icons/doc/excel.svg'
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        if (mimeType?.startsWith('application/msword') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
          icon = `/icons/doc/word.svg`
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        // if mimetype is ppt, return ppt src
        if (
          mimeType?.startsWith('application/vnd.ms-powerpoint') ||
          mimeType?.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')
        ) {
          icon = `/icons/doc/ppt.svg`
          return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
        }
        return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
      }
    },
    {
      field: 'mimeType',
      title: 'search.mimeTypes',
      formatter: ({ cellValue }: any) => {
        return mimeTypeToExtension(cellValue)
      }
    },
    {
      field: 'documentType',
      title: 'docType_documentType'
    },
    {
      field: 'fileSize',
      title: 'search.size',
      formatter: ({ cellValue }: any) => {
        return formatFileSize(cellValue)
      }
    },
    {
      field: 'modifiedDate',
      title: 'table_modifiedDate',
      formatter: ({ cellValue }: any) => {
        return formatDate(cellValue)
      }
    },
    {
      field: 'createdDate',
      title: 'dpTable_createdDate',
      formatter: ({ cellValue }: any) => {
        return formatDate(cellValue)
      }
    },
    {
      field: 'fileModifiedDate',
      title: 'fileModifiedDate_label',
      formatter: ({ cellValue }: any) => {
        return formatDate(cellValue)
      }
    },
    {
      field: 'tags',
      title: 'rightDetail_tags',
      slots: {
        default: 'tags'
      }
    },
    {
      field: 'contributors',
      title: 'info_contributors'
    }
  ],
  customeToolBar: true,
  virtualScroll: true,
  remoteSort: false,
  remoteFilter: false,
  dblClickAction: ({ row, column, event }) => {
    dblClickHandler(row)
  },
  bodyActions: [
    [
      {
        code: 'docOpen',
        name: 'common_open',
        action: ({ row }: any) => {
          dblClickHandler(row)
        }
      },
      {
        code: 'docActionAddFolder',
        name: 'filePopover_newFolder',
        action: ({ row }) => {
          const doc = row || listProvider.docDetail?.value
          const ev = new CustomEvent('docActionAddFolder', { detail: doc })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionNewFile',
        name: 'filePopover_newFile',
        action: ({ row }) => {
          const doc = row || listProvider.docDetail?.value
          const ev = new CustomEvent('docActionNewFile', { detail: doc })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionUploadFile',
        name: 'filePopover_uploadFile',
        action: ({ row }) => {
          const doc = row || listProvider.docDetail?.value
          const ev = new CustomEvent('docActionUploadFile', { detail: doc })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionUploadFolder',
        name: 'filePopover_uploadFolder',
        action: ({ row }) => {
          const doc = row || listProvider.docDetail?.value
          const ev = new CustomEvent('docActionUploadFolder', { detail: doc })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionRename',
        name: 'filePopover_rename',
        action: ({ row }) => {
          const ev = new CustomEvent('docActionRename', { detail: row })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionChangeDocType',
        name: 'filePopover_changeDocType',
        action: ({ row }) => {
          const ev = new CustomEvent('docActionChangeDocType', { detail: row })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docWatermark',
        name: 'filePopover_watermark',
        action: async ({ row }) => {
          const detail = await clientApi.api.postNuxeoDocument({ idOrPath: row.id }).then((res) => res.data)
          const ev = new CustomEvent('docWatermark', { detail: detail })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionCopy',
        name: 'filePopover_copy',
        action: ({ row }) => {
          const ev = new CustomEvent('docActionCopy', { detail: row })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionCut',
        name: 'filePopover_cut',
        action: ({ row }) => {
          const ev = new CustomEvent('docActionCut', { detail: row })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionPaste',
        name: 'filePopover_paste',
        action: ({ row }) => {
          const doc = row || listProvider.docDetail?.value
          const ev = new CustomEvent('docActionPaste', { detail: doc })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionInternalShare',
        name: 'filePopover_internalShare',
        action: ({ row }) => {
          const ev = new CustomEvent('docActionInternalShare', { detail: row })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionDelete',
        name: 'filePopover_delete',
        action: async ({ row }) => {
          const detail = await clientApi.api.postNuxeoDocument({ idOrPath: row.id }).then((res) => res.data)
          const ev = new CustomEvent('docActionDelete', { detail: detail })
          document.dispatchEvent(ev)
        }
      },
      {
        code: 'docActionRefresh',
        name: 'common_refresh',
        action: ({ row }) => {
          const doc = row || listProvider.docDetail?.value
          reload()
        }
      },
      {
        code: 'docActionNewTab',
        name: 'rightClick.newTab',
        action: ({ row }) => {
          if (row.source === 'tempFile') {
            const newItem = createAiUploadDetail({
              id: row.doc.uploadId
            })
            routerProvider?.navigateTo(newItem, true)
            return
          }
          if (row.isFolder) {
            const link = createBrowseListPageParams({
              idOrPath: row.id
            })
            routerProvider?.navigateTo(link, true)
            return
          }
          const detailLink = createDetailPageParams({
            idOrPath: row.id,
            docName: row.name,
            showHeaderAction: true
          })
          routerProvider?.navigateTo(detailLink, true)
        }
      },
      {
        code: 'docActionDownload',
        name: 'rightClick.download',
        action: ({ row }) => {
          downloadHandler(row)
        }
      }
    ]
  ],
  additionalPermission: async ({ row }) => {
    const userId = useUserId()
    if (!row) {
      return getPermission(listProvider.docDetail?.value.id, userId.value)
    }

    const permission = await getPermission(row.id, userId.value)
    return permission
  },
  permissionMethod: ({
    options,
    code,
    column,
    row,
    rowIndex,
    additionalData
  }: any): {
    visible: boolean
    disabled: boolean
  } => {
    // if click on empty row, return empty
    if (!row) {
      if (code === 'docActionRefresh') {
        return {
          visible: true,
          disabled: false
        }
      }
      if (code === 'docActionPaste') {
        return {
          visible:
            AllowTo({
              feature: 'ReadWrite',
              permission: additionalData
            }) && copyDocumentList.value.length > 0,
          disabled: false
        }
      }
      const docDetail = listProvider.docDetail?.value
      // check if docDetail path is home '/'
      if (docDetail.path === '/') {
        return {
          visible: false,
          disabled: false
        }
      }
      // if(docDetail && docDetail.idOrPath === '/') {
      const otherPublicAction = ['docActionAddFolder', 'docActionNewFile', 'docActionUploadFile', 'docActionUploadFolder']
      if (otherPublicAction.includes(code)) {
        return {
          visible: AllowTo({ feature: 'ReadWrite', permission: additionalData }),
          disabled: false
        }
      }
      return {
        visible: false,
        disabled: false
      }
    }
    const publicActionsCode = ['docActionRefresh', 'docActionNewTab', 'docOpen']
    if (publicActionsCode.includes(code)) {
      return { visible: true, disabled: false }
    }
    // hide all action when click on temp file
    if (row.source === 'tempFile') {
      return { visible: false, disabled: false }
    }
    // need other permissiion check list
    if (code === 'docActionPaste') {
      return {
        visible:
          AllowTo({
            feature: 'ReadWrite',
            permission: additionalData
          }) && copyDocumentList.value.length > 0,
        disabled: false
      }
    }
    const actionThatFolderAndFileHave = [
      'docActionRename',
      'docActionInternalShare',
      'docActionChangeDocType',
      'docActionCopy',
      'docActionCut',
      'docActionPaste',
      'docActionDelete'
    ]
    if (actionThatFolderAndFileHave.includes(code)) {
      const ManageCode = ['docActionInternalShare']
      if (ManageCode.includes(code)) {
        return {
          visible: AllowTo({ feature: 'ManageRecord', permission: additionalData }),
          disabled: false
        }
      }
      return {
        visible: AllowTo({ feature: 'ReadWrite', permission: additionalData }),
        disabled: false
      }
    }
    // get permission
    const folderActionsCode = ['docActionAddFolder', 'docActionNewFile', 'docActionUploadFile', 'docActionUploadFolder']
    // handle folder actions
    if (folderActionsCode.includes(code)) {
      return {
        visible: row.isFolder && AllowTo({ feature: 'ReadWrite', permission: additionalData }),
        disabled: false
      }
    } else {
      return {
        visible: !row.isFolder && AllowTo({ feature: 'ReadWrite', permission: additionalData }),
        disabled: false
      }
    }
  },
  selectChangeHander: (selectedRows: any[]) => {
    // check if selectedRows is not Folder
    if (selectedRows.length === 0) {
      emits('selectedChange', [])
      return
    }
    emits('selectedChange', selectedRows)
  },
  optionalConfig: {
    treeConfig: {
      transform: true,
      parentField: 'parentId',
      lazy: true,
      indent: 20,
      showLine: true,
      hasChildField: 'isFolder',
      loadMethod: async (params) => {
        const entry = await loadAllChildren([], params.row.id)
        return entry.sort(sortEntry)
      }
    },
    checkboxConfig: {
      checkStrictly: true,
      showHeader: false,
      highlight: true,
      range: false,
      trigger: 'cell',
      visibleMethod: ({ row }: any) => !row.isFolder && row.source !== 'tempFile'
    },
    rowConfig: {
      height: 42,
      isCurrent: true,
      isHover: true,
      useKey: true
    },
    rowStyle: ({ rowIndex, row }) => {
      if (row.source === 'tempFile') {
        return {
          backgroundColor: 'var(--app-grey-800)'
        }
      }
    }
  },
  optionalEvent: {
    checkboxAll: ({ checked }) => {
      console.log('checkbox-all', checked)
    },
    toggleTreeExpand: ({ expanded, row }) => {
      if (expanded) {
        // check if item exist in expandedItems
        if (expandedItems.includes(row.id)) return
        expandedItems.push(row.id)
        routerProvider?.updateProps({
          expandedItems
        })
      } else {
        const index = expandedItems.findIndex((ex) => ex === row.id)
        if (index !== -1) expandedItems.splice(index, 1)
        routerProvider?.updateProps({
          expandedItems
        })
      }
    },
    // cellMouseenter: ({row, column, rowIndex}) => {
    // },
    cellMouseleave: ({ row, column, rowIndex }) => {
      emitBus(EventType.FILE_PREVIEW_CLOSE, row)
    },
    cellClick: ({ row, column, rowIndex }) => {
      if (column.field === 'name') {
        emitBus(EventType.FILE_PREVIEW_OPEN, row)
      } else {
        emitBus(EventType.FILE_PREVIEW_CLOSE, row)
      }
    }
  }
})

cleanSelectedRowsBus.on(cleanSelectedRows)

let tableDropZone: any
let dragableItemList: any[] = []
const tableChildChangeHandler = useDebounceFn(() => {
  if (!listProvider?.docDetail.value) {
    return
  }
  // body row may be empty when table is loading, create root drop zone first
  if (!tableDropZone) {
    tableDropZone = createRootDropZone(tableRef, listProvider?.docDetail)
  }
  const allBodyRow = tableRef.value?.$el.querySelectorAll('.vxe-table--main-wrapper .vxe-body--row')
  if (allBodyRow.length === 0) {
    console.log('no body row')
    return
  }
  // unregister all dragableItemList
  dragableItemList.forEach((item) => {
    // check if item is a function, if so, call it
    if (typeof item === 'function') {
      item()
    }
  })
  dragableItemList = []
  // register all dragableItemList
  allBodyRow.forEach((item: any) => {
    const rowid = item.getAttribute('rowid')
    if (!rowid) return
    const rowData = tableRef.value?.getRowById(rowid)

    if (!rowData) return
    if (rowData.isFolder) {
      dragableItemList.push(createDropableFolder(item, rowData, tableRef))
    } else {
      dragableItemList.push(createDropableFile(item, rowData, tableRef))
    }
  })
}, 100)

function dblClickHandler(row: any) {
  if (row.source === 'tempFile') {
    const newItem = createAiUploadDetail({
      id: row.uploadId
    })
    routerProvider?.navigateTo(newItem, true)
    return
  }
  if (row.isFolder) {
    routerProvider?.updateProps({
      expandedItems:[]
    })
    listProvider?.changeRoute(row.path)
  } else {
    const params = createDetailPageParams({
      idOrPath: row.id,
      docName: row.name
    })
    routerProvider?.navigateTo(params)
  }
}

async function loadAllChildren(entry: any[] = [], id?: string, pageNum: number = 0) {
  const { data } = await listProvider?.getchildApi({ idOrPath: id, pageSize: 1000, pageNum })
  data.entryList.forEach((item: any) => {
    item.parentRef = id
  })
  entry.push(...data.entryList)
  if (data.isNextPageAvailable) {
    return loadAllChildren(entry, id, pageNum + 1)
  }
  // tableRef.value?.loadData([...tableConfig.data, ...entry])
  return entry
}

function changeRoute() {
  if (tableRef.value) {
    tableRef.value.commitProxy('reload')
  }
}

function selectAll() {
  if (tableRef.value) {
    tableRef.value.setAllCheckboxRow(true)
  }
}

function cleanSelected() {
  if (tableRef.value) {
    cleanSelectedRows()
    emits('selectedChange', [])
  }
}

onActivated(() => {})

onDeactivated(() => {
  if (tableDropZone) {
    tableDropZone()
  }
  if (dragableItemList) {
    dragableItemList.forEach((item) => {
      // check if item is a function, if so, call it
      if (typeof item === 'function') {
        item()
      }
    })
  }
  emitBus(EventType.FILE_PREVIEW_CLOSE)

  cleanSelectedRowsBus.off(cleanSelectedRows)
})

watch(
  () => listProvider.idOrPath,
  () => {
    if (listProvider?.idOrPath?.value) {
      changeRoute()
    }
  },
  {
    immediate: true,
    deep: true
  }
)

defineExpose({
  selectAll,
  cleanSelected,
  reload,
  tableRef,
  tableConfig,
  loadAllChildren
})
</script>

<template>
  <div ref="tableContainer" class="tableContainer">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <slot name="toolbar_buttons" />
      </template>
      <template #toolbarTools>
        <slot name="toolbarTools" />
      </template>
      <template #tags="{ row, index }">
        <el-tag class="el-icon--left table-tag" v-for="item in row.tags">
          {{ item }}
        </el-tag>
      </template>
    </VxeGrid>
  </div>
</template>

<style lang="scss" scoped>
.tableContainer {
  width: 100%;
  height: 100%;
  position: relative;
  :deep(.is-dragging) {
    background: var(--app-grey-900);
    opacity: 0.5;
  }
  :deep(.dropOver) {
    // overflow: hidden;
    background: var(--app-grey-900);
    --vxe-ui-layout-background-color: var(--app-grey-900);
  }
  &.selected {
    :deep(.vxe-buttons--wrapper) {
      border-radius: var(--app-border-radius-m);
      // overflow: hidden;
      background: var(--app-grey-900);
      padding-block: var(--app-space-xs);
      --vxe-ui-layout-background-color: var(--app-grey-900);
    }
  }

  :deep(.browseFileIcon) {
    width: calc(var(--app-space-m) * 1.5);
    height: calc(var(--app-space-m) * 1.5);
  }

  :deep(.browseNameCell) {
    display: flex;
    align-items: center;
    gap: var(--app-space-s);
    cursor: pointer;
  }
}
</style>
