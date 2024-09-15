<script setup lang="ts">
import type {TabPanelContainer, TabLayout} from '#imports'
import {TabManagerKey} from './type'

import { useTabs, provide, useTabsManager, exampleLayout } from '#imports'
import 'splitpanes/dist/splitpanes.css'


const {layout, initLayout, allComponents} = useTabsManager()

function panelTabFocus(panelId:string, tabIndex: number) {
    // step 1 split panelId by -
    const ids = panelId.split('-')
    // step 2 loop through ids and find the panel
    // remark first level do not require id;
    let temPanel:any
    ids.forEach(id => {
        if(!temPanel) {
            temPanel = layout.value.tabs.find((tab:any) => tab.id === id)
        } else {
            temPanel = temPanel.tabs.find((tab:any) => tab.id === id)
        }
    })
    if(temPanel){
        temPanel.showingTabIndex = tabIndex
    }
}

provide(TabManagerKey, {
    panelTabFocus,
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