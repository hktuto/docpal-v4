<script setup lang="ts" generic="T extends MenuItem">
import type {MenuItem} from '#imports'
const { menu = []} = defineProps<{ menu: T[] }>()
const opened = ref('false')



</script>

<template>
    <div :class="{wrapper:true, opened}">
        <div class="menuContainer">
            <div class="menuHeader">
                <slot name="header" />
            </div>
            <div class="menuBody">
                <AppMenuItem v-for="(item, index) in menu" :key="index" :item="item" :selected="false" />
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