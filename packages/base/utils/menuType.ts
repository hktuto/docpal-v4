import type { InjectionKey } from "vue"
import type { DropableItem } from "./dragType"

export interface MenuItem extends DropableItem {
    icon: string,
    children?: MenuItem[]
}

export interface RouterParams extends DropableItem {
    menuKey:symbol,
}

interface MenuProvider {
    navigateTo:(param:RouterParams) => void
    menuSymbol:symbol
}


export const MenuRouterKey: InjectionKey<MenuProvider> = Symbol('meu');
