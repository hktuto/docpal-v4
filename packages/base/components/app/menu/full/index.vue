<script lang="ts" setup>
const props = defineProps<{
  displayMenu?: any[]
}>()
const menuStyle = defineModel('menuStyle')
const { t} = useI18n()
function toggleMenuStyle(){
  menuStyle.value = 'stack'
  localStorage.setItem('docPalMenuStyle','full')
}
</script>

<template>
<div class="fullMenuContainer">
  <div class="menuHeader">
    <img class="logo"  src="/icons/logo-withName-light.svg" />
  </div>
  <div class="menuBody">
    <div v-for="(item, index) in displayMenu" :key="index" v-tooltip="t(item.label || '')" class="menuItem">
      <div class="itemContainer">
        <div class="icon">
        
          <Icon :name="item.icon"></Icon>
        </div>
        <div class="label">
          {{ t(item.label || '') }}
        </div>
        <template v-if="item.children && item.children.length">
          <icon name="" />
        </template>
      </div>
    </div>
  </div>
  <div class="menuFooter">
    <Icon name="mdi:arrow-expand-left" @click="toggleMenuStyle" />
    <AuthUser menuMode="expand" /> 
  </div>
</div>
</template>


<style lang="scss" scoped>
.menuHeader{
  padding: var(--app-space-s);
}
.logo {
  width: clamp( 80px, 100%, 100px);
}
.fullMenuContainer{
  height: 100vh;
  overflow: hidden;
  width: 220px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding:0;
}
.menuBody{
  overflow: auto;
}
.menuFooter{
  padding: var(--app-space-s);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: var(--app-space-s);
}
</style>
