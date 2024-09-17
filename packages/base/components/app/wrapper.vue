<script setup lang="ts" >
<<<<<<<< HEAD:packages/base/components/app/wraper.vue
import { useMouse } from '@vueuse/core'
const {x,y} = useMouse()
</script>

<template>
    <div class="appFullPage" :style="`--mouse-x:${x}px;--mouse-y:${y}px;`">
        <div class="appSideBar">
            <slot name="sidebar" />
========

</script>

<template>
    <div class="appFullPage">
        <div class="appSidebar">
            <slot name="sidebar"></slot>
>>>>>>>> setup:packages/base/components/app/wrapper.vue
        </div>
        <div class="appMainContainer">
            <div class="appContent">
                <slot />
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
<<<<<<<< HEAD:packages/base/components/app/wraper.vue
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
========
    background-color: var(--app-grey-900);
    padding: var(--app-space-xs);
}
.appMainContainer{
    --container-radius: var(--app-border-radius-l);
    --container-padding: 0px;
    background-color: var(--app-grey-1000);
    box-shadow: var(--app-shadow-xl);
    border-radius: var(--container-radius);
    overflow: hidden;
    height:100%;
}
.appContent{
    height: 100%;
    width:100%;
    position: relative;
>>>>>>>> setup:packages/base/components/app/wrapper.vue
    overflow: hidden;
    padding: var(--app-space-s);
    z-index: 2;
}
.appSidebar{
    padding-inline: var(--app-space-s);
}
</style>