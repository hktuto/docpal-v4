<script setup lang="ts">
import type { TabPanelContainer, TabItem } from './type';
import {TabManagerKey} from './type'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {dropTargetForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { attachClosestEdge, extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'


const tabManager = inject(TabManagerKey)
if(!tabManager) {
    throw createError('no '+ TabManagerKey.toString + "provided")
}

function getTabData(panel: any) {
  return { [(tabManager as any).tabDataKey]: true, tabId: panel.id, data:panel };
}

function isTabData(
  data: Record<string | symbol, unknown>,
):boolean {
  return data[(tabManager as any).tabDataKey] === true;
}

const {panel} = defineProps<{
    panel: TabPanelContainer
}>()

const elRef = ref()
const state = ref<'idle' | 'is-dragging-over'>('idle')
const closeEdge = ref<string | null>()
let cleanup = () => { }
onMounted(() => {
    if(!elRef.value) return
    cleanup = combine(
        monitorForElements({
            canMonitor({ source }) {
                return true
            },
            onDrop({ location, source }) {
                const target = location.current.dropTargets[0]
                const sourceData = source.data as any
                const targetData = target.data as any
                const closestEdgeOfTarget = extractClosestEdge(targetData)
                if(!closestEdgeOfTarget) return
                tabManager?.splitViewToDirection(sourceData.data, targetData.data, closestEdgeOfTarget)
            }
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
                const data = getTabData(panel)
                return attachClosestEdge(data, {
                    element: elRef.value!,
                    input,
                    allowedEdges: ['left', 'right'],
                })
            },
            getIsSticky() {
                return false
            },
            onDragEnter({ self }) {
                const closestEdge = extractClosestEdge(self.data)
                state.value = 'is-dragging-over'
                closeEdge.value = closestEdge
                // elState.value = { type: 'is-dragging-over', closestEdge }
            },
            onDrag({ self, location }) {
                const closestEdge = extractClosestEdge(self.data)
                // Only need to update react state if nothing has changed.
                if (state.value !== 'is-dragging-over' || closeEdge.value !== closestEdge) {
                    state.value = 'is-dragging-over'
                    closeEdge.value = closestEdge
                }
            },
            onDragLeave() {
                state.value = 'idle'
            },
            onDrop() {
                state.value = 'idle'
            },
        })
    )
})

onUnmounted(() => {
    cleanup()
})


</script>

<template>
    <div class="tabContainer">

        <TabHeaderList :panel="panel"/>
        
        <div ref="elRef" :data-tab-id="panel.id"  :class="{
                tabBody:true, [state]:true, [closeEdge as string]:true
            }">
            <div v-for="(tab,index) in panel.tabs" :key="tab.id" :id="panel.id + '-' +tab.id" class="tabContent" :hidden="index !== panel.showingTabIndex">
            </div>
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
    opacity: 0.8;
    
}
.tabBody, .tabContent{
    width:100%;
    height:100%;
    overflow: auto;
    background: var(--app-grey-950);
}
.tabBody{
    position: relative;
    &.is-dragging-over{
        --side-width: 40%;
        .tabContent{
            pointer-events: none;
            opacity: 0.4;
        }
        &.center{
            &:after{
                height:100%;
                top: 0;
                left:0;
                width:100%;
            } 
        }
        &.top{
            &:after{
                height:var(--side-width);
                top: 0;
                left:0;
                width:100%;
            }
        }
        &.bottom{
            &:after{
                height:var(--side-width);
                bottom: 0;
                left:0;
                width:100%;
            }
        }
        &.left{
            &:after{
                width:var(--side-width);
                top: 0;
                left:0;
                height:100%;
            }
        }
        &.right{
            &:after{
                width:var(--side-width);
                top: 0;
                right:0;
                height:100%;
            }
        }
        &:after{
            content: "";
            position: absolute;
            display: block;
            z-index: 1;
            background: rgba(0,0,0,0.3);
            transition: all .2s ease-in-out;
        }
    }
}

</style>