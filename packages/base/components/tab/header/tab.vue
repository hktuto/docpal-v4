<script lang="ts" setup generic="T extends TabItem, B extends boolean, I extends number">

import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

import type { TabItem, TabPanel } from '#imports';
import {TabManagerKey, } from '#imports'
import {useDragable} from '../../../composables/useDnD'

const { tab, selected, index, panel } = defineProps<{tab: T, selected:B, index:I , panel:TabPanel}>()
const tabManger = inject(TabManagerKey)
if(!tabManger) {
    throw createError('no '+ TabManagerKey.toString + "provided")
}
const elRef = ref()


function isTabData(
  data: Record<string | symbol, unknown>,
):boolean {
  return data.key === (tabManger as any).tabDataKey;
}
const {dragState ,setupDrag} = useDragable({
    key: (tabManger as any).tabDataKey,
    dragData: {
        [(tabManger as any).tabDataKey]: true,
        key : (tabManger as any).tabDataKey,
        type: 'tab',
        data: tab
    },
    detectDrop: true,
    allowedEdges: ['left', 'right'],
    onDropFromExternal:({source, self}:any) => {
            const layout = useTabLayout()
            const allComponents = useTabComponent()
            const data = source.getStringData('text/plain');
            const sourceData = JSON.parse(data).data as any
            const targetData = self.data as any
            
            const closestEdgeOfTarget = extractClosestEdge(self.data)
            console.log("closestEdgeOfTarget", closestEdgeOfTarget)
            if(!closestEdgeOfTarget) return
            const parentId = layout.value.findIndex(tab => tab.id === targetData.data.parent);
            const targetIndex = layout.value[parentId].tabs.findIndex((tabItem) => tabItem.id === targetData.data.id);
            const newItemIndex = closestEdgeOfTarget === 'left' ? targetIndex  : targetIndex + 1
            const newData = {
                ...sourceData,
                id: "newtab-" + new Date().getTime(),
                parent: targetData.data.parent,
                initilized: false,
            }
            layout.value[parentId].tabs.splice(newItemIndex, 0, newData)
            allComponents.value.push(newData)
            console.log("layout", layout.value)
            panelTabFocus(targetData.data.parent, newItemIndex)
    },
    onDropItself:(args:any) => {
    },
    canDragToExternal: true
})

function openInFocusMode() {
    tabManger?.openFocusMode(tab)

}

onMounted(() => {
    setupDrag(elRef.value)
})

function openInNewTab() {
    if((window as any).isDesktopMode) {
        const ev = new CustomEvent('dragTagToWindow', {
            detail: {
                url: '/tab',
                data: tab,
            }
        })
        window.dispatchEvent(ev)
    } else {
        const args = btoa(encodeURIComponent(JSON.stringify({data:tab})))
        console.log(tab)
        window.open(`/tab?arg=${args}`, '_blank')
    }
    closePanelTab(tab.parent, index, true)
}

function tabFocus() {
    panelTabFocus(tab.parent, index)
}

function closeTab(){

    closePanelTab(tab.parent, index, true)
}

</script>

<template>
    <div class="wrapper" @click="tabFocus">

        <div ref="elRef" :data-tab-id="tab.id" :id="`tab-header-${tab.parent}-${tab.id}`"
        :class="{tabItem:true, showing:selected, [dragState.type]:true, [(dragState as any).closestEdge] :true}" >

            <div class="tabLeftTeleportContainer" >

            </div>
            <div class="icon"></div>
            <div class="label">
            </div>
            <Icon  class="closeIcon" name="lucide:fullscreen" @click="openInFocusMode" />
            <Icon  class="closeIcon" name="lucide:screen-share" @click="openInNewTab" />
            <Icon class="closeIcon" name="ic:round-close" @click.stop="closeTab"></Icon>
            <!-- <TabDropIndicator 
                gap="20px" /> -->
        </div>

        <Teleport v-if="dragState.type === 'preview'" :to="dragState.container">
            <div class="dragPreview">
                {{ tab.label }}
            </div>
        </Teleport>
</div>

</template>

<style lang="scss" scoped>
.dragPreview{
    --item-radius: calc(var(--container-radius) - var(--container-padding) );
    padding: var(--app-space-xs) var(--app-space-s);
    border-radius: var(--item-radius);
    color: var(--app-grey-200);
    background: var(--app-grey-950);
}
.tabItem{
    --item-radius: calc(var(--container-radius) - var(--container-padding) );
    padding: var(--app-space-xs) var(--app-space-s);
    font-size: var(--app-font-size-s);
    color: var(--app-grey-400);
    border-bottom: 2px solid var(--tab-item-border-color);
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row nowrap;
    gap: var(--app-space-xxs);
    border-top-left-radius: var(--app-border-radius-m);
    border-top-right-radius: var(--app-border-radius-m);
    position: relative;
    max-width: 100%;
    min-width: 60px;
    &.is-dragging {
        opacity: 0.4;
    }
    .closeIcon{
        opacity: 0;
    }
    &:hover {
        background: var(--app-grey-850);
        .gripIcon{
            display: block;
        }
        .closeIcon{
            opacity: 1;
        }
    }
    &.showing{
        background: var(--app-grey-1000);
        color: var(--app-grey-100);
        .closeIcon{
            display: block;
        }
    }
    &.is-dragging-over {
        &:before {
            content: "";
            position: absolute;
            height: 100%;
            width: 2px;
            top:0;
            background:  var(--app-accent-color);
        }
        &.left {
            &:before{
                left:0
            }
        }
        &.right {
            &:before{
                right:0
            }
        }
    }

}
.gripIcon{
    font-size: var(--app-font-size-m);
    display: none;
    position: absolute;
    left:0;
    height: 100%;
    width: 30%;
    top: calc( var(--app-space-s) / 2);
    cursor:grab;
}
.label{
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>