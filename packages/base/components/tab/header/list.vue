<script lang="ts" setup >
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import {TabManagerKey, useDropable} from '#imports'
import type {TabPanel, TabItem} from '#imports'

const tabManger = inject(TabManagerKey)
if(!tabManger) {
    throw createError('no '+ TabManagerKey.toString + "provided")
}

const {panel} = defineProps<{panel:TabPanel}>()

function isTabData(
  data: Record<string | symbol, unknown>,
):boolean {
  return data.key === (tabManger as any).tabDataKey;
}

const { setupDropable } = useDropable({
    key: tabManger?.tabDataKey,
    canMonitor:({ source }) => isTabData(source.data),
    onDropHandler:({ location, source, target }:any) => {
            // if drop target is not this panel , return
            if (!target || (target as any).data.data.parent !== panel.id) {
                return
            }
            
            const sourceData = source.data as any
            const targetData = target.data as any
            
            if (!isTabData(sourceData) || !isTabData(targetData)) {
                // if source or target 不是 Symbol tab
                return
            }
            const closestEdgeOfTarget = extractClosestEdge(targetData)
            if(!closestEdgeOfTarget) return
            moveTabBetweenPanel({...sourceData.data}, {...targetData.data}, closestEdgeOfTarget as any )
    },
    detectDrop:false,
})
let cleanup = () => {}
onMounted(() => {
    setupDropable()
})

onUnmounted(() => {
    cleanup()
})

function newTab() {
    const newData:TabItem = {
        id:'newTab-' + new Date().getTime(),
        label: "New Tab",
        parent: panel.id,
        component: 'LazyTabEmpty'
    }
    addTabToPanel(panel.id, newData)
}


</script>

<template>
    <div class="tabHeaderContainer">
        <TabHeaderTab v-for="(tab,index) in panel.tabs" :key="tab.id" :tab="tab" :panel="panel" :index="index" :selected="index === panel.showingTabIndex" />
        <div class="newTabButtonContainer">
            <Icon name="lucide:plus" @click.stop="newTab" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tabHeaderContainer{
    
    display: flex;
    flex-flow: row nowrap;
    overflow: auto;
    overflow-y:hidden ;
    isolation: isolate;
    position: relative;
    // background: var(--app-grey-900);
    justify-content: flex-start;
    align-items: center;
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
.newTabButtonContainer{
    padding-left: var(--app-space-xs);
}
</style>