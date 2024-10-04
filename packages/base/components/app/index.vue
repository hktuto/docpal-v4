<script setup lang="ts">
import { provide, useTabsManager } from '#imports'
import type {TabItem, MenuItem, RouterParams} from '#imports'
import {TabManagerKey, useCurrentTargetPanel } from '#imports'

import 'splitpanes/dist/splitpanes.css'

const tabDataKey = Symbol("tab");
const {layout, initLayout, allComponents} = useTabsManager()
const hightLightPanel = useCurrentTargetPanel()






const loading = ref(false);
const fullscreenItem = ref<TabItem>()

function closeFullscreen(){
    fullscreenItem.value = undefined
}
function openFocusMode(tab:TabItem){
    fullscreenItem.value = tab
}

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

provide(
    TabManagerKey, 
    {
        tabDataKey,
        fullscreenItem,
        openFocusMode
    }
)

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
                        
                        <template v-if="fullscreenItem && fullscreenItem.id === component.id">
                            <Teleport defer :to="`#fullscreen-${component.parent}_${component.id}`">
                                <TabRouter :tab="component" />
                            </Teleport>
                        </template>
                        <template v-else>
                            <Teleport defer :to="`#${component.parent}_${component.id}`">
                                <TabRouter :tab="component" />
                            </Teleport>
                        </template>
                        
                    </template>
                </div>

                <div v-if="fullscreenItem" class="fullScreenContainer" >
                    <div class="header" :data-tab-id="fullscreenItem.id" :id="`fullscreen-tab-header-${fullscreenItem.parent}-${fullscreenItem.id}`">
                        <div class="tabLeftTeleportContainer" >

                        </div>
                        <div class="icon"></div>
                        <div class="label">
                            
                        </div>
                        <Icon class="closeIcon" name="ic:round-close" @click.stop="closeFullscreen"></Icon>
                    </div>
                    <div class="fullscreenContent" :id="'fullscreen-' + fullscreenItem.parent + '_' + fullscreenItem.id">
                      
                    </div>
                </div>

            </template>
        </template>
    </AppWrapper>
</template>

<style lang="scss" scoped>
.fullScreenContainer{
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background: var(--app-grey-975);
    z-index: 1000;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column nowrap;
    z-index: 4;
    .header{
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        overflow: auto;
        overflow-y:hidden ;
        isolation: isolate;
        position: relative;
        // background: var(--app-grey-900);
        justify-content: flex-start;
        align-items: center;
        padding-block: var(--app-space-xs);
        &:after {
            content: '';
            height: 1px;
            background: var(--app-grey-850);
            width:100%;
            display: block;
            z-index: -1;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }
    .fullscreenContent{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background: var(--app-grey-1000);
    }
}
</style>