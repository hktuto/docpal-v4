<script setup lang="ts" generic="T extends MenuItem">

const mode = ref<'collapse' | 'expand'>('collapse')
const props = defineProps<{
    displayMenu?: any[]
}>()
const layout = useTabLayout()
const hightLightPanel = useCurrentTargetPanel()
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found on menu')
}
const { t } = useI18n()

const menuMode = ref<'collapse' | 'expand'>('collapse')


const selectedMenuItem = ref<TabItem | undefined>()



const expandMenu = ref<MenuItem>()
const showExpandMenu = ref(false)

function handleHover(item:MenuItem) {
  expandMenu.value = JSON.parse(JSON.stringify(item)) || []
  showExpandMenu.value = true
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

function handleWrapperMouseLeave() {
  showExpandMenu.value = false
}

function handleWrapperFocusOut() {
  showExpandMenu.value = false
}

function toggleMenuMode() {
  menuMode.value = menuMode.value === 'collapse' ? 'expand' : 'collapse'
}

watch(() => [layout, hightLightPanel], () => {
    // get hightLightPanel
    setSelectedMenuItem(selectedMenuItem, expandMenu)
},{
    deep:true,
})


</script>

<template>
    <div 
      :class="{appWrapper:true, [menuMode]:true, showExpand: showExpandMenu}"
      @mouseleave="handleWrapperMouseLeave"
      @focusout="handleWrapperFocusOut"
    >
        <div :class="{menuContainer:true,  [isMobile ? 'mobile' : 'desktop']: true}">
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

}
.menuExpand{
  height: 100%;
  overflow-y: auto;
  padding: var(--app-space-s);
  border-left: 1px solid var(--app-grey-800);
  &.collapse{
    position: absolute;
    top: var(--app-space-m);
    height: calc(100% - var(--app-space-m) * 2);
    left: calc(60px + var(--app-space-xs));
    transform: translateX(-100vw);
    transition: all 0.4s ease-in-out;
    z-index: -1;
    background: var(--app-accent-alpha-10);
    border-radius: var(--app-border-radius-m);
    box-shadow: 10px 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.3px);
    -webkit-backdrop-filter: blur(6.3px);
    border: 1px solid rgba(255, 255, 255, 0.31);

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
    z-index: 0;
    background-image: radial-gradient(72% 72% at 2% -5%, #ddf2f7 0%, #dae7f1 100%);
    background-size: 100% 100%;
    &.collapse{

      flex-flow: row nowrap;
      .menuContainer{
        flex: 1 0 ;
      }

    }
    &.expand{
      flex-flow: row nowrap;
    }
    &.showExpand{
      z-index: 2;
      &.expand{
        z-index: 1;
      }
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
  height: 100vh;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  gap: var(--app-space-s);
  &.mobile{
    height: 100%;
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

}
.menuFooter{
    font-size: var(--icon-font-size);
    padding: var(--app-space-s);
    overflow-x: hidden;
}
</style>

