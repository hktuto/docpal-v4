<script lang="ts" setup generic="T extends TabItem, B extends boolean, I extends number">
import {draggable, dropTargetForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'


import type { TabItem } from '../type';
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";
import {TabManagerKey} from '../type'
const { tab, selected, index } = defineProps<{tab: T, selected:B, index:I}>()
const tabManger = inject(TabManagerKey)
if(!tabManger) {
    throw createError('no '+ TabManagerKey.toString + "provided")
}

function getTabData(tab: TabItem) {
  return { [(tabManger as any).tabDataKey]: true, tabId: tab.id, data:tab };
}

type TabState = 
    | {
        type: "idle";
    }
    | {
        type: "preview";
        container: HTMLElement;
    }
    | {
        type: "is-dragging";
    }
    | {
        type: "is-dragging-over";
        closestEdge: Edge | null;
    };
const idle: TabState = { type: "idle" };
const elRef = ref<HTMLDivElement | null>(null);
const elState = useState<TabState>("state_" + tab.id, () => idle);

let cleanup = () => { }

onMounted(() => {
    if(!elRef.value) return
    
    cleanup = combine(
        draggable({
            element: elRef.value, // 可拖拉的元件
            getInitialData(){
                return getTabData(tab)
            },
            onGenerateDragPreview({ nativeSetDragImage }) {
                setCustomNativeDragPreview({
                    nativeSetDragImage,
                    getOffset: pointerOutsideOfPreview({
                        x: '16px',
                        y: '8px',
                    }),
                    render({ container }) {
                        elState.value = { type: 'preview', container }
                    },
                })
            },
            onDragStart() {
                elState.value = { type: 'is-dragging' }
            },
            onDrop() {
                elState.value = idle
            },

        }),
        dropTargetForElements({
            element: elRef.value,
            canDrop({ source }) {
                // not allowing dropping on yourself
                if (source.element === elRef.value) {
                    return false
                }
                // only allowing tasks to be dropped on me
                // 是否可以拖拉到元件上的邏輯
                return true
            },
            getData({ input }) {
                const data = getTabData(tab)
                return attachClosestEdge(data, {
                    element: elRef.value!,
                    input,
                    allowedEdges: ['left', 'right'],
                })
            },
            getIsSticky() {
                return true
            },
            onDragEnter({ self }) {
                const closestEdge = extractClosestEdge(self.data)
                elState.value = { type: 'is-dragging-over', closestEdge }
            },
            onDrag({ self }) {
                const closestEdge = extractClosestEdge(self.data)
                // Only need to update react state if nothing has changed.
                if (elState.value.type !== 'is-dragging-over' || elState.value.closestEdge !== closestEdge) {
                    elState.value = { type: 'is-dragging-over', closestEdge }
                }
            },
            onDragLeave() {
                elState.value = idle
            },
            onDrop() {
                elState.value = idle
            },
        }),
        
    )
})

onUnmounted(() => {
    cleanup()
})

function tabFocus() {
    if(tabManger){
        tabManger.panelTabFocus(tab.parent, index)
    }
}

function closeTab(){

    if(tabManger){
        tabManger.closePanelTab(tab.parent, index, true)
    }
}

</script>

<template>
    <div class="wrapper" @click="tabFocus">

        <div ref="elRef" :data-tab-id="tab.id" 
        :class="{tabItem:true, showing:selected, [elState.type]:true, [(elState as any).closestEdge] :true}" >
            <!-- <div class="gripIcon">
                <Icon class="" name="lucide:grip-vertical" />
            </div> -->
            <!-- <div class="icon">
                {{ tab.icon }}
            </div> -->
            <div class="label">
                {{ tab.label }}
            </div>
            <Icon class="closeIcon" name="ic:round-close" @click.stop="closeTab"></Icon>
            <!-- <TabDropIndicator 
                
                
                gap="20px" /> -->
        </div>

        <Teleport v-if="elState.type === 'preview'" :to="elState.container">
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
        display: none;
    }
    &:hover {
        background: linear-gradient(0deg, var(--app-grey-850), rgba(255,255,255,0));
        .gripIcon{
            display: block;
        }
        .closeIcon{
            display: block;
        }
    }
    &.showing{
        background: var(--app-grey-950);
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