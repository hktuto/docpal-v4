<script lang="ts" setup>
import {BPMN_PROVIDER, createError } from '#imports'
import { onActivated, onMounted } from 'vue';


const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
    
}

function setupEdge(){
    console.log("setup edge")
    graphProvider?.graph.value?.on('edge:mouseenter', ({cell}:any) => {
        // cell.setRouter('normal')
        cell.addTools([
            {
                name: 'vertices',
                args: {
                    attrs: { fill: '#666' },
                },
            },
            {
                name: 'target-arrowhead',
                args: {
                    attrs: {
                        fill: 'red',
                    },
                },
            },
            {
                name:'source-arrowhead',
                args:{
                    attrs: {
                        fill: 'black',
                    },
                }
            },
            {
                name: 'button-remove',
                args:{
                    distance: -20
                }
            }
        ])
    })

    graphProvider?.graph.value?.on('edge:mouseleave', ({cell}:any) => {
        cell.removeTools()
    })
}

onMounted(() => {
    setupEdge()
})


</script>


<template>
<div></div>
</template>
