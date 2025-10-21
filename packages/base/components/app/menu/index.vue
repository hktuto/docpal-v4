<script setup lang="ts" generic="T extends MenuItem">

const props = defineProps<{
    displayMenu: any[]
}>()

const menuStyle = useMenuStyle()

onMounted(() => {
  // check menuStyle on localstorage
  const menuStyleStorage = localStorage.getItem('docPalMenuStyle') as any
  if(menuStyleStorage && menuOptions.includes(menuStyleStorage)){
    menuStyle.value = menuStyleStorage
  }
})

</script>

<template>
    <AppMenuStack v-if="menuStyle === 'stack'"  v-model:menuStyle="menuStyle" :displayMenu="displayMenu"/>
    <AppMenuFull v-else v-model:menuStyle="menuStyle"  :displayMenu="displayMenu"/>
</template> 

