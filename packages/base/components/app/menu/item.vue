<script lang="ts" setup generic="T extends MenuItem">
import type {MenuItem} from '#imports'
const { item, selected } = defineProps<{item :MenuItem, selected:boolean}>()

const elRef = ref()
let cleanup = () => {}
onMounted(() => {
    if(!elRef) return
    if( !item.draggable ) return
})

onUnmounted(() => {
    cleanup()
})

function itemClickHandler(){

}
 
</script>

<template>
<div ref="elRef" :class="{menuItemContainer:true, selected}" @click="itemClickHandler">
    <Icon :name="item.icon"></Icon>
</div>

</template>

<style lang="scss" scoped>
.menuItemContainer{
    padding: var(--menu-item-padding);
    border-radius: var(--menu-item-radius);
    display: grid;
    place-items: center;
    cursor: pointer;
    background-color: var(--menu-item-normal-bg);
    color: var(--menu-item-normal-color);
    &:hover{
        background: var(--menu-item-hover-bg);
        color: var(--menu-item-hover-color);
    }
    &.selected {
        background: var(--menu-item-active-bg);
        color: var(--menu-item-active-color);
    }
    .iconify{
        font-size: var(--icon-font-size);
    }
}
</style>
