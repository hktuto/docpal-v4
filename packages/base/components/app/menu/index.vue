<script setup lang="ts" generic="T extends MenuItem">
const  { menu, appMenu, adminMenu } = useAppConfig()
const mode = ref<'collapse' | 'expand'>('collapse')
const props = defineProps<{
    admin?: boolean
}>()
const layout = useTabLayout()
const hightLightPanel = useCurrentTargetPanel()
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found on menu')
}
const { t } = useI18n()
const displayMenu = ref<any[]>([])

function createSearchItem(item:MenuItem, parentKey?:string) {
    const { availableLocales, messages } = useI18n()
  const keyword = ['menu'];
  availableLocales.forEach( (code) => {
        const codeMessage = messages.value[code]
        const label = item.label.split('.').reduce((acc, cur) => acc[cur] || "", codeMessage)
        if(label) {
            keyword.push(... label.toLowerCase().split(' '), label)
        }
        // if parentKey is not null, add parentKey to keyword
        if(parentKey) {
            const parentKeyLabel = parentKey.split('.').reduce((acc, cur) => acc[cur] || "", codeMessage)
            if(parentKeyLabel) {
                keyword.push(... parentKeyLabel.toLowerCase().split(' '), parentKeyLabel)
            }
        }
    })
    return {
        keyword:[...new Set(keyword)],
        label: t(item.label),
        icon: item.icon,
        action: () => {
            tabProvider?.openInCurrentTab(item)
        }
    }
}
const searchList = useGlobalSearchList()
function generateMenu(){
    let result = []
    
    const _appMenu = props.admin ? deepCopy(adminMenu) : deepCopy(appMenu) // menu list
    const _menu = deepCopy(menu) // menu对象映射
    const menuSearchList:GlobalSearchItem[] = [];
    
    for(let i = 0; i < _appMenu.length; i++) {
        let item = _appMenu[i];
        let menuItem = item;
        
        // step 1 check if item has name, if so get it from menu
        if((item.name && _menu[item.name])) {
            // TODO : check if menu[item.name] has license
            menuItem = _menu[item.name];
            if(checkVisible(menuItem)) {
                result.push(menuItem)
                menuSearchList.push( createSearchItem(_menu[item.name]) )
            }
            continue;
        }
        let hasVisibleChildren = false;
        if(item.children) {
            for(let j = 0; j < item.children.length; j++) {
                if(item.children[j].name && _menu[item.children[j].name] && checkVisible(_menu[item.children[j].name])) {
                    item.children[j] = _menu[item.children[j].name];
                    menuSearchList.push(createSearchItem(item.children[j], item.label  || "" ))
                    hasVisibleChildren = true
                }else{
                    item.children.splice(j, 1);
                    j--;
                }
            }
            if(item.children.length === 0) {
                item.children = undefined
            }
        }
        if(hasVisibleChildren && checkVisible(menuItem)) {
            result.push(menuItem)
        }
    }
    searchList.value.push({
        label: "Menu",
        items: menuSearchList
    })
    displayMenu.value = result;
}
function checkVisible(row: any) {
    if(row.feature && row.feature !== 'CORE') {
        return allowFeature(row.feature)
    }
    return true
}
const selectedMenuItem = ref<TabItem>()

function setSelectedMenuItem() {
    const panelIndex = layout.value.findIndex(panel => panel.id === hightLightPanel.value)
    if(panelIndex !== -1) {
        const selected = layout.value[panelIndex].tabs[layout.value[panelIndex].showingTabIndex || 0]
        if(selected) {
            selectedMenuItem.value = selected
        }
    }
}


watch(() => [layout, hightLightPanel], () => {
    // get hightLightPanel
    setSelectedMenuItem()
},{
    deep:true,
    immediate: true
})

onMounted(() => {
    // const menuState = localStorage.getItem('app-menu-mode')
    // if(menuState === 'expand'){
    //     mode.value = 'expand'
    // }
    generateMenu()
})

</script>

<template>
    <div class="appWrapper">
        <div class="menuContainer">
            <div class="menuHeader">
                <slot name="header" />
                <!-- <AppMenuToggle /> -->
            </div>
            <div class="menuBody">
                <AppMenuSearch />
    
                <AppMenuItemExpane 
                    v-for="(item, index) in displayMenu" 
                    :key="index" 
                    :item="item" 
                    :selectedMenuItem="selectedMenuItem"  />
            </div>

            <div class="menuFooter">
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
.menuHeader{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
}
.appWrapper{
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
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-s);
    font-size: var(--icon-font-size);
    position: relative;
    overflow: auto;
    padding-block: var(--app-space-s);
}
.menuFooter{
    font-size: var(--icon-font-size);

}
</style>
