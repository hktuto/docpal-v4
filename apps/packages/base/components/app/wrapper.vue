<script setup lang="ts" >


</script>

<template>
    <div class="appFullPage">
        <div class="appSidebar">
            <slot name="sidebar"></slot>
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
    width: 100svw;
    height: 100svh;
    overflow: hidden;
    position: absolute;
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr;
    background-color: var(--app-grey-800);
    padding: var(--app-space-s);
}
.appMainContainer{
    border-radius: var(--app-border-radius-l);
    background-color: var(--app-grey-900);
    box-shadow: var(--app-shadow-l);
    overflow: hidden;
}
</style>