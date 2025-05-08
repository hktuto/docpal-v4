<script setup lang="ts">
import {clientApi } from 'api';
function createRadomRight() {

}
const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
    idOrPath: string
}>()
const idOrPath = toRefs(props).idOrPath
const roles = useRoleList()
const { init, flatRole } = useRBAC()

function createRadomPermission() {
  let possible = ['Read', "Edit", 'Print', 'Delete', 'Manage']
  let result = []
  // 50 % can read, 50% can edit
  const canRead = Math.floor(Math.random() * 2)
  const canEdit = Math.floor(Math.random() * 2)
  const canPrint = Math.floor(Math.random() * 2)
  const canDelete = Math.floor(Math.random() * 2)
  const canManage = Math.floor(Math.random() * 2)
  if(canRead > 0){
    result.push('Read')
    if(canEdit > 0){
      result.push('Edit')
    }
    if(canPrint > 0){
      result.push('Print')
    }
    if(canDelete > 0){
      result.push('Delete')
    }
    if(canManage > 0){
      result.push('Manage')
    }
  }
  return result
}
async function loadData(entry: any[], path?: string, pageNum: number = 0) {
    const {data} = await clientApi.api.postNuxeoDocumentChildrenThumbnailV2({idOrPath: path, pageSize: 1000, pageNum})
    data.entryList.forEach((item: any) => {
      item.parentRef = path
      // create fake permission
      item.permission = flatRole.value.reduce( (prev: any, role: any) => {
        prev[role] = createRadomPermission()
        return prev
      }, {})
    })
    entry.push(...data.entryList)
    if (data.isNextPageAvailable) {
        return loadData(entry, path, pageNum + 1)
    } else {
        return entry
    }
}

function sortEntry(a, b) {
    if (a.isFolder === b.isFolder) {
        return a.name.localeCompare(b.name)
    }
    return b.isFolder ? 1 : -1
}
const {tableConfig, tableEvent, tableRef, reload} = useVxeTable({
    id: 'userRoleTableSetting',
    api: async (pageParams: any) => {
        const data = await loadData([], idOrPath.value || '/')
        data.sort(sortEntry)
        return data
    },
    columns: [
        {
            field: 'name',
            title: 'document_name',
            minWidth: 200,
            treeNode: true,
            type: 'html',
            fixed: "left",
            formatter: ({cellValue, row}: any) => {
                let icon = '/icons/doc/file.svg';
                if (row.isFolder) {
                    icon = '/icons/doc/folder.svg';
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
                }
                // get differnent icon base on row.mimeType
                if(!row.mimeType) {
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
                }
                const mimeType = row.mimeType
                if(mimeType?.startsWith('image')){
                    icon = '/icons/doc/image.svg';
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
                }
                if(mimeType?.startsWith('video')){
                    icon = '/icons/doc/video.svg';
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
                }
                if(mimeType?.startsWith('audio')){
                    icon = '/icons/doc/audio.svg';
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
                }
                if(mimeType?.startsWith('application/pdf')){
                    icon = '/icons/doc/pdf.svg';
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
                }
                if(mimeType?.startsWith('text')){
                    icon = '/icons/doc/text.svg';
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
                }
                if(mimeType?.startsWith('application/zip')){    
                    icon = '/icons/doc/zip.svg';
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
                }
                if(mimeType?.startsWith('application/vnd.ms-excel') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')){
                    icon = '/icons/doc/excel.svg';
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
                }
                if(mimeType?.startsWith('application/msword') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                    icon = `/icons/doc/word.svg`
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `

                }
                // if mimetype is ppt, return ppt src
                if(mimeType?.startsWith('application/vnd.ms-powerpoint') || mimeType?.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
                    icon = `/icons/doc/ppt.svg`
                    return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `

                }
                return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `

            }
        },
        
        // {
        //     field: 'documentType',
        //     title: 'docType_documentType',
        // },
        
        // { type: 'expand', width: 80, slots: { content: 'expand_content' } }
    ],
    customeToolBar: true,
    virtualScroll: true,
    remoteSort: false,
    remoteFilter: false,
    export: true,
    dblClickAction: ({row, column, event}) => {
      if (row.isFolder){
        changeRoute(row.id)
      }
    },
    optionalConfig: {
        treeConfig: {
            transform: true,
            rowField: 'id',
            parentField: 'parentId',
            lazy: true,
            indent: 20,
            showLine: true,
            hasChildField: 'isFolder',
            loadMethod: async (params) => {
                const entry = await loadData([], params.row.id)
                return entry.sort(sortEntry)
            }
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
    },
    
})

function changeRoute(path: string) {
  // change route, update tab
  // clean filter
  routerProvider?.updateProps({
    idOrPath: path,
  })
}
onBeforeMount(() => {
  init()
  // set columns base on role
  
})
onMounted(() => {
  const columns = tableConfig.columns
  flatRole.value.forEach((item) => {
      columns.push({
        title: item,
        width: 200,
        slots: {
          default: item
        }
    })
  })
  columns.push({
    type: 'expand',
    fixed: 'right',
    slots: {
      content: 'expand_content'
    }
  })
  // nextTick(() => {
  //   tableRef.value.reorderColumn(columns)
  // })
})
watch(idOrPath, () => {
  if (idOrPath.value) {
    reload()
  }
}, {
  immediate: true
})

</script>


<template>
<div class="tableContainer">
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <UserRoleBreadcrumb :idOrPath="idOrPath" :home="home" @refresh="(idOrPath) => changeRoute(idOrPath)" />
        <slot name="toolbar_buttons" />
      </template>
      <template #toolbarTools>
        
        <slot name="toolbarTools" />
      </template>
      <template v-for="item in flatRole" :key="item" v-slot:[item]="{row}">
        {{ row.permission[item].join(', ') }}
      </template>
      
      <template #expand_content="{ row }">
        <!-- <div>Name：{{ row.name }}</div> -->
        <UserRoleTable :permission="row.permission" />
      </template>
    </VxeGrid>
</div>
</template>

<style lang="scss" scoped>
.tableContainer {
  width: 100%;
  height: 100%;
  padding: var(--app-space-s);
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
