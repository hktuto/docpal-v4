<script lang="ts" setup>
import {BPMN_PROVIDER, createError } from '#imports'
import { onActivated, onMounted } from 'vue';


const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
    
}
console.log("got provider in slot", graphProvider)

function setupSidebar(){
    console.log("setup sidebar")
    graphProvider?.graph.value?.on('node:click', (e:any) => {
        console.log("node click", e)
    })
    graphProvider?.graph.value?.on('node:dblclick', (e:any) => {
        console.log("node dblclick", e)
    })
}

onMounted(() => {
    setupSidebar()
})

</script>

<template>
    <div class="sidebarContainer">

    </div>
</template>

<style scoped lang="scss">

</style>