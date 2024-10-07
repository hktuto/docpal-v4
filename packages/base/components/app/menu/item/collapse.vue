<script lang="ts" setup generic="T extends MenuItem">
import type {MenuItem} from '#imports'
import {menuKey, useElementHover} from '#imports';
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const { item, selected, mode='collapse' } = defineProps<{item :MenuItem, selected:boolean, mode:'collapse' | 'expand' }>()

const elRef = ref()
const isHovered = useElementHover(elRef)
const emits = defineEmits(['itemClick', 'contextmenu'])

const { dragState ,setupDrag } = useDragable({
    key: menuKey,
    dragData: {
        key: menuKey,
        type: 'menu',
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

</script>

<template>
<div ref="elRef" :class="{menuItemContainer:true, selected, [dragState.type]:true}" @click="$emit('itemClick', item)" @contextmenu="$emit('contextmenu', item)">
    <div class="collapseMenu">
    <Icon v-if="item.icon" :name="isHovered || selected ? item.hoverIcon || item.icon : item.icon" class="normal"></Icon>
    </div>
    <Teleport v-if="dragState.type === 'preview'" :to="dragState.container">
            <div class="dropPreviewFile">
                <Icon v-if="item.icon" :name="item.icon"></Icon>
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
    color: var(--app-grey-450);
    position: relative;

}
.menuItemContainer{
    position: relative;
    isolation: isolate;
    --item-bg: transparent;
    --menu-item-radius: var(--app-border-radius-m);
    &:after{
            content: "";
            width: calc(100% + 1px);
            height: calc(100% + 1px);
            position: absolute;
            display: block;
            background: transparent;
            top: -1px;
            left: -1px;
            z-index: -1;
            border-radius: calc(var(--menu-item-radius) + 1px);
            box-shadow: var(--app-shadow-s);
            transition: opacity .2s ease-in-out;
            opacity: 0;
        }
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
            
            opacity: 0.6;
        }
    }
    &.selected {
        --item-bg: linear-gradient(180deg, hsl(200, 0%,97%) 0%, hsl(200, 0%,99%) 20%);
        color: var(--menu-item-active-color);
        .collapseMenu{
            color: var(--menu-item-hover-color);
            transition: color .2s ease-in-out;
        }
        &:after{
            
            opacity: 1;
        }
    }
    .iconify{
        font-size: var(--icon-font-size);
    }
}
</style>
