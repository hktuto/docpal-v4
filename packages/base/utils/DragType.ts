import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";


/**
 * 所布可以 drop 物件的最小單位
 */
export interface DropableItem {
    id:string,
    icon?:string,
    label:string,
    component: string,
    props: Record<string, any>
}

export interface DragData extends Record<string,any> {
    key: symbol,
    data: DropableItem
}

export type DragState = | {
    type: "idle";
}
| {
    type: "preview";
    container: HTMLElement;
}
| {
    type: "is-dragging";
}
| {
    type: "is-dragging-over";
    closestEdge: Edge | null;
};

export type UseDragableParam = {
    key:symbol,  
    dragData: DragData,
    detectDrop:boolean, 
    allowedEdges:Edge[],
    onDragStart?:Function, 
    onDropItself?:Function,
    canDrop?:({ source }:any) => boolean, 
    isSticky?:() => boolean, 
    onDragEnter?:Function, 
    onDragOver?:Function, 
    onDragLeave?:Function,
    onDropToOther?: Function,
}

export type DropableItemParam = {
    key:symbol,
    canMonitor:(arg:any) => boolean,
    onDropHandler:({ location, source, target }:any) => void,
    allowDropKeys?: symbol[], // 那個 symbol 可以的 drop 事件可以 trigger
    detectDrop?:boolean,
    allowedEdges?:Edge[],
    dragData?: DragData
    canDrop?:({ source }:any) => boolean, 
    isSticky?:() => boolean, 
    onDragEnter?:Function, 
    onDragOver?:Function, 
    onDragLeave?:Function,
    onDropToOther?: Function
}

export type DropTargtParams =  {
    element:HTMLElement,
    dragState: Ref<DragState>,
    canDrop?:({ source }:any) => boolean,
    dragData: DragData,
    allowedEdges: Edge[],
    isSticky?:() => boolean, 
    onDragEnter?:Function, 
    onDragOver?:Function, 
    onDragLeave?:Function,
    onDropToOther?: Function
}

