import { it } from 'vitest';

import {useState} from '#imports'
import type {TabPanel,TabItem} from '../utils/tabType'
import type {Edge} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'

const useTabLayout = () => useState<TabPanel[]>('tabs', () => ([]))
export const useDropEventCallback = () => useState<Record<symbol, any>>('tab-panel-drop-event-callback', ()=>({}))
export const useCurrentTargetPanel = () => useState<string>('tab-current-target-panel',() => "")
export const useTabComponent = () => useState<TabItem[]>('tab-component', () => ([]))
export const useTabsManager = () => {

    const layout = useTabLayout()
    const allComponents = useTabComponent()
    const hightLightPanel = useCurrentTargetPanel()
    function initLayout(newLayout:TabPanel[]) {
        
        layout.value = newLayout
        nextTick(() => {
            hightLightPanel.value = localStorage.getItem('app-tab-hightLightPanel') || newLayout[0].id
            allComponents.value = newLayout.reduce((prev:TabItem[], panel:TabPanel) => {
                return prev.concat(panel.tabs)
                }, [])
        })
        // loop thought layout and push all components
        
    }

    return {
        allComponents,
        initLayout,
        layout
    }
}

export function panelTabFocus(panelId:string, tabIndex: number) {
    const layout = useTabLayout()
    const hightLightPanel = useCurrentTargetPanel()
    // get panel index useing panelId
    const panelIndex = layout.value.findIndex(tab => tab.id === panelId)
    hightLightPanel.value = panelId
    if(panelIndex !== -1) {
        layout.value[panelIndex].showingTabIndex = tabIndex;
    }
}


export function closePanelTab(panelId:string, tabIndex: number, deleteComponent = true) {
    const layout = useTabLayout()
    const components = useTabComponent()
    const panelIndex = layout.value.findIndex(tab => tab.id === panelId)
    if(panelIndex !== -1) {
        const data = layout.value[panelIndex].tabs[tabIndex]
        layout.value[panelIndex].tabs.splice(tabIndex, 1);
        if(deleteComponent){
            const componentIndex = components.value.findIndex((component) => component.id === data.id);
            if(componentIndex !== -1) components.value.splice(componentIndex, 1)
        }

        if(layout.value[panelIndex].tabs.length === 0) {
            layout.value.splice(panelIndex, 1)
        }else{
            layout.value[panelIndex].showingTabIndex = panelIndex > 0 ? panelIndex - 1 : 0;
            console.log("focus on ", layout.value[panelIndex].showingTabIndex)
        }
    }else{
        throw new Error(`data not found. tabIndex ${tabIndex} is not correct in ${panelId}`)

    }

}

export function reorderWithEdge(parent:TabPanel, sourceData:TabItem, targetData:TabItem, direction: 'left' | 'right') {
    const layout = useTabLayout()
    const parentId = layout.value.findIndex(tab => tab.id === parent.id)
    const sourceIndex = layout.value[parentId].tabs.findIndex((tabItem) => tabItem.id === sourceData.id);
    layout.value[parentId]?.tabs.splice(sourceIndex, 1);
    // step 2 insert target
    const targetIndex = layout.value[parentId].tabs.findIndex((tabItem) => tabItem.id === targetData.id);
    // if direction is left insert before, if direction is right insert after
    const newItemIndex = direction === 'left' ? targetIndex : targetIndex + 1
    layout.value[parentId]?.tabs.splice(newItemIndex, 0 , sourceData)
    // final focus on source
    nextTick(( ) => {
        panelTabFocus(sourceData.parent, newItemIndex)
    })
}

export function moveTabBetweenPanel(sourceData:TabItem, targetData:TabItem, direction: 'left' | 'right') {
    const layout = useTabLayout()
    const allComponents = useTabComponent()
    const sourceParentId = layout.value.findIndex(tab => tab.id === sourceData.parent)
    const targetParentId = layout.value.findIndex(tab => tab.id === targetData.parent)
    if(sourceParentId === targetParentId){
        reorderWithEdge(layout.value[sourceParentId], sourceData, targetData, direction)
        return;
    }
    // if source and target is not the same panel, move source to target
    const sourceIndex = layout.value[sourceParentId].tabs.findIndex((tabItem) => tabItem.id === sourceData.id);
    if(sourceIndex === -1) {
        return
    }
    closePanelTab(sourceData.parent, sourceIndex, false)

    const newSourceData = {
        ...sourceData,
        parent: targetData.id,
    }
    const targetIndex = layout.value[targetParentId].tabs.findIndex((tabItem) => tabItem.id === targetData.id);
    const newItemIndex = direction === 'left' ? targetIndex  : targetIndex + 1
    layout.value[targetParentId]?.tabs.splice(newItemIndex, 0 , newSourceData)
    // final focus on source
    
    const componentIndex = allComponents.value.findIndex((component) => component.id === newSourceData.id);
    nextTick(() => {
        panelTabFocus(targetData.id, newItemIndex)
    })

}

