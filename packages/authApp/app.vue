<script lang="ts" setup>
// Unregister all service workers in development mode
// import { clientApi } from 'api'
const ready = ref(false)
// Call the function when the app mounts
onMounted( async() => {
  // unregisterServiceWorkers()
    await getLocale()
    ready.value = true
})
</script>

<template>
    <template v-if="ready">

      <NuxtPage />
    </template>
    <AppUpdateToast />  
    <Contextmenu />
    
</template>


