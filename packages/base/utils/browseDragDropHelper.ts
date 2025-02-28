import { get } from '@vueuse/core';
import {draggable, dropTargetForElements, monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'

import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { rowKey } from 'element-plus/es/components/table-v2/src/common.mjs';
import { clientApi } from 'api'
import { emitBus, EventType } from 'eventbus';
import { Loading } from 'element-plus/es/components/loading/src/service.mjs';
import { AppWrapper } from '#components';
 
export const useDropFile = () => useState('browseDropFile', () => ([]));

export function createDropableFile(element:HTMLElement, row:any, tableRef: Ref<any>){
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
        onDragStart() {
            console.log("onDragStart", element)
        },
        onDrop(args) {
            // const target = args.location.current.dropTargets[0]
            // if(!target) return;
            // const fileList = useDropFile()
            // console.log("onDrop", args, fileList.value)
        },
        
     }),
    )
}

export function createDropableFolder(element:HTMLElement,row:any, tableRef: Ref<any>){
    return combine(
        dropTargetForElements({
            element,
            canDrop({ source }) {
                return source.data.type === 'browseFolder' || source.data.type === 'browseFile'
            },
            onDragEnter({self, location,source}) {
                console.log("drag enter", source)
                element.classList.add('dropOver')
            },
            getIsSticky() {
                return true
            },
            onDragLeave(args){
                element.classList.remove('dropOver')
                console.log("drag leave", args)
            },
            onDrop: async(args) => {
                // error handle
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
        // monitorForElements({
        //     canMonitor(arg:any) {
        //         console.log("can monitor", arg)
        //         return arg.source.data.type === 'browseFile'
        //     },
        //     onDragEnter({self, location,source}) {

        //     }
        //     onDrop({ location, source }){
        //         console.log("drop", location, source)
        //     }
        // }),
        dropTargetForExternal({
            element,
            canDrop({ source }) {
                const data = source.getStringData('text/plain');
                console.log("canDrop", source.data)
                if(!data) return false
                // TODO: check if data follow the format
                return !!JSON.parse(data)
            },
            getData(data){
                return {
                    data,
                }
            },
            onDragEnter({self, location,source}) {
                element.classList.add('dropOver')
                console.log("external drag enter", source)
            },
            onDrag({self, location,source}) {
                console.log("external draging over", location, source)
            },
            onDragLeave() {
                element.classList.remove('dropOver')
                console.log("external onDragLeave")
            },
            onDrop() {
                console.log('external onDrop')
            },
        }),
        
)
}

export function createRootDropZone(tableRef:Ref<any>, docDetail:Ref<any>){
    const root = tableRef.value.$el as HTMLElement
    const element = root.querySelector('.vxe-table--main-wrapper')
    console.log(docDetail.value, root, element)
    if(!element) return
    return combine(
        dropTargetForElements({
            element,
            canDrop({ source }) {
                return source.data.type === 'browseFolder' || source.data.type === 'browseFile'
            },
            onDragEnter({self, location,source}) {
                console.log("drag enter", source)
                element.classList.add('dropOver')
            },
            getIsSticky() {
                return true
            },
            onDragLeave(args){
                element.classList.remove('dropOver')
                console.log("drag leave", args)
            },
            onDrop: async(args) => {
                // error handle
                if(!args.source?.data?.data) {
                    return
                }
                console.log("docDetail.value.name", docDetail.value.name)
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
            canDrop({ source }) {
                const data = source.getStringData('text/plain');
                console.log("canDrop", source.data)
                if(!data) return false
                // TODO: check if data follow the format
                return !!JSON.parse(data)
            },
            getData(data){
                return {
                    data,
                }
            },
            onDragEnter({self, location,source}) {
                element.classList.add('dropOver')
                console.log("external drag enter", source)
            },
            onDrag({self, location,source}) {
                console.log("external draging over", location, source)
            },
            onDragLeave() {
                element.classList.remove('dropOver')
                console.log("external onDragLeave")
            },
            onDrop() {
                console.log('external onDrop')
            },
        }),
        
)
}