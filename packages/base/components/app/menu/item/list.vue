<script lang="ts" setup>
import type {MenuItem} from '#imports'
import {menuKey} from '#imports';
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const props = defineProps<{item :MenuItem, selectedMenuItem?:TabItem}>()
const selected = ref(false)
const dropOtion:UseDraggableParam = {
    key: menuKey,
    dragData: {
        key: menuKey,
        type: 'menu',
        data: props.item
    },
    detectDrop: false,
}

function itemClick() {
    if(props.item.children && props.item.children.length > 0) {
        opened.value = !opened.value
        return;
    }
    if(props.item.component) {
      console.log('itemClick',props.item.component)
        tabProvider?.openInCurrentTab(props.item)
    }
}


</script>


<template>
  

</template>
