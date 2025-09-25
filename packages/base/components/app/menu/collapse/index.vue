<script setup lang="ts">
import type {MenuItem} from '#imports'
import {menuKey} from '#imports';
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const props = defineProps<{menu :MenuItem[], selectedMenuItem?:TabItem, menuMode?:'collapse' | 'expand'}>()
const { selectedMenuItem } = toRefs(props)
const emits = defineEmits(['select'])

function itemClick(item:MenuItem) {
  emits('select', item)
}
const selectedIndex = ref()

watch(selectedMenuItem, (newSelectedMenuItem) => {
  if(!newSelectedMenuItem) return
  props.menu.forEach((element, index) => {
    if(element.name === newSelectedMenuItem.name) {
      selectedIndex.value = index
      return
    }
    if(element.children) {
      element.children.forEach(child => {
        if(child.name === newSelectedMenuItem.name) {
          selectedIndex.value = index
          return
        }
      })
    }
  });
},{
  deep:true,
  immediate: true
})


</script>


<template>
  <div class="menuListContainer">
    <template v-if="menuMode === 'collapse'">
      <template v-for="(item,index) in menu" :key="index">
        <AppMenuCollapseItem @click="itemClick(item)" v-tooltip="$t(item.label)" :selected="selectedIndex === index" :item="item" />

      </template>
    </template>
    <template v-else>
      <template v-for="(item,index) in menu" :key="index">
        <AppMenuCollapseItem @click="itemClick(item)" v-tooltip="$t(item.label)"  :selected="selectedIndex === index" :item="item" />
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.menuListContainer{
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-xs);
  color: var(--app-success-6);
  width: var(--app-space-xl);

  
}

</style>
