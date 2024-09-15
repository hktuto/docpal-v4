<script setup lang="ts">
import type {TabPanelContainer, TabLayout} from '#imports'
import {TabManagerKey} from './type'

import { useTabs, provide, useTabsManager, exampleLayout, recursiveGetPanelById } from '#imports'
import 'splitpanes/dist/splitpanes.css'


const {layout, initLayout, allComponents} = useTabsManager()

function panelTabFocus(panelId:string, tabIndex: number) {
    // step 1 split panelId by -
    const panel:TabPanelContainer = recursiveGetPanelById(layout.value, panelId)
    if(panel) {
        panel.showingTabIndex = tabIndex
    }
}

function closePanelTab(panelId:string, tabIndex: number) {
    const panel = recursiveGetPanelById(layout.value, panelId)
    console.log('close Panel', panel.showingTabIndex, tabIndex);
    // remove tab in panel with given tabIndex
    
    panel?.tabs.splice(tabIndex, 1)
    if(panel?.showingTabIndex === tabIndex) {
        nextTick(() => {
            panel.showingTabIndex = 0
            console.log('close Panel', panel.showingTabIndex, tabIndex);
        })
    }
    // check if panel is empty
    if(panel?.tabs.length === 0) {
        console.log('remove panel')
    }
        
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
                <Teleport  :to="component.teleportId">
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