<script lang="ts" setup>
const  { menu, appMenu, adminMenu } = useAppConfig()
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found on menu')
}
const props = defineProps<{
    displayMenu: any[]
}>()
const opened = ref(false)

function handleSelect(item:any){
  if(item.component) {
    tabProvider?.openInCurrentTab(item)
    opened.value = false
  }
}
</script>

<template>
<div class="mobileMenuContainer">
  <AppLogo menuMode="collapse" />
  <div class="menuItem" @click="opened = !opened">
    <div class="menuIcon">
      
      <Icon name="lucide:menu" />
    </div>
    <div class="menuLabel">
      menu
    </div>
  </div>
  <div :class="{fullscreenMenu:true, opened}">
    <div class="backdrop" @click="opened = false"></div>
    <div class="fullscreenMenuContent" @click.stop>

      <AppMenuSearch menuMode="collapse"/>
      <ElDivider />
      <AppMenuMobileList :menu="displayMenu" @select="handleSelect" />
      <ElDivider />
      <AuthUser menuMode="expand" /> 
    </div>
  </div>

</div>
</template>

<style lang="scss" scoped>
.mobileMenuContainer{
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-space-s);
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
  padding: var(--app-space-s);
  font-size: var(--app-font-size-l);
}
.menuItem{
  flex: 0 0 auto;
  width: 60px;
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: var(--app-space-xs);
  color: var(--menu-color);
  .menuIcon{
    font-size: var(--app-font-size-l);
  }
  .menuLabel{
    font-size: var(--app-font-size-s);
  }
}
.fullscreenMenu{
  width: 100%;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  transform: translateY(100dvh);
  transition: all 0.3s ease-in-out;
  padding: var(--app-space-s);
  isolation: isolate;
  &.opened{
    transform: translateY(0);
  }
}
.backdrop{
  width: 100%;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0);
}
.fullscreenMenuContent{
  width: 100%;
  height: 100%;
  border-radius: var(--app-border-radius-m);
  background: rgba(255, 255, 255, 0.4);
  border-radius: var(--app-border-radius-l);
  box-shadow: 10px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.3px);
  -webkit-backdrop-filter: blur(6.3px);
  border: 1px solid rgba(255, 255, 255, 0.31);
  padding: var(--app-space-s);
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-s);
}

</style>

