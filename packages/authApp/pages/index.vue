<script lang="ts" setup>
const {public : { platform , defaultTab}} = useRuntimeConfig()
const localeReady = ref(false)
const appPlatform = useAppPlatform()
appPlatform.value = platform || 'client'
const defaultTabStore = useAppDefaultTab()
defaultTabStore.value =  defaultTab
</script>

<template>
  <NuxtLayout name="auth" >
  </NuxtLayout>
 
</template>



