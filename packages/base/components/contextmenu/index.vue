<script lang="ts" setup>
import { useEventBus, EventType } from '#imports'



const actions = ref<TableMenuActions[][]>([])
const visible = ref(false)
const visibleMethod = ref<any>((params:any) => {
    return true
})

const contextMenuOpenHandler = (args:TABLE_CONTEXT_PARAMS)=>{
    actions.value = args.options
    visible.value = true
}

const contextMenuCloseHandler = () => {
    visible.value = false
}

const contextMenuBus = useEventBus<TABLE_CONTEXT_PARAMS>(EventType.TABLE_CONTEXT_MENU_OPEN)
const contextMenuCloseBus = useEventBus<void>(EventType.TABLE_CONTEXT_MENU_CLOSE)
contextMenuBus.on(contextMenuOpenHandler)
contextMenuCloseBus.on(contextMenuCloseHandler)
onUnmounted(() => {
    contextMenuBus.off(contextMenuOpenHandler)
    contextMenuCloseBus.off(contextMenuCloseHandler)
})
</script>

<template>
    <div :class="{contextMenuContainer:true, visible}">
        
    </div>
</template>
