
<script lang="ts" setup>

const localeReady = ref(false)
const appPlatform = useAppPlatform()
appPlatform.value = 'admin'
const { public: { platform }} = useRuntimeConfig()
const defaultTab = useAppDefaultTab()
const router = useRouter()

defaultTab.value =  {
  id: 'admin-user',
  name: 'admin-user-list',
  label: 'adminMenu.User',
  icon: 'lucide:user',
  component: 'LazyAdminUserList',
  props: {}
}


</script>

<template>
  <NuxtLayout name="auth" defaultTab="defaultTab">
    
  </NuxtLayout>
</template>

<style>
.appFullPage{
  --app-bg: radial-gradient(72% 72% at 2% -5%, #f3d4b9 0%, #efebe8 51%, #f3f0f0 100%);
  --app-accent-color: #512e0e;
  --menu-color: #512e0e;
}
/* green */
/* .appFullPage{
  --app-bg: radial-gradient(72% 72% at 2% -5%, #a6dfbb 0%, #c4e1cc 51%, #cce7de 100%);
  --app-accent-color: #0e5133;
  --menu-color: #0e5133;
} */
</style>


