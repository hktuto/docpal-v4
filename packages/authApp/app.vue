<script lang="ts" setup>
// Unregister all service workers in development mode
const unregisterServiceWorkers = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        
        for (const registration of registrations) {
          await registration.unregister()
          console.log('Service worker unregistered:', registration.scope)
        }
        
        console.log(`Unregistered ${registrations.length} service worker(s)`)
      }
    } catch (error) {
      console.warn('Error unregistering service workers:', error)
    }
  }
}

// Call the function when the app mounts
onMounted(() => {
  unregisterServiceWorkers()
})
</script>

<template>
    <NuxtPage />
    <AppUpdateToast />  
</template>


