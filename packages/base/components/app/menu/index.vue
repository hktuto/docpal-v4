<script setup lang="ts" generic="T extends MenuItem">
const  { menu, appMenu } = useAppConfig()
const mode = ref<'collapse' | 'expand'>('collapse')


const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found on menu')
}

const displayMenu = ref([])

function generateMenu(){
    let result = []
    for(let item of appMenu){
        let menuItem = item;
        // step 1 check if item has name, if so get it from menu
        if((item.name && menu[item.name])) {
            // TODO : check if menu[item.name] has license
            menuItem = menu[item.name];
            continue;
        }
        let hasVisibleChildren = false;
        if(item.children) {
            for(let child of item.children) {
                if(child.name && menu[child.name]) {
                    child = menu[child.name];
                    hasVisibleChildren = true
                }
            }
        }
        if(hasVisibleChildren) {
            result.push(menuItem)
        }
    }
    displayMenu.value = result;
    console.log("displayMenu", displayMenu.value);
}

const selectedMenuItem = ref<MenuItem>()

function menuItemClick(item:any) {
    // if menu  has no children, open page in new tab
    if(!item.children || item.children.length === 0) {
        console.log("item click", item);
        // TODO : show choose user perference to see if open in new tab or in current tab
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
    // const menuState = localStorage.getItem('app-menu-mode')
    // if(menuState === 'expand'){
    //     mode.value = 'expand'
    // }
    generateMenu()
})

</script>

<template>
    <div class="wrapper">
        <div class="menuContainer">
            <div class="menuHeader">
                <slot name="header" />
                <AppMenuToggle />
            </div>
            <div class="menuBody">
                <AppMenuItemExpane v-for="(item, index) in displayMenu" :key="index" :item="item" :selected="false" :mode="mode" @itemClick="menuItemClick(item)" />
            </div>

            <div class="menuFooter">
                <Icon name="lucide:settings" />
                <slot name="footer"></slot>
            </div>
        </div>
        <!-- <div class="menuToggleer" @click="toggleMenuMode">
            <Icon class="menuToggleIcon" :name="mode === 'collapse' ? 'lucide:chevron-right' : 'lucide:chevron-left'" />
        </div> -->
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

.wrapper{
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    --menu-gap: var(--app-space-xxs);
    --icon-font-size: calc(var(--app-font-size-m) * 1.2);
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
    width:100%;
    height: 100%;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    gap: var(--app-space-s);
}
.menuBody{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: stretch;
    align-items: flex-start;
    gap: 0;
    font-size: var(--icon-font-size);
    
}
.menuFooter{
    font-size: var(--icon-font-size);

}
</style>