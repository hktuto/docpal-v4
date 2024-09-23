<script setup>

</script>

<template>
    <AppWrapper>
        <template #sidebar>
            <AppMenu class="sideMenu" >
                <template #header>
                    <div class="logoContainer">
                        <AppLogo />
                    </div>
                </template>
                <template #footer>
                    <LangSwitch />
                </template>
            </AppMenu>
        </template>
        
        <template #default>
            <TabManager />
        </template>
    </AppWrapper>
</template>

<style scoped lang="scss">
.sideMenu{
    --menu-gap: var(--app-space-xs);
    --icon-font-size: var(--app-font-size-l);
    --menu-item-padding: var(--app-space-xs);
    --menu-item-radius: var(--app-border-radius-s);
    --menu-item-normal-bg: rgba(0,0,0,0);
    --menu-item-hover-bg: var(--app-grey-950);
    --menu-item-active-bg: var(--app-grey-1000);
    --menu-item-normal-color: var(--app-grey-100);
    --menu-item-hover-color: var(--app-accent-color);
    --menu-item-active-color: var(--app-main-color);
}
.logoContainer{
    // padding: var(--menu-item-padding);
    --icon-size: calc(var(--icon-font-size) + (var(--menu-item-padding) * 2));
}
</style>