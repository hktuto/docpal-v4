<script lang="ts" setup generic="T extends MenuItem">
import type {MenuItem} from '#imports'
import {menuKey} from '#imports';

const { item, selected, mode='collapse' } = defineProps<{item :MenuItem, selected:boolean, mode:'collapse' | 'expand' }>()

const elRef = ref()


const { dragState ,setupDrag } = useDragable({
    key: menuKey,
    dragData: {
        key: menuKey,
        data: item
    },
    detectDrop: false,
})
onMounted(() => {
    if(!elRef) return
    setupDrag(elRef.value)
})

onUnmounted(() => {
    // cleanup()
})

function itemClickHandler(){

}
 
</script>

<template>
<div ref="elRef" :class="{menuItemContainer:true, selected, [dragState.type]:true}" @click="itemClickHandler">
    <div class="collapseMenu">

    <Icon :name="item.icon"></Icon>
    <div v-if="mode === 'expand'" class="label">{{ item.label }}</div>
    </div>
    <Teleport v-if="dragState.type === 'preview'" :to="dragState.container">
            <div class="dropPreviewFile">
                <Icon :name="item.icon"></Icon>
            </div>
        </Teleport>
</div>

</template>

<style lang="scss" scoped>
.dropPreviewFile{
    padding: var(--app-space-xs);
    border-radius: var(--app-border-radius-s);
    background: var(--app-grey-1000);
    color: var(--app-main-color);
}
.collapseMenu{
    padding: var(--menu-item-padding);
    border-radius: var(--menu-item-radius);
    display: grid;
    place-items: center;
    cursor: pointer;
    background: var(--item-bg);
    color: var(--menu-item-normal-color);
    position: relative;

}
.menuItemContainer{
    position: relative;
    isolation: isolate;
    --item-bg: transparent;
    &.preview{
        opacity: 0.5;
    }
    &:hover, &:focus-within{
        --item-bg: linear-gradient(180deg, hsl(200, 0%,97%) 0%, hsl(200, 0%,99%) 20%);
        .collapseMenu{
            color: var(--menu-item-hover-color);
            transition: color .2s ease-in-out;
        }
        &:after{
            content: "";
            width: calc(100% + 1px);
            height: calc(100% + 1px);
            position: absolute;
            display: block;
            background: linear-gradient(180deg, var(--app-grey-1000) 0%, var(--app-grey-950) 40%);
            top: -1px;
            left: -1px;
            z-index: -1;
            border-radius: calc(var(--menu-item-radius) + 1px);
            box-shadow: var(--app-shadow-s);
            opacity: 1;
        }
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
