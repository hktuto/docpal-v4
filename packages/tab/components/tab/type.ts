import type { InjectionKey } from '#imports';

export type TabItem = {
    id:string,
    label: string,
    parent:string
    component: string,
    data?:any
}
export type TabPanel = TabItem[] // tab panel container

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


export const useTabs = () => useState<TabLayout>(() => ({
    id: "root",
    type: "TabLayout" as TabType,
    parent: "",
    direction: "vertical" as LayoutDirection,
    tabs: []
}))

export type TabComponent = {
    id:string,
    parent:string // parent id no #
    teleportId:string,
    component: string
}

interface TabManager {
    panelTabFocus:(panelId:string, tabIndex:number) => void,
    closePanelTab:(panelId:string, tabIndex:number, deleteComponent:boolean) => void,
    moveTabBetweenPanel:(sourceData:TabItem, targetData:TabItem, direction: 'left' | 'right') =>void,
    splitViewToDirection:(sourceData:TabItem, targetData:TabPanelContainer, direction:  'top' | 'bottom' | 'left' | 'right') =>void,
    addTabToPanel:(panelId:string, newTab: TabItem) => void,
    tabDataKey:symbol
}

interface TabComponetHelper {
    renameTab:(panelId:string, tabId:string, newName:string) => void
    
    tabDataKey:symbol
}

export const TabManagerKey: InjectionKey<TabManager> = Symbol('tabManager');
export const TabComponetKey: InjectionKey<TabComponetHelper> = Symbol('tabComponent');