<script lang="ts" setup generic="T extends TabItem, B extends boolean, I extends number">


import type { TabItem } from '#imports';
import {TabManagerKey, useDragable} from '#imports'

const { tab, selected, index } = defineProps<{tab: T, selected:B, index:I}>()
const tabManger = inject(TabManagerKey)
if(!tabManger) {
    throw createError('no '+ TabManagerKey.toString + "provided")
}
const elRef = ref()
const {dragState ,setupDrag} = useDragable({
    key: (tabManger as any).tabDataKey,
    dragData: {
        [(tabManger as any).tabDataKey]: true,
        key : (tabManger as any).tabDataKey,
        data: tab
    },
    detectDrop: true,
    allowedEdges: ['left', 'right'],
})

onMounted(() => {
    setupDrag(elRef.value)
})

function tabFocus() {
    panelTabFocus(tab.parent, index)
}

function closeTab(){

    closePanelTab(tab.parent, index, true)
}

</script>

<template>
    <div class="wrapper" @click="tabFocus">

        <div ref="elRef" :data-tab-id="tab.id" 
        :class="{tabItem:true, showing:selected, [dragState.type]:true, [(dragState as any).closestEdge] :true}" >
            <!-- <div class="gripIcon">
                <Icon class="" name="lucide:grip-vertical" />
            </div> -->
            <div class="tabLeftTeleportContainer" >

            </div>
            <Icon v-if="tab.icon" :name="tab.icon" />
            <div class="label">
                {{ tab.label }}
            </div>
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
    position: relative;
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
</style>