<script setup lang="ts">
import type {TabItem, TabPanelContainer, TabLayout} from './type'
import {TabManagerKey, } from './type'

import { provide, useTabsManager, exampleLayout, recursiveGetPanelById } from '#imports'
import 'splitpanes/dist/splitpanes.css'

const tabDataKey = Symbol("tab");
const {layout, initLayout, allComponents} = useTabsManager()

function panelTabFocus(panelId:string, tabIndex: number) {
    // step 1 split panelId by -
    const panel = recursiveGetPanelById(layout.value, panelId) as TabPanelContainer
    if(panel) {
        panel.showingTabIndex = tabIndex;
    }
}

function recursiveRemoveEmptyContainer(panel:any){
    console.log("remove item :", panel.id)
    const parent = recursiveGetPanelById(layout.value, panel.parent)
    if(!parent) return; // reach root 
    const panelIndex = parent.tabs.findIndex((t) => t.id === panel.id)
    if(panelIndex !== -1) parent.tabs.splice(panelIndex, 1)
    if(parent.tabs.length === 0) {
        recursiveRemoveEmptyContainer(parent)
    }
}

function closePanelTab(panelId:string, tabIndex: number, deleteComponent = true) {
    const panel = recursiveGetPanelById(layout.value, panelId)
    // remove tab in panel with given tabIndex
    if(panel) {
        // check is panel is the last children
        if(allComponents.value.length === 1 ){
            return
        } 
        const data = panel?.tabs[tabIndex];
        panel?.tabs.splice(tabIndex, 1);
        console.log(data)
        if(deleteComponent){
            const componentIndex = allComponents.value.findIndex((component) => component.id === data.id);
            if(componentIndex !== -1) allComponents.value.splice(componentIndex, 1)
        }

        if(panel.tabs.length === 0) {
            recursiveRemoveEmptyContainer(panel)
            // const parent = recursiveGetPanelById(layout.value, panel.parent)
            
            // if(parent) {
            //     const panelIndex = parent.tabs.findIndex((t) => t.id === panel.id)
            //     if(panelIndex !== -1) parent.tabs.splice(panelIndex, 1)
            //     // check parent
            // }
        } else if((panel as TabPanelContainer).showingTabIndex === tabIndex) {
            panelTabFocus(panelId, 0)
        }
    }
    
    // check if panel is empty
    
        
}

function reorderWithEdge( parent : TabPanelContainer, sourceData:TabItem, targetData:TabItem, direction: 'left' | 'right') {
    const sourceIndex = parent.tabs.findIndex((tabItem) => tabItem.id === sourceData.id);
    parent?.tabs.splice(sourceIndex, 1);
    // step 2 insert target
    const targetIndex = parent.tabs.findIndex((tabItem) => tabItem.id === targetData.id);
    // if direction is left insert before, if direction is right insert after
    const newItemIndex = direction === 'left' ? targetIndex : targetIndex + 1
    parent?.tabs.splice(newItemIndex, 0 , sourceData)
    // final focus on source
    nextTick(( ) => {
        panelTabFocus(sourceData.parent, newItemIndex)
    })
}

function moveTabBetweenPanel(sourceData:TabItem, targetData:TabItem, direction: 'left' | 'right') {
    
    // get target parent
    const sourceParent = recursiveGetPanelById(layout.value, sourceData.parent)
    if(!sourceParent)return
    
    const targetParent = recursiveGetPanelById(layout.value, targetData.parent)
    if(!targetParent)return
    // if source and target is the same panel, move source to target
    if(sourceData.parent === targetData.parent) {
        reorderWithEdge((sourceParent as TabPanelContainer ), sourceData, targetData, direction)
        return
    }
    // if source and target is not the same panel, move source to target
    const sourceIndex = sourceParent.tabs.findIndex((tabItem) => tabItem.id === sourceData.id);
    closePanelTab(sourceData.parent, sourceIndex, false)

    const newSourceData = {
        ...sourceData,
        parent: targetParent.id,
        teleportId : targetParent.id + '-' + sourceData.id
    }
    const targetIndex = targetParent.tabs.findIndex((tabItem) => tabItem.id === targetData.id);
    const newItemIndex = direction === 'left' ? targetIndex  : targetIndex + 1
    targetParent?.tabs.splice(newItemIndex, 0 , newSourceData)
    // final focus on source
    
    const componentIndex = allComponents.value.findIndex((component) => component.id === newSourceData.id);
    nextTick(() => {
        panelTabFocus(targetData.parent, newItemIndex)
        allComponents.value[componentIndex].teleportId = newSourceData.parent + '-' + newSourceData.id
    })
    // remove source target

}

