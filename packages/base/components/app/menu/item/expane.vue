<script lang="ts" setup generic="T extends MenuItem">
import type {MenuItem} from '#imports'
import {menuKey} from '#imports';

const { item, selected, mode='collapse' } = defineProps<{item :MenuItem, selected:boolean, mode:'collapse' | 'expand' }>()

const opened = ref(false)

const elRef = ref()
</script>
<template>
    <div :class="{menuExpanItemContainer:true, opened, selected}">
       <div class="menuItem">
           <div class="menuIcon">
               <Icon :name="item.icon"></Icon>
           </div>
           <div class="menuLabel">
               {{ item.label }}
           </div>
           <div v-if="item.children && item.children.length > 0" class="menuIcon dropdown" >
                <Icon :name="opened ? 'lucide:chevron-up' : 'lucide:chevron-down'" @click.stop="opened = !opened" />
           </div>
       </div>
       <div v-if="opened" class="expendItem">
            <AppMenuItemCollapseSubmenu v-for="subItem in item.children" :key="subItem.id" :subMenuItem="subItem" />
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
    padding: var(--app-space-xs)  var(--app-space-xs);
    border-radius: var(--app-border-radius-s);
    color: var(--app-grey-350);
    .menuLabel{
        flex:1 0 auto;
    }
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
    .dropdown{
        margin-left: var(--app-space-s);

    }
    .menuLabel{
        flex: 1;
    }
}
.menuExpanItemContainer{
    width:100%;
    &.opened {
        // background: linear-gradient(180deg, hsl(200, 0%,97%) 0%, hsl(200, 0%,99%) 20%);;
        padding-bottom: var(--app-space-s);
        border-bottom: 1px solid var(--app-grey-800);
    }
}
.expendItem{
    padding-inline: var(--app-space-xs) ;
    
}
</style>