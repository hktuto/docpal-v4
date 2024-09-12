import {useState} from '#imports'

export const useMenuState = () => useState<'icon' | 'stack' | 'opened' >('menu-opened', () => 'icon');
export const useMenuList = () => useState<MenuItem[]>('app-menu', () => ([]))

export type MenuItem = {
    id:string,
    key: string,
    defaultRoute:string,
    component: any,
    order: number,
    pageLayout: string,
    icon: string,
    children: MenuItem[]
}

export const useMenu = () => {
    const menuState = useMenuState()


    return {
        menuState
    }
}