<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'

import {paneResized} from '#imports'
const { layout } = defineProps<{
    layout: TabPanel[]
}>()
const emits = defineEmits(['ready'])


const minSize = computed(() => {
    return (layout ? layout.length : 1) * 640;
})

function layoutReadyHandler(){
    emits('ready')
}
const splitRef = ref<InstanceType<typeof Splitpanes>>()


onMounted(() => {
    emits('ready')
})

</script>

<template>
    <div class="layoutContainer" :style="`--panel-min-size: ${minSize}px`">
        <splitpanes vertical ref="splitRef" @resized="paneResized" :push-other-panes="false" @ready="layoutReadyHandler">
            <Pane v-for="(tab, index) in layout" :key="tab.id"  :size="tab.size" >
                <TabPanel :panel="tab" :index="index"/>
            </Pane>
        </splitpanes>
    </div>
    
</template>

<style lang="scss" scoped>
.layoutContainer{
    --panel-border-radius: var(--app-border-radius-m);
    height: 100%;
    width: 100%;
    border-radius: var(--app-border-radius-m);
    box-shadow: var(--app-shadow-s);
    position: relative;
    overflow: auto;

    :deep(.splitpanes){
        // min-width: var(--panel-min-size);
    }
    // :deep(.splitpanes){
    //     height:100%;
    //     transition: none;
    //     // background: var(--app-grey-925);
    //     // box-shadow: var(--app-shadow-s);
    //     border-radius: var(--panel-border-radius);
    //     overflow: hidden;
    //     &:has(.activePanel) {
            
    //         // background: var(--app-grey-975);
    //         box-shadow: var(--app-shadow-l);
    //         z-index: 4;
    //     }
    // }
    // :deep(.splitpanes) {
    //     height:100%;
    // }
    :deep(.splitpanes__pane) {
        height:100%;
        transition: none;
        box-shadow: var(--app-shadow-s)!important;
        border-radius: var(--app-border-radius-m);
        overflow: hidden;
        &:has(.activePanel) {
            box-shadow: var(--app-shadow-l)!important;
            z-index: 20;
        }
    }
    
    // // :deep(.splitpanes__pane) {
    // //     // default style for pane
    // // }
    // :deep(.splitpanes__splitter) {
    //     --center-width: 6px;
    //     --dragger-width: 1px;
    //     --bg-width: var(--app-space-m);
    //     --center-color: transparent;
    //     --bg-color: rgba(0,0,0,0.3);
    //     z-index: 2;
    //     &:hover {
    //         --dragger-width: 2px;
    //         --splitpanes-margin: 2rem;
    //         --center-color: var(--app-success-3);
    //     }
    //     &:after {
    //         content: "";
    //         position:absolute;
    //         background: var(--center-color);
    //         z-index: 2;
    //         transition: all .1s ease-in-out;
    //     }
    //     &:before {
    //         content: "";
    //         position:absolute;
    //     }
    // }
    // :deep(.splitpanes--dragging > .splitpanes__splitter) {
    //     --center-color:var(--app-accent-color) !important ;
    //     --dragger-width: 2px !important;
    //     --splitpanes-margin: 0rem !important;
    // }
    // :deep(.splitpanes--vertical > .splitpanes__splitter) {
    //     width: var(--center-width);
    //     position: relative;
    //     &:after {
    //         width: var(--dragger-width);
    //         height: calc(100% - var(--splitpanes-margin) * 2);
    //         display: block;
    //         background: var(--center-color);
    //         top: var(--splitpanes-margin);
    //         left: calc(( var(--center-width) - var(--dragger-width)) / 2);
    //     }
    //     &:before {
    //         width: var(--bg-width);
    //         height: 100%;
    //         display: block;
    //         position: absolute;
    //         left: calc( (var(--center-width) - var(--bg-width)) / 2 );
    //         background: var(--bg-color);
    //         opacity: 0;
    //     }
    //     // background: var(--app-grey-800);
    // }
    
    // :deep(.splitpanes--horizontal > .splitpanes__splitter ){
    //     min-height: var(--app-space-s);
    //     position: relative;
    //     &:hover {
    //         background: var(--app-grey-850); 
    //         &:after{
    //             background: var(--app-grey-800);
    //         }
    //     }
    //     &:after {
    //         content: "";
    //         height: 2px;
    //         width: 100%;
    //         display: block;
    //         background: var(--app-grey-850);
    //         position: absolute;
    //         left: calc( (var(--app-space-s) / 2) - 1px);
    //     }
    // }

}
</style>
