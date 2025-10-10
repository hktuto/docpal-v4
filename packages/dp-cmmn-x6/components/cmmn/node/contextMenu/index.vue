<script lang="ts" setup>

import {Graph, Cell, View} from "@antv/x6";
import {useEventListener} from "@vueuse/core";
import { reactive } from 'vue'

const state = reactive<{
    loading: boolean
    opened: boolean
    items: any[]
    node: Cell
    view: View
    position: {
        x: number
        y: number
    }
}>({
    loading: false,
    opened:false,
    items:[],
    node: null,
    view: null,
    position:{
        x:0,
        y:0
    }
})


function openContextMenu({detail}){
    const event = detail.e as MouseEvent
    console.log("openContextMenu", detail)
    state.position = {
        x: event.clientX,
        y: event.clientY
    }
    state.node = detail.cell
    state.view = detail.view
    setTimeout(() => {
        state.opened = true
    },33)
}

function itemClickHandler(item){
    state.opened = false
}


useEventListener(window, 'cmmn-node-contextMenu-open', openContextMenu)
useEventListener(window, 'cmmn-node-contextMenu-close', () => {
    state.opened = false
})
</script>

<template>
    <div :class="{contextMenuContainer:true, opened:state.opened}" :style="`--x:${state.position.x}px;--y:${state.position.y}px`" v-loading="state.loading" tabindex="0" aria-label="Context menu" role="menu">
        <template v-if="state.opened">
            
            <div class="nodeName" v-if="state.opened">
                {{ state.node.label }}
            </div>
            <CmmnNodeContextMenuConnection  v-bind="state" @clicked="itemClickHandler" />
            <div class="divider"></div>
            <CmmnNodeContextMenuRemove  v-bind="state" @clicked="itemClickHandler" />
        </template>
    </div>
</template>

<style scoped lang="scss">
.contextMenuContainer{
    border-radius: 0.5rem;
    background: var(--app-grey-950);
    border: 1px solid var(--app-grey-800);
    box-shadow: 0 2px 5px rgba(0,0,0,.2);
    position: fixed;
    top:var(--y);
    left:var(--x);
    z-index: 100;
    transform: translateY(100px);
    padding: var(--app-space-xs);
    opacity: 0;
    &.opened{
        opacity: 1;
        transform: translateY(0);
        transition: all 0.3s;
    }
}
:deep(.actionItem) {
    --icon-size: .8rem;
    --icon-color: var(--secondary-color);
    display: flex;
    flex-flow: row nowrap;
    gap: var(--app-space-xs);
    justify-content: flex-start;
    align-items: center;
    padding-block: calc(var(--app-space-xs) /2);
    padding-inline: var(--app-space-xs);
    cursor: pointer;
    &:not(:last-child){
        border-bottom: 1px solid var(--app-grey-300);
    }
    &:hover{
        --icon-color: var(--app-primary-color);
        background: var(--app-grey-000);
    }
    &.disabled{
        --icon-color: var(--app-grey-400);
        cursor: not-allowed;
        color: var(--app-grey-400);
    }
}

.divider{
    margin-block: calc(var(--app-space-xs) / 2) ;
    width:100%;
    height: 1px;
    background: var(--app-grey-000);
}
</style>