export function splitViewToDirection(sourceData:TabItem, targetData:TabPanel, direction:  Edge) {
        const layout = useTabLayout()
        const allComponents = useTabComponent()
        const sourceParentId = layout.value.findIndex(tab => tab.id === sourceData.parent)
        const targetParentId = layout.value.findIndex(tab => tab.id === targetData.id)

        const sourceIndex = layout.value[sourceParentId].tabs.findIndex((tabItem) => tabItem.id === sourceData.id);
        if(sourceIndex === -1) {
            return
        }
        closePanelTab(sourceData.parent, sourceIndex, false)
        // check if targetParentLayout direction match new direction
        const newPanelId = "newPanel-" + new Date().getTime()
        const newData:TabPanel = {
            id: newPanelId,
            parent: targetData.id,
            showingTabIndex: 0,
            tabs: [{
                ...sourceData,
                parent: newPanelId,
            }]
        }
        const newItemIndex = direction === 'left' ? targetParentId  : targetParentId + 1
        layout.value.splice(newItemIndex, 0 , newData)

        // get component and update parent and teleport id
        nextTick(() => {
            panelTabFocus(newPanelId, 0)
            const component = allComponents.value.find( (component:TabItem) => component.id === sourceData.id)
            if(component) {
                component.parent = newPanelId;
            }
        })
            
}


export function addMenuItemToPanel(sourceData:MenuItem, targetData:TabPanel, direction:  Edge) {
    const layout = useTabLayout();
    const allComponents = useTabComponent();
    const targetParentId = layout.value.findIndex(tab => tab.id === targetData.parent)
    const newPanelId = "newPanel-" + new Date().getTime()
    sourceData.id +=  new Date().getTime();
    const newData:TabPanel = {
        id: newPanelId,
        parent: targetData.id,
        showingTabIndex: 0,
        tabs: [{
            ...sourceData,
            parent: newPanelId,
        }]
    }
    const newItemIndex = direction === 'left' ? targetParentId  : targetParentId + 1
    layout.value.splice(newItemIndex, 0 , newData)

    // get component and update parent and teleport id
    nextTick(() => {
        panelTabFocus(newPanelId, 0)

        const component = allComponents.value.find( (component:TabItem) => component.id === sourceData.id)
        if(component) {
            component.parent = newPanelId;
        }else{
            allComponents.value.push({
                ...sourceData,
                parent: newPanelId,
            })
        }
    })
}

export function addTabToPanel(panelId:string, newTab: TabItem ) {
    const layout = useTabLayout()
    const allComponents = useTabComponent()
    console.log(layout.value)
    const parentId = layout.value.findIndex(tab => tab.id === panelId);
    if(parentId !== -1) {
        layout.value[parentId].tabs.push(newTab)
        nextTick(() => {
            panelTabFocus(panelId, layout.value[parentId].tabs.length - 1)
            allComponents.value.push({
                ...newTab,
                parent: panelId
            })
        })
    }
}

export function panelRouteUpdate(panelId:string, tabId:string, routerParams:RouterParams) {
    const layout = useTabLayout()
    const allComponents = useTabComponent()
    const panelIndex = layout.value.findIndex(tab => tab.id === panelId)
    console.log(layout.value, panelId, tabId)
    if(panelIndex !== -1) {
        const index = layout.value[panelIndex].tabs.findIndex( tab => tab.id === tabId);
        if(index === -1) throw new Error('Tab not found when router change')
        layout.value[panelIndex].tabs[index].label = routerParams.label
        layout.value[panelIndex].tabs[index].component = routerParams.component
        layout.value[panelIndex].tabs[index].props = routerParams.props
    }
}
