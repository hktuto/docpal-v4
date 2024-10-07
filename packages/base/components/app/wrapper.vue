<script setup lang="ts" >

</script>

<template>
    <div class="appFullPage" >
        <div class="appSidebar">
            <slot name="sidebar"></slot>
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
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr;
    background: linear-gradient( 110deg,  hsl(var(--app-grey-hue), 46%, 95%) 0%,   var(--app-grey-900) 20%) ;
    background-color: var(--app-grey-900);
    -webkit-app-region: drag;
    
}
.appMainContainer{
    -webkit-app-region: drag;
    --container-radius: var(--app-border-radius-l);
    --container-padding: 0px;
    // background-color: var(--app-grey-1000);
    // box-shadow: var(--app-shadow-xl);
    // border-radius: var(--container-radius);
    
    overflow: hidden;
    padding: var(--app-space-xs);
    height:100%;
}
.appContent{
    height: 100%;
    width:100%;
    position: relative;
    // overflow: hidden;
    z-index: 2;
    -webkit-app-region: no-drag;
}
.appSidebar{
    padding: var(--app-space-s) calc(var(--app-space-s) - var(--app-space-xs)) var(--app-space-s) var(--app-space-s);
    -webkit-app-region: no-drag;
}
</style>