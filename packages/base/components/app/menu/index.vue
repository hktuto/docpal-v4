<script setup lang="ts" generic="T extends MenuItem">
const menu = useMenuList()

const opened = ref('false')

const mode = ref<'collapse' | 'expand'>('collapse')

function toggleMenuMode(){
    if(mode.value === 'collapse'){
        mode.value = 'expand'
    }else{
        mode.value = 'collapse'
    }
}

</script>

<template>
    <div :class="{wrapper:true, opened}">
        <div class="menuContainer">
            <div class="menuHeader">
                <slot name="header" />
            </div>
            <Transition name="fade" appear>
                <div v-if="mode === 'collapse'" class="menuBody">
                    <AppMenuItemCollapse v-for="(item, index) in menu" :key="index" :item="item" :selected="false" :mode="mode" />
                </div>
                <div v-else class="menuBody expand">
                    <AppMenuItemExpane v-for="(item, index) in menu" :key="index" :item="item" :selected="false" :mode="mode" />
                </div>
            </Transition>
            <div class="menuFooter">
                <Icon name="lucide:settings" />
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="menuToggleer" @click="toggleMenuMode">

        </div>
    </div>
</template> 

<style scoped lang="scss">
.menuExpaneBody{
    width: 220px;
}
.menuToggleer{
    position: absolute;
    top: 0;
    right: calc( var(--app-space-s) * -1);
    width: var(--app-space-s);
    background: var(--app-grey-300);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: all .2s ease-in-out;
    &:hover{
        opacity: 1;
    }
}
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
    position: relative;
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
    &.expand{
        justify-content: stretch;
    }
    
}
.menuFooter{
    font-size: var(--icon-font-size);

}
</style>