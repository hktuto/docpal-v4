import type { InjectionKey } from "vue"


export interface MenuItem {
    id:string,
    icon:string,
    label: string,
    component: string
    props?: Record<string, any>
    actions?: any
    children?: MenuItem[]
}

export interface RouterParams {
    menuKey:symbol,
    label:string,
    component: string,
    props?: Record<string, any>
}

interface MenuProvider {
    navigateTo:(param:RouterParams) => void
    menuSymbol:symbol
}


export const MenuRouterKey: InjectionKey<MenuProvider> = Symbol('meu');
