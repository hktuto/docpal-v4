<script lang="ts" setup generic="T extends TabItem, B extends boolean, I extends number">
import { onMounted } from 'vue';
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";
import {TabManagerKey} from '../type'
const { tab, selected, index } = defineProps<{tab: T, selected:B, index:I}>()
const tabManger = inject(TabManagerKey)
if(!tabManger) {
    throw createError('no '+ TabManagerKey.toString + "provided")
}

type TabState = 
    | {
        type: "idle";
    }
    | {
        type: "preview";
        container: HTMLElement;
    }
    | {
        type: "is-dragging";
    }
    | {
        type: "is-dragging-over";
        closestEdge: Edge | null;
    };
const idle: TabState = { type: "idle" };
const elRef = ref<HTMLDivElement | null>(null);
const elState = useState<TabState>("state_" + tab.id, () => idle);

let cleanup = () => { }

onMounted(() => {

})

function tabFocus() {
    console.log("tabFocus")
    if(tabManger){
        tabManger.panelTabFocus(tab.parent, index)
    }
}

function closeTab(){
    console.log("closeTab")

    if(tabManger){
        tabManger.closePanelTab(tab.parent, index)
    }
}

</script>

<template>
    <div class="wrapper" @click="tabFocus">

        <div ref="elRef" :class="{tabItem:true, showing:selected}" >
            <div class="icon">
                {{ tab.icon }}
            </div>
            <div class="label">
                {{ tab.label }}
            </div>
        <div @click.stop="closeTab">X</div>
    </div>
</div>

</template>

<style lang="scss" scoped>
.tabItem{
    --item-radius: calc(var(--container-radius) - var(--container-padding) );
    padding: var(--app-space-s) var(--app-space-m);
    font-size: var(--app-font-size-s);
    border-top-left-radius: var(--item-radius);
    border-top-right-radius: var(--item-radius);
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    gap: var(--app-space-s);
    &:hover {
        background: var(--app-grey-900);
    }
    &.showing{
        background: var(--app-grey-950);
        
    }
}
</style>