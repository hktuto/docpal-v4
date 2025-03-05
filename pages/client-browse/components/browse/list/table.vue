<script lang="tsx" setup>
import { emitBus, EventType } from 'eventbus'
import { createDropableFolder, createDropableFile } from '#imports'
import dayjs from "dayjs";

const listProvider = inject(BrowseListProviderKey);
const routerProvider = inject(MenuRouterKey)
import {clientApi} from 'api'

if (!listProvider || !routerProvider) {
    throw new Error('BrowseListProviderKey not found')
}
const {selectedRows} = defineProps<{
    selectedRows: any[]
}>()
const copyDocumentList = useCopyDocumnetList()
const tableContainer = ref<HTMLElement>()
const emits = defineEmits(['selectedChange'])

async function loadData(entry: any[], path?: string, pageNum: number = 0) {
    const {data} = await listProvider?.getchildApi({idOrPath: path, pageSize: 1000, pageNum})
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


const {tableConfig, tableEvent, tableRef, reload, cleanSelectedRows} = useVxeTable({
    id: 'browseTableSetting',
    api: async (pageParams: any) => {
        cleanSelectedRows()
        const data = await loadData([], listProvider.idOrPath.value || '/')
        data.sort(sortEntry)
        emits('selectedChange', [])
        return data
    },
    childChangeHander: tableChildChangeHandler,
    columns: [
        {
            type: 'checkbox',
            fixed: 'left',
            width: 50,
        },
        {
            field: 'name',
            title: 'Name',
            minWidth: 60,
            treeNode: true,
            type: 'html',
            formatter: ({cellValue, row}: any) => {
                let icon = '/icons/doc/file.svg';
                if (row.isFolder) {
                    icon = '/icons/doc/folder.svg';
                }
                return `<span class="browseNameCell"><img src="${icon}" class="browseFileIcon" /> ${cellValue} ${row.source === 'tempFile' ? '(temp)' : ''}</span> `
            }
        },
        {
            field: 'mimeType',
            title: 'search.mimeTypes',
            minWidth: 60,
            formatter: ({cellValue}: any) => {
                return mimeTypeToExtension(cellValue)
            },
        },
        {
            field: 'documentType',
            title: 'docType_documentType',
            minWidth: 120,
        },
        {
            field: 'fileSize',
            title: 'search.size',
            formatter: ({cellValue}: any) => {
                return formatFileSize(cellValue)
            },
        },
        {
            field: 'modifiedDate',
            title: 'table_modifiedDate',
            formatter: ({ cellValue }:any) => {
                const format = useDisplayTimeFormat()
                return dayjs(cellValue).format(format.value)
            },
        },
        {
            field: 'createdDate',
            title: 'dpTable_createdDate',
            formatter: ({ cellValue }:any) => {
                const format = useDisplayTimeFormat()
                return dayjs(cellValue).format(format.value)
            },
        },
        {
            field: 'fileModifiedDate',
            title: 'fileModifiedDate_label',
            formatter: ({ cellValue }:any) => {
                const format = useDisplayTimeFormat()
                return dayjs(cellValue).format(format.value)
            },
        },
        {
            field: 'tags',
            title: 'rightDetail_tags',
            slots: {
                default: 'tags',
            }
        },
        {
            field: 'contributors',
            title: 'info_contributors',
        },

    ],
    customeToolBar: true,
    virtualScroll: true,
    remoteSort: false,
    remoteFilter: false,
    dblClickAction: ({row, column, event}) => {
        dblClickHandler(row)
    },
    bodyActions: [
        [
            {
                code: 'docOpen',
                name: 'common_open',
                action: ({row}: any) => {
                    dblClickHandler(row)
                }
            },
            {
                code: 'docActionAddFolder',
                name: 'filePopover_newFolder',
                action: ({row}) => {
                    const ev = new CustomEvent('docActionAddFolder', {detail: row})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionNewFile',
                name: 'filePopover_newFile',
                action: ({row}) => {
                    const doc = row || listProvider.docDetail.value
                    const ev = new CustomEvent('docActionNewFile', {detail: doc})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionUploadFile',
                name: 'filePopover_uploadFile',
                action: ({row}) => {
                    const doc = row || listProvider.docDetail.value
                    const ev = new CustomEvent('docActionUploadFile', {detail: doc})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionUploadFolder',
                name: 'filePopover_uploadFolder',
                action: ({row}) => {
                    const doc = row || listProvider.docDetail.value
                    const ev = new CustomEvent('docActionUploadFolder', {detail: doc})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionRename',
                name: 'filePopover_rename',
                action: ({row}) => {

                    const ev = new CustomEvent('docActionRename', {detail: row})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionChangeDocType',
                name: 'filePopover_changeDocType',
                action: ({row}) => {
                    const ev = new CustomEvent('docActionChangeDocType', {detail: row})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docWatermark',
                name: 'filePopover_watermark',
                action: async ({row}) => {
                    const detail = await clientApi.api.postNuxeoDocument({idOrPath: row.id}).then(res => res.data)
                    const ev = new CustomEvent('docWatermark', {detail: detail})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionCopy',
                name: 'filePopover_copy',
                action: ({row}) => {
                    const ev = new CustomEvent('docActionCopy', {detail: row})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionCut',
                name: 'filePopover_cut',
                action: ({row}) => {
                    const ev = new CustomEvent('docActionCut', {detail: row})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionPaste',
                name: 'filePopover_paste',
                action: ({row}) => {
                    const doc = row || listProvider.docDetail.value
                    const ev = new CustomEvent('docActionPaste', {detail: doc})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionInternalShare',
                name: 'filePopover_internalShare',
                action: ({row}) => {
                    const ev = new CustomEvent('docActionInternalShare', {detail: row})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionDelete',
                name: 'filePopover_delete',
                action: async({row}) => {
                    const detail = await clientApi.api.postNuxeoDocument({idOrPath: row.id}).then(res => res.data)
                    const ev = new CustomEvent('docActionDelete', {detail: detail})
                    document.dispatchEvent(ev)
                }
            },
            {
                code: 'docActionRefresh',
                name: 'common_refresh',
                action: ({row}) => {
                    const doc = row || listProvider.docDetail.value
                    reload()
                }
            },
            {
                code: 'docActionNewTab',
                name: "rightClick.newTab",
                action: ({row}) => {
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
                action: ({row}) => {
                    downloadHandler(row)
                }
            }
        ]
    ],
    additionalPermission: async ({row}) => {
        const userId = useUserId()
        if (!row) {
            return getPermission(listProvider.docDetail.value.id, userId.value)
        }

        const permission = await getPermission(row.id, userId.value)
        return permission
    },
    permissionMethod: ({options, code, column, row, rowIndex, additionalData}: any):{
        visible: boolean,
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
                    visible: AllowTo({
                        feature: 'ReadWrite',
                        permission: additionalData
                    }) && copyDocumentList.value.length > 0,
                    disabled: false
                }
            }
            const otherPublicAction = ['docActionAddFolder', 'docActionNewFile', 'docActionUploadFile', 'docActionUploadFolder']
            if (otherPublicAction.includes(code)) {
                return {
                    visible: AllowTo({feature: 'ReadWrite', permission: additionalData}),
                    disabled: false
                }
            }
            return {
                visible: false,
                disabled: false
            }
        }
        const publicActionsCode = ['docActionRefresh', 'docActionNewTab', 'docOpen'];
        if (publicActionsCode.includes(code)) {
            return {visible: true, disabled: false}
        }
        // hide all action when click on temp file
        if (row.source === 'tempFile') {
            return {visible: false, disabled: false}
        }
        // need other permissiion check list 
        if (code === 'docActionPaste') {
            return {
                visible: AllowTo({
                    feature: 'ReadWrite',
                    permission: additionalData
                }) && copyDocumentList.value.length > 0,
                disabled: false
            }
        }
        const actionThatFolderAndFileHave = ['docActionRename', 'docActionInternalShare', 'docActionChangeDocType', 'docActionCopy', 'docActionCut', 'docActionPaste', 'docActionDelete'];
        if (actionThatFolderAndFileHave.includes(code)) {
            const ManageCode = ['docActionInternalShare']
            if (ManageCode.includes(code)) {
                return {
                    visible: AllowTo({feature: 'ManageRecord', permission: additionalData}),
                    disabled: false
                }
            }
            return {
                visible: AllowTo({feature: 'ReadWrite', permission: additionalData}),
                disabled: false
            }
        }
        // get permission 
        const folderActionsCode = ['docActionAddFolder', 'docActionNewFile', 'docActionUploadFile', 'docActionUploadFolder']
        // handle folder actions
        if (folderActionsCode.includes(code)) {
            return {
                visible: row.isFolder && AllowTo({feature: 'ReadWrite', permission: additionalData}),
                disabled: false
            }
        } else {
            return {
                visible: !row.isFolder && AllowTo({feature: 'ReadWrite', permission: additionalData}),
                disabled: false
            }
        }
    },
    selectChangeHander: (selectedRows: any[]) => {
        emits('selectedChange', selectedRows)
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
                const entry = await loadAllChildren([], params.row.path)
                return entry.sort(sortEntry)
            }
        },
        checkboxConfig: {
            checkStrictly: true,
            showHeader: true,
            highlight: true,
            range: false,
            visibleMethod: ({row}: any) => !row.isFolder
        },
        rowConfig: {
            height: 60,
            isCurrent: true,
            isHover: true,
            useKey: true
        }
    },
    optionalEvent: {
        cellMouseenter: ({row, column, rowIndex}) => {
            if(column.field === 'name') {
                emitBus(EventType.FILE_PREVIEW_OPEN, row)
            }
        },
        cellMouseleave: ({row, column, rowIndex}) => {
            emitBus(EventType.FILE_PREVIEW_CLOSE, row)
        },
    }
})


let tableDropZone:any;
let dragableItemList:any[] = [];
function tableChildChangeHandler(args:any) {
    if(!listProvider?.docDetail.value) {
        return
    };
    // body row may be empty when table is loading, create root drop zone first
    if(!tableDropZone){
        tableDropZone = createRootDropZone(tableRef, listProvider?.docDetail)
    }
    const allBodyRow = tableRef.value.$el.querySelectorAll('.vxe-body--row')
    if(allBodyRow.length === 0) return;
    // unregister all dragableItemList
    dragableItemList.forEach(item => {
        // check if item is a function, if so, call it
        if (typeof item === 'function') {
            item();
        }
    })
    dragableItemList = [];
    // register all dragableItemList
    allBodyRow.forEach(item => {
        const rowid = item.getAttribute('rowid');
        if(!rowid) return;
        const rowData = tableRef.value.getRowById(rowid);

        if(!rowData) return;
        if(rowData.isFolder){
            dragableItemList.push(createDropableFolder(item,rowData, tableRef))
        }else{
            dragableItemList.push(createDropableFile(item, rowData, tableRef))
        }
    })
}

function dblClickHandler(row: any) {
    if (row.source === 'tempFile') {
        const newItem = createAiUploadDetail({
            id: row.uploadId
        })
        routerProvider?.navigateTo(newItem, true)
        return;
    }
    if (row.isFolder) {
        listProvider?.changeRoute(row.path)
    } else {
        const params = createDetailPageParams({
            idOrPath: row.id,
            docName: row.name,
        })
        routerProvider?.navigateTo(params)
    }
}


async function loadAllChildren(entry: any[] = [], path?: string, pageNum: number = 0) {
    tableConfig.loading = true
    const {data} = await listProvider?.getchildApi({idOrPath: path, pageSize: 1000, pageNum})
    entry.push(...data.entryList)
    if (data.isNextPageAvailable) {
        return loadAllChildren(entry, path, pageNum + 1)
    }
    tableConfig.loading = false
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
        tableRef.value.toggleAllCheckboxRow();
    }
}

function cleanSelected() {
    if (tableRef.value) {
        cleanSelectedRows();
        emits('selectedChange', [])
    }
}

onActivated(() => {
    
})

onDeactivated(() => {
    if(tableDropZone) {
        tableDropZone()
    }
    if(dragableItemList){
        dragableItemList.forEach(item => {
            // check if item is a function, if so, call it
            if (typeof item === 'function') {
                item();
            }
        })
    }
    emitBus(EventType.FILE_PREVIEW_CLOSE)
})


watch(() => listProvider.idOrPath, () => {
    if (listProvider.idOrPath.value) {
        changeRoute()
    }
}, {
    immediate: true,
    deep: true
})


defineExpose({
    selectAll,
    cleanSelected,
    reload
})

</script>


<template>
    <div ref="tableContainer" class="tableContainer">
        <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
            <template #toolbar_buttons>
                <slot name="toolbar_buttons"/>
            </template>
            <template #toolbarTools>
                <slot name="toolbarTools"/>
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
    :deep(.is-dragging){
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
        width: var(--app-space-m)
    }

    :deep(.browseNameCell) {
        display: flex;
        align-items: center;
        gap: var(--app-space-s);
        cursor: pointer;
    }
}
</style>