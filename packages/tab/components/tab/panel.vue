<script setup lang="ts">
import type { TabPanelContainer } from '../../composables/useTab';
import {TabManagerKey} from './type'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
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

const displayTab = ref(panel.tabs[0])

function changeTab(index:number) {
    // displayTab.value = panel.tabs[index];
    tabManger?.panelTabFocus(panel.id, index)
}

function closeTab(index:number) {
    tabManger?.closePanelTab(panel.id, index)
}

function setUpDrag() {

}

</script>

<template>
    <div class="tabContainer">

        
        <div class="tabHeaderContainer">
            <div v-for="(tab,index) in panel.tabs" :key="tab.id" :class="{tabItem:true, showing:index === panel.showingTabIndex}" @click="changeTab(index)">
                {{ tab.label }}
                <ElButton @click="closeTab(index)">Close</ElButton>
            </div>
        </div>
        <div class="tabBody">
            {{ panel.tabs  }}
            {{ panel.showingTabIndex }}
            <div v-for="(tab,index) in panel.tabs" :key="tab.id" :id="panel.id + '-' +tab.id" class="tabContent" :hidden="index !== panel.showingTabIndex">
            </div>
            <!-- <component :is="resolveComponent(displayTab.component)" :tab="displayTab" /> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.tabHeaderContainer{
    border-bottom: 1px solid var(--app-grey-850);
    display: flex;
    flex-flow: row nowrap;
    overflow: auto;
}
.tabItem{
    --item-radius: calc(var(--container-radius) - var(--container-padding) );
    padding: var(--app-space-s) var(--app-space-m);
    border-top-left-radius: var(--item-radius);
    border-top-right-radius: var(--item-radius);
    cursor: pointer;
    &:hover {
        background: var(--app-grey-900);
    }
    &.showing{
        background: var(--app-grey-950);
        
    }
}
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