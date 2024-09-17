<script setup lang="ts">
import { provide, useTabsManager, recursiveGetPanelById } from '#imports'
import type {TabItem, TabPanelContainer, TabLayout, TabComponent, MenuItem} from '#imports'
import {TabManagerKey, useCurrentTargetPanel } from '#imports'

import 'splitpanes/dist/splitpanes.css'

const tabDataKey = Symbol("tab");
const {layout, initLayout, allComponents} = useTabsManager()
const hightLightPanel = useCurrentTargetPanel()

function panelTabFocus(panelId:string, tabIndex: number) {
    // step 1 split panelId by -
    const panel = recursiveGetPanelById(layout.value, panelId) as TabPanelContainer
    if(panel) {
        
        panel.showingTabIndex = tabIndex;
        hightLightPanel.value = panel.id
        console.log("highlight", hightLightPanel.value)
    }
}

function recursiveRemoveEmptyContainer(panel:any){
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
        if(!data) {
            console.trace(panel)
            throw new Error(`data not found. tabIndex ${tabIndex} is not correct in ${panel.id}`)
        }
        panel?.tabs.splice(tabIndex, 1);
        if(deleteComponent){
            const componentIndex = allComponents.value.findIndex((component) => component.id === data.id);
            if(componentIndex !== -1) allComponents.value.splice(componentIndex, 1)
        }

        if(panel.tabs.length === 0) {
            console.log("detect empty panel : ", panel)
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
    if(sourceIndex === -1) {
        return
    }
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
        panelTabFocus(targetParent.id, newItemIndex)
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
    if(sourceIndex === -1) {
        return
    }
    closePanelTab(sourceParent.id, sourceIndex, false)
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
        console.log("New Panel :", newPanelId)
        console.log("move source to new panel :", sourceData.id)
        const targetIndex = targetParent.tabs.findIndex((tabItem:any) => tabItem.id === targetData.id);
        const newItemIndex = direction === 'left' || direction === 'top' ? targetIndex  : targetIndex + 1
        targetParent?.tabs.splice(newItemIndex, 0 , newData)

        // get component and update parent and teleport id
        nextTick(() => {
            panelTabFocus(newPanelId, newItemIndex)
            const component = allComponents.value.find( (component:TabComponent) => component.id === sourceData.id)
            if(component) {
                component.teleportId = newPanelId + '-' + sourceData.id;
            }
        })

    } else {
        // need to create new layout
    }
    

}

function addMenuItemToPanel(sourceData:MenuItem, targetData:TabPanelContainer, direction: 'top' | 'bottom' | 'left' | 'right') {
 
    const targetParent = recursiveGetPanelById(layout.value, targetData.parent)
    if(!targetParent )return

    const newPanelId = "newPanel-" + new Date().getTime()
    sourceData.id +=  new Date().getTime();
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
    console.log("new menu Data", newData)
    const targetIndex = targetParent.tabs.findIndex((tabItem:any) => tabItem.id === targetData.id);
    const newItemIndex = direction === 'left' || direction === 'top' ? targetIndex  : targetIndex + 1
    targetParent?.tabs.splice(newItemIndex, 0 , newData)

    // get component and update parent and teleport id
    nextTick(() => {
        panelTabFocus(newPanelId, newItemIndex)

        const component = allComponents.value.find( (component:TabComponent) => component.id === sourceData.id)
        if(component) {
            component.teleportId = newPanelId + '-' + sourceData.id;
        }else{
            console.log("new component")
            allComponents.value.push({
                ...sourceData,
                parent: newPanelId,
                teleportId: newPanelId + '-' + sourceData.id,
                component: sourceData.component as string
            })
        }
    })
}

function addTabToPanel(panelId:string, newTab: TabItem ) {
    const parent = recursiveGetPanelById(layout.value, panelId);
    if(!parent) return
    (parent as TabPanelContainer).tabs.push(newTab)
    
    console.log("newTab : ", newTab.id, parent)
    nextTick(() => {
        panelTabFocus(panelId, parent.tabs.length - 1)
        allComponents.value.push({
            ...newTab,
            teleportId: newTab.parent + '-' + newTab.id
        })
    })
}



provide(
    TabManagerKey, 
    {
        addMenuItemToPanel,
        panelTabFocus,
        closePanelTab,
        moveTabBetweenPanel,
        addTabToPanel,
        splitViewToDirection,
        tabDataKey,
        hightLightPanel: hightLightPanel.value
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
        hightLightPanel.value = "dummy-tab-container"
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
                            component: 'LazyTabEmpty',
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
                        <component :is="component.component" :tab="component" />
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
    --splitpanes-margin: 4rem;
    :deep(.splitpanes__pane) {
        background: var(--app-grey-925);
        box-shadow: var(--app-shadow-s);
        border-radius: var(--app-border-radius-m);
        overflow: hidden;
        &:has(.activePanel) {
            background: var(--app-grey-975);
            box-shadow: var(--app-shadow-xl);
        }
    }
    
    // :deep(.splitpanes__pane) {
    //     // default style for pane
    // }
    :deep(.splitpanes__splitter) {
        --center-width: 12px;
        --dragger-width: 1px;
        --bg-width: var(--app-space-m);
        --center-color: var(--app-grey-700);
        --bg-color: rgba(0,0,0,0.3);
        z-index: 2;
        &:hover {
            --dragger-width: 2px;
            --splitpanes-margin: 2rem;
            --center-color: var(--app-grey-400);
        }
        &:after {
            content: "";
            position:absolute;
            background: var(--center-color);
            z-index: 2;
            transition: all .2s ease-in-out;
        }
        &:before {
            content: "";
            position:absolute;
        }
    }
    :deep(.splitpanes--dragging > .splitpanes__splitter) {
        --center-color:var(--app-accent-color) !important ;
        --dragger-width: 2px !important;
        --splitpanes-margin: 0rem !important;
    }
    :deep(.splitpanes--vertical > .splitpanes__splitter) {
        width: var(--center-width);
        position: relative;
        &:after {
            width: var(--dragger-width);
            height: calc(100% - var(--splitpanes-margin) * 2);
            display: block;
            background: var(--center-color);
            top: var(--splitpanes-margin);
            left: calc(( var(--center-width) - var(--dragger-width)) / 2);
        }
        &:before {
            width: var(--bg-width);
            height: 100%;
            display: block;
            position: absolute;
            left: calc( (var(--center-width) - var(--bg-width)) / 2 );
            // background: var(--bg-color);
            opacity: 0;
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