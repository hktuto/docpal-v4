import type { InjectionKey, RouterParams } from '#imports';
import type {DropableItem} from './dragType'
export interface TabItem extends DropableItem {
    parent:string
}
export type TabPanel = any[] // tab panel container

export type TabType = "TabLayout" | "TabPanel"
export type LayoutDirection = "horizontal" | "vertical"

export type TabPanelContainer = {
    id: string
    type: TabType
    minSize?: number,
    maxSize?: number,
    parent:string
    showingTabIndex?: number
    tabs: TabPanel
}

export type TabLayout = {
    id: string,
    type: TabType
    parent:string
    direction: LayoutDirection
    tabs: (TabPanelContainer | TabLayout)[]
}

export type TabComponent = {
    id:string,
    label:string,
    parent:string // parent id no #
    teleportId:string,
    component: string
}

interface TabManager {
    panelTabFocus:(panelId:string, tabIndex:number) => void,
    closePanelTab:(panelId:string, tabIndex:number, deleteComponent:boolean) => void,
    moveTabBetweenPanel:(sourceData:TabItem, targetData:TabItem, direction: 'left' | 'right') =>void,
    splitViewToDirection:(sourceData:TabItem, targetData:TabPanelContainer, direction:  'top' | 'bottom' | 'left' | 'right') =>void,
    addMenuItemToPanel:(sourceData:MenuItem, targetData:TabPanelContainer, direction:  'top' | 'bottom' | 'left' | 'right') =>void,
    addTabToPanel:(panelId:string, newTab: TabItem) => void,
    panelRouteUpdate: (panelId:string, tabId:string, routerParams:RouterParams ) => void
    tabDataKey:symbol
}

interface TabComponentHelper {
    renameTab:(panelId:string, tabId:string, newName:string) => void
    
    tabDataKey:symbol
}

export const TabManagerKey: InjectionKey<TabManager> = Symbol('tabManager');
export const TabComponentKey: InjectionKey<TabComponentHelper> = Symbol('tabComponent');