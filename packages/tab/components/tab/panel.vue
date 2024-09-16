<script setup lang="ts">
import type { TabPanelContainer } from './type';
import {TabManagerKey} from './type'

import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const tabManger = inject(TabManagerKey)
if(!tabManger) {
    throw createError('no '+ TabManagerKey.toString + "provided")
}

const {panel} = defineProps<{
    panel: TabPanelContainer
}>()

</script>

<template>
    <div class="tabContainer">

        <TabHeaderList :panel="panel"/>
        
        <div class="tabBody">
            <div v-for="(tab,index) in panel.tabs" :key="tab.id" :id="panel.id + '-' +tab.id" class="tabContent" :hidden="index !== panel.showingTabIndex">
            </div>
            <!-- <component :is="resolveComponent(displayTab.component)" :tab="displayTab" /> -->
        </div>
    </div>
</template>

<style scoped lang="scss">


.tabContainer{
    height: 100%;
    width:100%;
    position: relative;
    display: grid;
    grid-template-rows: min-content 1fr;

}
.tabBody, .tabContent{
    width:100%;
    height:100%;
    overflow: auto;
    background: var(--app-grey-950);
}
</style>