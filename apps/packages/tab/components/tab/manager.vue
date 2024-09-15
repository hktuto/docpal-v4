<script setup lang="ts">
import type {TabPanelContainer, TabLayout} from '#imports'
import {TabManagerKey} from './type'

import { useTabs, provide } from '#imports'
import 'splitpanes/dist/splitpanes.css'


const layout = useTabs()

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
</script>

<template>
    <div class="tabManager">
        <TabLayout :layout="layout" />
    </div>
</template>

<style scoped lang="scss">
.tabManager{
    height:100%;
    :deep(.splitpanes) {
        background: var(--app-grey-900);
    }
    
    :deep(.splitpanes__pane) {
        // default style for pane
    }
    
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
        background: var(--app-grey-800);
    }
}
</style>