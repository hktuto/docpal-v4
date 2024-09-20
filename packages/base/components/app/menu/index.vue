<script setup lang="ts" generic="T extends MenuItem">
const menu = useMenuList()

const opened = ref('false')

const mode = ref<'collapse' | 'expand'>('collapse')

</script>

<template>
    <div :class="{wrapper:true, opened}">
        <div class="menuContainer">
            <div class="menuHeader">
                <slot name="header" />
            </div>
            <div class="menuBody">
                <AppMenuItem v-for="(item, index) in menu" :key="index" :item="item" :selected="false" :mode="mode" />
            </div>
            <div class="menuFooter">
                <Icon name="lucide:settings" />
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template> 

<style scoped lang="scss">
.wrapper{
    height: 100%;
    --menu-gap: var(--app-space-xs);
    --icon-font-size: var(--app-font-size-l);
    --menu-item-padding: var(--app-space-xs);
    --menu-item-radius: var(--app-border-radius-m);
    --menu-item-normal-bg: rgba(0,0,0,0);
    --menu-item-active-bg: var(--app-grey-1000);
    --menu-item-normal-color: var(--app-grey-100);
    --menu-item-hover-color: var(--app-accent-color);
    --menu-item-active-color: var(--app-main-color);
}
.menuContainer{
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    gap: var(--app-space-s);
}
.menuBody{
    
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--menu-gap);
    font-size: var(--icon-font-size);
    
}
.menuFooter{
    font-size: var(--icon-font-size);

}
</style>