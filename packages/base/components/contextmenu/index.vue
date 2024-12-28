<script lang="ts" setup>
import { useEventBus, EventType } from '#imports'



const eventPostion = ref<any>({x:0, y:0})
const visible = ref(false)
const actions = ref<TableMenuActions[]>([])
let visibleMethod;
const postion = computed(() => {
    // contextMenu is 120px width , so we need to calculate the left and top postion and check if it is out of the screen
    const {x, y} = eventPostion.value
    
    const left = x + 120 > window.innerWidth ? x - 120 : x
    // calculate the total height of actions
    const totoalActionHeight = actions.value.length * 40;// 40 is the height of each action
    // check if the top postion is out of the screen
    const top = y + totoalActionHeight > window.innerHeight ? y - totoalActionHeight : y
    return {
        left,
        top
    }
    
})

const container = ref<HTMLElement>()
onClickOutside(container, () => {
    visible.value = false
})

const contextMenuOpenHandler = (args:any)=>{
    actions.value = args.actions
    visibleMethod = args.visibleMethod
    eventPostion.value = {
        x: args.event.clientX,
        y: args.event.clientY
    }
    visible.value = true
}

const contextMenuCloseHandler = () => {
    visible.value = false
}

const contextMenuBus = useEventBus(EventType.TABLE_CONTEXT_MENU_OPEN)
const contextMenuCloseBus = useEventBus(EventType.TABLE_CONTEXT_MENU_CLOSE)
contextMenuBus.on(contextMenuOpenHandler)
contextMenuCloseBus.on(contextMenuCloseHandler)
onUnmounted(() => {
    contextMenuBus.off(contextMenuOpenHandler)
    contextMenuCloseBus.off(contextMenuCloseHandler)
})
</script>

<template>
    <div ref="container" :class="{contextMenu:true, visible}" :style="{left: postion.left + 'px', top: postion.top + 'px'}">
        <ContextmenuItem v-for="(item, index) in actions" :key="index" :item="item" />
    </div>
</template>

<style lang="scss" scoped>
.contextMenu{
    position: fixed;
    top: 0;
    left: 0;
    width: 120px;
    height: auto;
    background: var(--app-grey-1000);
    z-index: 2;
    padding: var(--app-space-xs);
    border-radius: var(--app-border-radius-s);
    transform: translateY(100vw);
    opacity: 0;
    // display: none;
    transition: transform .1s ease-in-out , opacity .2s ease-in-out;
    transition-delay: 0.2s;
    &.visible{
        // display: block !important;
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0s;
    }
}
</style>