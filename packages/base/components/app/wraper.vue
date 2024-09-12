<script setup lang="ts" >
import { useMouse } from '@vueuse/core'
const {x,y} = useMouse()
</script>

<template>
    <div class="appFullPage" :style="`--mouse-x:${x}px;--mouse-y:${y}px;`">
        <div class="appSideBar">
            <slot name="sidebar" />
        </div>
        <div class="appMainContainer">
            <div class="appHeader">
                <slot name="header"></slot>
            </div>
            <div class="appContent">
                <slot />
            </div>
            <div class="appFooter">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.appFullPage{
    --page-padding:  var(--app-space-s);
    width: 100svw;
    height: 100svh;
    overflow: hidden;
    position: absolute;
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr;
    background-color: var(--app-bg-level-1);
    padding: var(--page-padding);
}
.appSideBar{
    
    overflow: visible;
    z-index: 1;
    
}
.appMainContainer{
    border-radius: var(--app-border-radius-s);
    background-color: var(--app-bg-level-3);
    box-shadow: var(--el-box-shadow-lighter);
    overflow: hidden;
    padding: var(--app-space-s);
    z-index: 2;
}
</style>