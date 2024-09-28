<script lang="ts" setup>

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
    
}

function setupHistory(){
    console.log("setup history")
    graphProvider?.graph.value?.on('history:change', () => {
        console.log("history:change")
        state.value.canUndo =  graphProvider?.graph.value?.canUndo() || false
        state.value.canRedo = graphProvider?.graph.value?.canRedo() || false
    })
}

function undo(){
    graphProvider?.graph.value?.undo()
}
function redo(){
    graphProvider?.graph.value?.redo()
}


const state = ref({
    canUndo: false,
    canRedo: false,
})

onMounted(() => {
    setupHistory()
})


</script>


<template>
     <div :class="{icon:true, disabled:!state.canUndo}">
        <Icon name="lucide:undo-dot" @click="undo"/>
    </div>
    <div :class="{icon:true, disabled:!state.canRedo}">
        <Icon name="lucide:redo-dot"  @click="redo"/>
    </div>
</template>

<style lang="scss" scoped>
.icon{
    font-size: var(--app-font-size-l);
    padding: var(--app-space-xs);
    background: var(--app-grey-1000);
    border-radius: var(--app-border-radius-m);
    border: 1px solid var(--app-grey-800);
    box-shadow: var(--app-shadow-s);
    color: var(--app-grey-400);
    line-height: 0;
    &.disabled{
        color: var(--app-grey-700);
        cursor: not-allowed;
    }
    cursor: pointer;
    &:hover {
        box-shadow: var(--app-shadow-l);
    }
}
</style>