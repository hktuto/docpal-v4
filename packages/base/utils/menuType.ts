import type { InjectionKey } from "vue"
import type { DroppableItem } from './dragType'


export interface MenuItem extends DroppableItem {
    icon: string, // 如果是 inlineRender 會忽略
    hoverIcon?: string, // 如果是 inlineRender 會忽略
    inlineRender?:boolean, // 如果是 true 則直接在 menu 中渲染component, 多用於 children 裡的列表
    children?: MenuItem[]
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
