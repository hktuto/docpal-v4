<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const opened = ref(false);
const emits = defineEmits(['openedChange'])
const outsideTarget = ref()

onClickOutside(outsideTarget, (event) => {
  if(opened.value){
    opened.value = false
  }
})

watch(opened,(bool) => {
  emits('openedChange', bool)
})
</script>

<template>
  <!-- <div class="collapseContainer">
    <div class="collapseWrapper desktop">
      <slot :collapse="false" />
    </div>
    <div class="collapseWrapper mobile">
      <div class="mobileCollapse" @click.stop="() => {}">
          <SvgIcon src="/icons/menu.svg" round @click="opened = true"/>
          <div ref="outsideTarget" :class="{listContainer:true, opened}">
            <slot :collapse="true" />
          </div>
        </div>
    </div>
  </div> -->
  <div class="collapseWrapper desktop">
    <slot :collapse="false" />
  </div>
  <div class="collapseWrapper mobile">
    <div class="mobileCollapse" @click.stop="() => {}">
        <SvgIcon src="/icons/menu.svg" round @click="opened = true"/>
        <div ref="outsideTarget" :class="{listContainer:true, opened}">
          <slot :collapse="true" />
        </div>
      </div>
  </div>
</template>

<style scoped lang="scss">

.collapseWrapper{
  display: flex;
  flex-flow: row nowrap;
  gap: var(--app-space-xs);
  justify-content: flex-start;
  align-items: center;
  font-size: var(--app-font-size-m);
  --icon-size: var(--app-font-size-m);
  color: var(--app-grey-300);
  :deep(.el-dropdown) {
    font-size: var(--app-font-size-m);
  }
  
  @container (min-width: 768px) {
    &.mobile{
      display: none;
    }
  }

  @container (max-width: 768px) {
    // set somthin
    &.desktop{
      display: none;
    }
  }
}
.mobileCollapse{
  position: relative;

}
.listContainer{
  display: none;
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 2;
  padding: var(--app-space-s);
  background: var(--app-grey-1000);
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
  transform: translateX(100vw);
  transition: transform .2s ease-in-out;

  // width: 220px;
  &.opened{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;
    gap: calc(var(--app-space-s) / 2);
    transform: translateX(0);
    z-index: 999;
  }
}
</style>
