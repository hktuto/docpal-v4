<script setup lang="ts">
import { provide, useTabsManager } from '#imports'
import type {TabItem, MenuItem, RouterParams} from '#imports'
import {TabManagerKey, useCurrentTargetPanel } from '#imports'

import 'splitpanes/dist/splitpanes.css'

const tabDataKey = Symbol("tab");
const {layout, initLayout, allComponents} = useTabsManager()
const hightLightPanel = useCurrentTargetPanel()




provide(
    TabManagerKey, 
    {
        tabDataKey,
    }
)

const loading = ref(false);

async function saveTabsToLocalStorage() {
    const saveData = JSON.parse(JSON.stringify(layout.value))
    // loop all panel and tabs to reset all initized to false
    saveData.forEach((panel:any) => {
        panel.tabs.forEach((tab:any) => {
            tab.initized = false
        })
    })
    localStorage.setItem('app-tab', JSON.stringify(saveData))
}
async function getTabsFromServer() {
    loading.value = true;
    const storageTabs = localStorage.getItem('app-tab')
    if(storageTabs) {
        const newLayout = JSON.parse(storageTabs);
        // need to delay initLayout to wait for splitpanes to render
        setTimeout(() =>{
            initLayout(newLayout)
        },200)
    }else{
        // init a basic layout
        hightLightPanel.value = "dummy-tab-container"
        initLayout([
                {
                    id:"dummy-tab-container",
                    parent: "root",
                    showingTabIndex: 0,
                    size:100,
                    tabs: [
                        {
                            id: 'new-tab-001',
                            label: "New Tab",
                            parent: "dummy-tab-container",
                            component: 'LazyTabEmpty',
                        }
                    ]
                }
            ])
    }
    loading.value = false;
} 

watch(hightLightPanel,(index) => {
    localStorage.setItem('app-tab-hightLightPanel', index);
})
watch(layout, (newVal) => {
    saveTabsToLocalStorage()
},{
    deep:true
})


</script>

<template>
    <AppWrapper>
        <template #sidebar>
            <AppMenu class="sideMenu">
                <template #header>
                    <slot name="header" />
                </template>
                <template #footer>
                    <slot name="footer" />
                </template>
            </AppMenu>
        </template>
        <template #default>
            <template  v-if="loading">
                <LoadingBg />
            </template>
            <template v-else>

                <TabLayout :layout="layout" @ready="getTabsFromServer" />
                
                <div class="hiddenAllComponent">
                    <template v-for="component in allComponents" :key="component.id">
                        <Teleport defer :to="'#' + component.parent + '_' + component.id">
                            <TabRouter :tab="component" />
                        </Teleport>
                    </template>
                </div>
            </template>
        </template>
    </AppWrapper>
</template>