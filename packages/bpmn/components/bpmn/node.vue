<script lang="ts" setup>
import {BPMN_PROVIDER, createError } from '#imports'
const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
    
}

function setupNode(){

    graphProvider?.graph.value?.on('node:mouseenter', ({cell}:any) => {
        // 获取该节点下的所有连接桩
        const ports = cell.getPorts() || []
        ports.forEach((port) => {
            cell.setPortProp(port.id, 'attrs/circle', {
                fill: '#fff',
                stroke: '#85A5FF',
            })
        })
        
    })

    graphProvider?.graph.value?.on('node:mouseleave', ({cell}:any) => {
        // 获取该节点下的所有连接桩
        const ports = cell.getPorts() || []
        ports.forEach((port) => {
            cell.setPortProp(port.id, 'attrs/circle', {
                fill: 'transparent',
                stroke: 'transparent',
            })
        })
    })
}

onMounted(() => {
    setupNode()
})
</script>

<template>
    <div></div>

</template>