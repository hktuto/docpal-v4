<script setup lang="ts" generic="T extends MenuItem">

const props = defineProps<{
    displayMenu: any[]
}>()

const menuStyle = ref<'stack' | 'full'>('stack')

onMounted(() => {
  // check menuStyle on localstorage
  const menuStyleStorage = localStorage.getItem('docPalMenuStyle') as any
  if(menuStyleStorage && ['stack','full'].includes(menuStyleStorage)){
    menuStyle.value = menuStyleStorage
  }
})

</script>

<template>
    <AppMenuStack v-if="menuStyle === 'stack'"  v-model:menuStyle="menuStyle" :displayMenu="displayMenu"/>
    <AppMenuFull v-else v-model:menuStyle="menuStyle"  :displayMenu="displayMenu"/>
</template> 

