<script lang="ts" setup>
const {public : { platform , defaultTab}} = useRuntimeConfig()
const localeReady = ref(false)
const appPlatform = useAppPlatform()
appPlatform.value = platform || 'client'
const defaultTabStore = useAppDefaultTab()
// defaultTabStore.value =  defaultTab
</script>

<template>
  <NuxtLayout name="auth" >
    
  </NuxtLayout>
 
</template>

<style>
.appFullPage{
  --app-bg: radial-gradient(72% 72% at 2% -5%, #ddf2f7 0%, #dae7f1 100%);
  /* --app-bg: #fff; */
  --app-accent-color: #0077ff;
  --menu-color: var(--app-success-6);
}
</style>

