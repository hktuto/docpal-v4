import { get } from '@vueuse/core';
import {draggable, dropTargetForElements, monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { containsFiles, getFiles } from '@atlaskit/pragmatic-drag-and-drop/external/file';

import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { rowKey } from 'element-plus/es/components/table-v2/src/common.mjs';
import { clientApi } from 'api'
import { emitBus, EventType } from 'eventbus';
import { Loading } from 'element-plus/es/components/loading/src/service.mjs';
import { AppWrapper } from '#components';
const { createUploadRequest } = useUploadAIStore()
 
export const useDropFile = () => useState('browseDropFile', () => ([]));

const dragRowClassChange = (source:any, selected:boolean) => {
    const rows = Array.isArray(source.data.data) ? source.data.data : [source.data.data]
    rows.forEach((item:any) => {
        const rowId = item._X_ROW_KEY;
        const allRow = document.querySelectorAll(`tr[rowid="${rowId}"]`)
        allRow.forEach(item => {
            if(selected) {
                item.classList.add('is-dragging')
            }else{
                item.classList.remove('is-dragging')
            }
        })
    })
}
const resetAllClass = (tableRef:Ref<any>) => {
    const dropOverElements = document.querySelectorAll('.dropOver')
    const isDragging = document.querySelectorAll('.is-dragging')
    dropOverElements.forEach(item => {
        item.classList.remove('dropOver')
    })
    isDragging.forEach(item => {
        item.classList.remove('is-dragging')
    })
}
const tableSelectedMethod = (element:HTMLElement, selected = true) => {
    const rowid = element.getAttribute('rowid')
    // get all tr with that rowid
    const allRow = document.querySelectorAll(`tr[rowid="${rowid}"]`)
    allRow.forEach(item => {
        if(selected) {
            item.classList.add('dropOver')
        }else{
            item.classList.remove('dropOver')
        }
    })
}

export function createDropableFile(element:HTMLElement, row:any, tableRef: Ref<any>){
    console.log("createDropableFile", row, element)
    const dragData = {
        key: 'any',
        type: 'browseFile',
        data: row
    }
    return combine(draggable({
        element,
        getInitialData(){
            // check if table has selected rows, if so data should be selected rows
            const selectedRows = tableRef.value?.getCheckboxRecords() || []
            // check if draging item is in selected rows
            const isCurrentItemInSelectedRows = selectedRows.some((item:any) => item.id === dragData.data.id)
            if(selectedRows.length > 0 && isCurrentItemInSelectedRows) {
                dragData.data = selectedRows
            }
            return dragData
        },
        getInitialDataForExternal() {
            if((window as any).isDesktopMode) {
                const dataAsString = JSON.stringify(dragData)
                return {
                    ['text/plain']: dataAsString,
                }
            } else {
                return {
                    ['text/plain']: JSON.stringify(dragData),
                }
            }
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
            setCustomNativeDragPreview({
                nativeSetDragImage,
                getOffset: pointerOutsideOfPreview({
                    x: '16px',
                    y: '8px',
                }),
                render({ container }) {
                    // TODO: drag item may be multiple
                    const { $i18n } = useNuxtApp()
                    container.innerHTML = `<div class="dropPreviewFile">
                        <i class="lucide:folder-open" class="normal" />
                            ${Array.isArray(dragData.data) ?  $i18n.t('browse.selectedItem', {
                                count : dragData.data.length
                            }) : dragData.data.name}
                        </div>`;
                    console.log("render", container, dragData)
                },
            })
        },
        onDragStart({source}){
            console.log("onDragStart", source)
            emitBus(EventType.FILE_PREVIEW_CLOSE)
            dragRowClassChange(source, true)
            // console.log('item drag start', args)
        },
        onDrop(){
            resetAllClass(tableRef)
        },
        
     }),
    )
}

export function createDropableBreadcrumb(element:HTMLElement,row:any, tableRef: Ref<any>){
    return combine(
        
        dropTargetForElements({
            element,
            canDrop({ source }) {
                return source.data.type === 'browseFolder' || source.data.type === 'browseFile'
            },
            onDragEnter({self, location,source}) {
                resetAllClass(tableRef)
                element.classList.add('dropOver')
            },
            getIsSticky() {
                return true
            },
            onDragLeave(args){
                element.classList.remove('dropOver')
            },
            onDrop: async(args) => {
                // error handle
                if(args.location.current.dropTargets[0].element !== element) {
                    return
                }
                if(!args.source?.data?.data) {
                    return
                }
                element.classList.remove('dropOver')
                const { $i18n } = useNuxtApp()
                const dropItemDetail = await clientApi.api.postNuxeoDocument({idOrPath: row.id})
                if(!dropItemDetail.data || !dropItemDetail.data.parentRef) return
                ElMessageBox.confirm(
                    $i18n.t('browse.confirmMoveFile',{
                        target: row.name,
                        source: Array.isArray(args.source.data.data) ? $i18n.t('browse.selectedItem', {
                            count : args.source.data.data.length
                        }) : args.source.data.data.name
                    }),
                    {dangerouslyUseHTMLString: true,}
                ).then( async () => {
                    const copyItems = Array.isArray(args.source.data.data) ? args.source.data.data : [args.source.data.data]
                    //check duplicate'
                    
                    const { data:{hasDuplicateTitle} } = await clientApi.api.postNuxeoDocumentIsduplicatename({
                        path: row.path,
                        titles: copyItems.map(item => item.name)
                      }) as any
                    if (hasDuplicateTitle) {
                        ElMessage({
                            message: $i18n.t('dpTip_duplicateFileName') as string,
                            type: 'error'
                        })
                        return;
                    }
                    
                    for(const item of copyItems) {
                        const param = [ 
                            { idOrPath: item.path }, 
                            { idOrPath: row.path}
                        ]
                        const noti = ElNotification({
                            title: $i18n.t('move'),
                            icon: Loading,
                            dangerouslyUseHTMLString: true,
                            message: `<div title="${item.name}">${item.name}</div>`,
                            showClose: true,
                            customClass: 'loading-notification',
                            duration: 0,
                            position: 'bottom-right'
                        });
                        try{

                            await clientApi.api.postNuxeoDocumentMove(param)
                            const copyItemDetail = await clientApi.api.postNuxeoDocument({idOrPath: item.id})
                            if(copyItemDetail.data) {
                                emitBus(EventType.FILE_NEED_REFRESH, {
                                    relatedIdOrPath: copyItemDetail.data.parentRef,
                                })
                            }

                        }finally{
                            noti.close()
                        }
                    }
                    emitBus(EventType.FILE_NEED_REFRESH, {
                        relatedIdOrPath: dropItemDetail.data.parentRef,
                    })
                })
            },
        }),
        dropTargetForExternal({
            element,
            canDrop: containsFiles,
            onDragEnter({self, location,source}) {
                if(location.current.dropTargets[0].element !== element) {
                    return
                }
                resetAllClass(tableRef)
                element.classList.add('dropOver')
            },
            onDragLeave() {
                element.classList.remove('dropOver')
            },
            onDrop: async({source, location}) => {
                if(location.current.dropTargets[0].element !== element) {
                    return
                }
                const { $i18n } = useNuxtApp()
                // const files = await getFiles({ source });
                // console.log("external onDrop", files)
                const files = await addDataTransfer(source)
                console.log("external onDrop", files)
                if(files.length === 0) {
                    ElMessage.error($i18n.t('dpTip.uploadEmptyFile'))
                    return
                }
                createUploadRequest(row, files)
                const ev = new CustomEvent('openUploadDrawer', { detail: true })
                document.dispatchEvent(ev)
                resetAllClass(tableRef)
            },
        }),
        
)
}


export function createDropableFolder(element:HTMLElement,row:any, tableRef: Ref<any>){
    const dragData = {
        key: 'any',
        type: 'browseFile',
        data: row
    }
    return combine(
        draggable({
            element,
            getInitialData(){
                return dragData
            },
            getInitialDataForExternal() {
                if((window as any).isDesktopMode) {
                    const dataAsString = JSON.stringify(dragData)
                    return {
                        ['text/plain']: dataAsString,
                    }
                } else {
                    return {
                        ['text/plain']: JSON.stringify(dragData),
                    }
                }
            },
            onGenerateDragPreview({ nativeSetDragImage }) {
                setCustomNativeDragPreview({
                    nativeSetDragImage,
                    getOffset: pointerOutsideOfPreview({
                        x: '16px',
                        y: '8px',
                    }),
                    render({ container }) {
                        // TODO: drag item may be multiple
                        // const { $i18n } = useNuxtApp()
                        container.innerHTML = `<div class="dropPreviewFile">
                            <i class="lucide:folder-open" class="normal" />
                                ${dragData.data.name}
                            </div>`;
                        console.log("render", container, dragData)
                    },
                })
            },
            onDragStart({source}){
                emitBus(EventType.FILE_PREVIEW_CLOSE)
            }
        }),
        dropTargetForElements({
            element,
            canDrop({ source }) {
                return source.data.type === 'browseFolder' || source.data.type === 'browseFile'
            },
            onDragEnter({self, location,source}) {
                resetAllClass(tableRef)
                tableSelectedMethod(element, true)
            },
            getIsSticky() {
                return true
            },
            onDragLeave(args){
                tableSelectedMethod(element, false)

            },
            onDrop: async(args) => {
                // error handle
                if(args.location.current.dropTargets[0].element !== element) {
                    return
                }
                if(!args.source?.data?.data) {
                    return
                }
                element.classList.remove('dropOver')
                const { $i18n } = useNuxtApp()
                const dropItemDetail = await clientApi.api.postNuxeoDocument({idOrPath: row.id})
                console.log("drop on target", dropItemDetail.data)
                if(!dropItemDetail.data || !dropItemDetail.data.parentRef) return
                ElMessageBox.confirm(
                    $i18n.t('browse.confirmMoveFile',{
                        target: row.name,
                        source: Array.isArray(args.source.data.data) ? $i18n.t('browse.selectedItem', {
                            count : args.source.data.data.length
                        }) : args.source.data.data.name
                    }),
                    {dangerouslyUseHTMLString: true,}
                ).then( async () => {
                    const copyItems = Array.isArray(args.source.data.data) ? args.source.data.data : [args.source.data.data]
                    //check duplicate'
                    
                    const { data:{hasDuplicateTitle} } = await clientApi.api.postNuxeoDocumentIsduplicatename({
                        path: row.path,
                        titles: copyItems.map(item => item.name)
                      }) as any
                    console.log("hasDuplicateTitle", hasDuplicateTitle)
                    if (hasDuplicateTitle) {
                        ElMessage({
                            message: $i18n.t('dpTip_duplicateFileName') as string,
                            type: 'error'
                        })
                        return;
                    }
                    
                    for(const item of copyItems) {
                        console.log(item)
                        const param = [ 
                            { idOrPath: item.path }, 
                            { idOrPath: row.path}
                        ]
                        const noti = ElNotification({
                            title: $i18n.t('move'),
                            icon: Loading,
                            dangerouslyUseHTMLString: true,
                            message: `<div title="${item.name}">${item.name}</div>`,
                            showClose: true,
                            customClass: 'loading-notification',
                            duration: 0,
                            position: 'bottom-right'
                        });
                        try{

                            await clientApi.api.postNuxeoDocumentMove(param)
                            const copyItemDetail = await clientApi.api.postNuxeoDocument({idOrPath: item.id})
                            if(copyItemDetail.data) {
                                console.log("copyItemDetail", copyItemDetail.data)
                                emitBus(EventType.FILE_NEED_REFRESH, {
                                    relatedIdOrPath: copyItemDetail.data.parentRef,
                                })
                            }

                        }finally{
                            noti.close()
                        }
                    }
                    emitBus(EventType.FILE_NEED_REFRESH, {
                        relatedIdOrPath: dropItemDetail.data.parentRef,
                    })
                })
            },
        }),
        dropTargetForExternal({
            element,
            canDrop: containsFiles,
            onDragEnter({self, location,source}) {
                if(location.current.dropTargets[0].element !== element) {
                    return
                }
                resetAllClass(tableRef)
                element.classList.add('dropOver')
            },
            onDragLeave() {
                element.classList.remove('dropOver')
            },
            onDrop: async({ source, location }) => {
                if(location.current.dropTargets[0].element !== element) {
                    return
                }
                const { $i18n } = useNuxtApp()
                // const files = await getFiles({ source });
                // console.log("external onDrop", files)
                const files = await addDataTransfer(source)
                console.log("external onDrop", files)
                if(files.length === 0) {
                    ElMessage.error($i18n.t('dpTip.uploadEmptyFile'))
                    return
                }
                createUploadRequest(row, files)
                const ev = new CustomEvent('openUploadDrawer', { detail: true })
                document.dispatchEvent(ev)
                resetAllClass(tableRef)
            },
        }),
        
)
}

export function createRootDropZone(tableRef:Ref<any>, docDetail:Ref<any>){

    const root = tableRef.value.$el as HTMLElement
    const element = root.querySelector('.vxe-table--main-wrapper')
    if(!element) return
    return combine(
        dropTargetForElements({
            element,
            canDrop({ source }) {
                // if drop item is in current table, then return false
                const rowId = source.element.getAttribute('rowid')
                if(rowId){
                    const isCurrentTableData = tableRef.value.getRowById(rowId)
                    if(isCurrentTableData){
                        return false
                    }
                }
                return source.data.type === 'browseFolder' || source.data.type === 'browseFile'
            },
            onDragEnter({self, location,source}) {
                if(location.current.dropTargets[0].element !== element) {
                    return
                }
                resetAllClass(tableRef)
                element.classList.add('dropOver')
            },
            getIsSticky() {
                return true
            },
            onDragLeave(args){
                element.classList.remove('dropOver')
            },
            onDrop: async(args) => {
                // error handle
                console.log("drop on main frame", args)
                if(args.location.current.dropTargets[0].element !== element) {
                    return
                }
                if(!args.source?.data?.data) {
                    return
                }
                element.classList.remove('dropOver')
                const { $i18n } = useNuxtApp()
                ElMessageBox.confirm(
                    $i18n.t('browse.confirmMoveFile',{
                        target: docDetail.value.name,
                        source: Array.isArray(args.source.data.data) ? $i18n.t('browse.selectedItem', {
                            count : args.source.data.data.length
                        }) : args.source.data.data.name
                    }),
                    {dangerouslyUseHTMLString: true,}
                ).then( async () => {
                    const copyItems = Array.isArray(args.source.data.data) ? args.source.data.data : [args.source.data.data]
                    //check duplicate'
                    
                    const { data:{hasDuplicateTitle} } = await clientApi.api.postNuxeoDocumentIsduplicatename({
                        path: docDetail.value.path,
                        titles: copyItems.map(item => item.name)
                      }) as any
                    console.log("hasDuplicateTitle", hasDuplicateTitle)
                    if (hasDuplicateTitle) {
                        ElMessage({
                            message: $i18n.t('dpTip_duplicateFileName') as string,
                            type: 'error'
                        })
                        return;
                    }
                    
                    for(const item of copyItems) {
                        console.log(item)
                        const param = [ 
                            { idOrPath: item.path }, 
                            { idOrPath: docDetail.value.path}
                        ]
                        const noti = ElNotification({
                            title: $i18n.t('move'),
                            icon: Loading,
                            dangerouslyUseHTMLString: true,
                            message: `<div title="${item.name}">${item.name}</div>`,
                            showClose: true,
                            customClass: 'loading-notification',
                            duration: 0,
                            position: 'bottom-right'
                        });
                        try{

                            await clientApi.api.postNuxeoDocumentMove(param)
                            const copyItemDetail = await clientApi.api.postNuxeoDocument({idOrPath: item.id})
                            if(copyItemDetail.data) {
                                console.log("copyItemDetail", copyItemDetail.data)
                                emitBus(EventType.FILE_NEED_REFRESH, {
                                    relatedIdOrPath: copyItemDetail.data.parentRef,
                                })
                            }

                        }finally{
                            noti.close()
                        }
                    }
                    emitBus(EventType.FILE_NEED_REFRESH, {
                        relatedIdOrPath: docDetail.value.parentRef,
                    })
                })
            },
        }),
        dropTargetForExternal({
            element,
            canDrop: containsFiles,
            onDragEnter({self, location,source}) {
                if(location.current.dropTargets[0].element !== element) {
                    return
                }
                element.classList.add('dropOver')
            },
            onDragLeave() {
                element.classList.remove('dropOver')
            },
            onDrop: async({ source, location }) => {
                if(location.current.dropTargets[0].element !== element) {
                    return
                }
                const { $i18n } = useNuxtApp()
                // const files = await getFiles({ source });
                // console.log("external onDrop", files)
                const files = await addDataTransfer(source)
                console.log("external onDrop", files)
                if(files.length === 0) {
                    ElMessage.error($i18n.t('dpTip.uploadEmptyFile'))
                    return
                }
                createUploadRequest(docDetail.value, files)
                const ev = new CustomEvent('openUploadDrawer', { detail: true })
                document.dispatchEvent(ev)
                resetAllClass(tableRef)
                // const ev = new CustomEvent('docActionDropFileFormComputer', { detail: {files, doc: docDetail.value} })
                // document.dispatchEvent(ev)
            },
        }),
        
)
}