function splitViewToDirection(sourceData:TabItem, targetData:TabPanelContainer, direction: 'top' | 'bottom' | 'left' | 'right') {
    const sourceParent = recursiveGetPanelById(layout.value, sourceData.parent)
    if(!sourceParent)return
    
    const targetParent = recursiveGetPanelById(layout.value, targetData.parent)
    if(!targetParent )return

    const sourceIndex = sourceParent.tabs.findIndex((tabItem) => tabItem.id === sourceData.id);
    closePanelTab(sourceData.parent, sourceIndex, false)
    console.log(direction, targetParent)
    // check if targetParentLayout direction match new direction
    if(
        ((targetParent as TabLayout).direction === 'vertical' && (direction == 'left' || direction === 'right')) ||
        ((targetParent as TabLayout).direction === 'horizontal' && (direction == 'top' || direction === 'bottom'))
    ) {
        const newPanelId = "newPanel-" + new Date().getTime()
        const newData:TabPanelContainer = {
            id: newPanelId,
            type: "TabPanel",
            parent: targetParent.id,
            showingTabIndex: 0,
            tabs: [{
                ...sourceData,
                parent: newPanelId,
            }]
        }
        const targetIndex = targetParent.tabs.findIndex((tabItem:any) => tabItem.id === targetData.id);
        const newItemIndex = direction === 'left' || direction === 'top' ? targetIndex  : targetIndex + 1
        targetParent?.tabs.splice(newItemIndex, 0 , newData)

    } else {
        // need to create new layout
    }
    

}

function addTabToPanel(panelId:string, newTab: TabItem ) {
    const parent = recursiveGetPanelById(layout.value, panelId);
    if(!parent) return
    (parent as TabPanelContainer).tabs.push(newTab)
    panelTabFocus(panelId, parent.tabs.length - 1)
    nextTick(() => {
        allComponents.value.push({
            ...newTab,
            teleportId: newTab.parent + '-' + newTab.id
        })
    })
}



provide(
    TabManagerKey, 
    {
        panelTabFocus,
        closePanelTab,
        moveTabBetweenPanel,
        addTabToPanel,
        splitViewToDirection,
        tabDataKey
    }
)

const loading = ref(false);
async function getTabsFromServer() {
    loading.value = true;
    const storageTabs = localStorage.getItem('app-tab')
    if(storageTabs) {
        const newLayout = JSON.parse(storageTabs);
        initLayout(newLayout)
    }else{
        // init a basic layout
        initLayout({
            id: "root",
            type: 'TabLayout',
            parent: "",
            direction: 'vertical',
            tabs:[
                {
                    id:"dummy-tab-container",
                    type: "TabPanel",
                    parent: "root",
                    showingTabIndex: 0,
                    tabs: [
                        {
                            id: 'new-tab-001',
                            label: "New Tab",
                            parent: "dummy-tab-container",
                            component: 'LazyTabEmpty'
                        }
                    ]
                }
            ]
        })
    }
    loading.value = false;
} 

onMounted(() => {
    getTabsFromServer()
})
</script>

<template>
    <div class="tabManager">
        <template  v-if="loading">
            <LoadingBg />
        </template>
        <template v-else>

            <TabLayout :layout="layout" />
            <div class="hiddenAllComponent">
                <template v-for="component in allComponents" :key="component.id">
                    <Teleport  :to="'#' + component.teleportId">
                        <component :is="component.component" :tab="component"/>
                    </Teleport>
                </template>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.hiddenAllComponent{
    opacity: 0;
}
.tabManager{
    height:100%;
    :deep(.splitpanes) {
        background: var(--app-grey-900);
    }
    
    // :deep(.splitpanes__pane) {
    //     // default style for pane
    // }
    
    :deep(.splitpanes--vertical > .splitpanes__splitter) {
        min-width: var(--app-space-s);
        position: relative;
        &:hover {
            background: var(--app-grey-850); 
            &:after{
                background: var(--app-grey-800);
            }
        }
        &:after {
            content: "";
            width: 2px;
            height: 100%;
            display: block;
            background: var(--app-grey-850);
            position: absolute;
            left: calc( (var(--app-space-s) / 2) - 1px);
        }
        // background: var(--app-grey-800);
    }
    
    :deep(.splitpanes--horizontal > .splitpanes__splitter ){
        min-height: var(--app-space-s);
        position: relative;
        &:hover {
            background: var(--app-grey-850); 
            &:after{
                background: var(--app-grey-800);
            }
        }
        &:after {
            content: "";
            height: 2px;
            width: 100%;
            display: block;
            background: var(--app-grey-850);
            position: absolute;
            left: calc( (var(--app-space-s) / 2) - 1px);
        }
    }
}
</style>