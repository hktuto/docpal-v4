<script lang="ts" setup>
// Unregister all service workers in development mode


// Call the function when the app mounts
onMounted(() => {
  // unregisterServiceWorkers()
})
</script>

<template>
    <NuxtPage />
    <AppUpdateToast />  
</template>


