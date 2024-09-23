import type { InjectionKey, RouterParams } from '#imports';
import type {DropableItem} from './dragType'
export interface TabItem extends DropableItem {
    parent:string
}// tab panel container

export type TabPanel = {
    id: string
    minSize?: number,
    maxSize?: number,
    parent:string
    showingTabIndex?: number
    tabs: TabItem[]
}

interface TabManager {
    tabDataKey:symbol
}

interface TabComponentHelper {
    renameTab:(panelId:string, tabId:string, newName:string) => void
    
    tabDataKey:symbol
}

export const TabManagerKey: InjectionKey<TabManager> = Symbol('tabManager');
export const TabComponentKey: InjectionKey<TabComponentHelper> = Symbol('tabComponent');