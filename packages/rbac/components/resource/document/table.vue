<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'

import { adminApi } from 'api'
const props = defineProps<{
  id: string
  expandedItems: any[]
}>()

const { id, expandedItems = [] } = toRefs(props)


const emits = defineEmits(['idChange','expandedItemsChange'])

const selectedRow = ref<any>(null)

async function getChildApi(id:string = 'root'){
  return adminApi.api.getAclDocumentDocumentid(id).then((res) => res.data)
}

function recursiveLoadChild(checkList: any[] = [], treeData: any[], result: any[] = []) {
  checkList.forEach((row, index) => {
    const rowData = treeData.find((el) => el.id === row)
    if (rowData) {
      if (!tableRef.value?.isTreeExpandByRow(rowData)) {
        result.push(rowData)
      } else {
        result = recursiveLoadChild(checkList, rowData.children, result)
      }
    }
  })
  return result
}
const tableDialogRef = ref<any>(null)
function dblClickHandler(row: any) {
  if(!row.isFolder){
    tableDialogRef.value.open({...row})
  }else{
    emits('idChange', row.id)
  }
}


const reopenFolder = useDebounceFn(() => {
  if (!tableRef.value || expandedItems.value.length === 0) return
  const tableData = tableRef.value.getData()
  let needExpandList: any[] = recursiveLoadChild(expandedItems.value, tableData, [])

  tableRef.value?.setTreeExpand(needExpandList, true)
  // get table opened row
}, 300)

const { tableConfig, tableEvent, tableRef, reload} = useVxeTable({
  id: 'rbac-resource-document-table',
  api: async (pageParams: any) => {
    const data = await getChildApi(id.value || 'root')
    return data
  },
  virtualScroll: true,
  remoteSort: false,
  remoteFilter: false,
  childChangeHandler: () => {
    reopenFolder()
  },
  dblClickAction: ({ row, column, event }) => {
    dblClickHandler(row)
  },
  columns:[
    {
      field: 'name',
      title: 'document_name',
      minWidth: 200,
      treeNode: true,
      type: 'html',
      formatter: ({ cellValue, row }: any) => {
        let icon = '/icons/doc/file.svg'
        const mimeType = row.fileContent?.mime_type || ""
        // logic to get icon
        if (row.isFolder) {
          icon = '/icons/doc/folder.svg'
        }
        if (mimeType?.startsWith('image')) {
          icon = '/icons/doc/image.svg'
        }else if (mimeType?.startsWith('video')) {
          icon = '/icons/doc/video.svg'
        }else if (mimeType?.startsWith('audio')) {
          icon = '/icons/doc/audio.svg'
        }else if (mimeType?.startsWith('application/pdf')) {
          icon = '/icons/doc/pdf.svg'
        }else if (mimeType?.startsWith('application/zip')) {
          icon = '/icons/doc/zip.svg'
        }else if (mimeType?.startsWith('application/msword') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
          icon = `/icons/doc/word.svg`
        }else if (mimeType?.startsWith('application/vnd.ms-powerpoint') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
          icon = `/icons/doc/ppt.svg`
        }
        return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} </span> `
        
      }
    },
    {
      field: 'type',
      title: 'docType_documentType'
    },
  ],
  bodyActions: [
    [
      {
        code:'detail',
        name:'view detail',
        action:({row}:any)=>{
          console.log(row)
          tableDialogRef.value.open({...row})
        }
      },
      {
        code: 'toggleExpand',
        name: 'toggleExpand',
        action:({row}:any)=>{
          // TODO : toggle expand
          // tableRef.value.toggleTreeExpand(row)
        }
      }
    ]
  ],
  permissionMethod: ({ options, code, column, row, rowIndex, additionalData }: any): {
    visible: boolean
    disabled: boolean
  } => {
    if(code === 'toggleExpand'){
      return {
        visible: row.isFolder,
        disabled: false
      }
    }
    return {
      visible: true,
      disabled: false
    }
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
        const entry = await getChildApi(params.row.id)
        return entry
      }
    },
    checkboxConfig: {
      checkStrictly: true,
      showHeader: false,
      highlight: true,
      trigger: 'cell',
      visibleMethod: ({ row }: any) => row.source !== 'tempFile'
    },
    rowConfig: {
      height: 42,
      isCurrent: true,
      isHover: true,
      useKey: true
    },
    rowStyle: ({ rowIndex, row }) => {
      // TODO : remove this
      if (row.source === 'tempFile') {
        return {
          backgroundColor: 'var(--app-grey-800)'
        }
      }
    }
  },
  optionalEvent: {
    toggleTreeExpand: ({ expanded, row }) => {
      if (expanded) {
        // check if item exist in expandedItems
        if (expandedItems.value.includes(row.id)) return
        expandedItems.value.push(row.id)
        emits('expandedItemsChange', expandedItems.value)
      } else {
        const index = expandedItems.value.findIndex((ex) => ex === row.id)
        if (index !== -1) expandedItems.value.splice(index, 1)
        emits('expandedItemsChange', expandedItems.value)
      }
    }
  }
})

watch(id, () => {
  reload()
},{
  immediate: true
})
</script>

<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <ResourceDocumentBreadcrumb :id="id" @idChange="emits('idChange', $event)" />
    </template>
  </VxeGrid>
  <ResourceDocumentPermissionDialog ref="tableDialogRef" />
</template>


<style lang="scss" scoped>
.vxe-grid {
  :deep(.browseFileIcon){
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
