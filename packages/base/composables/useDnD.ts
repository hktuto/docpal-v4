import type {DragState, UseDragableParam, DroppableItemParam, DropTargtParams} from "#imports";
import {draggable, dropTargetForElements, monitorForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import type { CleanupFn } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { containsFiles, getFiles } from '@atlaskit/pragmatic-drag-and-drop/external/file';
import { containsText, getText } from '@atlaskit/pragmatic-drag-and-drop/external/text';

export const useExternalDrop = (
    
    onDragEnter:any,
    onDragLeave:any,
    onDrop:any
) => {

    let cleanup = () => {}

    function setupDropable(element: HTMLElement) {
        
        cleanup = dropTargetForExternal({
            element,
            onDragEnter: (arg) => {
                if(onDragEnter) onDragEnter(arg)
            },
            onDragLeave: (arg) => {
                if(onDragLeave) onDragLeave(arg)
            },
            onDrop: ({ source }) => {
                const files = getFiles({ source });
                const text = getText({ source });
                
            },
        })
    }

    onUnmounted(() => {
        cleanup()
    })

    return {
        setupDropable
    }

}

export const useDragable = ({
    key,
    dragData,
    detectDrop,
    allowedEdges = ['left', 'right'],
    onDragStart,
    onDropItself,
    canDrop,
    isSticky,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDropToOther
}:UseDragableParam ) => {
    const idle: DragState = { type: "idle" };
    const dragState = ref<DragState>(idle)

    let cleanup = () => {}

    function setupDrag(element:HTMLElement) {
        if(!element) return;    

        cleanup = draggable({
            element,
            getInitialData(){
                return dragData
            },
            onGenerateDragPreview({ nativeSetDragImage }) {
                setCustomNativeDragPreview({
                    nativeSetDragImage,
                    getOffset: pointerOutsideOfPreview({
                        x: '16px',
                        y: '8px',
                    }),
                    render({ container }) {
                        dragState.value = { type: 'preview', container }
                    },
                })
            },
            onDragStart() {
                if(onDragStart) onDragStart()
                dragState.value = { type: 'is-dragging' }
            },
            onDrop(args) {
                if(onDropItself) onDropItself(args)
                
                dragState.value = idle
            },
        })
        if(detectDrop) {
            cleanup = combine(
                cleanup,
                createDropTargetForElements({
                    element,
                    dragData,
                    canDrop,
                    dragState,
                    allowedEdges,
                    isSticky,
                    onDragEnter,
                    onDragOver,
                    onDragLeave,
                    onDropToOther
                })
            )
        }
    }
    onUnmounted(() => {
        cleanup()
    })

    return {
        extractClosestEdge,
        setupDrag,
        dragState
    }
}


export const useDropable = ({
    key,
    canMonitor = (arg:any) => true,
    onDropHandler,
    detectDrop = false,
    dragData,
    allowedEdges = ['left', 'right'],
    canDrop,
    isSticky,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDropToOther,
}:DroppableItemParam) => {

    const idle: DragState = { type: "idle" };
    const dragState = ref<DragState>(idle)


    let cleanup = () => {}

    function setupDropable(element?: HTMLElement) {
        
        cleanup = monitorForElements({
            canMonitor(arg:any) {
                return canMonitor(arg)
            },
            onDrop({ location, source }){
                const target:any = location.current.dropTargets[0]
                return onDropHandler({ location, source, target })
            }
        })
        if(detectDrop) {
            if(!element) return
            if(!dragData) {
                throw new Error('when detectDrop is true, dragData is required')
            }
            cleanup = combine(
                cleanup,
                createDropTargetForElements({
                    element,
                    dragData,
                    canDrop,
                    dragState,
                    allowedEdges,
                    isSticky,
                    onDragEnter,
                    onDragOver,
                    onDragLeave,
                    onDropToOther
                })
            )
        }
    }

    onUnmounted(() => {
        cleanup()
    })
    return {
        extractClosestEdge,
        dragState,
        setupDropable
    }
}


function createDropTargetForElements({
    element,
    dragState,
    dragData,
    canDrop,
    allowedEdges = ['left', 'right'],
    isSticky,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDropToOther
}:DropTargtParams):CleanupFn{
    return dropTargetForElements({
        element,
        canDrop({ source }) {
            if(canDrop) return canDrop({ source })
            if (source.element === element) {
                return false
            }
            return true
        },
        getData({input}) {
            return attachClosestEdge((dragData as any), {
                element,
                input,
                allowedEdges,
            })
        },
        getIsSticky() {
            if(isSticky) return isSticky()
            return true
        },
        onDragEnter({self, location,source}) {
            if(onDragEnter) onDragEnter()
                // get mouse location in "location.current"
            
                // if mouse is near the top of the target, then we're dragging over the target
            const closestEdge = extractClosestEdge(self.data)
            dragState.value = { type: 'is-dragging-over', closestEdge }
        },
        onDrag({self, location,source}) {
            if(onDragOver) onDragOver()
            const mouse = location.current.input;
            const targetRect = self.element.getBoundingClientRect();
            const isCenter = (Math.abs(mouse.clientX - targetRect.left) > targetRect.width / 3) && (Math.abs(mouse.clientX - targetRect.right) > targetRect.width / 3);
            if(isCenter) {
                dragState.value = { type: 'is-dragging-over', closestEdge:'center' }
                return;
            }
            
            const closestEdge = extractClosestEdge(self.data)
            // Only need to update react state if nothing has changed.
            if (dragState.value.type !== 'is-dragging-over' || dragState.value.closestEdge !== closestEdge) {
                dragState.value = { type: 'is-dragging-over', closestEdge }
            }
        },
        onDragLeave() {
            if(onDragLeave) onDragLeave()
            dragState.value = { type: "idle" }
        },
        onDrop() {
            if(onDropToOther) onDropToOther()
            dragState.value = { type: "idle" }
        },
    })
}