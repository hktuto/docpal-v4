<script lang="ts" setup>
import {BPMN_PROVIDER, createError, bpmnElement } from '#imports'
import type { BpmnElement } from '#imports'
import { useEventListener } from '@vueuse/core';
const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
    
}

const opened = ref(false)
const editComponent = ref()
const ignoreTypeList = ['endEvent']
const selectedNode = ref()
function setupNode(){
    graphProvider?.graph.value?.on('blank:dblclick', () => {
        graphProvider?.graph.value?.zoomToFit({
            padding: 24
        })
        opened.value = false
    })
    graphProvider?.graph.value?.on('node:mouseenter', ({cell}:any) => {
        // 获取该节点下的所有连接桩
        const ports = cell.getPorts() || []
        ports.forEach((port:any) => {
            cell.setPortProp(port.id, 'attrs/circle', {
                fill: '#fff',
                stroke: '#85A5FF',
            })
        })
        
    })

    graphProvider?.graph.value?.on('node:mouseleave', ({cell}:any) => {
        // 获取该节点下的所有连接桩
        const ports = cell.getPorts() || []
        ports.forEach((port:any) => {
            cell.setPortProp(port.id, 'attrs/circle', {
                fill: 'transparent',
                stroke: 'transparent',
            })
        })
    })

    graphProvider?.graph.value?.on('node:dblclick', handleNodeClick )
}

function openInfo() {
    opened.value = true;
    editComponent.value = resolveComponent('LazyBpmnSidebarInfo');
}
function openFolderCabinet() {
    opened.value = true;

    editComponent.value = resolveComponent('LazyBpmnSidebarFolderCabinet');
}

function openPermission() {
    opened.value = true;
    editComponent.value = resolveComponent('LazyBpmnSidebarPermission');
}

function handleNodeClick({e,x,y,view,node}:any) {
    // graphProvider?.graph.value?.zoomTo(2);
    // graphProvider?.graph.value?.centerCell(node)
    if(ignoreTypeList.includes(node.data.type || "")) {
        return
    }
    selectedNode.value = node
    const type = node.data.type as BpmnElementType
    if(type) {
        const bpmnElementType = bpmnElement[type]
        if(bpmnElementType.contextMenuComponent) {
            if(typeof bpmnElementType.contextMenuComponent === 'string') {
                editComponent.value = resolveComponent(bpmnElementType.contextMenuComponent)
            }else{
                const element = bpmnElementType.contextMenuComponent(node.data.data)
                editComponent.value = element
            }
            opened.value = true
        }
    }
}


onMounted(() => {
    setupNode()
})

defineExpose({
    openInfo,
    openFolderCabinet,
    openPermission
})
</script>

<template>
    <div :class="{contextHandler:true, opened}">
        <div class="propertiesHeader" @click="opened = false">
            <Icon name="lucide:settings-2" />
            Propertie : {{ selectedNode?.data.type }}
        </div>
        <component v-if="editComponent" :is="editComponent"  :node="selectedNode" />
    </div>
</template>

<style scoped lang="scss">
.propertiesHeader{
    width:100%;
    padding-block: var(--app-space-xs);
    border-bottom : 1px solid var(--app-grey-800);
}
.contextHandler{
    position: absolute;
    width: 280px;
    height: calc(100% - var(--app-space-xs) * 2);
    overflow: auto;
    right: var(--app-space-xs);
    top: var(--app-space-xs);
    z-index: 2;
    background: rgba(255,255,255,0.5);
    backdrop-filter: blur(10px);
    opacity: 0;
    padding: var(--app-space-xs);
    border-radius: var(--app-border-radius-m);
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    backdrop-filter: blur(10px);
    transform: translateX(100%);
    transition: all .2s ease-in-out;
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: hidden;
    gap: var(--app-space-xs);
    &.opened{
        transform: translateX(0);
        opacity: 1;
    }
}
.opened{
    opacity: 1;
}
</style>