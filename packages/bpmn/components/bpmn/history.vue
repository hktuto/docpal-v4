<script lang="ts" setup>

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
    
}
const workflowDetail = inject<{saveDraft:()=>void}>('workflowDetail')
if(!workflowDetail) {
    throw createError('workflowDetail not found')
}

function setupHistory(){
    console.log("setup history")
    graphProvider?.graph.value?.on('history:change', () => {
        console.log("history:change")
        state.value.canUndo =  graphProvider?.graph.value?.canUndo() || false
        state.value.canRedo = graphProvider?.graph.value?.canRedo() || false
        workflowDetail?.saveDraft()
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
        <ElTooltip content="Undo" placement="right">
            <Icon name="lucide:undo-dot" @click="undo"/>
        </ElTooltip>
            <div class="label">Undo</div>
    </div>
    <div :class="{icon:true, disabled:!state.canRedo}">
        <ElTooltip content="Redo" placement="right">
            <Icon name="lucide:redo-dot"  @click="redo"/>
        </ElTooltip>
            <div class="label">Redo</div>
    </div>
</template>

<style lang="scss" scoped>

</style>