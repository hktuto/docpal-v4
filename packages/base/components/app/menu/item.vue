<script lang="ts" setup generic="T extends MenuItem">
import type {MenuItem} from '#imports'
import {useMenuDrop} from '#imports';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import {draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview'

const {menuKey, getMenuData } = useMenuDrop()



const { item, selected } = defineProps<{item :MenuItem, selected:boolean}>()

const elRef = ref()

type menuState = 
    | {
        type: "idle";
    }
    | {
        type: "preview";
        container: HTMLElement;
    }
    | {
        type: "is-dragging";
    };
const elState = ref<menuState>({type:'idle'});
let cleanup = () => {}
onMounted(() => {
    if(!elRef) return
    if( !item.draggable ) return
    cleanup = combine(
        draggable({
            element: elRef.value,
            getInitialData(){
                return getMenuData(item)
            },
            onGenerateDragPreview({ nativeSetDragImage }) {
                setCustomNativeDragPreview({
                    nativeSetDragImage,
                    getOffset: pointerOutsideOfPreview({
                        x: '16px',
                        y: '8px',
                    }),
                    render({ container }) {
                        elState.value = { type: 'preview', container }
                    },
                }
                )
            },
            onDragStart() {
                elState.value = { type: 'is-dragging' }
            },
            onDrop() {
                elState.value = { type: 'idle'}
            },
        })
    )
})

onUnmounted(() => {
    cleanup()
})

function itemClickHandler(){

}
 
</script>

<template>
<div ref="elRef" :class="{menuItemContainer:true, selected, [elState.type]:true}" @click="itemClickHandler">
    <Icon :name="item.icon"></Icon>
    <Teleport v-if="elState.type === 'preview'" :to="elState.container">
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
.menuItemContainer{
    padding: var(--menu-item-padding);
    border-radius: var(--menu-item-radius);
    display: grid;
    place-items: center;
    cursor: pointer;
    background-color: var(--menu-item-normal-bg);
    color: var(--menu-item-normal-color);
    &.preview{
        opacity: 0.5;
    }
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
