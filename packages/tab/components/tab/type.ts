import type { InjectionKey } from '#imports';
// import {Symbol} from '#imports'

interface TabManager {
    panelTabFocus:(panelId:string, tabIndex:number) => void,
    closePanelTab:(panelId:string, tabIndex:number) => void
}

export const TabManagerKey: InjectionKey<TabManager> = Symbol('tabManager');
