<script setup lang="ts">
import type { TabPanelContainer } from '../../composables/useTab';
import {TabManagerKey} from './type'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';

const tabManger = inject(TabManagerKey)
if(!tabManger) {
    throw createError('no '+ TabManagerKey.toString + "provided")
}

const { panel } = defineProps<{
    panel: TabPanelContainer
}>()

const displayTab = ref(panel.tabs[0])

function changeTab(index:number) {
    displayTab.value = panel.tabs[index];
    tabManger?.panelTabFocus(panel.id, index)
}

function setUpDrag() {
    
}

</script>

<template>
    <div class="tabContainer">
        <div class="tabHeaderContainer">
            <div v-for="(tab,index) in panel.tabs" :key="tab.id" :class="{tabItem:true, showing:index === panel.showingTabIndex}" @click="changeTab(index)">
                {{ tab.label }}
            </div>
        </div>
        <div class="tabBody">
            {{ displayTab }}
            <component :is="resolveComponent(displayTab.component)" :tab="displayTab" />
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
.tabBody{
    width:100%;
    height:100%;
    overflow: auto;
    background: var(--app-grey-950);
}
</style>