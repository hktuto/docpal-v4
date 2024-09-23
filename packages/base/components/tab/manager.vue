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
    console.log("saveTabsToLocalStorage", layout.value)
    localStorage.setItem('app-tab', JSON.stringify(layout.value))
}
async function getTabsFromServer() {
    loading.value = true;
    const storageTabs = localStorage.getItem('app-tab')
    if(storageTabs) {
        console.log("getTabsFromServer", JSON.parse(storageTabs))
        const newLayout = JSON.parse(storageTabs);
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

onMounted(() => {
    // getTabsFromServer()
})
</script>

<template>
    <div class="tabManager">
        <template  v-if="loading">
            <LoadingBg />
        </template>
        <template v-else>

            <TabLayout :layout="layout" @ready="getTabsFromServer" />
            
            <div class="hiddenAllComponent">
                <template v-for="component in allComponents" :key="component.id">
                    <Teleport defer :to="'#' + component.parent + '_' + component.id">
                        {{ component.id }}
                        <TabRouter :tab="component" />
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
        transition: none;
        background: var(--app-grey-925);
        box-shadow: var(--app-shadow-s);
        border-radius: var(--app-border-radius-m);
        overflow: hidden;
        &:has(.activePanel) {
            background: var(--app-grey-975);
            box-shadow: var(--app-shadow-l);
            z-index: 4;
        }
    }
    
    // :deep(.splitpanes__pane) {
    //     // default style for pane
    // }
    :deep(.splitpanes__splitter) {
        --center-width: 6px;
        --dragger-width: 1px;
        --bg-width: var(--app-space-m);
        --center-color: transparent;
        --bg-color: rgba(0,0,0,0.3);
        z-index: 2;
        &:hover {
            --dragger-width: 2px;
            --splitpanes-margin: 2rem;
            --center-color: var(--app-success-3);
        }
        &:after {
            content: "";
            position:absolute;
            background: var(--center-color);
            z-index: 2;
            transition: all .1s ease-in-out;
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
            background: var(--bg-color);
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