<script lang="ts" setup generic="T extends MenuItem">
import type {MenuItem} from '#imports'
import {menuKey} from '#imports';

const { item, selected, mode='collapse' } = defineProps<{item :MenuItem, selected:boolean, mode:'collapse' | 'expand' }>()

const elRef = ref()
</script>
<template>
    <div class="menuExpanItemContainer">
       <div class="menuItem">
           <div class="menuIcon">
               <Icon :name="item.icon"></Icon>
           </div>
           <div class="menuLabel">
               {{ item.label }}
           </div>
       </div>
    </div>
</template>

<style lang="scss" scoped>
.menuItem{
    --item-bg: transparent;
    font-size: var(--app-font-size-m);
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-xs);
    background: var(--item-bg);
    padding: var(--app-space-xs) var(--app-space-s);
    border-radius: var(--app-border-radius-s);
    cursor: pointer;
    
    &:hover{
        --item-bg: linear-gradient(180deg, hsl(200, 0%,97%) 0%, hsl(200, 0%,99%) 20%);

        color: var(--menu-item-hover-color);
        box-shadow: var(--app-shadow-s);

    }
    .menuIcon{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .menuLabel{
        flex: 1;
    }
}
.menuExpanItemContainer{
    width:100%;
}
</style>