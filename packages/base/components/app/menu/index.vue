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

const menuMode = ref<'collapse' | 'expand'>('collapse')

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
    
    // Recursive function to process menu items and their children
    function processMenuItem(item: any, parentLabel?: string): any | null {
        let menuItem = JSON.parse(JSON.stringify(item));
        
        // If item has name, it's a real page - get full details from _menu
        if(item.name && _menu[item.name]) {
            // TODO : check if menu[item.name] has license
            menuItem = JSON.parse(JSON.stringify(_menu[item.name]));
            if(!checkVisible(menuItem)) {
                return null; // Skip if not visible
            }
            // Add to search list
            menuSearchList.push(createSearchItem(menuItem, parentLabel || ""))
            
            // If this item has no children, return it directly without processing children
            if(!item.children || item.children.length === 0) {
                return menuItem;
            }
        } else if(item.label) {
            // If only has label, it's a placeholder/folder - use as-is
            menuItem = JSON.parse(JSON.stringify(item));
        } else {
            return null; // Skip items without name or label
        }
        
        // Process children recursively only if there are children
        if(item.children && item.children.length > 0) {
            const processedChildren = [];
            for(let j = 0; j < item.children.length; j++) {
                const child = processMenuItem(JSON.parse(JSON.stringify(item.children[j])), item.label || parentLabel);

                if(child) {
                    processedChildren.push(child);
                }
            }
            if(processedChildren.length > 0) {
                menuItem.children = processedChildren;
            } else {
                menuItem.children = undefined;
            }
        }
        
        return menuItem;
    }
    
    // Process all top-level menu items
    for(let i = 0; i < _appMenu.length; i++) {
        const processedItem = processMenuItem(_appMenu[i]);
        if(processedItem) {
            result.push(processedItem);
        }
    }
    
    searchList.value.push({
        label: "Menu",
        items: menuSearchList
    })
    console.log('result',props.admin,result, _appMenu)
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
    if(selectedMenuItem.value ) {
      expandMenu.value = JSON.parse(JSON.stringify(selectedMenuItem.value)) || []
    }

}

const expandMenu = ref<MenuItem>()

function handleHover(item:MenuItem) {
  expandMenu.value = JSON.parse(JSON.stringify(item)) || []
  console.log('expandMenu',expandMenu.value)
}

function handleSelect(item:MenuItem) {
  if(menuMode.value === 'expand' && item.children&& item.children.length > 0) {
    expandMenu.value = JSON.parse(JSON.stringify(item)) || []
  }
  if(item.component) {
    tabProvider?.openInCurrentTab(item)
  }
}

function toggleMenuMode() {
  menuMode.value = menuMode.value === 'collapse' ? 'expand' : 'collapse'
}

watch(() => [layout, hightLightPanel], () => {
    // get hightLightPanel
    setSelectedMenuItem()
},{
    deep:true,
})
watch(() => props.admin, () => {
    generateMenu()
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
    <div :class="{appWrapper:true, [menuMode]:true}">
        <div class="menuContainer">
            <div class="menuHeader">

                <slot name="header" />
                <AppLogo :menuMode="menuMode" />
            </div>
            <div class="menuBody">

                
                <AppMenuCollapse 
                    :menuMode="menuMode" 
                    :menu="displayMenu"  
                    :selectedMenuItem="selectedMenuItem" 
                    @select="handleSelect" 
                    @hover="handleHover"
                  />
               

            </div>

            <div class="menuFooter">
              
                <AuthUser menuMode="collapse" /> 
                <slot name="footer"></slot>
            </div>
        </div>
        <div :class="{menuExpand:true, [menuMode]:true}">
          <div class="expandMenuHeader">
            <div class="toggleIcon">
                  <Icon class="menuToggleIcon" :name="menuMode === 'collapse' ? 'lucide:chevron-right' : 'lucide:chevron-left'" @click="toggleMenuMode" />
                </div>
            <AppMenuSearch menuMode="collapse"/>
              
          </div>
          
          <AppMenuExpand v-if="expandMenu" :menu="expandMenu" :selectedMenuItem="selectedMenuItem"  @select="handleSelect" />
        </div>
        <!-- <div class="menuToggleer" @click="toggleMenuMode">
           
        </div> -->
    </div>
</template> 

<style scoped lang="scss">   
.expandMenuHeader{
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
}                                                 
.toggleIcon{
  padding: var(--app-space-xs);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--app-font-size-xl);
}


.menuHeader{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    padding: var(--app-space-m) var(--app-space-s) 0 var(--app-space-s);
    @media (max-width: 768px) {
      padding: 0;
    }
}
.menuExpand{
  height: 100%;
  overflow-y: auto;
  padding: var(--app-space-s);
  border-left: 1px solid var(--app-grey-800);
  &.collapse{
    position: absolute;
    top: 0;
    left: calc(60px + var(--app-space-s));
    height: 100vh;
    transform: translateX(-100vw);
    transition: all 0.2s ease-in-out;
    z-index: -1;
    background: rgba(255, 255, 255, 0.4);
    border-radius: var(--app-border-radius-m);
    box-shadow: 10px 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.3px);
    -webkit-backdrop-filter: blur(6.3px);
    border: 1px solid rgba(255, 255, 255, 0.31);
    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }
  }
}
.appWrapper{
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: visible;
    transition: all 0.2s ease-in-out;
    z-index: 2;
    background-image: radial-gradient(72% 72% at 2% -5%, #ddf2f7 0%, #dae7f1 100%);
    background-size: 100% 100%;
    &.collapse{

      flex-flow: row nowrap;
      .menuContainer{
        flex: 1 0 ;
      }
      @media (max-width: 768px) {
        flex-flow: column nowrap;
        overflow: auto;
      }
    }
    &.expand{
      flex-flow: row nowrap;
    }
    &:hover, &:focus-within{
      .menuExpand{
        transform: translateX(0);
      }
    }
    --menu-gap: var(--app-space-xxs);
    --icon-font-size: calc(var(--app-font-size-m) * 1.2);
    --menu-item-padding: var(--app-space-xs);
    --menu-item-radius: var(--app-border-radius-m);
    --menu-item-normal-bg: rgba(0,0,0,0);
    --menu-item-active-bg: var(--app-grey-1000);
    --menu-item-normal-color: var(--app-success-4);
    --menu-item-hover-color: var(--app-accent-color);
    --menu-item-active-color: var(--app-main-color);
    position: relative;
}
.menuContainer{
  flex: 0 0 ;
  width:100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: var(--app-space-s);
  @media (max-width: 768px) {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    width: 100vw;
  }
}
.menuBody{
    width: max-content;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-xs);
    font-size: var(--icon-font-size);
    position: relative;
    overflow-y: auto;
    padding: var(--app-space-s);

    font-size: var(--app-font-size-l);
    /* Custom scrollbar for .menuBody */
    &::-webkit-scrollbar {
        width: 5px;
        background: none;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--app-grey-900, #222);
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background: none;
    }
    scrollbar-width: thin;
    scrollbar-color: var(--app-grey-900, #222) transparent;
    @media (max-width: 768px) {
      flex:1 0 auto;
      overflow: auto;
    }
}
.menuFooter{
    font-size: var(--icon-font-size);
    padding: var(--app-space-s);
    overflow-x: hidden;
}
</style>

