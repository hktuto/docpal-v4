<script lang="ts" setup>

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found on menu')
}
const menuStyle = defineModel('menuStyle')
const props = defineProps<{
  displayMenu: any[]
}>()
const layout = useTabLayout()
const hightLightPanel = useCurrentTargetPanel()
const { t} = useI18n()
function toggleMenuStyle(){
  menuStyle.value = 'stack'
  localStorage.setItem('docPalMenuStyle','stack')
}
const selectedMenuItem = ref<TabItem | undefined>()


function handleSelect(item:MenuItem) {
  tabProvider?.openInCurrentTab(item)
}

watch(() => [layout, hightLightPanel], () => {
    // get hightLightPanel
    setSelectedMenuItem(selectedMenuItem, props.displayMenu )
},{
    deep:true,
})


</script>

<template>
<div class="fullMenuContainer">
  <div class="menuHeader">
    <img class="logo"  src="/icons/logo-withName-light.svg" />
  </div>
  <div class="menuBody">
    <AppMenuSearch menuMode="expand"/>
    <AppMenuFullItem  v-for="(item, index) in displayMenu" :key="index" :item="item" :selectedMenuItem="selectedMenuItem" @click="handleSelect"/>
  </div>
  <div class="menuFooter">
    <div class="toggleContainer">

      <Icon name="mdi:arrow-expand-left" @click="toggleMenuStyle" />
    </div>
    <AuthUser menuMode="expand" /> 
  </div>
</div>
</template>


<style lang="scss" scoped>
.toggleContainer{
  cursor: pointer;
  color: var(--app-grey-300);
  flex: 1 0 auto;
}
.menuHeader{
  padding: var(--app-space-s);
}
.logo {
  width: clamp( 80px, 100%, 100px);
}
.fullMenuContainer{
  height: 100vh;
  overflow: hidden;
  width: calc(220px + var(--app-space-xs) * 2);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding:0;
}
.menuBody{
  min-height: calc(100vh - 100px);
  overflow: auto;
  width: 100%;
  padding: var(--app-space-s);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-xs);

}
.menuFooter{
  width:100%;
  padding: var(--app-space-s);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: var(--app-space-s);
  .userMenuWidgetContainer{
    flex: 0 0 auto;
    width:auto;
  }
}
</style>
