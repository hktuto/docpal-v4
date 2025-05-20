<script setup lang="ts">
import {clientApi } from 'api';

const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
    idOrPath: string
}>()
const idOrPath = toRefs(props).idOrPath
const roles = useRoleList()
const { init, flatRole, right } = useRBAC()
const selectedRole = ref();


function calcalteDisplayRole(row:any, key:string) {
  // key may contain . ,split the dot and loop to get the permission
  if( !row || !key) return key
  const keys = key.split('.')
  let value = row;
  for(let i = 0; i < keys.length; i++){
    value = value[keys[i]]
    console.log("value",keys, keys[i], value)
  }
  if(!value) return key
  const list =  value.filter((item) => !selectedRole.value || selectedRole.value.includes(item))
  return list.join(', ')
}

function createRadomPermission() {
  // create random permission
  let permission = {
    read:[],
    readWrite:[],
    manage:[],
  }
  flatRole.value.forEach((role) => {
    const canRead = Math.random() > 0.5
    const canWrite = Math.random() > 0.5
    const canManage = Math.random() > 0.2
    if(canRead){ 
      permission.read.push(role)
      if(canWrite){
        permission.readWrite.push(role)
        if(canManage){
          permission.manage.push(role)
        }
      }
    }
  })
  return permission;
}

async function loadData(entry: any[], path?: string, pageNum: number = 0) {
    const {data} = await clientApi.api.postNuxeoDocumentChildrenThumbnailV2({idOrPath: path, pageSize: 1000, pageNum})
    data.entryList.forEach((item: any) => {
      item.parentRef = path
      if(!item.permission) {
        item.permission = {}
      }
      item.permission = createRadomPermission()
      
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
const detailDialog = ref()
const selectedItem = ref()

const {tableConfig, tableEvent, tableRef, reload, cleanSelectedRows} = useVxeTable({
    id: 'userRoleTableSetting',
    api: async (pageParams: any) => {
        const data = await loadData([], idOrPath.value || '/')
        data.sort(sortEntry)
        return data
    },
    exportTool: true,
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
        ...right,
    ],
    customeToolBar: true,
    virtualScroll: true,
    remoteSort: false,
    remoteFilter: false,
    bodyActions: [
      [
        {
          code: 'edit',
          name: 'common_edit',
          action: ({row}) => {
            selectedItem.value = row;
            detailDialog.value.open(JSON.parse(JSON.stringify(row)))
          }
        }
      ]
    ],
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


async function updateData(newData:any) {
  // selectedItem.value = newData;
  // setRow 
  const update = await tableRef.value.setRow(selectedItem.value, newData)
  console.log("update", update)
}

function changeRoute(path: string) {
  // change route, update tab
  // clean filter
  routerProvider?.updateProps({
    idOrPath: path,
  })
}
onBeforeMount(() => {
  init()
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
        <ElSelect v-model="selectedRole" placeholder="Select Role" multiple style="min-width: 120px;">
          <ElOption v-for="item in flatRole" :key="item" :label="item" :value="item" />
        </ElSelect>
        <slot name="toolbarTools" />
      </template>
      <template v-for="item in right" v-slot:[`${item.slots.default}`]="{ row }">
        {{ calcalteDisplayRole(row, item.field) }}
      </template>
     
    </VxeGrid>
    <UserRoleDialog ref="detailDialog" @update="updateData" />
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
