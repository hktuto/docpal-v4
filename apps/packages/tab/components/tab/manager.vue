<script setup lang="ts">
import type {TabPanelContainer, TabLayout} from '#imports'
import { useTabs, provide } from '#imports'
import 'splitpanes/dist/splitpanes.css'


const layout = useTabs()

function panelFocus(id:string) {

}

provide('tabManager', {
    panelFocus,

})
</script>

<template>
    <div class="tabManager">
        <TabLayout :layout="layout" />
    </div>
</template>

<style scoped lang="scss">
.tabManager{
    height:100%;
    :deep(.splitpanes) {
        background: var(--app-grey-900);
    }
    
    :deep(.splitpanes__pane) {
        // default style for pane
    }
    
    :deep(.splitpanes--vertical > .splitpanes__splitter) {
        min-width: var(--app-space-s);
        position: relative;
        &:hover {
            background: var(--app-grey-850); 
            &:after{
                background: var(--app-grey-800);
            }
        }
        &:after {
            content: "";
            width: 2px;
            height: 100%;
            display: block;
            background: var(--app-grey-850);
            position: absolute;
            left: calc( (var(--app-space-s) / 2) - 1px);
        }
        // background: var(--app-grey-800);
    }
    
    :deep(.splitpanes--horizontal > .splitpanes__splitter ){
        min-height: var(--app-space-s);
        background: var(--app-grey-800);
    }
}
</style>