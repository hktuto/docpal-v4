import type { InjectionKey } from "vue"
import type { DroppableItem } from './dragType'
import type { ar } from "vitest/dist/chunks/reporters.WnPwkmgA.js"


export interface MenuItem extends DroppableItem {
    icon: string, // 如果是 inlineRender 會忽略
    hoverIcon?: string, // 如果是 inlineRender 會忽略
    isList?:boolean, // 如果是 true 則直接在 menu 中渲染component, 多用於 children 裡的列表
    children?: MenuItem[],
    canDrop: (args:any) => boolean,
    onDropItself?:(args:any) => void,
    getListFunction?: (param:any) => Promise<any>, // 如果 isList 是 true 時必填
    listResultMappingFunction?: (data:any) => any[], // 如果 isList 是 true 時必填
    generatePreviewData?: (item:any) => any, // 如果 isList 是 true 時必填
    generatePageData?:(item:any) => any, // 如果 isList 是 true 時必填
}

export interface RouterParams extends DroppableItem {
    menuKey:symbol,
}

interface MenuProvider {
    navigateTo:(param:RouterParams) => void
    menuSymbol:symbol
}

export const menuSymbol = Symbol('menu')

export const MenuRouterKey: InjectionKey<MenuProvider> = menuSymbol;
