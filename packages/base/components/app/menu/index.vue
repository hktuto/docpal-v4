<script setup lang="ts" generic="T extends MenuItem">
const  { menu } = useAppConfig()
const opened = ref('false')
const mode = ref<'collapse' | 'expand'>('collapse')


const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found on menu')
}
const selectedMenuItem = ref<MenuItem>()
function toggleMenuMode(){
    if(mode.value === 'collapse'){
        mode.value = 'expand'
    }else{
        mode.value = 'collapse'
    }
    localStorage.setItem('app-menu-mode', mode.value)
}

function menuItemClick(item:any) {
    // if menu  has no children, open page in new tab
    if(!item.children || item.children.length === 0) {
        console.log("item click", item);
        tabProvider?.openTab(item)
        return;
    }
    if(selectedMenuItem.value && selectedMenuItem.value.id === item.id) {
        selectedMenuItem.value = undefined
    }else{

        selectedMenuItem.value = item
    }
    
}

onMounted(() => {
    const menuState = localStorage.getItem('app-menu-mode')
    if(menuState === 'expand'){
        mode.value = 'expand'
    }
})

</script>

<template>
    <div :class="{wrapper:true, opened}">
        <div class="menuContainer">
            <div class="menuHeader">
                <slot name="header" />
            </div>
            <Transition name="fade" appear>
                <div v-if="mode === 'collapse'" class="menuBody">
                    <AppMenuItemCollapse v-for="(item, index) in menu" :key="index" :item="item" :selected="!!selectedMenuItem && selectedMenuItem.id === item.id" :mode="mode" @itemClick="menuItemClick(item)" />
                </div>
                <div v-else class="menuBody expand">
                    <AppMenuItemExpane v-for="(item, index) in menu" :key="index" :item="item" :selected="false" :mode="mode" @itemClick="menuItemClick(item)" />
                </div>
            </Transition>
            <div class="menuFooter">
                <Icon name="lucide:settings" />
                <slot name="footer"></slot>
            </div>
        </div>
        <div v-if="mode === 'collapse' && selectedMenuItem && selectedMenuItem.children" class="levelTwoMenuContainer">
            <AppMenuItemCollapseSubmenu v-for="item in selectedMenuItem.children" :key="item.id" :subMenuItem="item" />
        </div>
        <div class="menuToggleer" @click="toggleMenuMode">
            <Icon class="menuToggleIcon" :name="mode === 'collapse' ? 'lucide:chevron-right' : 'lucide:chevron-left'" />
        </div>
    </div>
</template> 

<style scoped lang="scss">                                                    
.levelTwoMenuContainer{
    padding: var(--app-space-s);
    border-left: 1px solid var(--app-grey-800);
    height: 100%;
    min-width: 220px;
    margin-left: var(--app-space-xs);
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap:0;
    > * {
        width:100%;
        flex: 0 0 auto;
    }
    .subMenuItem + .subMenuItem {
        border-top: 1px solid var(--app-grey-800);
    }
}
.menuToggleIcon{
    font-size: var(--toggler-width);
    color: var(--app-grey-100);
}
.menuExpaneBody{
    width: 220px;
}
.menuToggleer{
    --toggler-width: 1rem;
    position: absolute;
    top: calc(var(--app-space-s) * -1);
    right: calc( var(--app-space-s) * -1);
    width: var(--toggler-width);
    background: linear-gradient( -90deg, var(--app-grey-800), rgba(255,255,255,0)) ;
    height: calc(100% + var(--app-space-s));
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: all .2s ease-in-out;
    &:hover{
        --toggler-width: 1.5rem;
        opacity: 1;
    }
}
.wrapper{
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
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
        gap: var(--app-space-xxs);
        min-width: 200px;
    }
    
}
.menuFooter{
    font-size: var(--icon-font-size);

}
</style>