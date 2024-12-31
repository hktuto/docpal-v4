<script lang="ts" setup>
import { useEventBus, EventType } from '#imports'



const actions = ref<TableMenuActions[][]>([])
const visible = ref(false)
const position = ref<any>({x:0, y:0, left:0, top:0})
const menuItemHeight = 26;


const contextMenuOpenHandler = (args:TABLE_CONTEXT_PARAMS)=>{
    console.log("contextMenuOpenHandler", args)
    actions.value = args.options
    visible.value = true
    const {clientX, clientY} = args.event
    const x = clientX
    const y = clientY
    const left = x + 120 > window.innerWidth ? x - 120 : x
    // calculate the total height of actions
    const totoalActionHeight = actions.value.length * menuItemHeight;// 40 is the height of each action
    // check if the top position is out of the screen
    const top = y + totoalActionHeight > window.innerHeight ? y - totoalActionHeight : y
    position.value = {
        x,
        y,
        left,
        top
    }
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
    <div :class="{contextMenuContainer:true, visible}" :style="{left: position.left + 'px', top: position.top + 'px', ['--context-item-height']: menuItemHeight + 'px'}">
        {{ actions }}
    </div>
</template>
