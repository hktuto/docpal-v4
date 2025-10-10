
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




