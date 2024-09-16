<script setup lang="ts">
import {TabManagerKey} from './type'

import { provide, useTabsManager, exampleLayout, recursiveGetPanelById } from '#imports'
import 'splitpanes/dist/splitpanes.css'


const {layout, initLayout, allComponents} = useTabsManager()

function panelTabFocus(panelId:string, tabIndex: number) {
    // step 1 split panelId by -
    const panel = recursiveGetPanelById(layout.value, panelId) as TabPanelContainer
    
    if(panel) {
        panel.showingTabIndex = tabIndex
    }
}

function closePanelTab(panelId:string, tabIndex: number,) {
    const panel = recursiveGetPanelById(layout.value, panelId)
    // remove tab in panel with given tabIndex
    if(panel) {
        // check is panel is the last children
        if(allComponents.value.length === 1){
            return
        } 
        const componentIndex = allComponents.value.findIndex((component) => component.id === panel.tabs[tabIndex].id);

        panel?.tabs.splice(tabIndex, 1);
        if(componentIndex !== -1) allComponents.value.splice(componentIndex, 1)

        if(panel.tabs.length === 0) {
            const parent = recursiveGetPanelById(layout.value, panel.parent)
            
            if(parent) {
                const panelIndex = parent.tabs.findIndex((t) => t.id === panel.id)
                if(panelIndex !== -1) parent.tabs.splice(panelIndex, 1)
            }
            console.log(parent, panel.parent)
        } else if(panel.showingTabIndex === tabIndex) {
            console.log(panel, panelId, tabIndex)
            panelTabFocus(panelId, 0)
        }
    }
    
    // check if panel is empty
    
        
}

provide(TabManagerKey, {
    panelTabFocus,
    closePanelTab
})

onMounted(() => {
    nextTick(() => {

        initLayout(exampleLayout)
    })
})
</script>

<template>
    <div class="tabManager">
        <TabLayout :layout="layout" />
        <div class="hiddenAllComponent">
            <template v-for="component in allComponents" :key="component.id">
                <Teleport  :to="'#' + component.teleportId">
                    <component :is="component.component" />
                </Teleport>
            </template>
        </div>
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